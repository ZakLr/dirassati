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
  BookOpen,
  Users,
  Clock,
  Plus,
  Eye,
  Edit,
  Trash2,
  GraduationCap,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

const AdminModulesPage = () => {
  const router = useRouter();
  const token = useSelector((state) => state.auth.accessToken);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // Enhanced dummy data for modules
  const dummyModules = [
    {
      id: 1,
      name: "Advanced Mathematics",
      code: "MATH-301",
      description:
        "Comprehensive study of calculus, algebra, and geometry for advanced learners",
      level: { id: 1, name: "السنة الأولى ثانوي" },
      teacher: "Dr. Sarah Johnson",
      totalStudents: 28,
      enrolledStudents: 25,
      credits: 4,
      duration: "45 hours",
      status: "active",
      semester: "First Trimester 2024",
      prerequisites: ["Basic Algebra", "Geometry Fundamentals"],
    },
    {
      id: 2,
      name: "Physics Fundamentals",
      code: "PHYS-201",
      description:
        "Introduction to classical physics, mechanics, and thermodynamics",
      level: { id: 2, name: "السنة الثانية ثانوي" },
      teacher: "Prof. Ahmed Tazi",
      totalStudents: 32,
      enrolledStudents: 30,
      credits: 3,
      duration: "42 hours",
      status: "active",
      semester: "First Trimester 2024",
      prerequisites: ["Basic Mathematics"],
    },
    {
      id: 3,
      name: "Organic Chemistry",
      code: "CHEM-401",
      description:
        "Study of carbon compounds, reactions, and laboratory techniques",
      level: { id: 1, name: "السنة الأولى ثانوي" },
      teacher: "Dr. Fatima Alaoui",
      totalStudents: 24,
      enrolledStudents: 22,
      credits: 4,
      duration: "48 hours",
      status: "active",
      semester: "First Trimester 2024",
      prerequisites: ["Basic Chemistry"],
    },
    {
      id: 4,
      name: "English Literature",
      code: "ENG-302",
      description:
        "Analysis of classic and contemporary literature, writing skills development",
      level: { id: 3, name: "السنة الثالثة ثانوي" },
      teacher: "Ms. Leila Mansouri",
      totalStudents: 26,
      enrolledStudents: 26,
      credits: 3,
      duration: "40 hours",
      status: "completed",
      semester: "Second Trimester 2024",
      prerequisites: ["English Grammar", "Basic Literature"],
    },
    {
      id: 5,
      name: "World History",
      code: "HIST-202",
      description:
        "Comprehensive overview of world civilizations and historical events",
      level: { id: 2, name: "السنة الثانية ثانوي" },
      teacher: "Mr. Karim Bennani",
      totalStudents: 30,
      enrolledStudents: 28,
      credits: 3,
      duration: "38 hours",
      status: "active",
      semester: "First Trimester 2024",
      prerequisites: ["Basic History"],
    },
    {
      id: 6,
      name: "Digital Art & Design",
      code: "ART-301",
      description: "Modern digital art techniques using various software tools",
      level: { id: 1, name: "السنة الأولى ثانوي" },
      teacher: "Mrs. Amina Bouazza",
      totalStudents: 20,
      enrolledStudents: 18,
      credits: 2,
      duration: "32 hours",
      status: "active",
      semester: "First Trimester 2024",
      prerequisites: ["Basic Art"],
    },
    {
      id: 7,
      name: "Physical Education",
      code: "PE-101",
      description: "Sports, fitness training, and health education",
      level: { id: 2, name: "السنة الثانية ثانوي" },
      teacher: "Coach Hassan Alaoui",
      totalStudents: 35,
      enrolledStudents: 0,
      credits: 1,
      duration: "25 hours",
      status: "upcoming",
      semester: "Second Trimester 2024",
      prerequisites: ["None"],
    },
    {
      id: 8,
      name: "Music Theory",
      code: "MUS-201",
      description:
        "Fundamentals of music theory, composition, and appreciation",
      level: { id: 3, name: "السنة الثالثة ثانوي" },
      teacher: "Mr. Youssef Tazi",
      totalStudents: 22,
      enrolledStudents: 20,
      credits: 2,
      duration: "30 hours",
      status: "active",
      semester: "First Trimester 2024",
      prerequisites: ["Basic Music"],
    },
    {
      id: 9,
      name: "Computer Science",
      code: "CS-401",
      description:
        "Programming fundamentals, algorithms, and software development",
      level: { id: 1, name: "السنة الأولى ثانوي" },
      teacher: "Dr. Omar Bennani",
      totalStudents: 28,
      enrolledStudents: 26,
      credits: 4,
      duration: "50 hours",
      status: "active",
      semester: "First Trimester 2024",
      prerequisites: ["Basic Mathematics"],
    },
    {
      id: 10,
      name: "French Language",
      code: "FREN-202",
      description: "Advanced French language skills, grammar, and conversation",
      level: { id: 2, name: "السنة الثانية ثانوي" },
      teacher: "Madame Nadia Kaci",
      totalStudents: 25,
      enrolledStudents: 23,
      credits: 3,
      duration: "42 hours",
      status: "active",
      semester: "First Trimester 2024",
      prerequisites: ["Basic French"],
    },
  ];

  const handleCreate = () => {
    router.push("/admin/modules/create");
  };

  const handleView = (moduleId) => {
    router.push(`/admin/modules/view/${moduleId}`);
  };

  const handleEdit = (moduleId) => {
    router.push(`/admin/modules/edit/${moduleId}`);
  };

  const handleDelete = (moduleId) => {
    // Handle delete logic
    toast.success("Module deleted successfully");
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Try to fetch from API
        const modulesRes = await apiCall(
          "get",
          "/api/modules/?per_page=1000",
          null,
          {
            token,
          }
        );
        const modules = modulesRes.modules || [];

        // Fetch additional data for each module if needed
        const enrichedModules = modules.map((module) => ({
          ...module,
          teacher: module.teacher || "Not assigned",
          totalStudents: module.totalStudents || 0,
          enrolledStudents: module.enrolledStudents || 0,
          status: module.status || "active",
        }));

        setRows(enrichedModules);
      } catch (err) {
        console.warn("API call failed, using dummy data:", err.message);
        toast.info("Using demo data - API not available");

        // Use dummy data as fallback
        setRows(dummyModules);
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
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };

    return (
      <Badge className={variants[status] || variants.active}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getEnrollmentStatus = (enrolled, total) => {
    const percentage = (enrolled / total) * 100;
    if (percentage >= 90) return { color: "text-red-600", text: "Full" };
    if (percentage >= 75)
      return { color: "text-orange-600", text: "Almost Full" };
    if (percentage >= 50)
      return { color: "text-yellow-600", text: "Available" };
    return { color: "text-green-600", text: "Open" };
  };

  // Calculate summary statistics
  const totalModules = dummyModules.length;
  const activeModules = dummyModules.filter(
    (m) => m.status === "active"
  ).length;
  const completedModules = dummyModules.filter(
    (m) => m.status === "completed"
  ).length;
  const totalEnrolled = dummyModules.reduce(
    (sum, m) => sum + m.enrolledStudents,
    0
  );
  const totalCapacity = dummyModules.reduce(
    (sum, m) => sum + m.totalStudents,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
            Module Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Manage academic modules and course offerings
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Modules
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {totalModules}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Active Modules
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {activeModules}
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Enrollment
                  </p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {totalEnrolled}/{totalCapacity}
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
                    Avg. Credits
                  </p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {Math.round(
                      dummyModules.reduce((sum, m) => sum + m.credits, 0) /
                        totalModules
                    )}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                  <GraduationCap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules Table */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Academic Modules
              </CardTitle>
              <ShadcnButton
                onClick={handleCreate}
                className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:from-[#667eea]/90 hover:to-[#764ba2]/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Module
              </ShadcnButton>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin h-8 w-8 text-[#667eea]" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  Loading modules...
                </span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Module</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Enrollment</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => {
                      const enrollmentStatus = getEnrollmentStatus(
                        row.enrolledStudents,
                        row.totalStudents
                      );
                      return (
                        <TableRow key={row.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage
                                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${row.name}`}
                                />
                                <AvatarFallback className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm">
                                  {row.name?.charAt(0) || "M"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium !text-gray-900 dark:text-white">
                                  {row.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                  {row.description}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="border-[#667eea]/30 text-[#667eea] dark:border-[#667eea]/50 dark:text-[#667eea] font-mono"
                            >
                              {row.code}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="border-[#764ba2]/30 text-[#764ba2] dark:border-[#764ba2]/50 dark:text-[#764ba2]"
                            >
                              {row.level?.name || "N/A"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-300">
                                {row.teacher}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                  {row.enrolledStudents}/{row.totalStudents}
                                </span>
                                <span
                                  className={`text-sm font-medium ${enrollmentStatus.color}`}
                                >
                                  {enrollmentStatus.text}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all duration-300 ${
                                    row.enrolledStudents / row.totalStudents >=
                                    0.9
                                      ? "bg-red-500"
                                      : row.enrolledStudents /
                                          row.totalStudents >=
                                        0.75
                                      ? "bg-orange-500"
                                      : "bg-green-500"
                                  }`}
                                  style={{
                                    width: `${
                                      (row.enrolledStudents /
                                        row.totalStudents) *
                                      100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-300">
                                {row.credits} credits
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(row.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <ShadcnButton
                                variant="outline"
                                size="sm"
                                onClick={() => handleView(row.id)}
                                className="border-[#667eea]/30 text-[#667eea] hover:bg-[#667eea]/10"
                              >
                                <Eye className="w-4 h-4" />
                              </ShadcnButton>
                              <ShadcnButton
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(row.id)}
                                className="border-[#764ba2]/30 text-[#764ba2] hover:bg-[#764ba2]/10"
                              >
                                <Edit className="w-4 h-4" />
                              </ShadcnButton>
                              <ShadcnButton
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(row.id)}
                                className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="w-4 h-4" />
                              </ShadcnButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
                Module Distribution
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    السنة الأولى ثانوي
                  </span>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    4
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    السنة الثانية ثانوي
                  </span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    3
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    السنة الثالثة ثانوي
                  </span>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    3
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Credit Distribution
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    1-2 Credits
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    2
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    3 Credits
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    4
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    4 Credits
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    4
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Enrollment Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Open Modules
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    3
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Almost Full
                  </span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    4
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Full Modules
                  </span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    3
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

export default AdminModulesPage;
