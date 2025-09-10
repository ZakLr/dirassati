"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import apiCall from "@/components/utils/apiCall";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Users,
  Activity,
  Coffee,
  Sun,
  Moon,
  Star,
  Zap,
  Heart,
  Target,
  Award,
  Trophy,
  Crown,
  Diamond,
  Sparkles,
} from "lucide-react";

// Module color and icon mapping
const moduleStyles = {
  "Advanced Mathematics": {
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
    icon: Target,
    textColor: "text-blue-700",
  },
  Physics: {
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    icon: Zap,
    textColor: "text-purple-700",
  },
  "Organic Chemistry": {
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    icon: Activity,
    textColor: "text-green-700",
  },
  Biology: {
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
    icon: Heart,
    textColor: "text-emerald-700",
  },
  History: {
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
    icon: Award,
    textColor: "text-amber-700",
  },
  Geography: {
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50",
    borderColor: "border-orange-200",
    icon: MapPin,
    textColor: "text-orange-700",
  },
  English: {
    color: "from-indigo-500 to-blue-500",
    bgColor: "from-indigo-50 to-blue-50",
    borderColor: "border-indigo-200",
    icon: BookOpen,
    textColor: "text-indigo-700",
  },
  "Physical Education": {
    color: "from-rose-500 to-pink-500",
    bgColor: "from-rose-50 to-pink-50",
    borderColor: "border-rose-200",
    icon: Trophy,
    textColor: "text-rose-700",
  },
};

// Default style for unknown modules
const defaultStyle = {
  color: "from-gray-500 to-slate-500",
  bgColor: "from-gray-50 to-slate-50",
  borderColor: "border-gray-200",
  icon: GraduationCap,
  textColor: "text-gray-700",
};

// Helper function to get module style
const getModuleStyle = (moduleName) => {
  return moduleStyles[moduleName] || defaultStyle;
};

// Helper function to format time slots
const formatTimeSlot = (slot) => {
  const timeMap = {
    "h8-10": "8:00 - 10:00",
    "h10-12": "10:00 - 12:00",
    "h14-16": "14:00 - 16:00",
  };
  return timeMap[slot] || slot.replace("h", "").replace("-", " - ");
};

// Dummy data for schedule sessions
const dummySessions = [
  {
    id: 1,
    group_id: 1,
    semester_id: 1,
    module_name: "Advanced Mathematics",
    teacher_name: "Ahmed Ali",
    salle_name: "Room 101",
    time_slot: "d2h8-10",
    weeks: "1-8",
  },
  {
    id: 2,
    group_id: 1,
    semester_id: 1,
    module_name: "Physics",
    teacher_name: "Fatima Ben Omar",
    salle_name: "Room 203",
    time_slot: "d2h10-12",
    weeks: "1-8",
  },
  {
    id: 3,
    group_id: 1,
    semester_id: 1,
    module_name: "Organic Chemistry",
    teacher_name: "Mohamed Kheroubi",
    salle_name: "Chemistry Lab",
    time_slot: "d3h8-10",
    weeks: "1-8",
  },
  {
    id: 4,
    group_id: 1,
    semester_id: 1,
    module_name: "Biology",
    teacher_name: "Leila Bouziane",
    salle_name: "Room 105",
    time_slot: "d3h10-12",
    weeks: "1-8",
  },
  {
    id: 5,
    group_id: 1,
    semester_id: 1,
    module_name: "History",
    teacher_name: "Yassine Saghir",
    salle_name: "Room 301",
    time_slot: "d4h8-10",
    weeks: "1-8",
  },
  {
    id: 6,
    group_id: 1,
    semester_id: 1,
    module_name: "Geography",
    teacher_name: "Ahmed Ali",
    salle_name: "Room 302",
    time_slot: "d4h10-12",
    weeks: "1-8",
  },
  {
    id: 7,
    group_id: 1,
    semester_id: 1,
    module_name: "English",
    teacher_name: "Fatima Ben Omar",
    salle_name: "Room 201",
    time_slot: "d5h8-10",
    weeks: "1-8",
  },
  {
    id: 8,
    group_id: 1,
    semester_id: 1,
    module_name: "Physical Education",
    teacher_name: "Mohamed Kheroubi",
    salle_name: "Gymnasium",
    time_slot: "d5h10-12",
    weeks: "1-8",
  },
];

const dummyGroups = [
  { id: 1, name: "Class 1 - 2nd Year Secondary" },
  { id: 2, name: "Class 2 - 2nd Year Secondary" },
  { id: 3, name: "Class 1 - 3rd Year Secondary" },
];

const dummyTrimesters = [
  { id: 1, name: "First Trimester" },
  { id: 2, name: "Second Trimester" },
  { id: 3, name: "Third Trimester" },
];

// Day mapping (d1 = Sunday, ..., d5 = Thursday)
const dayMap = {
  d1: "Sunday",
  d2: "Monday",
  d3: "Tuesday",
  d4: "Wednesday",
  d5: "Thursday",
};

// Time slots to show in order
const timeSlots = ["h8-10", "h10-12", "h14-16"];
const dayOrder = ["d1", "d2", "d3", "d4", "d5"];

const getDayFromSlot = (slot) => slot.slice(0, 2);
const getTimeFromSlot = (slot) => slot.slice(2);

export default function ViewSchedulePage() {
  const { group_id, trimester_id } = useParams();
  const token = useSelector((state) => state.auth.accessToken);

  const [sessions, setSessions] = useState([]);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);

        // Fetch sessions
        const sessionRes = await apiCall(
          "get",
          `/api/sessions/?group_id=${group_id}&semester_id=${trimester_id}`,
          null,
          { token }
        );
        setSessions(sessionRes.sessions || []);

        // Fetch group name
        const groupRes = await apiCall("get", `/api/groups/${group_id}`, null, {
          token,
        });
        setGroup(groupRes.group);
      } catch (err) {
        console.warn("API call failed, using dummy data:", err.message);
        toast.info("Using demo data - API not available");

        // Use dummy data as fallback
        const filteredSessions = dummySessions.filter(
          (s) =>
            s.group_id.toString() === group_id.toString() &&
            s.semester_id.toString() === trimester_id.toString()
        );
        setSessions(filteredSessions);

        const dummyGroup = dummyGroups.find(
          (g) => g.id.toString() === group_id.toString()
        );
        if (dummyGroup) {
          setGroup(dummyGroup);
        } else {
          setGroup({ name: `Group ${group_id}` });
        }
      } finally {
        setLoading(false);
      }
    };

    if (group_id && trimester_id) {
      fetchSchedule();
    }
  }, [group_id, trimester_id, token]);

  const buildScheduleMatrix = () => {
    const matrix = {};

    timeSlots.forEach((slot) => {
      matrix[slot] = {};
      dayOrder.forEach((day) => {
        matrix[slot][day] = null;
      });
    });

    sessions.forEach((s) => {
      const dayKey = getDayFromSlot(s.time_slot);
      const timeKey = getTimeFromSlot(s.time_slot);
      if (matrix[timeKey] && matrix[timeKey][dayKey] === null) {
        matrix[timeKey][dayKey] = s;
      }
    });

    return matrix;
  };

  const scheduleMatrix = buildScheduleMatrix();

  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) => (
        <strong>{text.replace("h", "").replace("-", " - ")}</strong>
      ),
    },
    ...dayOrder.map((dayKey) => ({
      title: dayMap[dayKey],
      dataIndex: dayKey,
      key: dayKey,
      render: (session) =>
        session ? (
          <Card size="small" bordered={false}>
            <div className="font-semibold">{session.module_name}</div>
            <div className="text-sm text-gray-600">{session.teacher_name}</div>
            <div className="text-xs">{session.salle_name}</div>
            <Tag color="blue" className="mt-1">
              Week {session.weeks}
            </Tag>
          </Card>
        ) : (
          <div className="text-gray-400 text-sm">—</div>
        ),
    })),
  ];

  const dataSource = timeSlots.map((slot) => {
    const row = { key: slot, time: slot };
    dayOrder.forEach((dayKey) => {
      row[dayKey] = scheduleMatrix[slot][dayKey];
    });
    return row;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full border-4 border-purple-200 border-t-purple-600 mx-auto animate-spin animation-delay-300"></div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Loading Schedule
          </h2>
          <p className="text-gray-600">Fetching your weekly schedule data...</p>
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-100"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce animation-delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center">
        <div className="p-8 max-w-md mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
            <CardContent className="text-center p-8">
              <div className="mb-6">
                <div className="p-4 bg-gradient-to-r from-red-100 to-pink-100 rounded-full w-fit mx-auto mb-4">
                  <Activity className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Schedule Unavailable
                </h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <ShadcnButton
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                >
                  Try Again
                </ShadcnButton>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Enhanced Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:mb-6 gap-4">
            <ShadcnButton
              variant="outline"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 hover:bg-blue-50 border-blue-200 text-blue-700 hover:border-blue-300 transition-all duration-200 w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Schedules
            </ShadcnButton>
            <div className="flex items-center gap-3">
              <div className="p-2 lg:p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full">
                <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="text-center mb-4 lg:mb-6">
            <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 lg:mb-3">
              📅 Weekly Schedule
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 lg:gap-4 mb-3 lg:mb-4">
              <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm font-medium w-fit">
                {group?.name}
              </Badge>
              <Badge
                variant="outline"
                className="border-purple-200 text-purple-700 px-3 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm font-medium w-fit"
              >
                Trimester {trimester_id}
              </Badge>
            </div>
            <p className="text-gray-600 text-base lg:text-lg max-w-2xl mx-auto px-4">
              View and manage the weekly class schedule with detailed session
              information
            </p>
          </div>
        </div>

        {/* Enhanced Schedule Grid with Horizontal Scrolling */}
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

            {/* Schedule Rows with Horizontal Scrolling */}
            {timeSlots.map((slot, index) => (
              <div
                key={slot}
                className={`flex border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 min-w-[828px] sm:min-w-[932px] lg:min-w-[1036px] xl:min-w-[1140px] 2xl:min-w-[1240px] ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                {/* Time Cell - Fixed */}
                <div className="p-3 sm:p-4 lg:p-5 xl:p-6 flex items-center justify-center border-r-2 border-gray-300 sticky left-0 bg-inherit z-10 w-28 sm:w-32 lg:w-36 xl:w-40 flex-shrink-0">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-0.5 sm:mb-1">
                      {formatTimeSlot(slot)}
                    </div>
                    <div className="text-xs sm:text-xs lg:text-sm text-gray-600 font-medium">
                      {slot === "h8-10" && "Morning Session"}
                      {slot === "h10-12" && "Late Morning"}
                      {slot === "h14-16" && "Afternoon Session"}
                    </div>
                  </div>
                </div>

                {/* Day Cells - Scrollable */}
                {dayOrder.map((dayKey) => {
                  const session = scheduleMatrix[slot][dayKey];
                  const moduleStyle = session
                    ? getModuleStyle(session.module_name)
                    : null;
                  const IconComponent = session ? moduleStyle.icon : null;

                  return (
                    <div
                      key={dayKey}
                      className="border-l border-gray-200 w-[160px] sm:w-[180px] lg:w-[200px] xl:w-[220px] 2xl:w-[240px] h-[140px] sm:h-[150px] lg:h-[160px] xl:h-[170px] 2xl:h-[180px] flex-shrink-0 flex items-stretch"
                    >
                      {session ? (
                        <div
                          className={`relative w-full h-full bg-gradient-to-br ${moduleStyle.bgColor} ${moduleStyle.borderColor} border-2 rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group overflow-hidden flex flex-col`}
                        >
                          {/* Module Icon - Absolute positioned */}
                          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 z-10">
                            <div
                              className={`p-1 sm:p-1.5 lg:p-2 bg-gradient-to-r ${moduleStyle.color} rounded-full shadow-lg`}
                            >
                              {IconComponent && (
                                <IconComponent className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white" />
                              )}
                            </div>
                          </div>

                          {/* Card Content - Flex layout */}
                          <div className="flex-1 flex flex-col justify-between pr-6 sm:pr-8 lg:pr-10 xl:pr-12">
                            {/* Module Name */}
                            <div className="mb-1 sm:mb-1.5 lg:mb-2">
                              <h3
                                className={`font-bold text-xs sm:text-sm lg:text-base xl:text-lg ${moduleStyle.textColor} leading-tight line-clamp-2`}
                              >
                                {session.module_name}
                              </h3>
                            </div>

                            {/* Teacher Info */}
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                              <Avatar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0">
                                <AvatarFallback
                                  className={`text-xs bg-gradient-to-r ${moduleStyle.color} text-white font-medium`}
                                >
                                  {session.teacher_name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs sm:text-xs lg:text-sm font-medium text-gray-700 truncate">
                                {session.teacher_name}
                              </span>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 mb-2 sm:mb-2.5 lg:mb-3">
                              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-gray-500 flex-shrink-0" />
                              <span className="text-xs sm:text-xs lg:text-sm text-gray-600 font-medium truncate">
                                {session.salle_name}
                              </span>
                            </div>

                            {/* Week Badge - Bottom aligned */}
                            <div className="flex justify-between items-center mt-auto">
                              <Badge
                                variant="outline"
                                className={`${moduleStyle.borderColor} ${moduleStyle.textColor} border-2 font-medium text-xs`}
                              >
                                Week {session.weeks}
                              </Badge>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-yellow-500" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50/50 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-gray-100 border-dashed">
                          <div className="text-center text-gray-400">
                            <Coffee className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mx-auto mb-1 sm:mb-2 opacity-50" />
                            <span className="text-xs sm:text-xs lg:text-sm font-medium">
                              Free Period
                            </span>
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

        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <CardContent className="p-4 lg:p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 lg:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BookOpen className="w-8 h-8 lg:w-16 lg:h-16 text-blue-600" />
              </div>
              <div className="relative z-10">
                <div className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1 lg:mb-2">
                  {sessions.length}
                </div>
                <p className="text-gray-700 font-semibold text-sm lg:text-base mb-1">
                  Total Sessions
                </p>
                <p className="text-xs lg:text-sm text-gray-600">
                  Scheduled classes
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <CardContent className="p-4 lg:p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 lg:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <GraduationCap className="w-8 h-8 lg:w-16 lg:h-16 text-purple-600" />
              </div>
              <div className="relative z-10">
                <div className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 lg:mb-2">
                  {new Set(sessions.map((s) => s.module_name)).size}
                </div>
                <p className="text-gray-700 font-semibold text-sm lg:text-base mb-1">
                  Modules
                </p>
                <p className="text-xs lg:text-sm text-gray-600">
                  Unique subjects
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <CardContent className="p-4 lg:p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 lg:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users className="w-8 h-8 lg:w-16 lg:h-16 text-emerald-600" />
              </div>
              <div className="relative z-10">
                <div className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1 lg:mb-2">
                  {new Set(sessions.map((s) => s.teacher_name)).size}
                </div>
                <p className="text-gray-700 font-semibold text-sm lg:text-base mb-1">
                  Teachers
                </p>
                <p className="text-xs lg:text-sm text-gray-600">
                  Active educators
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <CardContent className="p-4 lg:p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 lg:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity className="w-8 h-8 lg:w-16 lg:h-16 text-amber-600" />
              </div>
              <div className="relative z-10">
                <div className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1 lg:mb-2">
                  {Math.round((sessions.length / 15) * 100)}%
                </div>
                <p className="text-gray-700 font-semibold text-sm lg:text-base mb-1">
                  Density
                </p>
                <p className="text-xs lg:text-sm text-gray-600">
                  Weekly utilization
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 lg:gap-4 justify-center">
          <ShadcnButton
            variant="outline"
            className="flex items-center gap-2 hover:bg-blue-50 border-blue-200 text-blue-700 hover:border-blue-300 w-full sm:w-auto justify-center"
          >
            <Calendar className="w-4 h-4" />
            Export Schedule
          </ShadcnButton>
          <ShadcnButton
            variant="outline"
            className="flex items-center gap-2 hover:bg-purple-50 border-purple-200 text-purple-700 hover:border-purple-300 w-full sm:w-auto justify-center"
          >
            <Users className="w-4 h-4" />
            Manage Sessions
          </ShadcnButton>
          <ShadcnButton
            variant="outline"
            className="flex items-center gap-2 hover:bg-green-50 border-green-200 text-green-700 hover:border-green-300 w-full sm:w-auto justify-center"
          >
            <MapPin className="w-4 h-4" />
            Room Availability
          </ShadcnButton>
        </div>
      </div>
    </div>
  );
}
