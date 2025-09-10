"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { toast } from "sonner";

import apiCall from "@/components/utils/apiCall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Dummy data for teachers
const dummyTeachers = [
  {
    id: 1,
    first_name: "Ahmed",
    last_name: "Ali",
    email: "ahmed.ali@school.dz",
    phone_number: "+213 555 123 456",
    address: "Independence Street, Algiers",
    profile_picture:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed-teacher",
    date_of_birth: "1980-03-15",
    created_at: "2015-09-01",
    status: "active",
    specialization: "Mathematics",
    experience_years: 15,
  },
  {
    id: 2,
    first_name: "Fatima",
    last_name: "Ben Omar",
    email: "fatima.benomar@school.dz",
    phone_number: "+213 555 234 567",
    address: "Riyadh District, Oran",
    profile_picture:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=fatma-teacher",
    date_of_birth: "1982-07-22",
    created_at: "2016-09-01",
    status: "active",
    specialization: "Physics",
    experience_years: 12,
  },
  {
    id: 3,
    first_name: "Mohamed",
    last_name: "Kheroubi",
    email: "mohamed.kheroubi@school.dz",
    phone_number: "+213 555 345 678",
    address: "Constantine City, Constantine",
    profile_picture:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=mohamed-teacher",
    date_of_birth: "1978-01-10",
    created_at: "2012-09-01",
    status: "active",
    specialization: "Chemistry",
    experience_years: 18,
  },
  {
    id: 4,
    first_name: "Leila",
    last_name: "Bouziane",
    email: "leila.bouziane@school.dz",
    phone_number: "+213 555 456 789",
    address: "Muradia District, Algiers",
    profile_picture:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=leila-teacher",
    date_of_birth: "1985-11-08",
    created_at: "2018-09-01",
    status: "active",
    specialization: "English",
    experience_years: 8,
  },
  {
    id: 5,
    first_name: "Yassine",
    last_name: "Saghir",
    email: "yassine.saghir@school.dz",
    phone_number: "+213 555 567 890",
    address: "Setif City, Setif",
    profile_picture:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=yassine-teacher",
    date_of_birth: "1975-05-30",
    created_at: "2010-09-01",
    status: "active",
    specialization: "History",
    experience_years: 22,
  },
];

export default function TeacherProfile({ params }) {
  const { id } = use(params);
  const token = useSelector((state) => state.auth.accessToken);
  const router = useRouter();

  const [teacher, setTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await apiCall("get", `/api/teachers/${id}`, null, {
          token,
        });
        setTeacher(response.teacher);
      } catch (error) {
        console.warn("API call failed, using dummy data:", error.message);
        toast.info("Using demo data - API not available");

        // Use dummy data as fallback
        const dummyTeacher = dummyTeachers.find(
          (t) => t.id.toString() === id.toString()
        );
        if (dummyTeacher) {
          setTeacher(dummyTeacher);
        } else {
          toast.error("Teacher not found in demo data.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeacher();
  }, [id, token]);

  const accentColor = "#4FD1C5";
  const bgGradient = `linear-gradient(135deg, ${accentColor}33, ${accentColor})`;

  // Chart Configs (STATIC)
  const teachingActivityChart = {
    options: {
      chart: { id: "teaching-activity" },
      xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
      colors: [accentColor],
    },
    series: [{ name: "Sessions", data: [3, 4, 2, 5, 4] }],
  };

  const moduleDistributionChart = {
    options: {
      labels: ["Math", "Science", "English", "History", "Art"],
      colors: ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"],
    },
    series: [25, 20, 15, 25, 15],
  };

  const feedbackChart = {
    options: {
      chart: { id: "feedback" },
      labels: [
        "Clarity",
        "Punctuality",
        "Knowledge",
        "Support",
        "Communication",
      ],
    },
    series: [90, 85, 95, 88, 92],
  };

  const hoursTaughtChart = {
    options: {
      chart: { id: "teaching-hours" },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
      colors: ["#A855F7"],
    },
    series: [{ name: "Hours", data: [40, 48, 50, 45, 60] }],
  };

  const attendanceChart = {
    options: {
      labels: ["Present", "Absent", "Late"],
      colors: ["#10B981", "#EF4444", "#F59E0B"],
    },
    series: [90, 5, 5],
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4FD1C5] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading teacher data...</p>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="p-4 min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl max-w-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white text-center">
              Teacher not found
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">Teacher data not found</p>
            <ShadcnButton
              onClick={() => router.push("/admin/teachers")}
              className="bg-gradient-to-r from-[#4FD1C5] to-[#38B2AC] hover:from-[#4FD1C5]/90 hover:to-[#38B2AC]/90 text-white"
            >
              Back to teachers list
            </ShadcnButton>
          </CardContent>
        </Card>
      </div>
    );
  }

  const fullName = `${teacher.first_name} ${teacher.last_name}`;
  const profileImg = teacher.profile_picture?.startsWith("http")
    ? teacher.profile_picture
    : `/${teacher.profile_picture}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto p-6 max-w-6xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4FD1C5] to-[#38B2AC] bg-clip-text text-transparent mb-8">
          Teacher Profile
        </h1>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <div className="relative">
            <div className="h-32 w-full" style={{ background: bgGradient }} />
            <Avatar className="absolute top-16 left-6 w-24 h-24 border-4 border-background shadow-lg">
              <AvatarImage src={profileImg} alt={fullName} />
              <AvatarFallback className="bg-secondary text-background text-2xl">
                {teacher.first_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <CardHeader className="pt-20">
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              {fullName}
            </CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700 mb-1">Email:</p>
                <p className="text-lg text-gray-600 mb-4">{teacher.email}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-1">Phone:</p>
                <p className="text-lg text-gray-600 mb-4">
                  {teacher.phone_number}
                </p>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-1">Address:</p>
                <p className="text-lg text-gray-600 mb-4">{teacher.address}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-1">Join Date:</p>
                <p className="text-lg text-gray-600 mb-4">
                  {new Date(teacher.created_at).toLocaleDateString("ar-DZ")}
                </p>
              </div>

              {teacher.specialization && (
                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    Specialization:
                  </p>
                  <p className="text-lg text-gray-600 mb-4">
                    {teacher.specialization}
                  </p>
                </div>
              )}

              {teacher.experience_years && (
                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    Years of Experience:
                  </p>
                  <p className="text-lg text-gray-600 mb-4">
                    {teacher.experience_years} years
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-lg p-4 border border-gray-200 bg-gray-50/50">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Module Distribution
              </h3>
              <Chart
                options={moduleDistributionChart.options}
                series={moduleDistributionChart.series}
                type="donut"
                height={250}
              />
            </div>
          </CardContent>

          <CardContent className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50/50">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Teaching Activity (Weekly)
              </h3>
              <Chart
                options={teachingActivityChart.options}
                series={teachingActivityChart.series}
                type="bar"
                height={250}
              />
            </div>

            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50/50">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Student Feedback
              </h3>
              <Chart
                options={feedbackChart.options}
                series={[feedbackChart.series]}
                type="radar"
                height={250}
              />
            </div>
          </CardContent>

          <CardContent className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50/50">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Teaching Hours (Monthly)
              </h3>
              <Chart
                options={hoursTaughtChart.options}
                series={hoursTaughtChart.series}
                type="area"
                height={250}
              />
            </div>

            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50/50">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Attendance Overview
              </h3>
              <Chart
                options={attendanceChart.options}
                series={attendanceChart.series}
                type="pie"
                height={250}
              />
            </div>
          </CardContent>

          <CardContent>
            <div className="flex justify-end mt-6">
              <ShadcnButton
                onClick={() => router.push("/admin/teachers")}
                className="bg-gradient-to-r from-[#4FD1C5] to-[#38B2AC] hover:from-[#4FD1C5]/90 hover:to-[#38B2AC]/90 text-white"
              >
                Back to teachers list
              </ShadcnButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
