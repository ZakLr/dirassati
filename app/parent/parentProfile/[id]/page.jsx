"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import apiCall from "@/components/utils/apiCall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { parentsData } from "../../data/parentsData";
import {
  Card as AntCard,
  Spin,
  Alert,
  Row,
  Col,
  Tag,
  Divider,
  Descriptions,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  CalendarOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { GraduationCap, Users, MapPin, Clock } from "lucide-react";

const StyledSection = styled.div`
  margin-bottom: 32px;
  position: relative;
`;

const StyledHeader = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1a1a1a;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ElegantLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
  }
`;

const LogoText = styled.span`
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  font-family: "Inter", "Segoe UI", sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    border-radius: 2px;
    opacity: 0.8;
  }
`;

const ProfileCard = styled(AntCard)`
  border-radius: 16px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #ffffff 0%, #fafbff 100%);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 120px;
  border-radius: 16px 16px 0 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileAvatar = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);

  .avatar-container {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 4px solid white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    background: white;
  }
`;

const InfoCard = styled.div`
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  }

  h3 {
    margin: 0 0 8px 0;
    font-size: 1.5rem;
    font-weight: 700;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const ActionButton = styled(ShadcnButton)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    transform: translateY(-1px);
  }
`;

export default function ParentProfile({ params }) {
  const { id } = params;
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = useSelector((state) => state.auth);
  const authToken = useSelector((state) => state.auth.accessToken);
  const parent = useSelector((state) => state.userinfo.userProfile);

  // Dummy data for parent profile
  const dummyParent = {
    id: id,
    first_name: "Ahmed",
    last_name: "Bouchama",
    email: "ahmed.bouchama@email.com",
    phone_number: "+213 555 123 456",
    address: "123 Rue de l'Indépendance, Tlemcen, Algeria",
    date_of_birth: "1985-03-15",
    occupation: "Software Engineer",
    marital_status: "Married",
    emergency_contact: "+213 555 987 654",
    registration_date: "2023-09-01",
    status: "Active",
    children_count: 2,
    total_payments: 450000, // 4500.00 DZD
    outstanding_balance: 75000, // 750.00 DZD
    last_payment_date: "2024-09-15",
  };

  const dummyChildren = [
    {
      id: 1,
      first_name: "Amina",
      last_name: "Bouchama",
      grade: "Grade 10",
      group: "Group A",
      enrollment_date: "2023-09-01",
    },
    {
      id: 2,
      first_name: "Youssef",
      last_name: "Bouchama",
      grade: "Grade 8",
      group: "Group B",
      enrollment_date: "2023-09-01",
    },
  ];

  useEffect(() => {
    const fetchParentProfile = async () => {
      try {
        setLoading(true);

        // Try to fetch real data first
        if (authToken && id) {
          const response = await apiCall("get", `/api/parents/${id}`, null, {
            token: authToken,
          });
          setProfileData(response);
        } else if (parent) {
          setProfileData(parent);
        } else {
          // Use dummy data as fallback
          setProfileData(dummyParent);
        }

        setLoading(false);
      } catch (err) {
        // Use dummy data as fallback
        setProfileData(dummyParent);
        setLoading(false);
      }
    };

    fetchParentProfile();
  }, [id, authToken, parent]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div
        style={{
          padding: "24px",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
        }}
      >
        <Alert
          message="Error"
          description={error || "Parent profile not found"}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "DZD",
    }).format(amount / 100);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
    }).format(new Date(date));
  };

  return (
    <div
      style={{
        padding: "24px",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
        <Col>
          <ElegantLogo>
            <LogoIcon>
              <GraduationCap size={24} color="#ffffff" />
            </LogoIcon>
            <LogoText>Dirassati</LogoText>
          </ElegantLogo>
          <StyledHeader>Parent Profile</StyledHeader>
          <p style={{ color: "#666", fontSize: "1.1rem", margin: 0 }}>
            View and manage parent information and account details.
          </p>
        </Col>
        <Col>
          <ActionButton
            onClick={() => router.push("/parent")}
            style={{ marginRight: 16 }}
          >
            <ArrowLeftOutlined /> Back to Dashboard
          </ActionButton>
          <ActionButton
            onClick={() => message.info("Edit profile feature coming soon!")}
          >
            <EditOutlined /> Edit Profile
          </ActionButton>
        </Col>
      </Row>

      {/* Profile Card */}
      <StyledSection>
        <ProfileCard>
          <ProfileHeader>
            <ProfileAvatar>
              <div className="avatar-container">
                <Avatar style={{ width: "100%", height: "100%" }}>
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                    alt={`${profileData.first_name} ${profileData.last_name}`}
                  />
                  <AvatarFallback
                    style={{
                      fontSize: "24px",
                      background: "#667eea",
                      color: "white",
                    }}
                  >
                    {profileData.first_name?.charAt(0)}
                    {profileData.last_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </ProfileAvatar>
          </ProfileHeader>

          <CardContent style={{ paddingTop: 60, textAlign: "center" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                marginBottom: 8,
                color: "#1a1a1a",
              }}
            >
              {profileData.first_name} {profileData.last_name}
            </h2>
            <Tag color="blue" style={{ marginBottom: 16 }}>
              {profileData.status || "Active"}
            </Tag>
            <p style={{ color: "#666", fontSize: "1.1rem" }}>
              Parent ID: #{profileData.id}
            </p>
          </CardContent>
        </ProfileCard>
      </StyledSection>

      {/* Statistics */}
      <Row gutter={16} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={12} md={6}>
          <StatCard>
            <Users size={24} style={{ marginBottom: 8 }} />
            <h3>{profileData.children_count || dummyChildren.length}</h3>
            <p>Children</p>
          </StatCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard>
            <div style={{ fontSize: "24px", marginBottom: 8 }}>💰</div>
            <h3>
              {formatCurrency(
                profileData.total_payments || dummyParent.total_payments
              )}
            </h3>
            <p>Total Paid</p>
          </StatCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard>
            <div style={{ fontSize: "24px", marginBottom: 8 }}>⏳</div>
            <h3>
              {formatCurrency(
                profileData.outstanding_balance ||
                  dummyParent.outstanding_balance
              )}
            </h3>
            <p>Outstanding</p>
          </StatCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard>
            <CalendarOutlined size={24} style={{ marginBottom: 8 }} />
            <h3>
              {formatDate(
                profileData.registration_date || dummyParent.registration_date
              )}
            </h3>
            <p>Member Since</p>
          </StatCard>
        </Col>
      </Row>

      {/* Personal Information */}
      <Row gutter={24}>
        <Col xs={24} lg={12}>
          <StyledSection>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                marginBottom: 16,
                color: "#333",
              }}
            >
              <InfoCircleOutlined /> Personal Information
            </h3>
            <InfoCard>
              <Descriptions column={1} size="small">
                <Descriptions.Item
                  label={
                    <>
                      <MailOutlined /> Email
                    </>
                  }
                >
                  {profileData.email || dummyParent.email}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <>
                      <PhoneOutlined /> Phone
                    </>
                  }
                >
                  {profileData.phone_number || dummyParent.phone_number}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <>
                      <HomeOutlined /> Address
                    </>
                  }
                >
                  {profileData.address || dummyParent.address}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <>
                      <IdcardOutlined /> Occupation
                    </>
                  }
                >
                  {profileData.occupation || dummyParent.occupation}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <>
                      <UserOutlined /> Marital Status
                    </>
                  }
                >
                  {profileData.marital_status || dummyParent.marital_status}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <>
                      <PhoneOutlined /> Emergency Contact
                    </>
                  }
                >
                  {profileData.emergency_contact ||
                    dummyParent.emergency_contact}
                </Descriptions.Item>
              </Descriptions>
            </InfoCard>
          </StyledSection>
        </Col>

        <Col xs={24} lg={12}>
          <StyledSection>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                marginBottom: 16,
                color: "#333",
              }}
            >
              <Users /> Children Information
            </h3>
            {(profileData.children || dummyChildren).map((child, index) => (
              <InfoCard key={child.id || index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        marginBottom: 8,
                        color: "#667eea",
                      }}
                    >
                      {child.first_name} {child.last_name}
                    </h4>
                    <p style={{ margin: 0, color: "#666" }}>
                      <strong>Grade:</strong> {child.grade}
                    </p>
                    <p style={{ margin: 0, color: "#666" }}>
                      <strong>Group:</strong> {child.group}
                    </p>
                    <p style={{ margin: 0, color: "#666" }}>
                      <strong>Enrolled:</strong>{" "}
                      {formatDate(child.enrollment_date)}
                    </p>
                  </div>
                  <Tag color="green">Active</Tag>
                </div>
              </InfoCard>
            ))}
          </StyledSection>
        </Col>
      </Row>
    </div>
  );
}
