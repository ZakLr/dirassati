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

// Dummy data for students
const dummyStudents = [
  {
    id: 1,
    first_name: "Ahmed",
    last_name: "Ali",
    email: "ahmed.ali@student.school.dz",
    phone_number: "+213 555 123 456",
    address: "Independence Street, Algiers",
    grade_level: "Second Year High School",
    profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
    date_of_birth: "2005-03-15",
    enrollment_date: "2022-09-01",
    status: "active",
    parent_id: 1,
    group_id: 1,
  },
  {
    id: 2,
    first_name: "Fatima",
    last_name: "Ben Omar",
    email: "fatima.benomar@student.school.dz",
    phone_number: "+213 555 234 567",
    address: "Riyadh District, Oran",
    grade_level: "Third Year High School",
    profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatma",
    date_of_birth: "2004-07-22",
    enrollment_date: "2021-09-01",
    status: "active",
    parent_id: 2,
    group_id: 2,
  },
  {
    id: 3,
    first_name: "Mohamed",
    last_name: "Kheroubi",
    email: "mohamed.kheroubi@student.school.dz",
    phone_number: "+213 555 345 678",
    address: "Constantine City, Constantine",
    grade_level: "First Year High School",
    profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohamed",
    date_of_birth: "2006-01-10",
    enrollment_date: "2023-09-01",
    status: "active",
    parent_id: 3,
    group_id: 1,
  },
  {
    id: 4,
    first_name: "Leila",
    last_name: "Bouziane",
    email: "leila.bouziane@student.school.dz",
    phone_number: "+213 555 456 789",
    address: "Muradia District, Algiers",
    grade_level: "Second Year High School",
    profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=leila",
    date_of_birth: "2005-11-08",
    enrollment_date: "2022-09-01",
    status: "active",
    parent_id: 4,
    group_id: 3,
  },
  {
    id: 5,
    first_name: "Yassine",
    last_name: "Saghir",
    email: "yassine.saghir@student.school.dz",
    phone_number: "+213 555 567 890",
    address: "Setif City, Setif",
    grade_level: "Third Year High School",
    profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=yassine",
    date_of_birth: "2004-05-30",
    enrollment_date: "2021-09-01",
    status: "active",
    parent_id: 5,
    group_id: 2,
  },
];

export default function StudentProfile({ params }) {
  const { id } = use(params);
  const token = useSelector((state) => state.auth.accessToken);
  const router = useRouter();

  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await apiCall("get", `/api/students/${id}`, null, {
          token,
        });
        setStudent(response.student);
      } catch (error) {
        console.warn("API call failed, using dummy data:", error.message);
        toast.info("Using demo data - API not available");

        // Use dummy data as fallback
        const dummyStudent = dummyStudents.find(
          (s) => s.id.toString() === id.toString()
        );
        if (dummyStudent) {
          setStudent(dummyStudent);
        } else {
          toast.error("Student not found in demo data.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [id, token]);

  const accentColor = "#60A5FA";
  const bgGradient = `linear-gradient(135deg, ${accentColor}33, ${accentColor})`;

  // Chart Configs (STATIC)
  const performanceChart = {
    options: {
      chart: { id: "performance" },
      labels: ["Math", "Science", "English", "History", "Art"],
    },
    series: [85, 78, 90, 72, 88],
  };

  const attendanceChart = {
    options: {
      chart: { id: "attendance" },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
      colors: [accentColor],
    },
    series: [{ name: "Attendance", data: [95, 92, 88, 94, 90] }],
  };

  const engagementChart = {
    options: {
      chart: { id: "engagement" },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
      colors: ["#34D399"],
    },
    series: [{ name: "Engagement", data: [20, 40, 60, 50, 70] }],
  };

  const gradeDistributionChart = {
    options: {
      labels: ["A", "B", "C", "D", "F"],
      colors: ["#22C55E", "#3B82F6", "#F59E0B", "#F97316", "#EF4444"],
    },
    series: [30, 40, 20, 7, 3],
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#667eea] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading student data...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-4 min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl max-w-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white text-center">
              Student Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              The requested student data could not be found
            </p>
            <ShadcnButton
              onClick={() => router.push("/admin/students")}
              className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:from-[#667eea]/90 hover:to-[#764ba2]/90 text-white"
            >
              Back to Students
            </ShadcnButton>
          </CardContent>
        </Card>
      </div>
    );
  }

  const fullName = `${student.first_name} ${student.last_name}`;
  const profileImg = student.profile_picture?.startsWith("http")
    ? student.profile_picture
    : `/${student.profile_picture}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto p-6 max-w-6xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-8">
          Student Personal Profile
        </h1>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <div className="relative">
            <div className="h-32 w-full" style={{ background: bgGradient }} />
            <Avatar className="absolute top-16 left-6 w-24 h-24 border-4 border-background shadow-lg">
              <AvatarImage src={profileImg} alt={fullName} />
              <AvatarFallback className="bg-secondary text-background text-2xl">
                {student.first_name?.charAt(0)}
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
                <p className="text-lg text-gray-600 mb-4">{student.email}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-1">Phone:</p>
                <p className="text-lg text-gray-600 mb-4">
                  {student.phone_number}
                </p>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-1">Address:</p>
                <p className="text-lg text-gray-600 mb-4">{student.address}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-1">Grade Level:</p>
                <p className="text-lg text-gray-600 mb-4">
                  {student.grade_level}
                </p>
              </div>
            </div>

            <div className="rounded-lg p-4 border border-gray-200 bg-gray-50/50">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Grade Distribution
              </h3>
              <Chart
                options={gradeDistributionChart.options}
                series={gradeDistributionChart.series}
                type="donut"
                height={250}
              />
            </div>
          </CardContent>

          <CardContent className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50/50">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Academic Performance
              </h3>
              <Chart
                options={performanceChart.options}
                series={[performanceChart.series]}
                type="radar"
                height={250}
              />
            </div>

            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50/50">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Attendance Over Time
              </h3>
              <Chart
                options={attendanceChart.options}
                series={attendanceChart.series}
                type="bar"
                height={250}
              />
            </div>
          </CardContent>

          <CardContent className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50/50">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Engagement Over Time
              </h3>
              <Chart
                options={engagementChart.options}
                series={engagementChart.series}
                type="line"
                height={250}
              />
            </div>

            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50/50">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Satisfaction Survey
              </h3>
              <Chart
                options={gradeDistributionChart.options}
                series={gradeDistributionChart.series}
                type="pie"
                height={250}
              />
            </div>
          </CardContent>

          <CardContent>
            <div className="flex justify-end mt-6">
              <ShadcnButton
                onClick={() => router.push("/admin/students")}
                className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:from-[#667eea]/90 hover:to-[#764ba2]/90 text-white"
              >
                Back to Students
              </ShadcnButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
