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
} from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function TeacherProfilePage() {
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
  });

  // Dummy data for fallback
  const dummyProfile = {
    first_name: "Sarah",
    last_name: "Johnson",
    email: "sarah.johnson@school.edu",
    phone_number: "+1 (555) 123-4567",
    address: "123 Education Street, Academic City, AC 12345",
    profile_picture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    archived: false,
    created_at: "2023-09-01T00:00:00Z",
    updated_at: "2024-01-15T10:30:00Z",
  };

  // Dummy stats for demonstration
  const teacherStats = {
    totalStudents: 45,
    subjectsTaught: ["Mathematics", "Physics", "Chemistry"],
    classesThisWeek: 12,
    averageRating: 4.8,
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
      await apiCall("PUT", "/api/teachers/me", payload, { token });
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
  const teacherName = `${profile.first_name} ${profile.last_name}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea]/10 via-white to-[#764ba2]/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Manage your personal and professional information
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
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                }
                alt={teacherName}
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
                    {teacherName}
                  </h2>
                  <div className="space-y-2">
                    <Badge
                      variant="secondary"
                      className="bg-[#667eea]/10 text-[#667eea] dark:bg-[#667eea]/20 dark:text-[#667eea]"
                    >
                      Teacher
                    </Badge>
                    <Badge
                      variant={profile.archived ? "destructive" : "outline"}
                      className={
                        profile.archived
                          ? ""
                          : "border-[#764ba2]/30 text-[#764ba2] dark:border-[#764ba2]/50 dark:text-[#764ba2]"
                      }
                    >
                      {profile.archived ? "Archived" : "Active"}
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
                      {teacherStats.totalStudents}
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Total Students
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {teacherStats.subjectsTaught.length}
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Subjects
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {teacherStats.classesThisWeek}
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Classes This Week
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                      {teacherStats.averageRating}
                    </div>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Average Rating
                    </p>
                  </CardContent>
                </Card>
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
            <TabsList className="grid w-full grid-cols-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg rounded-xl p-1">
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
            </TabsList>

            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      Teaching Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Total Students
                        </span>
                        <Badge variant="secondary">
                          {teacherStats.totalStudents}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Classes This Week
                        </span>
                        <Badge variant="secondary">
                          {teacherStats.classesThisWeek}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Average Rating
                        </span>
                        <Badge variant="secondary">
                          {teacherStats.averageRating}/5.0
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
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="subjects">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    Subjects Taught
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teacherStats.subjectsTaught.map((subject, index) => (
                      <Card
                        key={index}
                        className="bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 dark:from-[#667eea]/20 dark:to-[#764ba2]/20 border-[#667eea]/20 dark:border-[#667eea]/30"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-8 h-8 text-[#667eea]" />
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {subject}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Advanced Level
                              </p>
                            </div>
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
                        time: "9:00 AM - 10:30 AM",
                        subject: "Mathematics",
                        grade: "السنة الأولى ثانوي A",
                      },
                      {
                        day: "Tuesday",
                        time: "11:00 AM - 12:30 PM",
                        subject: "Physics",
                        grade: "السنة الثانية ثانوي B",
                      },
                      {
                        day: "Wednesday",
                        time: "2:00 PM - 3:30 PM",
                        subject: "Chemistry",
                        grade: "السنة التاسعة متوسط C",
                      },
                      {
                        day: "Thursday",
                        time: "10:00 AM - 11:30 AM",
                        subject: "Mathematics",
                        grade: "السنة الثالثة ثانوي A",
                      },
                      {
                        day: "Friday",
                        time: "1:00 PM - 2:30 PM",
                        subject: "Physics",
                        grade: "السنة الأولى ثانوي B",
                      },
                    ].map((schedule, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Calendar className="w-5 h-5 text-[#667eea]" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {schedule.day} - {schedule.subject}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {schedule.time} • {schedule.grade}
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
          </Tabs>
        )}
      </div>
    </div>
  );
}
