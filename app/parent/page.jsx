"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile } from "../redux/features/userinfoSlice";
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
  MenuOutlined,
  HomeOutlined,
  BarChartOutlined,
  SettingOutlined,
  TeamOutlined,
  ScheduleOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import { Card as ShadcnCard } from "@/components/ui/card";
import styled from "styled-components";
import { GraduationCap, Menu, X } from "lucide-react";

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

  @media (max-width: 767px) {
    font-size: 2rem;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
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

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 16px;
    grid-auto-rows: minmax(300px, auto);
  }
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

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
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

  @media (max-width: 767px) {
    width: 280px;
    height: 280px;
    padding: 16px;
  }

  @media (max-width: 480px) {
    width: 250px;
    height: 250px;
    padding: 12px;
  }
`;

const AnnouncementCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
    transform: translateY(-2px);
  }

  @media (max-width: 767px) {
    padding: 16px;
    margin-bottom: 12px;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px;
  z-index: 1000;
  transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    width: 280px;
    max-width: 80vw;
    transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
  }

  @media (max-width: 480px) {
    width: 260px;
    max-width: 85vw;
  }
`;

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MainContent = styled.div`
  margin-left: ${(props) => (props.sidebarOpen ? "280px" : "0")};
  transition: margin-left 0.3s ease;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const SidebarMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.2)" : "transparent"};
  min-height: 48px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(4px);
  }

  &:active {
    background: rgba(255, 255, 255, 0.3);
  }

  span {
    font-size: 16px;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    padding: 16px 18px;
    min-height: 52px;
  }
`;

const MobileHeader = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 12px 16px;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const MobileMenuButton = styled(Button)`
  @media (min-width: 769px) {
    display: none !important;
  }

  &:hover {
    background: #5a67d8 !important;
    transform: scale(1.05);
  }

  transition: all 0.2s ease;
`;

const QuickActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 767px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
    margin-bottom: 24px;
  }
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  // Enhanced dummy data for portfolio showcase
  const statsData = [
    {
      name: "My Children",
      value: 2,
      change: "+1 this year",
      color: "#667eea",
      info: "Children enrolled in the school",
      icon: <UserOutlined />,
    },
    {
      name: "Average Grade",
      value: 92.5,
      suffix: "%",
      color: "#764ba2",
      info: "Combined average across all subjects",
      icon: <TrophyOutlined />,
    },
    {
      name: "Attendance Rate",
      value: 96.8,
      suffix: "%",
      color: "#f093fb",
      info: "Overall attendance this term",
      icon: <CheckCircleOutlined />,
    },
    {
      name: "Upcoming Events",
      value: 5,
      change: "This week",
      color: "#4facfe",
      info: "School events and activities",
      icon: <CalendarOutlined />,
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "Parent-Teacher Conference",
      message: "Scheduled for next Friday, 2:00 PM - 6:00 PM",
      type: "important",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "School Holiday Notice",
      message: "Winter break starts December 20th and ends January 5th",
      type: "info",
      date: "2024-01-10",
    },
    {
      id: 3,
      title: "New Online Portal Features",
      message: "Check out the new messaging system and grade tracking features",
      type: "update",
      date: "2024-01-08",
    },
  ];

  const childrenData = [
    {
      name: "Sarah Johnson",
      grade: "10th Grade",
      avatar: "SJ",
      attendance: 98,
      averageGrade: 94.2,
      subjects: ["Math A", "English A+", "Science A", "History B+"],
      nextClass: "Mathematics - 2:00 PM",
    },
    {
      name: "Michael Johnson",
      grade: "7th Grade",
      avatar: "MJ",
      attendance: 95,
      averageGrade: 90.8,
      subjects: ["Math B+", "English A", "Science B", "Art A"],
      nextClass: "Science Lab - 10:30 AM",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "grade",
      title: "Sarah received A+ in Mathematics",
      time: "2 hours ago",
      icon: <TrophyOutlined />,
      color: "#52c41a",
    },
    {
      id: 2,
      type: "attendance",
      title: "Michael marked present for Science class",
      time: "4 hours ago",
      icon: <CheckCircleOutlined />,
      color: "#1890ff",
    },
    {
      id: 3,
      type: "message",
      title: "New message from Teacher Johnson",
      time: "1 day ago",
      icon: <MessageOutlined />,
      color: "#fa8c16",
    },
    {
      id: 4,
      type: "event",
      title: "School play rehearsal scheduled",
      time: "2 days ago",
      icon: <CalendarOutlined />,
      color: "#722ed1",
    },
  ];

  const getAreaSeries = () => {
    switch (timeRange) {
      case "daily":
        return [
          { name: "Sarah's Performance", data: [88, 92, 90, 94, 96, 93, 95] },
          { name: "Michael's Performance", data: [85, 87, 89, 88, 91, 90, 92] },
          { name: "Class Average", data: [82, 84, 86, 85, 87, 89, 88] },
        ];
      case "weekly":
        return [
          { name: "Sarah's Performance", data: [89, 91, 93, 92, 94, 96, 95] },
          { name: "Michael's Performance", data: [86, 88, 87, 90, 89, 91, 93] },
          { name: "Class Average", data: [83, 85, 84, 86, 88, 87, 89] },
        ];
      default:
        return [
          {
            name: "Sarah's Performance",
            data: [85, 87, 89, 91, 93, 90, 92, 94, 96, 95, 97, 94],
          },
          {
            name: "Michael's Performance",
            data: [82, 84, 86, 85, 87, 89, 88, 90, 92, 91, 93, 90],
          },
          {
            name: "Class Average",
            data: [80, 82, 81, 83, 85, 84, 86, 88, 87, 89, 87, 88],
          },
        ];
    }
  };

  const areaOptions = {
    chart: {
      id: "performance-trends",
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
    colors: ["#667eea", "#764ba2", "#f093fb"],
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 },
    },
    stroke: { curve: "smooth", width: 3 },
    dataLabels: { enabled: false },
    tooltip: { theme: "light", y: { formatter: (val) => `${val}%` } },
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
      categories: ["Mathematics", "English", "Science", "History", "Art", "PE"],
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
    tooltip: { theme: "light", y: { formatter: (val) => `${val}%` } },
    grid: { borderColor: "#e8e8e8" },
  };
  const barSeries = [{ name: "Average Grade", data: [94, 92, 89, 91, 96, 88] }];

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
      id: "weekly-activity",
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
    tooltip: { theme: "light", y: { formatter: (val) => `${val} activities` } },
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
      id: "subject-satisfaction",
      toolbar: { show: true, tools: { download: true } },
      animations: { enabled: true },
    },
    labels: [
      "Teaching Quality",
      "Resources",
      "Communication",
      "Facilities",
      "Activities",
    ],
    colors: ["#667eea", "#764ba2", "#f093fb", "#4facfe", "#00f2fe"],
    fill: { opacity: 0.8 },
    stroke: { width: 2 },
    dataLabels: { enabled: true },
    tooltip: { theme: "light", y: { formatter: (val) => `${val}/5` } },
    legend: { position: "bottom" },
  };
  const polarSeries = [4.8, 4.6, 4.4, 4.2, 4.7];

  // Sidebar menu items
  const sidebarMenuItems = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
      path: "/parent",
    },
    {
      key: "sons",
      icon: <TeamOutlined />,
      label: "My Children",
      path: "/parent/sons",
    },
    {
      key: "schedule",
      icon: <ScheduleOutlined />,
      label: "Schedule",
      path: "/parent/schedule",
    },
    {
      key: "chat",
      icon: <MessageOutlined />,
      label: "Messages",
      path: "/parent/chat",
    },
    {
      key: "payments",
      icon: <BookOutlined />,
      label: "Payments",
      path: "/parent/payments",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      path: "/parent/parentProfile/1",
    },
    {
      key: "reports",
      icon: <BarChartOutlined />,
      label: "Reports",
      path: "/parent/reports",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      path: "/parent/settings",
    },
  ];

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    router.push(`/parent?timeRange=${value}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuClick = (item) => {
    setActiveMenuItem(item.key);
    setSidebarOpen(false); // Close sidebar on mobile after clicking
    // You can add navigation logic here
    // router.push(item.path);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    // Initial check on mount
    if (typeof window !== "undefined") {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 769) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Mobile Header */}
      <MobileHeader>
        <MobileMenuButton
          type="primary"
          icon={<MenuOutlined />}
          onClick={toggleSidebar}
          style={{
            fontSize: "16px",
            background: "#667eea",
            border: "none",
            borderRadius: "8px",
            padding: "8px 12px",
          }}
        >
          Menu
        </MobileMenuButton>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <GraduationCap size={20} color="#667eea" />
          <span style={{ fontSize: "18px", fontWeight: "600", color: "#333" }}>
            Dirassati
          </span>
        </div>
        <div style={{ width: "80px" }} /> {/* Spacer for centering */}
      </MobileHeader>

      {/* Sidebar Overlay for Mobile */}
      <SidebarOverlay
        isOpen={sidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen}>
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <GraduationCap size={24} color="#ffffff" />
              <span style={{ fontSize: "20px", fontWeight: "700" }}>
                Dirassati
              </span>
            </div>
            <Button
              type="text"
              icon={<X size={20} />}
              onClick={() => setSidebarOpen(false)}
              style={{
                color: "white",
                border: "none",
                background: "transparent",
                display: window.innerWidth < 769 ? "block" : "none",
              }}
            />
          </div>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "14px",
              margin: 0,
            }}
          >
            Parent Portal
          </p>
        </div>

        <div>
          {sidebarMenuItems.map((item) => (
            <SidebarMenuItem
              key={item.key}
              active={activeMenuItem === item.key}
              onClick={() => handleMenuClick(item)}
            >
              {item.icon}
              <span>{item.label}</span>
            </SidebarMenuItem>
          ))}
        </div>

        <div style={{ marginTop: "auto", paddingTop: "32px" }}>
          <SidebarMenuItem onClick={() => console.log("Logout")}>
            <LogoutOutlined />
            <span>Logout</span>
          </SidebarMenuItem>
        </div>
      </Sidebar>

      {/* Main Content */}
      <MainContent sidebarOpen={sidebarOpen}>
        <div
          style={{
            padding: window.innerWidth < 768 ? "16px" : "24px",
            paddingTop: window.innerWidth < 768 ? "80px" : "24px", // Account for mobile header
            transition: "padding-left 0.3s ease",
          }}
        >
          {/* Header Section */}
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: window.innerWidth < 768 ? 24 : 32 }}
          >
            <Col xs={24} lg={16}>
              <ElegantLogo>
                <LogoIcon>
                  <GraduationCap
                    size={window.innerWidth < 768 ? 20 : 24}
                    color="#ffffff"
                  />
                </LogoIcon>
                <LogoText>Dirassati</LogoText>
              </ElegantLogo>
              <StyledHeader>Parent Dashboard</StyledHeader>
              <p
                style={{
                  color: "#666",
                  fontSize: window.innerWidth < 768 ? "1rem" : "1.1rem",
                  margin: 0,
                }}
              >
                Welcome back! Here's what's happening with your children.
              </p>
            </Col>
            <Col xs={24} lg={8}>
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    window.innerWidth < 768 ? "center" : "flex-end",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <Select
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                  options={[
                    { value: "daily", label: "Daily" },
                    { value: "weekly", label: "Weekly" },
                    { value: "monthly", label: "Monthly" },
                  ]}
                  style={{ width: window.innerWidth < 768 ? "100%" : 120 }}
                />
                <Button
                  icon={<FilterOutlined />}
                  style={{ flex: window.innerWidth < 768 ? 1 : "none" }}
                >
                  Filters
                </Button>
                <Button
                  icon={<DownloadOutlined />}
                  style={{ flex: window.innerWidth < 768 ? 1 : "none" }}
                >
                  Export Report
                </Button>
              </div>
            </Col>
          </Row>

          {/* Quick Actions */}
          <QuickActionGrid>
            <QuickActionCard gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
              <MessageOutlined
                style={{ fontSize: "24px", marginBottom: "8px" }}
              />
              <h3>Send Message</h3>
              <p>Contact teachers instantly</p>
            </QuickActionCard>
            <QuickActionCard gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
              <CalendarOutlined
                style={{ fontSize: "24px", marginBottom: "8px" }}
              />
              <h3>Schedule Meeting</h3>
              <p>Book parent-teacher conference</p>
            </QuickActionCard>
            <QuickActionCard gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
              <BookOutlined style={{ fontSize: "24px", marginBottom: "8px" }} />
              <h3>View Assignments</h3>
              <p>Check homework and projects</p>
            </QuickActionCard>
            <QuickActionCard gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
              <TrophyOutlined
                style={{ fontSize: "24px", marginBottom: "8px" }}
              />
              <h3>View Report Card</h3>
              <p>Latest grades and progress</p>
            </QuickActionCard>
          </QuickActionGrid>

          {/* Key Metrics */}
          <StyledSection>
            <StyledSubHeader>
              <TrophyOutlined /> Key Metrics
              <Tooltip title="Important performance indicators for your children">
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
                  <h3
                    style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}
                  >
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
                <p style={{ margin: 0, opacity: 0.9 }}>
                  {announcement.message}
                </p>
                <small style={{ opacity: 0.7 }}>{announcement.date}</small>
              </AnnouncementCard>
            ))}
          </StyledSection>

          {/* Children Overview */}
          <StyledSection>
            <StyledSubHeader>
              <UserOutlined /> My Children
            </StyledSubHeader>
            <Row gutter={[24, 24]}>
              {childrenData.map((child) => (
                <Col xs={24} lg={12} key={child.name}>
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
                        {child.avatar}
                      </Avatar>
                      <div style={{ marginLeft: "16px" }}>
                        <h3
                          style={{
                            margin: 0,
                            fontSize: "1.3rem",
                            fontWeight: "600",
                          }}
                        >
                          {child.name}
                        </h3>
                        <p style={{ margin: "4px 0", color: "#666" }}>
                          {child.grade}
                        </p>
                        <div style={{ display: "flex", gap: "16px" }}>
                          <span style={{ fontSize: "0.9rem" }}>
                            <CheckCircleOutlined
                              style={{ color: "#52c41a", marginRight: "4px" }}
                            />
                            {child.attendance}% Attendance
                          </span>
                          <span style={{ fontSize: "0.9rem" }}>
                            <TrophyOutlined
                              style={{ color: "#fa8c16", marginRight: "4px" }}
                            />
                            {child.averageGrade}% Average
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginBottom: "16px" }}>
                      <h4 style={{ marginBottom: "8px" }}>Current Subjects:</h4>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                        }}
                      >
                        {child.subjects.map((subject) => (
                          <Tag key={subject} color="blue">
                            {subject}
                          </Tag>
                        ))}
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
                        Next: {child.nextClass}
                      </span>
                    </div>
                  </ActivityCard>
                </Col>
              ))}
            </Row>
          </StyledSection>

          {/* Performance Trends */}
          <StyledSection>
            <StyledSubHeader>
              <TrophyOutlined /> Academic Performance Trends
              <Tooltip title="Track your children's academic progress over time">
                <InfoCircleOutlined style={{ color: "#888" }} />
              </Tooltip>
            </StyledSubHeader>
            <HeroChart>
              <Chart
                options={areaOptions}
                series={areaSeries}
                type="area"
                height={window.innerWidth < 768 ? 350 : 450}
              />
            </HeroChart>
          </StyledSection>

          {/* Detailed Analytics */}
          <StyledSection>
            <StyledSubHeader>
              <BookOutlined /> Detailed Analytics
              <Tooltip title="In-depth analysis of academic performance and attendance">
                <InfoCircleOutlined style={{ color: "#888" }} />
              </Tooltip>
            </StyledSubHeader>
            <MasonryGrid>
              <MasonryItem>
                <h3
                  style={{
                    fontSize: window.innerWidth < 768 ? "1.1rem" : "1.3rem",
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
                  height={window.innerWidth < 768 ? 280 : 320}
                />
              </MasonryItem>
              <MasonryItem>
                <h3
                  style={{
                    fontSize: window.innerWidth < 768 ? "1.1rem" : "1.3rem",
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
                  height={window.innerWidth < 768 ? 240 : 280}
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
                    style={{
                      padding: "16px 0",
                      borderBottom: "1px solid #f0f0f0",
                    }}
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

          {/* Activity Heatmap and Satisfaction */}
          <StyledSection>
            <StyledSubHeader>
              <StarOutlined /> Activity & Satisfaction
              <Tooltip title="Weekly activity patterns and satisfaction ratings">
                <InfoCircleOutlined style={{ color: "#888" }} />
              </Tooltip>
            </StyledSubHeader>
            <CircularCluster>
              <CircularCard>
                <div style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      marginBottom: "16px",
                      color: "#333",
                      fontSize: window.innerWidth < 768 ? "1.1rem" : "1.3rem",
                    }}
                  >
                    Weekly Activity Heatmap
                  </h3>
                  <Chart
                    options={heatmapOptions}
                    series={heatmapSeries}
                    type="heatmap"
                    height={window.innerWidth < 768 ? 240 : 280}
                    width={window.innerWidth < 768 ? 240 : 280}
                  />
                </div>
              </CircularCard>
              <CircularCard>
                <div style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      marginBottom: "16px",
                      color: "#333",
                      fontSize: window.innerWidth < 768 ? "1.1rem" : "1.3rem",
                    }}
                  >
                    School Satisfaction
                  </h3>
                  <Chart
                    options={polarOptions}
                    series={polarSeries}
                    type="polarArea"
                    height={window.innerWidth < 768 ? 240 : 280}
                    width={window.innerWidth < 768 ? 240 : 280}
                  />
                </div>
              </CircularCard>
            </CircularCluster>
          </StyledSection>
        </div>
      </MainContent>
    </div>
  );
}
