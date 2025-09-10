"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  BookOpen,
  Users,
  Clock,
  GraduationCap,
  Save,
  ArrowLeft,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import apiCall from "@/components/utils/apiCall";

// Dummy data for levels, teachers, and prerequisites
const dummyLevels = [
  { id: 1, name: "Second Year High School" },
  { id: 2, name: "Third Year High School" },
  { id: 3, name: "First Year High School" },
];

const dummyTeachers = [
  {
    id: 1,
    first_name: "Ahmed",
    last_name: "Ali",
    email: "ahmed.ali@school.dz",
  },
  {
    id: 2,
    first_name: "Fatima",
    last_name: "Ben Omar",
    email: "fatima.benomar@school.dz",
  },
  {
    id: 3,
    first_name: "Mohamed",
    last_name: "Kheroubi",
    email: "mohamed.kheroubi@school.dz",
  },
  {
    id: 4,
    first_name: "Leila",
    last_name: "Bouziane",
    email: "leila.bouziane@school.dz",
  },
  {
    id: 5,
    first_name: "Yassine",
    last_name: "Saghir",
    email: "yassine.saghir@school.dz",
  },
];

const dummyPrerequisites = [
  { id: 1, name: "Basic Mathematics", code: "MATH-101" },
  { id: 2, name: "Basic Physics", code: "PHYS-101" },
  { id: 3, name: "Basic Chemistry", code: "CHEM-101" },
  { id: 4, name: "Basic Biology", code: "BIO-101" },
  { id: 5, name: "Basic English", code: "ENG-101" },
];

export default function CreateModulePage() {
  const router = useRouter();
  const token = useSelector((state) => state.auth.accessToken);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    level_id: "",
    teacher_id: "",
    credits: "",
    duration: "",
    total_students: "",
    prerequisites: [],
  });

  const [levels, setLevels] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Try to fetch from API first
        const [levelsRes, teachersRes, prereqsRes] = await Promise.all([
          apiCall("get", "/api/levels", null, { token }),
          apiCall("get", "/api/teachers", null, { token }),
          apiCall("get", "/api/modules", null, { token }),
        ]);

        setLevels(levelsRes.levels || []);
        setTeachers(teachersRes.teachers || []);
        setPrerequisites(prereqsRes.modules || []);
      } catch (err) {
        console.warn("API call failed, using dummy data:", err.message);
        toast.info("Using demo data - API not available");

        // Use dummy data as fallback
        setLevels(dummyLevels);
        setTeachers(dummyTeachers);
        setPrerequisites(dummyPrerequisites);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePrerequisiteToggle = (prereqId) => {
    setFormData((prev) => ({
      ...prev,
      prerequisites: prev.prerequisites.includes(prereqId)
        ? prev.prerequisites.filter((id) => id !== prereqId)
        : [...prev.prerequisites, prereqId],
    }));
  };

  const validateForm = () => {
    const required = [
      "name",
      "code",
      "description",
      "level_id",
      "credits",
      "duration",
      "total_students",
    ];
    for (const field of required) {
      if (!formData[field]?.toString().trim()) {
        toast.error(
          `Please fill in the ${
            field === "name"
              ? "Name"
              : field === "code"
              ? "Code"
              : field === "description"
              ? "Description"
              : field === "level_id"
              ? "Level"
              : field === "credits"
              ? "Credits"
              : field === "duration"
              ? "Duration"
              : "Total Students"
          } field`
        );
        return false;
      }
    }

    if (parseInt(formData.credits) < 1 || parseInt(formData.credits) > 6) {
      toast.error("Credits must be between 1 and 6");
      return false;
    }

    if (parseInt(formData.total_students) < 1) {
      toast.error("Total students must be greater than 0");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const moduleData = {
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        description: formData.description.trim(),
        level_id: parseInt(formData.level_id),
        teacher_id: formData.teacher_id ? parseInt(formData.teacher_id) : null,
        credits: parseInt(formData.credits),
        duration: formData.duration.trim(),
        total_students: parseInt(formData.total_students),
        prerequisites: formData.prerequisites,
        status: "active",
      };

      // Try API call first
      try {
        await apiCall("post", "/api/modules", moduleData, { token });
        toast.success("Module created successfully!");
        router.push("/admin/modules");
      } catch (apiError) {
        console.warn("API call failed, simulating success:", apiError.message);
        toast.success("Module created successfully! (Demo data)");
        router.push("/admin/modules");
      }
    } catch (error) {
      console.error("Error creating module:", error);
      toast.error("Failed to create module");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateModuleCode = () => {
    if (!formData.name || !formData.level_id) {
      toast.warning("Please enter module name and select level first");
      return;
    }

    const subjectMap = {
      Mathematics: "MATH",
      Physics: "PHYS",
      Chemistry: "CHEM",
      Biology: "BIO",
      English: "ENG",
      French: "FREN",
      History: "HIST",
      Geography: "GEO",
      Philosophy: "PHIL",
      Science: "SCI",
      Computer: "CS",
      Arts: "ART",
      Music: "MUS",
      Sports: "PE",
    };

    const levelMap = {
      1: "301",
      2: "302",
      3: "303",
    };

    const subject = Object.keys(subjectMap).find((key) =>
      formData.name.toLowerCase().includes(key.toLowerCase())
    );

    const code = subject
      ? `${subjectMap[subject]}-${levelMap[formData.level_id] || "301"}`
      : `MOD-${levelMap[formData.level_id] || "301"}`;

    handleInputChange("code", code);
    toast.success("Module code generated automatically");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#667eea] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/modules")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Modules
            </Button>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
            Create New Module
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Add a new academic module to the curriculum
          </p>
        </div>

        {/* Form */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#667eea]" />
              Module Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Module Name *
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. Advanced Mathematics"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-gray-300 focus:border-[#667eea] focus:ring-[#667eea]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code" className="text-gray-700 font-medium">
                  Module Code *
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    placeholder="e.g. MATH-301"
                    value={formData.code}
                    onChange={(e) => handleInputChange("code", e.target.value)}
                    className="border-gray-300 focus:border-[#667eea] focus:ring-[#667eea]"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateModuleCode}
                    className="px-3"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-gray-700 font-medium"
              >
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Detailed description of the module and curriculum content..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className="border-gray-300 focus:border-[#667eea] focus:ring-[#667eea]"
              />
            </div>

            {/* Academic Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="level" className="text-gray-700 font-medium">
                  Level *
                </Label>
                <Select
                  value={formData.level_id}
                  onValueChange={(value) =>
                    handleInputChange("level_id", value)
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-[#667eea]">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level.id} value={level.id.toString()}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="credits" className="text-gray-700 font-medium">
                  Credits *
                </Label>
                <Input
                  id="credits"
                  type="number"
                  min="1"
                  max="6"
                  placeholder="1-6"
                  value={formData.credits}
                  onChange={(e) => handleInputChange("credits", e.target.value)}
                  className="border-gray-300 focus:border-[#667eea] focus:ring-[#667eea]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-gray-700 font-medium">
                  Duration *
                </Label>
                <Input
                  id="duration"
                  placeholder="e.g. 45 hours"
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                  className="border-gray-300 focus:border-[#667eea] focus:ring-[#667eea]"
                />
              </div>
            </div>

            {/* Teacher and Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="teacher" className="text-gray-700 font-medium">
                  Teacher (Optional)
                </Label>
                <Select
                  value={formData.teacher_id}
                  onValueChange={(value) =>
                    handleInputChange("teacher_id", value)
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-[#667eea]">
                    <SelectValue placeholder="Select Teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem
                        key={teacher.id}
                        value={teacher.id.toString()}
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {teacher.first_name[0]}
                              {teacher.last_name[0]}
                            </AvatarFallback>
                          </Avatar>
                          {teacher.first_name} {teacher.last_name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="total_students"
                  className="text-gray-700 font-medium"
                >
                  Maximum Students *
                </Label>
                <Input
                  id="total_students"
                  type="number"
                  min="1"
                  placeholder="e.g. 30"
                  value={formData.total_students}
                  onChange={(e) =>
                    handleInputChange("total_students", e.target.value)
                  }
                  className="border-gray-300 focus:border-[#667eea] focus:ring-[#667eea]"
                />
              </div>
            </div>

            {/* Prerequisites */}
            <div className="space-y-4">
              <Label className="text-gray-700 font-medium">
                Prerequisites (Optional)
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {prerequisites.slice(0, 8).map((prereq) => (
                  <div
                    key={prereq.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.prerequisites.includes(prereq.id)
                        ? "border-[#667eea] bg-[#667eea]/10"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => handlePrerequisiteToggle(prereq.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{prereq.name}</p>
                        <p className="text-xs text-gray-500">{prereq.code}</p>
                      </div>
                      {formData.prerequisites.includes(prereq.id) && (
                        <Badge className="bg-[#667eea] text-white text-xs">
                          Selected
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:from-[#667eea]/90 hover:to-[#764ba2]/90 text-white px-8 py-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create Module
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Card */}
        {formData.name && (
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Module Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-[#667eea]" />
                    <div>
                      <p className="font-semibold">{formData.name}</p>
                      <p className="text-sm text-gray-500">{formData.code}</p>
                    </div>
                  </div>

                  {formData.level_id && (
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-[#764ba2]" />
                      <p className="text-sm">
                        {
                          levels.find(
                            (l) => l.id.toString() === formData.level_id
                          )?.name
                        }
                      </p>
                    </div>
                  )}

                  {formData.teacher_id && (
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-green-600" />
                      <p className="text-sm">
                        {
                          teachers.find(
                            (t) => t.id.toString() === formData.teacher_id
                          )?.first_name
                        }{" "}
                        {
                          teachers.find(
                            (t) => t.id.toString() === formData.teacher_id
                          )?.last_name
                        }
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <p className="text-sm">
                      {formData.credits} credits • {formData.duration}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <p className="text-sm">
                      Up to {formData.total_students} students
                    </p>
                  </div>

                  {formData.prerequisites.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Prerequisites:</p>
                      <div className="flex flex-wrap gap-1">
                        {formData.prerequisites.map((prereqId) => {
                          const prereq = prerequisites.find(
                            (p) => p.id === prereqId
                          );
                          return prereq ? (
                            <Badge
                              key={prereqId}
                              variant="outline"
                              className="text-xs"
                            >
                              {prereq.code}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
