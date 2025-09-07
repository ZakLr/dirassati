"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card as AntCard,
  Col,
  Row,
  Statistic,
  Button,
  Select,
  Space,
  Tooltip,
  Tabs,
  Avatar,
  List,
  Progress,
  Badge,
  Tag,
} from "antd";
import {
  FilterOutlined,
  ZoomInOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
  UserOutlined,
  BookOutlined,
  TrophyOutlined,
  CalendarOutlined,
  BellOutlined,
  MessageOutlined,
  StarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import { Card as ShadcnCard } from "@/components/ui/card";
import styled from "styled-components";
import { GraduationCap } from "lucide-react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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

const StyledSubHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeroChart = styled(ShadcnCard)`
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 32px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border: 1px solid rgba(255, 255, 255, 0.8);
`;

const MetricCard = styled(AntCard)`
  border-radius: 16px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #ffffff 0%, #fafbff 100%);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }
`;

const ActivityCard = styled(ShadcnCard)`
  border-radius: 12px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }
`;

const MasonryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  grid-auto-rows: minmax(250px, auto);
  grid-auto-flow: dense;
`;

const MasonryItem = styled(ShadcnCard)`
  border-radius: 16px;
  padding: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }

  &:nth-child(odd) {
    grid-row: span 2;
  }
`;

const CircularCluster = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  position: relative;
`;

const CircularCard = styled(ShadcnCard)`
  border-radius: 50%;
  width: 380px;
  height: 380px;
  padding: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.8);
`;

const AnnouncementCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
`;

const QuickActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const QuickActionCard = styled.div`
  background: ${(props) =>
    props.gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  h3 {
    margin: 0 0 8px 0;
    font-size: 1.1rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState(
    searchParams.get("timeRange") || "monthly"
  );

  // Enhanced dummy data for admin dashboard
  const statsData = [
    {
      name: "Total Students",
      value: 1247,
      change: "+5.2%",
      color: "#667eea",
      info: "Total enrolled students this term",
      icon: <UserOutlined />,
    },
    {
      name: "Total Teachers",
      value: 89,
      change: "+2.1%",
      color: "#764ba2",
      info: "Active teaching staff",
      icon: <TrophyOutlined />,
    },
    {
      name: "Active Classes",
      value: 47,
      change: "+12%",
      color: "#f093fb",
      info: "Classes currently in session",
      icon: <BookOutlined />,
    },
    {
      name: "Average Attendance",
      value: 94.2,
      suffix: "%",
      color: "#4facfe",
      info: "School-wide attendance rate",
      icon: <CheckCircleOutlined />,
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "Staff Meeting Tomorrow",
      message: "All teachers required to attend at 8:00 AM in the main hall.",
      type: "important",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "New Curriculum Update",
      message:
        "Mathematics curriculum updated for grades 9-12. Training next week.",
      type: "info",
      date: "2024-01-10",
    },
    {
      id: 3,
      title: "Parent-Teacher Conference",
      message: "Scheduled for next Friday, 2:00 PM - 6:00 PM",
      type: "update",
      date: "2024-01-08",
    },
  ];

  const adminData = {
    name: "Dr. Sarah Mitchell",
    role: "School Administrator",
    avatar: "SM",
    experience: "12 years",
    department: "Administration",
    nextMeeting: "Staff Meeting - 9:00 AM",
  };

  const recentActivities = [
    {
      id: 1,
      type: "enrollment",
      title: "New student enrolled in Grade 10",
      time: "2 hours ago",
      icon: <UserOutlined />,
      color: "#52c41a",
    },
    {
      id: 2,
      type: "report",
      title: "Monthly attendance report generated",
      time: "4 hours ago",
      icon: <BookOutlined />,
      color: "#1890ff",
    },
    {
      id: 3,
      type: "meeting",
      title: "PTA meeting scheduled for next week",
      time: "1 day ago",
      icon: <CalendarOutlined />,
      color: "#fa8c16",
    },
    {
      id: 4,
      type: "update",
      title: "Curriculum update notification sent",
      time: "2 days ago",
      icon: <MessageOutlined />,
      color: "#722ed1",
    },
  ];

  const getAreaSeries = () => {
    switch (timeRange) {
      case "daily":
        return [
          { name: "Student Enrollment", data: [52, 55, 58, 61, 64, 67, 65] },
          { name: "Class Attendance", data: [92, 94, 93, 95, 96, 94, 97] },
        ];
      case "weekly":
        return [
          {
            name: "Student Enrollment",
            data: [320, 335, 348, 362, 378, 392, 385],
          },
          { name: "Class Attendance", data: [91, 93, 92, 94, 95, 93, 96] },
        ];
      default:
        return [
          {
            name: "Student Enrollment",
            data: [
              1150, 1180, 1210, 1240, 1270, 1300, 1280, 1310, 1290, 1320, 1340,
              1330,
            ],
          },
          {
            name: "Class Attendance",
            data: [90, 92, 91, 93, 94, 92, 95, 93, 96, 94, 97, 95],
          },
        ];
    }
  };

  const areaOptions = {
    chart: {
      id: "school-performance",
      toolbar: {
        show: true,
        tools: { download: true, zoom: true, pan: true, reset: true },
      },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
    },
    xaxis: {
      categories:
        timeRange === "daily"
          ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          : timeRange === "weekly"
          ? [
              "Week 1",
              "Week 2",
              "Week 3",
              "Week 4",
              "Week 5",
              "Week 6",
              "Week 7",
            ]
          : [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
    },
    colors: ["#667eea", "#764ba2"],
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 },
    },
    stroke: { curve: "smooth", width: 3 },
    dataLabels: { enabled: false },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val) =>
          `${val}${
            timeRange === "daily"
              ? ""
              : "% for attendance, " + val + " for enrollment"
          }`,
      },
    },
    grid: { borderColor: "#e8e8e8", strokeDashArray: 4 },
    legend: { position: "top", horizontalAlign: "left", fontSize: "14px" },
    markers: { size: 5, strokeWidth: 2, strokeColors: "#fff" },
  };
  const areaSeries = getAreaSeries();

  const barOptions = {
    chart: {
      id: "grade-distribution",
      toolbar: { show: true, tools: { download: true } },
      animations: { enabled: true },
    },
    xaxis: {
      categories: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"],
    },
    colors: ["#667eea"],
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "60%",
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: { fontSize: "12px", colors: ["#304758"] },
    },
    tooltip: { theme: "light", y: { formatter: (val) => `${val} students` } },
    grid: { borderColor: "#e8e8e8" },
  };
  const barSeries = [{ name: "Students", data: [320, 410, 380, 280] }];

  const donutOptions = {
    chart: {
      id: "attendance-breakdown",
      toolbar: { show: true, tools: { download: true } },
      animations: { enabled: true },
    },
    labels: ["Present", "Late", "Absent", "Excused"],
    colors: ["#52c41a", "#fa8c16", "#f5222d", "#1890ff"],
    dataLabels: { enabled: true, formatter: (val) => `${val.toFixed(1)}%` },
    legend: { position: "bottom", fontSize: "14px" },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: { show: true, total: { show: true, label: "Total Days" } },
        },
      },
    },
  };
  const donutSeries = [89.2, 7.3, 2.1, 1.4];

  const heatmapOptions = {
    chart: {
      id: "class-activity",
      toolbar: { show: true, tools: { download: true } },
      animations: { enabled: true },
    },
    dataLabels: { enabled: true, style: { colors: ["#fff"] } },
    colors: ["#667eea"],
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 3, color: "#e6f7ff" },
            { from: 4, to: 7, color: "#bae7ff" },
            { from: 8, to: 10, color: "#667eea" },
          ],
        },
      },
    },
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    yaxis: {
      categories: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"],
    },
    tooltip: { theme: "light", y: { formatter: (val) => `${val} classes` } },
  };
  const heatmapSeries = [
    { name: "8 AM", data: [2, 3, 4, 3, 2] },
    { name: "9 AM", data: [4, 5, 6, 5, 4] },
    { name: "10 AM", data: [6, 7, 8, 7, 6] },
    { name: "11 AM", data: [5, 6, 7, 6, 5] },
    { name: "12 PM", data: [3, 4, 5, 4, 3] },
    { name: "1 PM", data: [4, 5, 6, 5, 4] },
    { name: "2 PM", data: [2, 3, 4, 3, 2] },
  ];

  const polarOptions = {
    chart: {
      id: "school-performance",
      toolbar: { show: true, tools: { download: true } },
      animations: { enabled: true },
    },
    labels: [
      "Academic Excellence",
      "Student Satisfaction",
      "Teacher Performance",
      "Facility Maintenance",
      "Administrative Efficiency",
    ],
    colors: ["#667eea", "#764ba2", "#f093fb", "#4facfe", "#00f2fe"],
    fill: { opacity: 0.8 },
    stroke: { width: 2 },
    dataLabels: { enabled: true },
    tooltip: { theme: "light", y: { formatter: (val) => `${val}/100` } },
    legend: { position: "bottom" },
  };
  const polarSeries = [92, 88, 90, 85, 87];

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    router.push(`/admin?timeRange=${value}`);
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
          <StyledHeader>Admin Dashboard</StyledHeader>
          <p style={{ color: "#666", fontSize: "1.1rem", margin: 0 }}>
            Welcome back, {adminData.name}! Here's your school overview.
          </p>
        </Col>
        <Col>
          <Space size="middle">
            <Select
              value={timeRange}
              onChange={handleTimeRangeChange}
              options={[
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" },
              ]}
              style={{ width: 120 }}
            />
            <Button icon={<FilterOutlined />}>Filters</Button>
            <Button icon={<DownloadOutlined />}>Export Report</Button>
          </Space>
        </Col>
      </Row>

      {/* Quick Actions */}
      <QuickActionGrid>
        <QuickActionCard gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
          <UserOutlined style={{ fontSize: "24px", marginBottom: "8px" }} />
          <h3>Manage Students</h3>
          <p>Add, edit, or remove students</p>
        </QuickActionCard>
        <QuickActionCard gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
          <TrophyOutlined style={{ fontSize: "24px", marginBottom: "8px" }} />
          <h3>Staff Management</h3>
          <p>Manage teachers and staff</p>
        </QuickActionCard>
        <QuickActionCard gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
          <BookOutlined style={{ fontSize: "24px", marginBottom: "8px" }} />
          <h3>Generate Reports</h3>
          <p>Create detailed analytics</p>
        </QuickActionCard>
        <QuickActionCard gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
          <CalendarOutlined style={{ fontSize: "24px", marginBottom: "8px" }} />
          <h3>Schedule Events</h3>
          <p>Plan school activities</p>
        </QuickActionCard>
      </QuickActionGrid>

      {/* Key Metrics */}
      <StyledSection>
        <StyledSubHeader>
          <TrophyOutlined /> School Overview
          <Tooltip title="Key performance indicators for the school">
            <InfoCircleOutlined style={{ color: "#888" }} />
          </Tooltip>
        </StyledSubHeader>
        <Row gutter={[24, 24]}>
          {statsData.map((stat) => (
            <Col xs={24} sm={12} lg={6} key={stat.name}>
              <MetricCard hoverable>
                <Statistic
                  title={
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {stat.icon}
                      {stat.name}
                      <Tooltip title={stat.info}>
                        <InfoCircleOutlined
                          style={{ fontSize: "12px", color: "#888" }}
                        />
                      </Tooltip>
                    </span>
                  }
                  value={stat.value}
                  suffix={stat.suffix || stat.change}
                  valueStyle={{
                    color: stat.color,
                    fontSize: "32px",
                    fontWeight: 700,
                  }}
                />
              </MetricCard>
            </Col>
          ))}
        </Row>
      </StyledSection>

      {/* Announcements */}
      <StyledSection>
        <StyledSubHeader>
          <BellOutlined /> Important Announcements
        </StyledSubHeader>
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>
                {announcement.title}
              </h3>
              <Tag
                color={
                  announcement.type === "important"
                    ? "red"
                    : announcement.type === "info"
                    ? "blue"
                    : "green"
                }
              >
                {announcement.type}
              </Tag>
            </div>
            <p style={{ margin: 0, opacity: 0.9 }}>{announcement.message}</p>
            <small style={{ opacity: 0.7 }}>{announcement.date}</small>
          </AnnouncementCard>
        ))}
      </StyledSection>

      {/* Admin Profile */}
      <StyledSection>
        <StyledSubHeader>
          <UserOutlined /> Administrator Profile
        </StyledSubHeader>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <ActivityCard>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <Avatar
                  size={64}
                  style={{
                    background: "#667eea",
                    fontSize: "24px",
                    fontWeight: "600",
                  }}
                >
                  {adminData.avatar}
                </Avatar>
                <div style={{ marginLeft: "16px" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "1.3rem",
                      fontWeight: "600",
                    }}
                  >
                    {adminData.name}
                  </h3>
                  <p style={{ margin: "4px 0", color: "#666" }}>
                    {adminData.role}
                  </p>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <span style={{ fontSize: "0.9rem" }}>
                      <TrophyOutlined
                        style={{ color: "#fa8c16", marginRight: "4px" }}
                      />
                      {adminData.experience} Experience
                    </span>
                    <span style={{ fontSize: "0.9rem" }}>
                      <BookOutlined
                        style={{ color: "#667eea", marginRight: "4px" }}
                      />
                      {adminData.department}
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: "12px",
                  background: "#f8f9ff",
                  borderRadius: "8px",
                }}
              >
                <ClockCircleOutlined
                  style={{ color: "#667eea", marginRight: "8px" }}
                />
                <span style={{ fontWeight: "500" }}>
                  Next: {adminData.nextMeeting}
                </span>
              </div>
            </ActivityCard>
          </Col>
        </Row>
      </StyledSection>

      {/* Performance Trends */}
      <StyledSection>
        <StyledSubHeader>
          <TrophyOutlined /> School Performance Trends
          <Tooltip title="Track enrollment and attendance over time">
            <InfoCircleOutlined style={{ color: "#888" }} />
          </Tooltip>
        </StyledSubHeader>
        <HeroChart>
          <Chart
            options={areaOptions}
            series={areaSeries}
            type="area"
            height={450}
          />
        </HeroChart>
      </StyledSection>

      {/* Detailed Analytics */}
      <StyledSection>
        <StyledSubHeader>
          <BookOutlined /> Student Analytics
          <Tooltip title="Grade distribution and attendance analysis">
            <InfoCircleOutlined style={{ color: "#888" }} />
          </Tooltip>
        </StyledSubHeader>
        <MasonryGrid>
          <MasonryItem>
            <h3
              style={{
                fontSize: "1.3rem",
                marginBottom: "16px",
                color: "#333",
              }}
            >
              Grade Distribution
            </h3>
            <Chart
              options={barOptions}
              series={barSeries}
              type="bar"
              height={320}
            />
          </MasonryItem>
          <MasonryItem>
            <h3
              style={{
                fontSize: "1.3rem",
                marginBottom: "16px",
                color: "#333",
              }}
            >
              Attendance Breakdown
            </h3>
            <Chart
              options={donutOptions}
              series={donutSeries}
              type="donut"
              height={280}
            />
          </MasonryItem>
        </MasonryGrid>
      </StyledSection>

      {/* Recent Activities */}
      <StyledSection>
        <StyledSubHeader>
          <ClockCircleOutlined /> Recent Activities
        </StyledSubHeader>
        <ActivityCard>
          <List
            dataSource={recentActivities}
            renderItem={(item) => (
              <List.Item
                style={{ padding: "16px 0", borderBottom: "1px solid #f0f0f0" }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={item.icon}
                      style={{ background: item.color }}
                    />
                  }
                  title={
                    <span style={{ fontWeight: "500" }}>{item.title}</span>
                  }
                  description={
                    <span style={{ color: "#666", fontSize: "0.9rem" }}>
                      {item.time}
                    </span>
                  }
                />
              </List.Item>
            )}
          />
        </ActivityCard>
      </StyledSection>

      {/* Activity Heatmap and Performance */}
      <StyledSection>
        <StyledSubHeader>
          <StarOutlined /> Class Activity & School Performance
          <Tooltip title="Daily class activity and overall school performance">
            <InfoCircleOutlined style={{ color: "#888" }} />
          </Tooltip>
        </StyledSubHeader>
        <CircularCluster>
          <CircularCard>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ marginBottom: "16px", color: "#333" }}>
                Class Activity Heatmap
              </h3>
              <Chart
                options={heatmapOptions}
                series={heatmapSeries}
                type="heatmap"
                height={280}
                width={280}
              />
            </div>
          </CircularCard>
          <CircularCard>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ marginBottom: "16px", color: "#333" }}>
                School Performance
              </h3>
              <Chart
                options={polarOptions}
                series={polarSeries}
                type="polarArea"
                height={280}
                width={280}
              />
            </div>
          </CircularCard>
        </CircularCluster>
      </StyledSection>
    </div>
  );
}
