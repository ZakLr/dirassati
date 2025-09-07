"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import apiCall from "@/components/utils/apiCall";
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
} from "lucide-react";
import { toast } from "sonner";

const AdminSchedulePage = () => {
  const router = useRouter();
  const token = useSelector((state) => state.auth.accessToken);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // Enhanced dummy data for schedules
  const dummySchedules = [
    {
      id: 1,
      group: {
        id: 1,
        name: "Mathematics A1",
        level: { id: 1, name: "Grade 10" },
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      teacher: "Dr. Sarah Johnson",
      totalSessions: 45,
      completedSessions: 32,
      nextSession: "2024-09-25T09:00:00Z",
      status: "active",
    },
    {
      id: 2,
      group: {
        id: 2,
        name: "Physics B2",
        level: { id: 2, name: "Grade 11" },
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      teacher: "Prof. Ahmed Tazi",
      totalSessions: 42,
      completedSessions: 28,
      nextSession: "2024-09-26T10:30:00Z",
      status: "active",
    },
    {
      id: 3,
      group: {
        id: 3,
        name: "Chemistry C1",
        level: { id: 1, name: "Grade 10" },
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      teacher: "Dr. Fatima Alaoui",
      totalSessions: 40,
      completedSessions: 25,
      nextSession: "2024-09-27T14:00:00Z",
      status: "active",
    },
    {
      id: 4,
      group: {
        id: 4,
        name: "English D2",
        level: { id: 3, name: "Grade 12" },
      },
      semester: {
        id: 2,
        name: "Second Trimester 2024",
      },
      teacher: "Ms. Leila Mansouri",
      totalSessions: 38,
      completedSessions: 38,
      nextSession: null,
      status: "completed",
    },
    {
      id: 5,
      group: {
        id: 5,
        name: "History E1",
        level: { id: 2, name: "Grade 11" },
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      teacher: "Mr. Karim Bennani",
      totalSessions: 35,
      completedSessions: 20,
      nextSession: "2024-09-28T11:15:00Z",
      status: "active",
    },
    {
      id: 6,
      group: {
        id: 6,
        name: "Art F1",
        level: { id: 1, name: "Grade 10" },
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      teacher: "Mrs. Amina Bouazza",
      totalSessions: 30,
      completedSessions: 15,
      nextSession: "2024-09-29T13:45:00Z",
      status: "active",
    },
    {
      id: 7,
      group: {
        id: 7,
        name: "Sports G2",
        level: { id: 2, name: "Grade 11" },
      },
      semester: {
        id: 2,
        name: "Second Trimester 2024",
      },
      teacher: "Coach Hassan Alaoui",
      totalSessions: 25,
      completedSessions: 0,
      nextSession: "2024-10-01T08:00:00Z",
      status: "upcoming",
    },
    {
      id: 8,
      group: {
        id: 8,
        name: "Music H1",
        level: { id: 3, name: "Grade 12" },
      },
      semester: {
        id: 1,
        name: "First Trimester 2024",
      },
      teacher: "Mr. Youssef Tazi",
      totalSessions: 28,
      completedSessions: 12,
      nextSession: "2024-09-30T15:30:00Z",
      status: "active",
    },
  ];

  const handleCreate = () => {
    router.push("/admin/schedule/create");
  };

  const handleView = (groupId, semesterId) => {
    router.push(`/admin/schedule/view/${groupId}/${semesterId}`);
  };

  const handleEdit = (groupId) => {
    router.push(`/admin/schedule/edit/${groupId}`);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Try to fetch from API
        const sessionRes = await apiCall(
          "get",
          "/api/sessions/?per_page=1000",
          null,
          {
            token,
          }
        );
        const sessions = sessionRes.sessions || [];

        // Extract unique group and semester IDs
        const uniqueGroupIds = [...new Set(sessions.map((s) => s.group_id))];
        const uniqueSemesterIds = [
          ...new Set(sessions.map((s) => s.semester_id)),
        ];

        // Fetch each group individually
        const groupMap = {};
        for (const groupId of uniqueGroupIds) {
          try {
            const res = await apiCall("get", `/api/groups/${groupId}`, null, {
              token,
            });
            groupMap[groupId] = res.group;
          } catch {
            console.warn(`Failed to load group ${groupId}`);
          }
        }

        // Fetch each semester individually
        const semesterMap = {};
        for (const semesterId of uniqueSemesterIds) {
          try {
            const res = await apiCall(
              "get",
              `/api/semesters/${semesterId}`,
              null,
              { token }
            );
            semesterMap[semesterId] = res.semester;
          } catch {
            console.warn(`Failed to load trimester ${semesterId}`);
          }
        }

        // Build unique row entries
        const seen = new Set();
        const rowData = [];

        sessions.forEach((session) => {
          const group = groupMap[session.group_id];
          const semester = semesterMap[session.semester_id];
          const key = `${session.group_id}-${session.semester_id}`;

          if (!seen.has(key) && group && semester) {
            seen.add(key);
            rowData.push({
              key,
              group,
              semester,
            });
          }
        });

        setRows(rowData);
      } catch (err) {
        console.warn("API call failed, using dummy data:", err.message);
        toast.info("Using demo data - API not available");

        // Use dummy data as fallback
        setRows(
          dummySchedules.map((schedule) => ({
            key: schedule.id,
            group: schedule.group,
            semester: schedule.semester,
            teacher: schedule.teacher,
            totalSessions: schedule.totalSessions,
            completedSessions: schedule.completedSessions,
            nextSession: schedule.nextSession,
            status: schedule.status,
          }))
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

  const getStatusBadge = (status) => {
    const variants = {
      active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      completed:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      upcoming:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    };

    return (
      <Badge className={variants[status] || variants.active}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getProgressPercentage = (completed, total) => {
    return Math.round((completed / total) * 100);
  };

  // Calculate summary statistics
  const totalSchedules = dummySchedules.length;
  const activeSchedules = dummySchedules.filter(
    (s) => s.status === "active"
  ).length;
  const completedSchedules = dummySchedules.filter(
    (s) => s.status === "completed"
  ).length;
  const totalSessions = dummySchedules.reduce(
    (sum, s) => sum + s.totalSessions,
    0
  );
  const completedSessions = dummySchedules.reduce(
    (sum, s) => sum + s.completedSessions,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
            Schedule Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Manage class schedules and academic sessions
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Schedules
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {totalSchedules}
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
                    Active Classes
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {activeSchedules}
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
                    Completed Classes
                  </p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {completedSchedules}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Session Progress
                  </p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {Math.round((completedSessions / totalSessions) * 100)}%
                  </p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                  <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule Table */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Class Schedules
              </CardTitle>
              <ShadcnButton
                onClick={handleCreate}
                className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:from-[#667eea]/90 hover:to-[#764ba2]/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Schedule
              </ShadcnButton>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin h-8 w-8 text-[#667eea]" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  Loading schedules...
                </span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class Group</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Trimester</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.key}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.group?.name}`}
                              />
                              <AvatarFallback className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-xs">
                                {row.group?.name?.charAt(0) || "C"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {row.group?.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {row.totalSessions
                                  ? `${row.completedSessions}/${row.totalSessions} sessions`
                                  : "Schedule details"}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-[#667eea]/30 text-[#667eea] dark:border-[#667eea]/50 dark:text-[#667eea]"
                          >
                            {row.group?.level?.name || "N/A"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600 dark:text-gray-300">
                            {row.semester?.name}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-300">
                              {row.teacher || "Not assigned"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {row.totalSessions ? (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                  {row.completedSessions}/{row.totalSessions}
                                </span>
                                <span className="text-gray-600 dark:text-gray-400">
                                  {getProgressPercentage(
                                    row.completedSessions,
                                    row.totalSessions
                                  )}
                                  %
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-[#667eea] to-[#764ba2] h-2 rounded-full transition-all duration-300"
                                  style={{
                                    width: `${getProgressPercentage(
                                      row.completedSessions,
                                      row.totalSessions
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500">
                              No data
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(row.status || "active")}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <ShadcnButton
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleView(row.group?.id, row.semester?.id)
                              }
                              className="border-[#667eea]/30 text-[#667eea] hover:bg-[#667eea]/10"
                            >
                              <Eye className="w-4 h-4" />
                            </ShadcnButton>
                            <ShadcnButton
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(row.group?.id)}
                              className="border-[#764ba2]/30 text-[#764ba2] hover:bg-[#764ba2]/10"
                            >
                              <Edit className="w-4 h-4" />
                            </ShadcnButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Today's Sessions
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Morning Classes
                  </span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    8
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Afternoon Classes
                  </span>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    6
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Evening Classes
                  </span>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    2
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                This Week
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Sessions
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    42
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Completed
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    28
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Remaining
                  </span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    14
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Room Utilization
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Classrooms Used
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    12/15
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Labs Occupied
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    3/4
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Utilization Rate
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    80%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSchedulePage;
