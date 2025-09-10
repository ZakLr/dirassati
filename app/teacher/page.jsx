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

  // Enhanced dummy data for teacher dashboard
  const statsData = [
    {
      name: "My Students",
      value: 145,
      change: "+8.2%",
      color: "#667eea",
      info: "Students in your classes",
      icon: <UserOutlined />,
    },
    {
      name: "Classes Today",
      value: 4,
      change: "Same",
      color: "#764ba2",
      info: "Active classes scheduled",
      icon: <BookOutlined />,
    },
    {
      name: "Assignments Due",
      value: 12,
      change: "+3",
      color: "#f093fb",
      info: "Pending assignments to grade",
      icon: <TrophyOutlined />,
    },
    {
      name: "Class Average",
      value: 87.5,
      suffix: "%",
      color: "#4facfe",
      info: "Overall class performance",
      icon: <CheckCircleOutlined />,
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "Mid-term Exams Next Week",
      message:
        "السنة الأولى ثانوي Mathematics and Science exams scheduled for Monday and Wednesday.",
      type: "important",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      message:
        "Individual meetings scheduled for next Friday. Please prepare student reports.",
      type: "info",
      date: "2024-01-10",
    },
    {
      id: 3,
      title: "New Curriculum Materials",
      message:
        "Updated textbooks and digital resources available in the library.",
      type: "update",
      date: "2024-01-08",
    },
  ];

  const teacherData = {
    name: "Ms. Sarah Johnson",
    role: "Mathematics Teacher",
    avatar: "SJ",
    experience: "8 years",
    department: "Mathematics",
    nextClass: "السنة الأولى ثانوي Math - 10:00 AM",
  };

  const recentActivities = [
    {
      id: 1,
      type: "grade",
      title: "Graded Algebra assignment for السنة التاسعة متوسط",
      time: "2 hours ago",
      icon: <TrophyOutlined />,
      color: "#52c41a",
    },
    {
      id: 2,
      type: "attendance",
      title: "Marked attendance for Calculus class",
      time: "4 hours ago",
      icon: <CheckCircleOutlined />,
      color: "#1890ff",
    },
    {
      id: 3,
      type: "assignment",
      title: "Posted new homework assignment",
      time: "1 day ago",
      icon: <BookOutlined />,
      color: "#fa8c16",
    },
    {
      id: 4,
      type: "meeting",
      title: "Attended faculty meeting",
      time: "2 days ago",
      icon: <CalendarOutlined />,
      color: "#722ed1",
    },
  ];

  const getAreaSeries = () => {
    switch (timeRange) {
      case "daily":
        return [
          { name: "Class Performance", data: [85, 87, 86, 89, 88, 90, 87] },
          { name: "Attendance Rate", data: [92, 94, 93, 95, 96, 94, 97] },
        ];
      case "weekly":
        return [
          { name: "Class Performance", data: [84, 86, 85, 88, 87, 89, 86] },
          { name: "Attendance Rate", data: [91, 93, 92, 94, 95, 93, 96] },
        ];
      default:
        return [
          {
            name: "Class Performance",
            data: [82, 84, 83, 86, 85, 87, 84, 86, 85, 88, 87, 89],
          },
          {
            name: "Attendance Rate",
            data: [90, 92, 91, 93, 94, 92, 95, 93, 96, 94, 97, 95],
          },
        ];
    }
  };

  const areaOptions = {
    chart: {
      id: "class-performance",
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
              : "% for attendance, " + val + " for performance"
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
      id: "subject-performance",
      toolbar: { show: true, tools: { download: true } },
      animations: { enabled: true },
    },
    xaxis: {
      categories: [
        "Algebra",
        "Geometry",
        "Calculus",
        "Statistics",
        "Trigonometry",
      ],
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
    tooltip: { theme: "light", y: { formatter: (val) => `${val}% average` } },
    grid: { borderColor: "#e8e8e8" },
  };
  const barSeries = [{ name: "Average Grade", data: [88, 85, 92, 87, 89] }];

  const donutOptions = {
    chart: {
      id: "assignment-status",
      toolbar: { show: true, tools: { download: true } },
      animations: { enabled: true },
    },
    labels: ["Graded", "Pending", "Overdue", "Submitted"],
    colors: ["#52c41a", "#fa8c16", "#f5222d", "#1890ff"],
    dataLabels: { enabled: true, formatter: (val) => `${val.toFixed(1)}%` },
    legend: { position: "bottom", fontSize: "14px" },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: { show: true, label: "Total Assignments" },
          },
        },
      },
    },
  };
  const donutSeries = [65.2, 24.3, 5.1, 5.4];

  const heatmapOptions = {
    chart: {
      id: "class-engagement",
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
    tooltip: { theme: "light", y: { formatter: (val) => `${val} students` } },
  };
  const heatmapSeries = [
    { name: "8 AM", data: [8, 9, 10, 9, 8] },
    { name: "9 AM", data: [12, 13, 14, 13, 12] },
    { name: "10 AM", data: [15, 16, 17, 16, 15] },
    { name: "11 AM", data: [13, 14, 15, 14, 13] },
    { name: "12 PM", data: [10, 11, 12, 11, 10] },
    { name: "1 PM", data: [12, 13, 14, 13, 12] },
    { name: "2 PM", data: [8, 9, 10, 9, 8] },
  ];

  const polarOptions = {
    chart: {
      id: "teaching-metrics",
      toolbar: { show: true, tools: { download: true } },
      animations: { enabled: true },
    },
    labels: [
      "Student Engagement",
      "Assignment Completion",
      "Class Participation",
      "Test Performance",
      "Homework Submission",
    ],
    colors: ["#667eea", "#764ba2", "#f093fb", "#4facfe", "#00f2fe"],
    fill: { opacity: 0.8 },
    stroke: { width: 2 },
    dataLabels: { enabled: true },
    tooltip: { theme: "light", y: { formatter: (val) => `${val}/100` } },
    legend: { position: "bottom" },
  };
  const polarSeries = [88, 82, 90, 85, 87];

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    router.push(`/teacher?timeRange=${value}`);
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
          <StyledHeader>Teacher Dashboard</StyledHeader>
          <p style={{ color: "#666", fontSize: "1.1rem", margin: 0 }}>
            Welcome back, {teacherData.name}! Here's your teaching overview.
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
          <TrophyOutlined style={{ fontSize: "24px", marginBottom: "8px" }} />
          <h3>Grade Assignments</h3>
          <p>Review and grade student work</p>
        </QuickActionCard>
        <QuickActionCard gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
          <BookOutlined style={{ fontSize: "24px", marginBottom: "8px" }} />
          <h3>Class Management</h3>
          <p>Manage your classes and students</p>
        </QuickActionCard>
        <QuickActionCard gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
          <UserOutlined style={{ fontSize: "24px", marginBottom: "8px" }} />
          <h3>Student Progress</h3>
          <p>Track individual student performance</p>
        </QuickActionCard>
        <QuickActionCard gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
          <CalendarOutlined style={{ fontSize: "24px", marginBottom: "8px" }} />
          <h3>Schedule Classes</h3>
          <p>Plan and organize your lessons</p>
        </QuickActionCard>
      </QuickActionGrid>

      {/* Key Metrics */}
      <StyledSection>
        <StyledSubHeader>
          <TrophyOutlined /> Teaching Overview
          <Tooltip title="Key performance indicators for your classes">
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

      {/* Teacher Profile */}
      <StyledSection>
        <StyledSubHeader>
          <UserOutlined /> Teacher Profile
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
                  {teacherData.avatar}
                </Avatar>
                <div style={{ marginLeft: "16px" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "1.3rem",
                      fontWeight: "600",
                    }}
                  >
                    {teacherData.name}
                  </h3>
                  <p style={{ margin: "4px 0", color: "#666" }}>
                    {teacherData.role}
                  </p>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <span style={{ fontSize: "0.9rem" }}>
                      <TrophyOutlined
                        style={{ color: "#fa8c16", marginRight: "4px" }}
                      />
                      {teacherData.experience} Experience
                    </span>
                    <span style={{ fontSize: "0.9rem" }}>
                      <BookOutlined
                        style={{ color: "#667eea", marginRight: "4px" }}
                      />
                      {teacherData.department}
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
                  Next: {teacherData.nextClass}
                </span>
              </div>
            </ActivityCard>
          </Col>
        </Row>
      </StyledSection>

      {/* Performance Trends */}
      <StyledSection>
        <StyledSubHeader>
          <TrophyOutlined /> Class Performance Trends
          <Tooltip title="Track class performance and attendance over time">
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
          <BookOutlined /> Subject Analytics
          <Tooltip title="Subject performance and assignment analysis">
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
              Subject Performance
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
              Assignment Status
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

      {/* Class Engagement and Teaching Metrics */}
      <StyledSection>
        <StyledSubHeader>
          <StarOutlined /> Class Engagement & Teaching Metrics
          <Tooltip title="Daily class engagement and teaching performance">
            <InfoCircleOutlined style={{ color: "#888" }} />
          </Tooltip>
        </StyledSubHeader>
        <CircularCluster>
          <CircularCard>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ marginBottom: "16px", color: "#333" }}>
                Class Engagement Heatmap
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
                Teaching Metrics
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
