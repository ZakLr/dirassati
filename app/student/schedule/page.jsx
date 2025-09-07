"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import apiCall from "../../../components/utils/apiCall";
import {
  Calendar,
  Card,
  Select,
  Spin,
  Alert,
  message,
  Tag,
  Row,
  Col,
} from "antd";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
  FilterOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { GraduationCap } from "lucide-react";

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

const ScheduleCard = styled(Card)`
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

const LessonCard = styled.div`
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);

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

export default function Schedule() {
  const userId = useSelector((state) => state.auth.userId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);

  // Dummy data for schedule
  const dummySchedule = [
    {
      id: 1,
      date: "2024-09-16",
      subject: "Mathematics",
      module: "Algebra",
      start_time: "08:00:00",
      end_time: "09:30:00",
      room: "Room 101",
      teacher_name: "Ms. Sarah Johnson",
      type: "lecture",
    },
    {
      id: 2,
      date: "2024-09-16",
      subject: "English",
      module: "Literature",
      start_time: "10:00:00",
      end_time: "11:30:00",
      room: "Room 203",
      teacher_name: "Mr. David Wilson",
      type: "lecture",
    },
    {
      id: 3,
      date: "2024-09-16",
      subject: "Science",
      module: "Physics",
      start_time: "13:00:00",
      end_time: "14:30:00",
      room: "Lab 1",
      teacher_name: "Dr. Maria Garcia",
      type: "lab",
    },
    {
      id: 4,
      date: "2024-09-17",
      subject: "History",
      module: "World History",
      start_time: "09:00:00",
      end_time: "10:30:00",
      room: "Room 105",
      teacher_name: "Mr. Ahmed Hassan",
      type: "lecture",
    },
    {
      id: 5,
      date: "2024-09-17",
      subject: "Art",
      module: "Drawing",
      start_time: "11:00:00",
      end_time: "12:30:00",
      room: "Art Studio",
      teacher_name: "Ms. Leila Tazi",
      type: "practical",
    },
    {
      id: 6,
      date: "2024-09-18",
      subject: "Physical Education",
      module: "Sports",
      start_time: "08:00:00",
      end_time: "09:30:00",
      room: "Gym",
      teacher_name: "Mr. Omar Alaoui",
      type: "practical",
    },
    {
      id: 7,
      date: "2024-09-18",
      subject: "Mathematics",
      module: "Geometry",
      start_time: "10:00:00",
      end_time: "11:30:00",
      room: "Room 101",
      teacher_name: "Ms. Sarah Johnson",
      type: "lecture",
    },
    {
      id: 8,
      date: "2024-09-19",
      subject: "Computer Science",
      module: "Programming",
      start_time: "13:00:00",
      end_time: "14:30:00",
      room: "Computer Lab",
      teacher_name: "Mr. Karim El Fassi",
      type: "lab",
    },
  ];

  // Dummy data for groups
  const dummyGroups = [
    { id: 1, name: "Group A" },
    { id: 2, name: "Group B" },
    { id: 3, name: "Group C" },
  ];

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setLoading(true);

        // Try to fetch real data first
        const studentResponse = await apiCall("get", `/api/students/${userId}`);
        const studentGroup = studentResponse.group_id;
        setSelectedGroup(studentGroup);

        const groupsResponse = await apiCall(
          "get",
          `/api/levels/${studentResponse.level_id}/groups`
        );
        setGroups(groupsResponse);

        const scheduleResponse = await apiCall(
          "get",
          `/api/groups/${studentGroup}/schedule`
        );
        setSchedule(scheduleResponse);

        setLoading(false);
      } catch (err) {
        // Use dummy data as fallback
        message.warning("Failed to load schedule - Using demo data");
        setSelectedGroup(1);
        setGroups(dummyGroups);
        setSchedule(dummySchedule);
        setLoading(false);
      }
    };

    if (userId) {
      fetchScheduleData();
    } else {
      // Use dummy data when no user
      setSelectedGroup(1);
      setGroups(dummyGroups);
      setSchedule(dummySchedule);
      setLoading(false);
    }
  }, [userId]);

  const handleGroupChange = async (groupId) => {
    try {
      setLoading(true);
      setSelectedGroup(groupId);
      const response = await apiCall("get", `/api/groups/${groupId}/schedule`);
      setSchedule(response);
      setLoading(false);
    } catch (err) {
      // Use dummy data as fallback
      message.warning(
        "Failed to load schedule for selected group - Using demo data"
      );
      setSchedule(dummySchedule);
      setLoading(false);
    }
  };

  // Calculate schedule statistics
  const getScheduleStats = () => {
    const today = new Date();
    const thisWeek = schedule.filter((lesson) => {
      const lessonDate = new Date(lesson.date);
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return lessonDate >= weekStart && lessonDate <= weekEnd;
    });

    const uniqueSubjects = [
      ...new Set(schedule.map((lesson) => lesson.subject)),
    ];
    const totalHours = schedule.reduce((total, lesson) => {
      const start = new Date(`2000-01-01T${lesson.start_time}`);
      const end = new Date(`2000-01-01T${lesson.end_time}`);
      return total + (end - start) / (1000 * 60 * 60);
    }, 0);

    return {
      thisWeek: thisWeek.length,
      totalSubjects: uniqueSubjects.length,
      totalHours: Math.round(totalHours * 10) / 10,
    };
  };

  const stats = getScheduleStats();

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

  if (error) {
    return (
      <div
        style={{
          padding: "24px",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
        }}
      >
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  const dateCellRender = (date) => {
    const daySchedule = schedule.filter((lesson) => {
      const lessonDate = new Date(lesson.date);

      return lessonDate.toDateString() === date.toDate().toDateString();
    });

    return (
      <div className="events">
        {daySchedule.map((lesson, index) => (
          <LessonCard key={index}>
            <div className="flex items-center justify-between">
              <div>
                <h4
                  className="font-semibold text-lg"
                  style={{ color: "#667eea" }}
                >
                  {lesson.subject}
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  <ClockCircleOutlined className="mr-1" />
                  {new Date(
                    `2000-01-01T${lesson.start_time}`
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(`2000-01-01T${lesson.end_time}`).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
                <p className="text-sm text-gray-600">
                  <UserOutlined className="mr-1" />
                  {lesson.teacher_name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  <EnvironmentOutlined className="mr-1" />
                  {lesson.room}
                </p>
                <Tag
                  color={
                    lesson.type === "lecture"
                      ? "blue"
                      : lesson.type === "lab"
                      ? "green"
                      : "orange"
                  }
                  style={{ marginTop: "4px" }}
                >
                  {lesson.module}
                </Tag>
              </div>
            </div>
          </LessonCard>
        ))}
      </div>
    );
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
          <StyledHeader>Student Schedule</StyledHeader>
          <p style={{ color: "#666", fontSize: "1.1rem", margin: 0 }}>
            View your class schedule and manage your time effectively.
          </p>
        </Col>
        <Col>
          <HeaderActions>
            <Select
              value={selectedGroup}
              onChange={handleGroupChange}
              style={{ width: 200 }}
              options={groups.map((group) => ({
                value: group.id,
                label: group.name,
              }))}
            />
            <Select
              defaultValue="month"
              style={{ width: 120 }}
              options={[
                { value: "month", label: "Monthly" },
                { value: "week", label: "Weekly" },
              ]}
            />
            <DownloadOutlined
              style={{
                fontSize: "20px",
                color: "#667eea",
                cursor: "pointer",
              }}
              onClick={() => message.info("Export feature coming soon!")}
            />
          </HeaderActions>
        </Col>
      </Row>

      {/* Quick Stats */}
      <QuickStats>
        <StatCard>
          <h3>{stats.thisWeek}</h3>
          <p>Classes This Week</p>
        </StatCard>
        <StatCard>
          <h3>{stats.totalSubjects}</h3>
          <p>Subjects</p>
        </StatCard>
        <StatCard>
          <h3>{stats.totalHours}h</h3>
          <p>Weekly Hours</p>
        </StatCard>
      </QuickStats>

      {/* Schedule Calendar */}
      <StyledSection>
        <StyledSubHeader>
          <ClockCircleOutlined /> Class Schedule
        </StyledSubHeader>
        <ScheduleCard>
          <Calendar
            cellRender={dateCellRender}
            mode="month"
            style={{ width: "100%" }}
          />
        </ScheduleCard>
      </StyledSection>
    </div>
  );
}
