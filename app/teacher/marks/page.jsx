"use client";

import { useState, useEffect, useMemo } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  GraduationCap,
  BookOpen,
  Users,
  TrendingUp,
  Download,
  Upload,
  Save,
  Award,
  FileText,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Calculator,
  Target,
  Star,
  Filter,
  Search,
  Plus,
  Edit,
  Eye,
  Trash2,
  Loader2,
  RefreshCw,
  Settings,
  Bell,
  Calendar,
  Clock,
  Zap,
  Trophy,
  Medal,
  Crown,
  Sparkles,
  Brain,
  Lightbulb,
  Rocket,
  Flame,
  Heart,
  ThumbsUp,
  Check,
  X,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  ExternalLink,
  Share,
  Copy,
  Printer,
  Mail,
  Phone,
  MapPin,
  Globe,
  Shield,
  Lock,
  Unlock,
  EyeOff,
  Eye as EyeIcon,
} from "lucide-react";
import { toast } from "sonner";
import styled, { keyframes } from "styled-components";
import dynamic from "next/dynamic";
import { Button } from "antd";

// Dynamic import for charts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Keyframe animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// Styled components for enhanced design
const StyledContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  padding: 20px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const HeaderSection = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 32px;
  margin-bottom: 32px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.8s ease-out;
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
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s ease;
  animation: ${float} 3s ease-in-out infinite;

  &:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.5);
  }
`;

const LogoText = styled.span`
  font-size: 2.5rem;
  font-weight: 800;
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
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    border-radius: 2px;
    opacity: 0.8;
  }
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #1a1a1a;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
  line-height: 1.2;
`;

const PageSubtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin: 0;
  font-weight: 500;
  opacity: 0.8;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
  color: #1a1a1a;
  padding: 32px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.6s ease-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.05) 0%,
      rgba(118, 75, 162, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.18);
  }

  .icon-container {
    width: 72px;
    height: 72px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    backdrop-filter: blur(10px);
    border: 3px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
    animation: ${pulse} 2s ease-in-out infinite;
  }

  h3 {
    margin: 0 0 12px 0;
    font-size: 2.5rem;
    font-weight: 800;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    opacity: 0.8;
    font-weight: 600;
    color: #555;
  }

  .subtitle {
    font-size: 0.9rem;
    opacity: 0.6;
    margin-top: 4px;
  }
`;

const FiltersSection = styled.div`
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
  padding: 32px;
  border-radius: 20px;
  margin-bottom: 32px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  animation: ${fadeIn} 1s ease-out;
`;

const SearchInput = styled.div`
  position: relative;
  margin-bottom: 20px;

  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #667eea;
    z-index: 1;
  }

  input {
    width: 100%;
    padding: 16px 16px 16px 52px;
    border: 2px solid #e8e8e8;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease;
    background: white;

    &:hover {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    &:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
      outline: none;
    }

    &::placeholder {
      color: #ccc;
      font-weight: 400;
    }
  }
`;

const MarksInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e8e8e8;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  background: white;

  &:hover {
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
    outline: none;
  }

  &::placeholder {
    color: #ccc;
    font-weight: 400;
  }

  &:invalid {
    border-color: #ff6b6b;
    box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.1);
  }
`;

const GradeBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  ${(props) => {
    switch (props.grade) {
      case "A+":
        return "background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white;";
      case "A":
        return "background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white;";
      case "B+":
        return "background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white;";
      case "B":
        return "background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #333;";
      case "C+":
        return "background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white;";
      case "C":
        return "background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white;";
      case "D":
        return "background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: #333;";
      case "F":
        return "background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;";
      default:
        return "background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%); color: #666;";
    }
  }}
`;

const ActionButton = styled(ShadcnButton)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 24px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);

  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(ShadcnButton)`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 24px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(240, 147, 251, 0.3);

  &:hover {
    background: linear-gradient(135deg, #e86fc0 0%, #e74c5a 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(240, 147, 251, 0.4);
  }
`;

const SuccessButton = styled(ShadcnButton)`
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 24px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(67, 233, 123, 0.3);

  &:hover {
    background: linear-gradient(135deg, #38d66b 0%, #2ee8c5 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(67, 233, 123, 0.4);
  }
`;

const BulkActionsSection = styled.div`
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 32px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  animation: ${fadeIn} 1.2s ease-out;
`;

const ChartContainer = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 1.4s ease-out;
`;

const PerformanceIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  background: ${(props) => {
    if (props.performance >= 90)
      return "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)";
    if (props.performance >= 80)
      return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
    if (props.performance >= 70)
      return "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
    if (props.performance >= 60)
      return "linear-gradient(135deg, #fa709a 0%, #fee140 100%)";
    return "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)";
  }};
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function TeacherMarksPage() {
  const userId = useSelector((state) => state.auth.userId);
  const [loading, setLoading] = useState(false);
  const [selectedModule, setSelectedModule] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [students, setStudents] = useState([]);
  const [modules, setModules] = useState([]);
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedView, setSelectedView] = useState("table");
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState("test");

  // Enhanced dummy data
  const dummyModules = [
    {
      id: "math101",
      name: "Mathematics - Advanced Algebra",
      subject: "Mathematics",
      level: "Grade 12",
      groups: ["groupA", "groupB"],
      credits: 4,
      description: "Advanced algebraic concepts and problem-solving techniques",
    },
    {
      id: "phy201",
      name: "Physics - Mechanics & Thermodynamics",
      subject: "Physics",
      level: "Grade 11",
      groups: ["groupA", "groupC"],
      credits: 3,
      description:
        "Fundamental principles of classical mechanics and heat transfer",
    },
    {
      id: "chem301",
      name: "Chemistry - Organic Chemistry",
      subject: "Chemistry",
      level: "Grade 12",
      groups: ["groupB", "groupC"],
      credits: 4,
      description: "Study of carbon compounds and their reactions",
    },
    {
      id: "bio401",
      name: "Biology - Molecular Biology",
      subject: "Biology",
      level: "Grade 11",
      groups: ["groupA"],
      credits: 3,
      description: "Cellular processes and genetic information flow",
    },
    {
      id: "cs501",
      name: "Computer Science - Data Structures",
      subject: "Computer Science",
      level: "Grade 12",
      groups: ["groupB", "groupC"],
      credits: 4,
      description: "Advanced data structures and algorithms",
    },
  ];

  const dummyGroups = [
    {
      id: "groupA",
      name: "Group Alpha",
      studentCount: 32,
      schedule: "Mon/Wed 9:00-10:30",
    },
    {
      id: "groupB",
      name: "Group Beta",
      studentCount: 28,
      schedule: "Tue/Thu 14:00-15:30",
    },
    {
      id: "groupC",
      name: "Group Gamma",
      studentCount: 30,
      schedule: "Mon/Fri 11:00-12:30",
    },
  ];

  const dummyStudents = [
    {
      id: 1,
      firstName: "Ahmed",
      lastName: "Alami",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
      email: "ahmed.alami@student.edu",
      phone: "+212 6XX XXX XXX",
      test: 87,
      cc: 92,
      exam: 89,
      attendance: 96,
      status: "active",
      notes: "Excellent participation in class discussions",
      lastUpdated: "2024-09-08",
    },
    {
      id: 2,
      firstName: "Fatima",
      lastName: "Benali",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
      email: "fatima.benali@student.edu",
      phone: "+212 6XX XXX XXX",
      test: 94,
      cc: 88,
      exam: 91,
      attendance: 98,
      status: "active",
      notes: "Outstanding performance in practical work",
      lastUpdated: "2024-09-08",
    },
    {
      id: 3,
      firstName: "Youssef",
      lastName: "Tazi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Youssef",
      email: "youssef.tazi@student.edu",
      phone: "+212 6XX XXX XXX",
      test: 76,
      cc: 82,
      exam: 84,
      attendance: 88,
      status: "warning",
      notes: "Needs improvement in problem-solving skills",
      lastUpdated: "2024-09-07",
    },
    {
      id: 4,
      firstName: "Amina",
      lastName: "El Fassi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amina",
      email: "amina.elfassi@student.edu",
      phone: "+212 6XX XXX XXX",
      test: 91,
      cc: 95,
      exam: 88,
      attendance: 94,
      status: "active",
      notes: "Exceptional analytical thinking",
      lastUpdated: "2024-09-08",
    },
    {
      id: 5,
      firstName: "Omar",
      lastName: "Alaoui",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
      email: "omar.alaoui@student.edu",
      phone: "+212 6XX XXX XXX",
      test: 72,
      cc: 78,
      exam: 80,
      attendance: 85,
      status: "warning",
      notes: "Struggling with theoretical concepts",
      lastUpdated: "2024-09-06",
    },
    {
      id: 6,
      firstName: "Sara",
      lastName: "Bouazza",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
      email: "sara.bouazza@student.edu",
      phone: "+212 6XX XXX XXX",
      test: 96,
      cc: 89,
      exam: 93,
      attendance: 97,
      status: "active",
      notes: "Top performer with excellent work ethic",
      lastUpdated: "2024-09-08",
    },
    {
      id: 7,
      firstName: "Karim",
      lastName: "Rachidi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
      email: "karim.rachidi@student.edu",
      phone: "+212 6XX XXX XXX",
      test: 83,
      cc: 87,
      exam: 90,
      attendance: 91,
      status: "active",
      notes: "Good understanding of core concepts",
      lastUpdated: "2024-09-07",
    },
    {
      id: 8,
      firstName: "Leila",
      lastName: "Mouline",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leila",
      email: "leila.mouline@student.edu",
      phone: "+212 6XX XXX XXX",
      test: 89,
      cc: 93,
      exam: 92,
      attendance: 95,
      status: "active",
      notes: "Consistent high performance",
      lastUpdated: "2024-09-08",
    },
  ];

  useEffect(() => {
    // Initialize with dummy data
    setModules(dummyModules);
    setGroups(dummyGroups);
    setStudents(dummyStudents);
  }, []);

  // Calculate grade based on average with more detailed grading
  const calculateGrade = (average) => {
    if (average >= 95) return "A+";
    if (average >= 90) return "A";
    if (average >= 85) return "B+";
    if (average >= 80) return "B";
    if (average >= 75) return "C+";
    if (average >= 70) return "C";
    if (average >= 65) return "D";
    return "F";
  };

  // Calculate average for a student with weighted formula
  const calculateAverage = (student) => {
    if (!student.test || !student.cc || !student.exam) return null;
    // Test: 20%, Continuous Assessment: 30%, Final Exam: 50%
    return (
      Math.round(
        (student.test * 0.2 + student.cc * 0.3 + student.exam * 0.5) * 100
      ) / 100
    );
  };

  // Handle marks change with validation
  const handleMarksChange = (studentId, field, value) => {
    const numValue = value === "" ? null : parseFloat(value);
    if (numValue !== null && (numValue < 0 || numValue > 100)) {
      toast.error("Marks must be between 0 and 100");
      return;
    }

    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              [field]: numValue,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : student
      )
    );
  };

  // Save marks for a specific assessment type
  const handleSaveMarks = async (assessmentType) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(
        `${assessmentType.toUpperCase()} marks saved successfully!`,
        {
          description: `Updated marks for ${students.length} students`,
          duration: 4000,
        }
      );
    } catch (error) {
      toast.error(`Failed to save ${assessmentType} marks`);
    } finally {
      setLoading(false);
    }
  };

  // Bulk save all marks
  const handleBulkSave = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("All marks saved successfully!", {
        description: `Updated ${students.length} student records`,
        duration: 5000,
      });
    } catch (error) {
      toast.error("Failed to save marks");
    } finally {
      setLoading(false);
    }
  };

  // Calculate comprehensive statistics
  const calculateStats = useMemo(() => {
    const validStudents = students.filter((s) => calculateAverage(s) !== null);
    const averages = validStudents.map((s) => calculateAverage(s));

    if (averages.length === 0) {
      return {
        average: 0,
        highest: 0,
        lowest: 0,
        passed: 0,
        excellent: 0,
        total: students.length,
        median: 0,
        standardDeviation: 0,
      };
    }

    const average =
      Math.round(
        (averages.reduce((a, b) => a + b, 0) / averages.length) * 100
      ) / 100;
    const highest = Math.max(...averages);
    const lowest = Math.min(...averages);
    const passed = averages.filter((avg) => avg >= 50).length;
    const excellent = averages.filter((avg) => avg >= 85).length;

    // Calculate median
    const sorted = [...averages].sort((a, b) => a - b);
    const median =
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)];

    // Calculate standard deviation
    const variance =
      averages.reduce((acc, val) => acc + Math.pow(val - average, 2), 0) /
      averages.length;
    const standardDeviation = Math.round(Math.sqrt(variance) * 100) / 100;

    return {
      average,
      highest,
      lowest,
      passed,
      excellent,
      total: students.length,
      median,
      standardDeviation,
    };
  }, [students]);

  // Grade distribution for chart
  const getGradeDistribution = useMemo(() => {
    const grades = students
      .filter((s) => calculateAverage(s) !== null)
      .map((s) => calculateGrade(calculateAverage(s)));

    const distribution = {
      "A+": grades.filter((g) => g === "A+").length,
      A: grades.filter((g) => g === "A").length,
      "B+": grades.filter((g) => g === "B+").length,
      B: grades.filter((g) => g === "B").length,
      "C+": grades.filter((g) => g === "C+").length,
      C: grades.filter((g) => g === "C").length,
      D: grades.filter((g) => g === "D").length,
      F: grades.filter((g) => g === "F").length,
    };

    return distribution;
  }, [students]);

  // Chart options
  const gradeChartOptions = {
    chart: {
      type: "pie",
      height: 350,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1000,
      },
    },
    labels: [
      "Grade A+ (95-100)",
      "Grade A (90-94)",
      "Grade B+ (85-89)",
      "Grade B (80-84)",
      "Grade C+ (75-79)",
      "Grade C (70-74)",
      "Grade D (65-69)",
      "Grade F (<65)",
    ],
    colors: [
      "#ff6b6b",
      "#43e97b",
      "#4facfe",
      "#a8edea",
      "#f093fb",
      "#fa709a",
      "#ff9a9e",
      "#667eea",
    ],
    legend: {
      position: "bottom",
      fontSize: "14px",
      fontWeight: 600,
    },
    tooltip: {
      enabled: true,
      theme: "light",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const gradeChartSeries = [
    getGradeDistribution["A+"],
    getGradeDistribution.A,
    getGradeDistribution["B+"],
    getGradeDistribution.B,
    getGradeDistribution["C+"],
    getGradeDistribution.C,
    getGradeDistribution.D,
    getGradeDistribution.F,
  ];

  // Performance trend chart
  const performanceChartOptions = {
    chart: {
      type: "area",
      height: 300,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1000,
      },
    },
    colors: ["#667eea", "#764ba2"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        opacityFrom: 0.4,
        opacityTo: 0.1,
      },
    },
    xaxis: {
      categories: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
        "Week 8",
      ],
    },
    tooltip: {
      theme: "light",
    },
  };

  const performanceChartSeries = [
    {
      name: "Class Average",
      data: [72, 75, 78, 82, 79, 85, 88, calculateStats.average],
    },
  ];

  // Filter students based on search
  const filteredStudents = students.filter(
    (student) =>
      `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export to CSV with enhanced data
  const handleExportCSV = () => {
    const headers = [
      "Student ID",
      "First Name",
      "Last Name",
      "Email",
      "Test (20%)",
      "CC (30%)",
      "Exam (50%)",
      "Average",
      "Grade",
      "Attendance (%)",
      "Status",
      "Notes",
      "Last Updated",
    ];

    const csvData = filteredStudents.map((student) => {
      const average = calculateAverage(student);
      const grade = average ? calculateGrade(average) : "N/A";
      return [
        student.id,
        student.firstName,
        student.lastName,
        student.email,
        student.test || "",
        student.cc || "",
        student.exam || "",
        average || "",
        grade,
        student.attendance || "",
        student.status,
        student.notes || "",
        student.lastUpdated || "",
      ];
    });

    const csvContent = [headers, ...csvData]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `marks_${selectedModule || "all"}_${
      selectedGroup || "all"
    }_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    toast.success("Marks exported successfully!", {
      description: `Exported ${filteredStudents.length} student records`,
      duration: 4000,
    });
  };

  // Handle student selection for bulk actions
  const handleStudentSelect = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Bulk update selected students
  const handleBulkUpdate = async (field, value) => {
    if (selectedStudents.length === 0) {
      toast.error("Please select students first");
      return;
    }

    setLoading(true);
    try {
      setStudents((prev) =>
        prev.map((student) =>
          selectedStudents.includes(student.id)
            ? {
                ...student,
                [field]: parseFloat(value),
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : student
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(
        `Updated ${field.toUpperCase()} for ${selectedStudents.length} students`
      );
      setSelectedStudents([]);
    } catch (error) {
      toast.error("Failed to update marks");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !students.length) {
    return (
      <StyledContainer>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="animate-spin h-16 w-16 text-white mx-auto mb-6" />
            <p className="text-white text-xl font-semibold">
              Loading marks data...
            </p>
            <p className="text-white/80 text-sm mt-2">
              Please wait while we fetch your student information
            </p>
          </div>
        </div>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <HeaderSection>
          <ElegantLogo>
            <LogoIcon>
              <GraduationCap size={28} color="#ffffff" />
            </LogoIcon>
            <LogoText>Dirassati</LogoText>
          </ElegantLogo>
          <PageTitle>Advanced Marks Management</PageTitle>
          <PageSubtitle>
            Comprehensive student performance tracking and analytics dashboard
          </PageSubtitle>
        </HeaderSection>

        {/* Statistics Cards */}
        <StatsGrid>
          <StatCard>
            <div className="icon-container">
              <Award size={32} />
            </div>
            <h3>{calculateStats.average}%</h3>
            <p>Class Average</p>
            <div className="subtitle">Overall Performance</div>
          </StatCard>

          <StatCard>
            <div className="icon-container">
              <Target size={32} />
            </div>
            <h3>{calculateStats.passed}</h3>
            <p>Students Passed</p>
            <div className="subtitle">≥50% Average</div>
          </StatCard>

          <StatCard>
            <div className="icon-container">
              <Star size={32} />
            </div>
            <h3>{calculateStats.excellent}</h3>
            <p>Excellent Performance</p>
            <div className="subtitle">≥85% Average</div>
          </StatCard>

          <StatCard>
            <div className="icon-container">
              <Users size={32} />
            </div>
            <h3>{calculateStats.total}</h3>
            <p>Total Students</p>
            <div className="subtitle">Active Enrollments</div>
          </StatCard>

          <StatCard>
            <div className="icon-container">
              <Calculator size={32} />
            </div>
            <h3>{calculateStats.median}%</h3>
            <p>Median Score</p>
            <div className="subtitle">Middle Performance</div>
          </StatCard>

          <StatCard>
            <div className="icon-container">
              <TrendingUp size={32} />
            </div>
            <h3>{calculateStats.standardDeviation}</h3>
            <p>Standard Deviation</p>
            <div className="subtitle">Score Variation</div>
          </StatCard>
        </StatsGrid>

        {/* Filters and Search */}
        <FiltersSection>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div>
              <Label
                htmlFor="module"
                className="text-sm font-semibold mb-2 block"
              >
                Module
              </Label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modules</SelectItem>
                  {modules.map((module) => (
                    <SelectItem key={module.id} value={module.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{module.name}</span>
                        <span className="text-xs text-gray-500">
                          {module.credits} credits
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="group"
                className="text-sm font-semibold mb-2 block"
              >
                Group
              </Label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{group.name}</span>
                        <span className="text-xs text-gray-500">
                          {group.studentCount} students
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-2">
              <Label className="text-sm font-semibold mb-2 block">
                Search Students
              </Label>
              <SearchInput>
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchInput>
            </div>
          </div>
        </FiltersSection>

        {/* Bulk Actions */}
        <BulkActionsSection>
          <div className="flex items-center gap-4 flex-1">
            <input
              type="checkbox"
              checked={
                selectedStudents.length === filteredStudents.length &&
                filteredStudents.length > 0
              }
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedStudents(filteredStudents.map((s) => s.id));
                } else {
                  setSelectedStudents([]);
                }
              }}
              className="w-5 h-5 rounded border-2 border-gray-300"
            />
            <span className="font-semibold text-gray-700">
              {selectedStudents.length} of {filteredStudents.length} students
              selected
            </span>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <SecondaryButton disabled={selectedStudents.length === 0}>
                  <Edit size={16} className="mr-2" />
                  Bulk Update
                </SecondaryButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Bulk Update Marks</DialogTitle>
                  <DialogDescription>
                    Update marks for {selectedStudents.length} selected students
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bulk-assessment" className="text-right">
                      Assessment
                    </Label>
                    <Select
                      value={currentAssessment}
                      onValueChange={setCurrentAssessment}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select assessment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="test">Test (20%)</SelectItem>
                        <SelectItem value="cc">
                          Continuous Assessment (30%)
                        </SelectItem>
                        <SelectItem value="exam">Final Exam (50%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bulk-marks" className="text-right">
                      Marks
                    </Label>
                    <input
                      id="bulk-marks"
                      type="number"
                      min="0"
                      max="100"
                      className="col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter marks (0-100)"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <SuccessButton
                    onClick={() => {
                      const marks = document.getElementById("bulk-marks").value;
                      if (marks && currentAssessment) {
                        handleBulkUpdate(currentAssessment, marks);
                        setIsDialogOpen(false);
                      }
                    }}
                  >
                    Update Marks
                  </SuccessButton>
                </div>
              </DialogContent>
            </Dialog>

            <ActionButton onClick={handleBulkSave} disabled={loading}>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <Save size={16} className="mr-2" />
              )}
              Save All
            </ActionButton>

            <ActionButton onClick={handleExportCSV} variant="outline">
              <Download size={16} className="mr-2" />
              Export CSV
            </ActionButton>
          </div>
        </BulkActionsSection>

        {/* Main Content Tabs */}
        <Tabs
          value={selectedView}
          onValueChange={setSelectedView}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="table" className="flex items-center gap-2">
              <FileText size={16} />
              Marks Table
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="flex items-center gap-2"
            >
              <TrendingUp size={16} />
              Performance
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <PieChart size={16} />
              Overview
            </TabsTrigger>
          </TabsList>

          {/* Marks Table Tab */}
          <TabsContent value="table" className="mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Student Marks Entry
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Enter and manage marks for Test (20%), Continuous Assessment
                    (30%), and Final Exam (50%)
                  </p>
                </div>
                <div className="flex gap-3">
                  <ActionButton onClick={() => handleSaveMarks("test")}>
                    <Save size={16} className="mr-2" />
                    Save Tests
                  </ActionButton>
                  <ActionButton onClick={() => handleSaveMarks("cc")}>
                    <Save size={16} className="mr-2" />
                    Save CC
                  </ActionButton>
                  <ActionButton onClick={() => handleSaveMarks("exam")}>
                    <Save size={16} className="mr-2" />
                    Save Exams
                  </ActionButton>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input
                          type="checkbox"
                          checked={
                            selectedStudents.length ===
                              filteredStudents.length &&
                            filteredStudents.length > 0
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStudents(
                                filteredStudents.map((s) => s.id)
                              );
                            } else {
                              setSelectedStudents([]);
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Test (20%)</TableHead>
                      <TableHead>CC (30%)</TableHead>
                      <TableHead>Exam (50%)</TableHead>
                      <TableHead>Average</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => {
                      const average = calculateAverage(student);
                      const grade = average ? calculateGrade(average) : null;

                      return (
                        <TableRow key={student.id} className="hover:bg-gray-50">
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(student.id)}
                              onChange={() => handleStudentSelect(student.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                  {student.firstName[0]}
                                  {student.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-gray-800">
                                  {student.firstName} {student.lastName}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {student.email}
                                </p>
                                <p className="text-xs text-gray-400">
                                  ID: {student.id}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <MarksInput
                              type="number"
                              min="0"
                              max="100"
                              placeholder="0-100"
                              value={student.test || ""}
                              onChange={(e) =>
                                handleMarksChange(
                                  student.id,
                                  "test",
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <MarksInput
                              type="number"
                              min="0"
                              max="100"
                              placeholder="0-100"
                              value={student.cc || ""}
                              onChange={(e) =>
                                handleMarksChange(
                                  student.id,
                                  "cc",
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <MarksInput
                              type="number"
                              min="0"
                              max="100"
                              placeholder="0-100"
                              value={student.exam || ""}
                              onChange={(e) =>
                                handleMarksChange(
                                  student.id,
                                  "exam",
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            {average ? (
                              <div className="text-center">
                                <span className="font-bold text-xl text-gray-800">
                                  {average}%
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {grade ? (
                              <GradeBadge grade={grade}>{grade}</GradeBadge>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {average ? (
                              <PerformanceIndicator performance={average}>
                                {average >= 90 ? (
                                  <Crown size={16} />
                                ) : average >= 80 ? (
                                  <Star size={16} />
                                ) : average >= 70 ? (
                                  <ThumbsUp size={16} />
                                ) : (
                                  <AlertTriangle size={16} />
                                )}
                                <span>
                                  {average >= 90
                                    ? "Excellent"
                                    : average >= 80
                                    ? "Good"
                                    : average >= 70
                                    ? "Satisfactory"
                                    : "Needs Attention"}
                                </span>
                              </PerformanceIndicator>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                student.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                student.status === "active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              }
                            >
                              {student.status === "active" ? (
                                <>
                                  <CheckCircle size={12} className="mr-1" />
                                  Active
                                </>
                              ) : (
                                <>
                                  <AlertCircle size={12} className="mr-1" />
                                  Warning
                                </>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  toast.info(
                                    `Viewing details for ${student.firstName}`
                                  )
                                }
                              >
                                <Eye size={14} />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  toast.info(`Contacting ${student.firstName}`)
                                }
                              >
                                <Mail size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Grade Distribution
                </h3>
                {typeof window !== "undefined" && (
                  <Chart
                    options={gradeChartOptions}
                    series={gradeChartSeries}
                    type="pie"
                    height={350}
                  />
                )}
              </ChartContainer>

              <ChartContainer>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Performance Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Trophy size={20} className="text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-green-800">
                          Highest Score
                        </span>
                        <p className="text-sm text-green-600">
                          Best Performance
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-2xl text-green-600">
                      {calculateStats.highest}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Calculator size={20} className="text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-blue-800">
                          Class Average
                        </span>
                        <p className="text-sm text-blue-600">
                          Overall Performance
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-2xl text-blue-600">
                      {calculateStats.average}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <Target size={20} className="text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-red-800">
                          Lowest Score
                        </span>
                        <p className="text-sm text-red-600">Needs Attention</p>
                      </div>
                    </div>
                    <span className="font-bold text-2xl text-red-600">
                      {calculateStats.lowest}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <CheckCircle size={20} className="text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-purple-800">
                          Pass Rate
                        </span>
                        <p className="text-sm text-purple-600">Success Rate</p>
                      </div>
                    </div>
                    <span className="font-bold text-2xl text-purple-600">
                      {calculateStats.total > 0
                        ? Math.round(
                            (calculateStats.passed / calculateStats.total) * 100
                          )
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </ChartContainer>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="mt-6">
            <ChartContainer>
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Performance Trends
              </h3>
              <p className="text-gray-600 mb-6">
                Track class performance over time and identify improvement
                patterns
              </p>
              {typeof window !== "undefined" && (
                <Chart
                  options={performanceChartOptions}
                  series={performanceChartSeries}
                  type="area"
                  height={300}
                />
              )}
            </ChartContainer>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={24} />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students
                      .filter((s) => calculateAverage(s) !== null)
                      .sort((a, b) => calculateAverage(b) - calculateAverage(a))
                      .slice(0, 5)
                      .map((student, index) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              {index + 1}
                            </div>
                            <div>
                              <span className="font-semibold text-green-800">
                                {student.firstName} {student.lastName}
                              </span>
                              <p className="text-xs text-green-600">
                                ID: {student.id}
                              </p>
                            </div>
                          </div>
                          <span className="font-bold text-lg text-green-600">
                            {calculateAverage(student)}%
                          </span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <AlertCircle size={24} />
                    Need Attention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students
                      .filter((s) => {
                        const avg = calculateAverage(s);
                        return avg !== null && avg < 60;
                      })
                      .sort((a, b) => calculateAverage(a) - calculateAverage(b))
                      .slice(0, 5)
                      .map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center">
                              <AlertTriangle size={16} />
                            </div>
                            <div>
                              <span className="font-semibold text-orange-800">
                                {student.firstName} {student.lastName}
                              </span>
                              <p className="text-xs text-orange-600">
                                ID: {student.id}
                              </p>
                            </div>
                          </div>
                          <span className="font-bold text-lg text-orange-600">
                            {calculateAverage(student)}%
                          </span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <TrendingUp size={24} />
                    Grade Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(getGradeDistribution).map(
                      ([grade, count]) => (
                        <div
                          key={grade}
                          className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <GradeBadge
                              grade={grade}
                              className="text-sm px-2 py-1"
                            >
                              {grade}
                            </GradeBadge>
                            <span className="text-sm font-medium text-blue-800">
                              Grade {grade}
                            </span>
                          </div>
                          <span className="font-bold text-lg text-blue-600">
                            {count} students
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StyledContainer>
  );
}
