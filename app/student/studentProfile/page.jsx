"use client";

import { useEffect, useState } from "react";
import apiCall from "@/components/utils/apiCall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Image as ImageIcon,
  Calendar,
  Edit3,
  BookOpen,
  Users,
  AlertCircle,
  CheckCircle,
  GraduationCap,
  Award,
  Clock,
} from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function StudentProfilePage() {
  const token = useSelector((state) => state.auth.accessToken);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    profile_picture: "",
    archived: false,
    created_at: "",
    updated_at: "",
    level: "",
    group_name: "",
    parent_name: "",
    parent_email: "",
    parent_phone: "",
  });

  // Dummy data for fallback
  const dummyProfile = {
    first_name: "Ahmed",
    last_name: "Ben Ali",
    email: "ahmed.benali@student.school.edu",
    phone_number: "+213 555 123 456",
    address: "15 Rue des Étudiants, Tlemcen, Algeria",
    profile_picture:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    archived: false,
    created_at: "2023-09-01T00:00:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    level: "السنة الأولى ثانوي",
    group_name: "Groupe A",
    parent_name: "Mohammed Ben Ali",
    parent_email: "mohammed.benali@email.com",
    parent_phone: "+213 555 987 654",
  };

  // Dummy stats for demonstration
  const studentStats = {
    totalSubjects: 8,
    attendanceRate: 95,
    averageGrade: 16.5,
    completedAssignments: 42,
    upcomingExams: 3,
    totalCredits: 120,
  };

  // Algerian education levels mapping
  const algerianLevels = {
    "السنة الأولى ابتدائي": "1st Year Primary",
    "السنة الثانية ابتدائي": "2nd Year Primary",
    "السنة الثالثة ابتدائي": "3rd Year Primary",
    "السنة الرابعة ابتدائي": "4th Year Primary",
    "السنة الخامسة ابتدائي": "5th Year Primary",
    "السنة السادسة ابتدائي": "6th Year Primary",
    "السنة الأولى متوسط": "1st Year Middle School",
    "السنة الثانية متوسط": "2nd Year Middle School",
    "السنة الثالثة متوسط": "3rd Year Middle School",
    "السنة الرابعة متوسط": "4th Year Middle School",
    "السنة الأولى ثانوي": "1st Year Secondary",
    "السنة الثانية ثانوي": "2nd Year Secondary",
    "السنة الثالثة ثانوي": "3rd Year Secondary",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Simulate API delay and use dummy data
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProfile(dummyProfile);
        toast.info("Using demo data - API not available");
      } catch (err) {
        console.warn("API call failed, using dummy data:", err.message);
        // Use dummy data as fallback
        setProfile(dummyProfile);
        toast.info("Using demo data - API not available");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { archived, created_at, updated_at, ...payload } = profile;
      await apiCall("PUT", "/api/students/me", payload, { token });
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      toast.error("Error updating profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl rounded-xl">
          <CardContent className="p-8 text-center">
            <Loader2 className="animate-spin h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">
              Loading your profile...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const accentColor = "#667eea";
  const secondaryColor = "#764ba2";
  const primaryGradient = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  const studentName = `${profile.first_name} ${profile.last_name}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea]/10 via-white to-[#764ba2]/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Manage your personal information and academic progress
          </p>
        </div>

        {/* Profile Card */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <div className="relative">
            <div
              className="h-40 w-full bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#667eea]"
              style={{
                background: `linear-gradient(135deg, #667eea20, #764ba260, #667eea)`,
              }}
            />
            <Avatar className="absolute -bottom-12 left-8 w-24 h-24 border-4 border-white dark:border-gray-800 shadow-xl">
              <AvatarImage
                src={
                  profile.profile_picture ||
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                }
                alt={studentName}
              />
              <AvatarFallback className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-2xl font-bold">
                {profile.first_name?.charAt(0) || <User className="w-8 h-8" />}
              </AvatarFallback>
            </Avatar>
            {!isEditing && (
              <ShadcnButton
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 border-0 shadow-lg"
                size="sm"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </ShadcnButton>
            )}
          </div>

          <CardContent className="pt-16 pb-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Basic Info */}
              <div className="md:col-span-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {studentName}
                  </h2>
                  <div className="space-y-2">
                    <Badge
                      variant="secondary"
                      className="bg-[#667eea]/10 text-[#667eea] dark:bg-[#667eea]/20 dark:text-[#667eea]"
                    >
                      Student
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-[#764ba2]/30 text-[#764ba2] dark:border-[#764ba2]/50 dark:text-[#764ba2]"
                    >
                      {profile.level}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-green-500/30 text-green-600 dark:border-green-500/50 dark:text-green-400"
                    >
                      {profile.group_name}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {profile.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">
                        Phone
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {profile.phone_number || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">
                        Address
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {profile.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                      {studentStats.averageGrade}/20
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Average Grade
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {studentStats.attendanceRate}%
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Attendance Rate
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {studentStats.completedAssignments}
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Completed Assignments
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                      {studentStats.upcomingExams}
                    </div>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Upcoming Exams
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parent Information Card */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Parent Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      Parent Name
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {profile.parent_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      Parent Email
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {profile.parent_email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      Parent Phone
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {profile.parent_phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.parent_name}`}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
                      {profile.parent_name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "P"}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Emergency Contact
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form or Details Tabs */}
        {isEditing ? (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={profile.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={profile.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    value={profile.phone_number}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="profile_picture">Profile Picture URL</Label>
                  <Input
                    id="profile_picture"
                    name="profile_picture"
                    type="url"
                    value={profile.profile_picture}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    Created:{" "}
                    {profile.created_at
                      ? new Date(profile.created_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p>
                    Updated:{" "}
                    {profile.updated_at
                      ? new Date(profile.updated_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <ShadcnButton
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    disabled={submitting}
                  >
                    Cancel
                  </ShadcnButton>
                  <ShadcnButton
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:from-[#667eea]/90 hover:to-[#764ba2]/90 text-white"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </ShadcnButton>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg rounded-xl p-1">
              <TabsTrigger
                value="overview"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#667eea] data-[state=active]:to-[#764ba2] data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="subjects"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#667eea] data-[state=active]:to-[#764ba2] data-[state=active]:text-white"
              >
                Subjects
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#667eea] data-[state=active]:to-[#764ba2] data-[state=active]:text-white"
              >
                Schedule
              </TabsTrigger>
              <TabsTrigger
                value="grades"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#667eea] data-[state=active]:to-[#764ba2] data-[state=active]:text-white"
              >
                Grades
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      Academic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Current Level
                        </span>
                        <Badge variant="secondary">{profile.level}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Group
                        </span>
                        <Badge variant="secondary">{profile.group_name}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Total Subjects
                        </span>
                        <Badge variant="secondary">
                          {studentStats.totalSubjects}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Total Credits
                        </span>
                        <Badge variant="secondary">
                          {studentStats.totalCredits}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      Account Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Profile Complete
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Email Verified
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        {profile.archived ? (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        <span className="text-gray-600 dark:text-gray-400">
                          {profile.archived
                            ? "Account Archived"
                            : "Account Active"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Academic Year 2024-2025
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="subjects">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    Current Subjects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        name: "Mathematics",
                        teacher: "Ms. Sarah Johnson",
                        grade: 17.5,
                      },
                      {
                        name: "Arabic Language",
                        teacher: "Mr. Ahmed Hassan",
                        grade: 16.0,
                      },
                      {
                        name: "French",
                        teacher: "Ms. Leila Tazi",
                        grade: 15.5,
                      },
                      {
                        name: "English",
                        teacher: "Mr. David Wilson",
                        grade: 18.0,
                      },
                      {
                        name: "Physics",
                        teacher: "Dr. Maria Garcia",
                        grade: 16.5,
                      },
                      {
                        name: "Chemistry",
                        teacher: "Mr. Karim El Fassi",
                        grade: 15.0,
                      },
                      {
                        name: "History",
                        teacher: "Mr. Omar Alaoui",
                        grade: 17.0,
                      },
                      {
                        name: "Geography",
                        teacher: "Ms. Fatima Bennani",
                        grade: 16.5,
                      },
                    ].map((subject, index) => (
                      <Card
                        key={index}
                        className="bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 dark:from-[#667eea]/20 dark:to-[#764ba2]/20 border-[#667eea]/20 dark:border-[#667eea]/30"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <BookOpen className="w-8 h-8 text-[#667eea]" />
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  {subject.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {subject.teacher}
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            >
                              {subject.grade}/20
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    Weekly Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        day: "Monday",
                        time: "08:00 - 09:30",
                        subject: "Mathematics",
                        room: "Room 101",
                      },
                      {
                        day: "Monday",
                        time: "10:00 - 11:30",
                        subject: "Arabic Language",
                        room: "Room 203",
                      },
                      {
                        day: "Tuesday",
                        time: "08:00 - 09:30",
                        subject: "French",
                        room: "Room 105",
                      },
                      {
                        day: "Tuesday",
                        time: "10:00 - 11:30",
                        subject: "English",
                        room: "Lab 1",
                      },
                      {
                        day: "Wednesday",
                        time: "08:00 - 09:30",
                        subject: "Physics",
                        room: "Room 101",
                      },
                      {
                        day: "Wednesday",
                        time: "10:00 - 11:30",
                        subject: "Chemistry",
                        room: "Lab 2",
                      },
                      {
                        day: "Thursday",
                        time: "08:00 - 09:30",
                        subject: "History",
                        room: "Room 203",
                      },
                      {
                        day: "Thursday",
                        time: "10:00 - 11:30",
                        subject: "Geography",
                        room: "Room 105",
                      },
                    ].map((schedule, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Clock className="w-5 h-5 text-[#667eea]" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {schedule.day} - {schedule.subject}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {schedule.time} • {schedule.room}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-[#764ba2]/30 text-[#764ba2] dark:border-[#764ba2]/50 dark:text-[#764ba2]"
                        >
                          Scheduled
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grades">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    Grade Report - Current Semester
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        subject: "Mathematics",
                        grade: 17.5,
                        coefficient: 3,
                        status: "Excellent",
                      },
                      {
                        subject: "Arabic Language",
                        grade: 16.0,
                        coefficient: 2,
                        status: "Very Good",
                      },
                      {
                        subject: "French",
                        grade: 15.5,
                        coefficient: 2,
                        status: "Good",
                      },
                      {
                        subject: "English",
                        grade: 18.0,
                        coefficient: 2,
                        status: "Excellent",
                      },
                      {
                        subject: "Physics",
                        grade: 16.5,
                        coefficient: 3,
                        status: "Very Good",
                      },
                      {
                        subject: "Chemistry",
                        grade: 15.0,
                        coefficient: 2,
                        status: "Good",
                      },
                      {
                        subject: "History",
                        grade: 17.0,
                        coefficient: 2,
                        status: "Excellent",
                      },
                      {
                        subject: "Geography",
                        grade: 16.5,
                        coefficient: 2,
                        status: "Very Good",
                      },
                    ].map((grade, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <GraduationCap className="w-6 h-6 text-[#667eea]" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {grade.subject}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Coefficient: {grade.coefficient}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {grade.grade}/20
                          </div>
                          <Badge
                            variant="secondary"
                            className={`${
                              grade.status === "Excellent"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : grade.status === "Very Good"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            }`}
                          >
                            {grade.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 dark:from-[#667eea]/20 dark:to-[#764ba2]/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        Semester Average
                      </span>
                      <span className="text-2xl font-bold text-[#667eea]">
                        {studentStats.averageGrade}/20
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
