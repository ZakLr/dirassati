"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Clock,
  Users,
  BookOpen,
  Plus,
  Eye,
  Edit,
  GraduationCap,
  Loader2,
  AlertCircle,
  CheckCircle,
  UserCheck,
  BarChart3,
  CalendarDays,
  MapPin,
  User,
  Timer,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import styled from "styled-components";

// Styled components for enhanced design
const StyledContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
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

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
`;

const PageSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin: 0;
`;

const EnhancedCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const SubjectCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 12px;
  padding: 16px;
  margin: 4px;
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  &.empty {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border: 2px dashed #dee2e6;
  }
`;

const SubjectTitle = styled.p`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
  color: #1a1a1a;
`;

const SubjectGroup = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 2px;
`;

const SubjectRoom = styled.p`
  font-size: 11px;
  color: #888;
`;

const TimeSlot = styled.div`
  font-weight: 600;
  color: #1a1a1a;
  padding: 8px;
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
  border-radius: 8px;
  margin-bottom: 8px;
  text-align: center;
  border: 1px solid #e8e8e8;
`;

const DayHeader = styled.div`
  font-weight: 700;
  color: #1a1a1a;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 8px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
`;

// Day mapping
const dayMap = {
  d1: "Sunday",
  d2: "Monday",
  d3: "Tuesday",
  d4: "Wednesday",
  d5: "Thursday",
};

// Time slots to show in order
const timeSlots = ["08:00", "10:00", "14:00"];
const dayOrder = ["d1", "d2", "d3", "d4", "d5"];

const getDayFromSlot = (slot) => slot.slice(0, 2);
const getTimeFromSlot = (slot) => slot.slice(2);

// Helper function to format time slots
const formatTimeSlot = (slot) => {
  const timeMap = {
    "08:00": "8-10",
    "10:00": "10-12",
    "14:00": "14-16",
  };
  return timeMap[slot] || slot;
};

export default function TeacherSchedulePage() {
  const userId = useSelector((state) => state.auth.userId);
  const [loading, setLoading] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedView, setSelectedView] = useState("calendar");

  // Enhanced dummy data for teacher schedule
  const dummyScheduleData = [
    {
      id: 1,
      subject: "Mathematics",
      group: {
        id: 1,
        name: "Math A1",
        level: { id: 1, name: "Grade 10" },
        studentCount: 28,
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      room: "Room 101",
      time: "08:00",
      day: "d1",
      duration: 120,
      status: "scheduled",
      attendance: { present: 25, absent: 3, total: 28 },
    },
    {
      id: 2,
      subject: "Mathematics",
      group: {
        id: 2,
        name: "Math B2",
        level: { id: 1, name: "Grade 10" },
        studentCount: 26,
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      room: "Room 102",
      time: "10:00",
      day: "d1",
      duration: 120,
      status: "scheduled",
      attendance: { present: 24, absent: 2, total: 26 },
    },
    {
      id: 3,
      subject: "Physics",
      group: {
        id: 3,
        name: "Physics A1",
        level: { id: 2, name: "Grade 11" },
        studentCount: 24,
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      room: "Lab 1",
      time: "14:00",
      day: "d1",
      duration: 120,
      status: "scheduled",
      attendance: { present: 22, absent: 2, total: 24 },
    },
    {
      id: 4,
      subject: "Mathematics",
      group: {
        id: 1,
        name: "Math A1",
        level: { id: 1, name: "Grade 10" },
        studentCount: 28,
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      room: "Room 101",
      time: "08:00",
      day: "d2",
      duration: 120,
      status: "scheduled",
      attendance: { present: 26, absent: 2, total: 28 },
    },
    {
      id: 5,
      subject: "Chemistry",
      group: {
        id: 4,
        name: "Chemistry B1",
        level: { id: 2, name: "Grade 11" },
        studentCount: 22,
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      room: "Lab 2",
      time: "10:00",
      day: "d2",
      duration: 120,
      status: "scheduled",
      attendance: { present: 20, absent: 2, total: 22 },
    },
    {
      id: 6,
      subject: "Mathematics",
      group: {
        id: 2,
        name: "Math B2",
        level: { id: 1, name: "Grade 10" },
        studentCount: 26,
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      room: "Room 102",
      time: "14:00",
      day: "d2",
      duration: 120,
      status: "scheduled",
      attendance: { present: 23, absent: 3, total: 26 },
    },
    {
      id: 7,
      subject: "Physics",
      group: {
        id: 3,
        name: "Physics A1",
        level: { id: 2, name: "Grade 11" },
        studentCount: 24,
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      room: "Lab 1",
      time: "08:00",
      day: "d3",
      duration: 120,
      status: "scheduled",
      attendance: { present: 21, absent: 3, total: 24 },
    },
    {
      id: 8,
      subject: "Mathematics",
      group: {
        id: 1,
        name: "Math A1",
        level: { id: 1, name: "Grade 10" },
        studentCount: 28,
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      room: "Room 101",
      time: "10:00",
      day: "d3",
      duration: 120,
      status: "scheduled",
      attendance: { present: 27, absent: 1, total: 28 },
    },
    {
      id: 9,
      subject: "English",
      group: {
        id: 5,
        name: "English A1",
        level: { id: 1, name: "Grade 10" },
        studentCount: 30,
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      room: "Room 203",
      time: "14:00",
      day: "d3",
      duration: 120,
      status: "scheduled",
      attendance: { present: 28, absent: 2, total: 30 },
    },
    {
      id: 10,
      subject: "Chemistry",
      group: {
        id: 4,
        name: "Chemistry B1",
        level: { id: 2, name: "Grade 11" },
        studentCount: 22,
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      room: "Lab 2",
      time: "08:00",
      day: "d4",
      duration: 120,
      status: "scheduled",
      attendance: { present: 19, absent: 3, total: 22 },
    },
    {
      id: 11,
      subject: "Physics",
      group: {
        id: 3,
        name: "Physics A1",
        level: { id: 2, name: "Grade 11" },
        studentCount: 24,
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      room: "Lab 1",
      time: "10:00",
      day: "d4",
      duration: 120,
      status: "scheduled",
      attendance: { present: 22, absent: 2, total: 24 },
    },
    {
      id: 12,
      subject: "Mathematics",
      group: {
        id: 2,
        name: "Math B2",
        level: { id: 1, name: "Grade 10" },
        studentCount: 26,
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      room: "Room 102",
      time: "14:00",
      day: "d4",
      duration: 120,
      status: "scheduled",
      attendance: { present: 24, absent: 2, total: 26 },
    },
    {
      id: 13,
      subject: "English",
      group: {
        id: 5,
        name: "English A1",
        level: { id: 1, name: "Grade 10" },
        studentCount: 30,
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      room: "Room 203",
      time: "08:00",
      day: "d5",
      duration: 120,
      status: "scheduled",
      attendance: { present: 29, absent: 1, total: 30 },
    },
    {
      id: 14,
      subject: "Mathematics",
      group: {
        id: 1,
        name: "Math A1",
        level: { id: 1, name: "Grade 10" },
        studentCount: 28,
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      room: "Room 101",
      time: "10:00",
      day: "d5",
      duration: 120,
      status: "scheduled",
      attendance: { present: 26, absent: 2, total: 28 },
    },
    {
      id: 15,
      subject: "Chemistry",
      group: {
        id: 4,
        name: "Chemistry B1",
        level: { id: 2, name: "Grade 11" },
        studentCount: 22,
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      room: "Lab 2",
      time: "14:00",
      day: "d5",
      duration: 120,
      status: "scheduled",
      attendance: { present: 21, absent: 1, total: 22 },
    },
  ];

  // Build schedule matrix for calendar view
  const buildScheduleMatrix = () => {
    const matrix = {};

    timeSlots.forEach((slot) => {
      matrix[slot] = {};
      dayOrder.forEach((day) => {
        matrix[slot][day] = null;
      });
    });

    scheduleData.forEach((session) => {
      if (matrix[session.time] && matrix[session.time][session.day] === null) {
        matrix[session.time][session.day] = session;
      }
    });

    return matrix;
  };

  const scheduleMatrix = buildScheduleMatrix();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Try to fetch from API
        // For now, using dummy data
        setScheduleData(dummyScheduleData);
      } catch (err) {
        console.warn("API call failed, using dummy data:", err.message);
        toast.info("Using demo data - API not available");
        setScheduleData(dummyScheduleData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  // Calculate statistics
  const calculateStats = () => {
    const totalSessions = scheduleData.length;
    const uniqueSubjects = new Set(scheduleData.map((s) => s.subject)).size;
    const uniqueGroups = new Set(scheduleData.map((s) => s.group.id)).size;
    const totalStudents = scheduleData.reduce(
      (sum, s) => sum + s.group.studentCount,
      0
    );
    const avgAttendance =
      scheduleData.length > 0
        ? Math.round(
            scheduleData.reduce(
              (sum, s) =>
                sum + (s.attendance.present / s.attendance.total) * 100,
              0
            ) / scheduleData.length
          )
        : 0;

    return {
      totalSessions,
      uniqueSubjects,
      uniqueGroups,
      totalStudents,
      avgAttendance,
    };
  };

  const stats = calculateStats();

  const getStatusBadge = (status) => {
    const variants = {
      scheduled:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      completed:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };

    return (
      <Badge className={variants[status] || variants.scheduled}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleTakeAttendance = (sessionId) => {
    toast.info(`Attendance feature for session ${sessionId} coming soon!`);
  };

  const handleViewDetails = (sessionId) => {
    toast.info(`Session details for ${sessionId} coming soon!`);
  };

  if (loading) {
    return (
      <StyledContainer>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 text-[#667eea] mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Loading your schedule...
            </p>
          </div>
        </div>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <ElegantLogo>
            <LogoIcon>
              <GraduationCap size={24} color="#ffffff" />
            </LogoIcon>
            <LogoText>Dirassati</LogoText>
          </ElegantLogo>
          <PageTitle>Teacher Schedule Dashboard</PageTitle>
          <PageSubtitle>
            Manage your teaching schedule, track attendance, and monitor student
            progress
          </PageSubtitle>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Weekly Sessions
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.totalSessions}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Subjects
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {stats.uniqueSubjects}
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Groups
                  </p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {stats.uniqueGroups}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {stats.totalStudents}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                  <User className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Avg Attendance
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {stats.avgAttendance}%
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-full">
                  <UserCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Toggle */}
        <div className="mb-6">
          <Tabs value={selectedView} onValueChange={setSelectedView}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Calendar View
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                List View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="mt-6">
              {/* Weekly Schedule Grid */}
              <div className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden mb-8">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
                  <div className="flex bg-gradient-to-r from-slate-100 to-gray-100 border-b-2 border-gray-200 min-w-[828px] sm:min-w-[932px] lg:min-w-[1036px] xl:min-w-[1140px] 2xl:min-w-[1240px]">
                    <div className="p-3 sm:p-4 lg:p-5 xl:p-6 flex items-center justify-center sticky left-0 bg-gradient-to-r from-slate-100 to-gray-100 z-10 border-r-2 border-gray-300 w-28 sm:w-32 lg:w-36 xl:w-40 flex-shrink-0">
                      <div className="flex items-center gap-2 lg:gap-3">
                        <div className="p-1.5 sm:p-2 lg:p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                        </div>
                        <span className="font-bold text-gray-800 text-sm sm:text-base lg:text-lg">
                          Time
                        </span>
                      </div>
                    </div>
                    {dayOrder.map((dayKey) => (
                      <div
                        key={dayKey}
                        className="p-3 sm:p-4 lg:p-5 xl:p-6 text-center border-l border-gray-200 w-[160px] sm:w-[180px] lg:w-[200px] xl:w-[220px] 2xl:w-[240px] flex-shrink-0"
                      >
                        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                          <div className="p-1.5 sm:p-2 lg:p-2.5 xl:p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full">
                            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-white" />
                          </div>
                          <span className="font-bold text-gray-800 text-sm sm:text-base lg:text-lg">
                            {dayMap[dayKey]}
                          </span>
                          <span className="text-xs sm:text-xs lg:text-sm text-gray-600 font-medium">
                            {dayKey === "d1" && "🌅 Morning"}
                            {dayKey === "d2" && "📚 Learning"}
                            {dayKey === "d3" && "🔬 Science"}
                            {dayKey === "d4" && "📖 Study"}
                            {dayKey === "d5" && "🎯 Focus"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Schedule Rows */}
                  {timeSlots.map((slot, index) => (
                    <div
                      key={slot}
                      className={`flex border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 min-w-[828px] sm:min-w-[932px] lg:min-w-[1036px] xl:min-w-[1140px] 2xl:min-w-[1240px] ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                    >
                      {/* Time Cell */}
                      <div className="p-3 sm:p-4 lg:p-5 xl:p-6 flex items-center justify-center border-r-2 border-gray-300 sticky left-0 bg-inherit z-10 w-28 sm:w-32 lg:w-36 xl:w-40 flex-shrink-0">
                        <div className="text-center">
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-0.5 sm:mb-1">
                            {formatTimeSlot(slot)}
                          </div>
                          <div className="text-xs sm:text-xs lg:text-sm text-gray-600 font-medium">
                            {slot === "08:00" && "Morning Session"}
                            {slot === "10:00" && "Mid Morning"}
                            {slot === "14:00" && "Afternoon Session"}
                          </div>
                        </div>
                      </div>

                      {/* Day Cells */}
                      {dayOrder.map((dayKey) => {
                        const session = scheduleMatrix[slot][dayKey];

                        return (
                          <div
                            key={dayKey}
                            className="border-l border-gray-200 w-[160px] sm:w-[180px] lg:w-[200px] xl:w-[220px] 2xl:w-[240px] h-[140px] sm:h-[150px] lg:h-[160px] xl:h-[170px] 2xl:h-[180px] flex-shrink-0 flex items-stretch"
                          >
                            {session ? (
                              <div
                                className={`relative w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group overflow-hidden flex flex-col`}
                              >
                                {/* Subject Icon */}
                                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 z-10">
                                  <div className="p-1 sm:p-1.5 lg:p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-lg">
                                    <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white" />
                                  </div>
                                </div>

                                {/* Card Content */}
                                <div className="flex-1 flex flex-col justify-between pr-6 sm:pr-8 lg:pr-10 xl:pr-12">
                                  {/* Subject Name */}
                                  <div className="mb-1 sm:mb-1.5 lg:mb-2">
                                    <h3 className="font-bold text-xs sm:text-sm lg:text-base xl:text-lg text-blue-700 leading-tight line-clamp-2">
                                      {session.subject}
                                    </h3>
                                  </div>

                                  {/* Group Info */}
                                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                    <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-gray-500 flex-shrink-0" />
                                    <span className="text-xs sm:text-xs lg:text-sm font-medium text-gray-700 truncate">
                                      {session.group.name}
                                    </span>
                                  </div>

                                  {/* Location */}
                                  <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 mb-2 sm:mb-2.5 lg:mb-3">
                                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-gray-500 flex-shrink-0" />
                                    <span className="text-xs sm:text-xs lg:text-sm text-gray-600 font-medium truncate">
                                      {session.room}
                                    </span>
                                  </div>

                                  {/* Attendance Badge */}
                                  <div className="flex justify-between items-center mt-auto">
                                    <span className="text-xs bg-green-100 px-2 py-1 rounded-full font-medium text-green-700">
                                      {session.attendance.present}/
                                      {session.attendance.total}
                                    </span>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                      <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-green-500" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-50/50 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-gray-100 border-dashed">
                                <div className="text-center text-gray-400">
                                  <div className="text-xs sm:text-xs lg:text-sm font-medium">
                                    Free Period
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              {/* Sessions List */}
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      Your Teaching Sessions
                    </CardTitle>
                    <ShadcnButton className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:from-[#667eea]/90 hover:to-[#764ba2]/90 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Session
                    </ShadcnButton>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Group</TableHead>
                          <TableHead>Day & Time</TableHead>
                          <TableHead>Room</TableHead>
                          <TableHead>Attendance</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {scheduleData.map((session) => (
                          <TableRow key={session.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session.subject}`}
                                  />
                                  <AvatarFallback className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-xs">
                                    {session.subject.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {session.subject}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {session.group.level.name}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="border-[#667eea]/30 text-[#667eea] dark:border-[#667eea]/50 dark:text-[#667eea]"
                              >
                                {session.group.name}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-300">
                                  {dayMap[session.day]}{" "}
                                  {formatTimeSlot(session.time)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-300">
                                  {session.room}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    {session.attendance.present}/
                                    {session.attendance.total}
                                  </span>
                                  <span className="text-gray-600 dark:text-gray-400">
                                    {Math.round(
                                      (session.attendance.present /
                                        session.attendance.total) *
                                        100
                                    )}
                                    %
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-[#667eea] to-[#764ba2] h-2 rounded-full transition-all duration-300"
                                    style={{
                                      width: `${
                                        (session.attendance.present /
                                          session.attendance.total) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(session.status)}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <ShadcnButton
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleTakeAttendance(session.id)
                                  }
                                  className="border-[#667eea]/30 text-[#667eea] hover:bg-[#667eea]/10"
                                >
                                  <UserCheck className="w-4 h-4" />
                                </ShadcnButton>
                                <ShadcnButton
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewDetails(session.id)}
                                  className="border-[#764ba2]/30 text-[#764ba2] hover:bg-[#764ba2]/10"
                                >
                                  <Eye className="w-4 h-4" />
                                </ShadcnButton>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Today's Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Timer className="w-5 h-5 text-blue-600" />
                Today's Sessions
              </h3>
              <div className="space-y-3">
                {scheduleData
                  .filter((s) => s.day === "d1")
                  .slice(0, 3)
                  .map((session, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-blue-900">
                          {session.subject}
                        </p>
                        <p className="text-sm text-blue-700">
                          {session.group.name} • {session.room}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {formatTimeSlot(session.time)}
                      </Badge>
                    </div>
                  ))}
                {scheduleData.filter((s) => s.day === "d1").length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No sessions today
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-green-600" />
                Performance Overview
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Average Attendance
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {stats.avgAttendance}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Students
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {stats.totalStudents}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Active Groups
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {stats.uniqueGroups}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Weekly Summary
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Sessions
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {stats.totalSessions}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Teaching Hours
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {Math.round(((stats.totalSessions * 2) / 60) * 10) / 10}h
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subjects
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {stats.uniqueSubjects}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StyledContainer>
  );
}
