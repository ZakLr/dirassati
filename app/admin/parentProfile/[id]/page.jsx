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

// Dummy data for parents
const dummyParents = [
  {
    id: 1,
    first_name: "Ahmed",
    last_name: "Ali",
    email: "ahmed.ali.parent@school.dz",
    phone_number: "+213 555 123 456",
    address: "Independence Street, Algiers",
    profile_picture:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed-parent",
    date_of_birth: "1975-03-15",
    created_at: "2020-09-01",
    status: "active",
    children: [
      {
        id: 1,
        first_name: "Mohamed",
        last_name: "Ali",
        grade_level: "2nd Year Secondary",
      },
      {
        id: 2,
        first_name: "Fatima",
        last_name: "Ali",
        grade_level: "1st Year Secondary",
      },
    ],
    occupation: "Engineer",
  },
  {
    id: 2,
    first_name: "Fatima",
    last_name: "Ben Omar",
    email: "fatima.benomar.parent@school.dz",
    phone_number: "+213 555 234 567",
    address: "Riyadh District, Oran",
    profile_picture:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=fatma-parent",
    date_of_birth: "1978-07-22",
    created_at: "2021-09-01",
    status: "active",
    children: [
      {
        id: 3,
        first_name: "Leila",
        last_name: "Ben Omar",
        grade_level: "3rd Year Secondary",
      },
    ],
    occupation: "Teacher",
  },
  {
    id: 3,
    first_name: "Mohamed",
    last_name: "Kheroubi",
    email: "mohamed.kheroubi.parent@school.dz",
    phone_number: "+213 555 345 678",
    address: "Constantine City, Constantine",
    profile_picture:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=mohamed-parent",
    date_of_birth: "1972-01-10",
    created_at: "2019-09-01",
    status: "active",
    children: [
      {
        id: 4,
        first_name: "Yassine",
        last_name: "Kheroubi",
        grade_level: "2nd Year Secondary",
      },
      {
        id: 5,
        first_name: "Sarah",
        last_name: "Kheroubi",
        grade_level: "1st Year Secondary",
      },
    ],
    occupation: "Doctor",
  },
  {
    id: 4,
    first_name: "Leila",
    last_name: "Bouziane",
    email: "leila.bouziane.parent@school.dz",
    phone_number: "+213 555 456 789",
    address: "Muradia District, Algiers",
    profile_picture:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=leila-parent",
    date_of_birth: "1980-11-08",
    created_at: "2022-09-01",
    status: "active",
    children: [
      {
        id: 6,
        first_name: "Amin",
        last_name: "Bouziane",
        grade_level: "3rd Year Secondary",
      },
    ],
    occupation: "Lawyer",
  },
  {
    id: 5,
    first_name: "Yassine",
    last_name: "Saghir",
    email: "yassine.saghir.parent@school.dz",
    phone_number: "+213 555 567 890",
    address: "Setif City, Setif",
    profile_picture:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=yassine-parent",
    date_of_birth: "1970-05-30",
    created_at: "2018-09-01",
    status: "active",
    children: [
      {
        id: 7,
        first_name: "Nour",
        last_name: "Saghir",
        grade_level: "2nd Year Secondary",
      },
    ],
    occupation: "Businessman",
  },
];

export default function ParentProfile({ params }) {
  const { id } = use(params);
  const token = useSelector((state) => state.auth.accessToken);
  const router = useRouter();

  const [parent, setParent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchParent = async () => {
      try {
        const response = await apiCall("get", `/api/parents/${id}`, null, {
          token,
        });
        setParent(response.parent);
      } catch (error) {
        console.warn("API call failed, using dummy data:", error.message);
        toast.info("Using demo data - API not available");

        // Use dummy data as fallback
        const dummyParent = dummyParents.find(
          (p) => p.id.toString() === id.toString()
        );
        if (dummyParent) {
          setParent(dummyParent);
        } else {
          toast.error("Parent not found in demo data.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchParent();
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

  const meetingsChart = {
    options: {
      chart: { id: "meetings" },
      xaxis: { categories: ["Q1", "Q2", "Q3", "Q4"] },
      colors: [accentColor],
    },
    series: [{ name: "Meetings", data: [2, 3, 1, 4] }],
  };

  const engagementChart = {
    options: {
      chart: { id: "engagement" },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
      colors: ["#34D399"],
    },
    series: [{ name: "Engagement", data: [20, 40, 60, 50, 70] }],
  };

  const satisfactionChart = {
    options: {
      labels: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
      colors: ["#10B981", "#60A5FA", "#FBBF24", "#EF4444"],
    },
    series: [45, 35, 15, 5],
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#60A5FA] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading parent data...</p>
        </div>
      </div>
    );
  }

  if (!parent) {
    return (
      <div className="p-4 min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl max-w-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white text-center">
              Parent not found
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">Parent data not found</p>
            <ShadcnButton
              onClick={() => router.push("/admin/parents")}
              className="bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] hover:from-[#60A5FA]/90 hover:to-[#3B82F6]/90 text-white"
            >
              Back to parents list
            </ShadcnButton>
          </CardContent>
        </Card>
      </div>
    );
  }

  const fullName = `${parent.first_name} ${parent.last_name}`;
  const profileImg = parent.profile_picture?.startsWith("http")
    ? parent.profile_picture
    : `/${parent.profile_picture}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto p-6 max-w-6xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent mb-8">
          Parent Profile
        </h1>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <div className="relative">
            <div className="h-32 w-full" style={{ background: bgGradient }} />
            <Avatar className="absolute top-16 left-6 w-24 h-24 border-4 border-background shadow-lg">
              <AvatarImage src={profileImg} alt={fullName} />
              <AvatarFallback className="bg-secondary text-background text-2xl">
                {parent.first_name?.charAt(0)}
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
                <p className="text-lg text-gray-600 mb-4">{parent.email}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-1">Phone:</p>
                <p className="text-lg text-gray-600 mb-4">
                  {parent.phone_number}
                </p>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-1">Address:</p>
                <p className="text-lg text-gray-600 mb-4">{parent.address}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-1">
                  Number of Children:
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  {parent.children?.length || 0} student
                  {parent.children?.length !== 1 ? "s" : ""}
                </p>
              </div>

              {parent.occupation && (
                <div>
                  <p className="font-medium text-gray-700 mb-1">Occupation:</p>
                  <p className="text-lg text-gray-600 mb-4">
                    {parent.occupation}
                  </p>
                </div>
              )}

              {parent.children && parent.children.length > 0 && (
                <div>
                  <p className="font-medium text-gray-700 mb-2">Children:</p>
                  <div className="space-y-2">
                    {parent.children.map((child, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded-lg">
                        <p className="text-sm font-medium">
                          {child.first_name} {child.last_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {child.grade_level}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-lg p-4 border border-gray-200 bg-gray-50/50">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Children's Grade Distribution
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
                Student Performance
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
                Parental Meetings (Quarterly)
              </h3>
              <Chart
                options={meetingsChart.options}
                series={meetingsChart.series}
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
                options={satisfactionChart.options}
                series={satisfactionChart.series}
                type="pie"
                height={250}
              />
            </div>
          </CardContent>

          <CardContent>
            <div className="flex justify-end mt-6">
              <ShadcnButton
                onClick={() => router.push("/admin/parents")}
                className="bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] hover:from-[#60A5FA]/90 hover:to-[#3B82F6]/90 text-white"
              >
                Back to parents list
              </ShadcnButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
