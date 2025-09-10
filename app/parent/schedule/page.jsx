"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Globe,
  GraduationCap,
  Clock,
  MapPin,
  User,
  ArrowLeft,
} from "lucide-react";
import styled from "styled-components";

// Module color and icon mapping (simplified for parent view)
const moduleStyles = {
  العربية: {
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
    icon: GraduationCap,
    textColor: "text-blue-700",
  },
  رياضيات: {
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    icon: GraduationCap,
    textColor: "text-green-700",
  },
  فرنسية: {
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    icon: GraduationCap,
    textColor: "text-purple-700",
  },
  علوم: {
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
    icon: GraduationCap,
    textColor: "text-emerald-700",
  },
  تاريخ: {
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
    icon: GraduationCap,
    textColor: "text-amber-700",
  },
  إنجليزية: {
    color: "from-indigo-500 to-blue-500",
    bgColor: "from-indigo-50 to-blue-50",
    borderColor: "border-indigo-200",
    icon: GraduationCap,
    textColor: "text-indigo-700",
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
    "08:00": "8-10",
    "10:00": "10-12",
    "14:00": "14-16",
  };
  return timeMap[slot] || slot;
};

// Enhanced styled components matching the main page design
const StyledContainer = styled.div`
  padding: 24px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
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
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
  }
`;

const LogoText = styled.span`
  font-size: 2.2rem;
  font-weight: 700;
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
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    border-radius: 2px;
    opacity: 0.8;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
`;

const PageSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin: 0;
`;

const EnhancedCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const SubjectCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 12px;
  padding: 12px;
  margin: 4px;
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  &.empty {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border: 2px dashed #dee2e6;
  }
`;

const SubjectTitle = styled.p`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
  color: #1a1a1a;
`;

const SubjectTeacher = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 2px;
`;

const SubjectRoom = styled.p`
  font-size: 11px;
  color: #888;
`;

const TimeSlot = styled.div`
  font-weight: 600;
  color: #1a1a1a;
  padding: 8px;
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
  border-radius: 8px;
  margin-bottom: 8px;
  text-align: center;
  border: 1px solid #e8e8e8;
`;

const DayHeader = styled.div`
  font-weight: 700;
  color: #1a1a1a;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 8px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
`;

const EnhancedSelect = styled(Select)`
  .select-trigger {
    border-radius: 12px;
    border: 1px solid #e8e8e8;
    background: #ffffff;
    transition: all 0.3s ease;

    &:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
    }
  }
`;

const LanguageButton = styled(Button)`
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  }
`;

// Day mapping
const dayMap = {
  d1: "Sunday",
  d2: "Monday",
  d3: "Tuesday",
  d4: "Wednesday",
  d5: "Thursday",
};

// Time slots to show in order
const timeSlots = ["08:00", "10:00", "14:00"];
const dayOrder = ["d1", "d2", "d3", "d4", "d5"];

const getDayFromSlot = (slot) => slot.slice(0, 2);
const getTimeFromSlot = (slot) => slot.slice(2);

export default function ParentSchedule({ user }) {
  const [language, setLanguage] = useState("ar");
  const [selectedChild, setSelectedChild] = useState("s1");
  const [isLoading, setIsLoading] = useState(true);

  // Hardcoded students
  const students = [
    { id: "s1", first_name: "Amina", last_name: "Bouchama", groupId: "1" },
    { id: "s2", first_name: "Youssef", last_name: "Bouchama", groupId: "2" },
  ];

  // Hardcoded groups
  const groups = [
    { id: "1", name: "3أ" },
    { id: "2", name: "3ب" },
  ];

  // Hardcoded teachers
  const teachers = [
    { id: "1", name: "فاطمة حداد" },
    { id: "2", name: "ياسين صغير" },
    { id: "3", name: "خديجة بن عمر" },
    { id: "4", name: "محمد خروبي" },
    { id: "5", name: "ليلى بوزيان" },
  ];

  // Hardcoded timetables
  const timetables = {
    1: {
      الأحد: {
        "08:00": {
          id: "1",
          subject: "العربية",
          teacher: "فاطمة حداد",
          room: "قاعة أ-101",
          groupId: "1",
        },
        "09:00": {
          id: "2",
          subject: "رياضيات",
          teacher: "ياسين صغير",
          room: "قاعة أ-102",
          groupId: "1",
        },
        "10:00": null,
        "11:00": {
          id: "3",
          subject: "علوم",
          teacher: "محمد خروبي",
          room: "قاعة أ-103",
          groupId: "1",
        },
        "13:00": null,
        "14:00": {
          id: "4",
          subject: "إنجليزية",
          teacher: "ليلى بوزيان",
          room: "قاعة أ-104",
          groupId: "1",
        },
        "15:00": null,
        "16:00": null,
      },
      الإثنين: {
        "08:00": null,
        "09:00": {
          id: "5",
          subject: "فرنسية",
          teacher: "خديجة بن عمر",
          room: "قاعة أ-101",
          groupId: "1",
        },
        "10:00": {
          id: "6",
          subject: "تاريخ",
          teacher: "فاطمة حداد",
          room: "قاعة أ-102",
          groupId: "1",
        },
        "11:00": null,
        "13:00": {
          id: "7",
          subject: "رياضيات",
          teacher: "ياسين صغير",
          room: "قاعة أ-103",
          groupId: "1",
        },
        "14:00": null,
        "15:00": null,
        "16:00": null,
      },
      الثلاثاء: {
        "08:00": {
          id: "8",
          subject: "علوم",
          teacher: "محمد خروبي",
          room: "قاعة أ-101",
          groupId: "1",
        },
        "09:00": null,
        "10:00": {
          id: "9",
          subject: "العربية",
          teacher: "فاطمة حداد",
          room: "قاعة أ-102",
          groupId: "1",
        },
        "11:00": null,
        "13:00": {
          id: "10",
          subject: "إنجليزية",
          teacher: "ليلى بوزيان",
          room: "قاعة أ-103",
          groupId: "1",
        },
        "14:00": null,
        "15:00": null,
        "16:00": null,
      },
      الأربعاء: {
        "08:00": null,
        "09:00": {
          id: "11",
          subject: "فرنسية",
          teacher: "خديجة بن عمر",
          room: "قاعة أ-101",
          groupId: "1",
        },
        "10:00": null,
        "11:00": {
          id: "12",
          subject: "رياضيات",
          teacher: "ياسين صغير",
          room: "قاعة أ-102",
          groupId: "1",
        },
        "13:00": null,
        "14:00": {
          id: "13",
          subject: "تاريخ",
          teacher: "فاطمة حداد",
          room: "قاعة أ-103",
          groupId: "1",
        },
        "15:00": null,
        "16:00": null,
      },
      الخميس: {
        "08:00": {
          id: "14",
          subject: "علوم",
          teacher: "محمد خروبي",
          room: "قاعة أ-101",
          groupId: "1",
        },
        "09:00": null,
        "10:00": {
          id: "15",
          subject: "إنجليزية",
          teacher: "ليلى بوزيان",
          room: "قاعة أ-102",
          groupId: "1",
        },
        "11:00": null,
        "13:00": {
          id: "16",
          subject: "العربية",
          teacher: "فاطمة حداد",
          room: "قاعة أ-103",
          groupId: "1",
        },
        "14:00": null,
        "15:00": null,
        "16:00": null,
      },
    },
    2: {
      الأحد: {
        "08:00": {
          id: "17",
          subject: "رياضيات",
          teacher: "ياسين صغير",
          room: "قاعة ب-201",
          groupId: "2",
        },
        "09:00": null,
        "10:00": {
          id: "18",
          subject: "فرنسية",
          teacher: "خديجة بن عمر",
          room: "قاعة ب-202",
          groupId: "2",
        },
        "11:00": null,
        "13:00": {
          id: "19",
          subject: "علوم",
          teacher: "محمد خروبي",
          room: "قاعة ب-203",
          groupId: "2",
        },
        "14:00": null,
        "15:00": null,
        "16:00": null,
      },
      الإثنين: {
        "08:00": {
          id: "20",
          subject: "إنجليزية",
          teacher: "ليلى بوزيان",
          room: "قاعة ب-201",
          groupId: "2",
        },
        "09:00": {
          id: "21",
          subject: "العربية",
          teacher: "فاطمة حداد",
          room: "قاعة ب-202",
          groupId: "2",
        },
        "10:00": null,
        "11:00": {
          id: "22",
          subject: "تاريخ",
          teacher: "فاطمة حداد",
          room: "قاعة ب-203",
          groupId: "2",
        },
        "13:00": null,
        "14:00": null,
        "15:00": null,
        "16:00": null,
      },
      الثلاثاء: {
        "08:00": null,
        "09:00": {
          id: "23",
          subject: "رياضيات",
          teacher: "ياسين صغير",
          room: "قاعة ب-201",
          groupId: "2",
        },
        "10:00": {
          id: "24",
          subject: "علوم",
          teacher: "محمد خروبي",
          room: "قاعة ب-202",
          groupId: "2",
        },
        "11:00": null,
        "13:00": {
          id: "25",
          subject: "فرنسية",
          teacher: "خديجة بن عمر",
          room: "قاعة ب-203",
          groupId: "2",
        },
        "14:00": null,
        "15:00": null,
        "16:00": null,
      },
      الأربعاء: {
        "08:00": {
          id: "26",
          subject: "العربية",
          teacher: "فاطمة حداد",
          room: "قاعة ب-201",
          groupId: "2",
        },
        "09:00": null,
        "10:00": {
          id: "27",
          subject: "إنجليزية",
          teacher: "ليلى بوزيان",
          room: "قاعة ب-202",
          groupId: "2",
        },
        "11:00": null,
        "13:00": {
          id: "28",
          subject: "تاريخ",
          teacher: "فاطمة حداد",
          room: "قاعة ب-203",
          groupId: "2",
        },
        "14:00": null,
        "15:00": null,
        "16:00": null,
      },
      الخميس: {
        "08:00": null,
        "09:00": {
          id: "29",
          subject: "رياضيات",
          teacher: "ياسين صغير",
          room: "قاعة ب-201",
          groupId: "2",
        },
        "10:00": {
          id: "30",
          subject: "فرنسية",
          teacher: "خديجة بن عمر",
          room: "قاعة ب-202",
          groupId: "2",
        },
        "11:00": null,
        "13:00": {
          id: "31",
          subject: "علوم",
          teacher: "محمد خروبي",
          room: "قاعة ب-203",
          groupId: "2",
        },
        "14:00": null,
        "15:00": null,
        "16:00": null,
      },
    },
  };

  // Convert existing timetable data to the new format
  const buildScheduleMatrix = () => {
    const matrix = {};

    timeSlots.forEach((slot) => {
      matrix[slot] = {};
      dayOrder.forEach((day) => {
        matrix[slot][day] = null;
      });
    });

    // Convert the existing timetable data
    Object.keys(timetables).forEach((groupId) => {
      Object.keys(timetables[groupId]).forEach((dayKey) => {
        const arabicDayMap = {
          الأحد: "d1",
          الإثنين: "d2",
          الثلاثاء: "d3",
          الأربعاء: "d4",
          الخميس: "d5",
        };

        const englishDay = arabicDayMap[dayKey];
        if (englishDay) {
          Object.keys(timetables[groupId][dayKey]).forEach((timeSlot) => {
            const session = timetables[groupId][dayKey][timeSlot];
            if (
              session &&
              matrix[timeSlot] &&
              matrix[timeSlot][englishDay] === null
            ) {
              matrix[timeSlot][englishDay] = {
                ...session,
                time_slot: `${englishDay}${timeSlot}`,
                weeks: "1-8",
              };
            }
          });
        }
      });
    });

    return matrix;
  };

  const scheduleMatrix = buildScheduleMatrix();

  // Translations
  const translations = {
    ar: {
      unauthorized: "غير مصرح لك بالوصول إلى هذه الصفحة",
      loading: "جارٍ التحميل...",
      title: (name) => `جدول ${name}`,
      cardTitle: "الجدول الأسبوعي",
      selectChild: "اختر الطالب",
      days: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
      subjects: {
        العربية: "العربية",
        رياضيات: "رياضيات",
        فرنسية: "فرنسية",
        علوم: "علوم",
        تاريخ: "تاريخ",
        إنجليزية: "إنجليزية",
      },
      noSession: "لا يوجد حصة",
      timeLabel: "الوقت",
      toggleLanguage: "Français",
    },
    fr: {
      unauthorized: "Vous n’êtes pas autorisé à accéder à cette page",
      loading: "Chargement...",
      title: (name) => `Emploi du temps de ${name}`,
      cardTitle: "Emploi du temps hebdomadaire",
      selectChild: "Sélectionner l’élève",
      days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"],
      subjects: {
        العربية: "Arabe",
        رياضيات: "Mathématiques",
        فرنسية: "Français",
        علوم: "Sciences",
        تاريخ: "Histoire",
        إنجليزية: "Anglais",
      },
      noSession: "Aucune session",
      timeLabel: "Heure",
      toggleLanguage: "العربية",
    },
  };

  const hours = ["08:00", "10:00", "14:00"];

  // Subject colors
  const subjectColors = {
    العربية: "bg-blue-600",
    رياضيات: "bg-green-600",
    فرنسية: "bg-purple-600",
    علوم: "bg-teal-600",
    تاريخ: "bg-yellow-600",
    إنجليزية: "bg-red-600",
  };

  // Check parent access and set default child
  useEffect(() => {
    if (user && user.role !== "parent") {
      alert(translations[language].unauthorized);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  }, [user, language]);

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "fr" : "ar");
  };

  // Get group ID for selected child
  const child = students.find((s) => s.id === selectedChild);
  const groupId = child ? child.groupId : "1";
  const groupName =
    groups.find((g) => g.id === groupId)?.name ||
    translations[language].selectChild;

  if (isLoading || (user && user.role !== "parent")) {
    return (
      <div className="p-6 text-center text-slate-800">
        {translations[language].loading}
      </div>
    );
  }

  return (
    <StyledContainer>
      <div className="max-w-7xl mx-auto">
        <StyledHeader>
          <div>
            <ElegantLogo>
              <LogoIcon>
                <GraduationCap size={24} color="#ffffff" />
              </LogoIcon>
              <LogoText>Dirassati</LogoText>
            </ElegantLogo>
            <PageTitle>
              {translations[language].title(
                `${child?.first_name} ${child?.last_name}`
              )}
            </PageTitle>
            <PageSubtitle>View your child's weekly class schedule</PageSubtitle>
          </div>
        </StyledHeader>

        <ControlsContainer>
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger className="w-48 border-slate-300 rounded-lg shadow-sm">
              <SelectValue placeholder={translations[language].selectChild} />
            </SelectTrigger>
            <SelectContent>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.first_name} {student.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <LanguageButton onClick={toggleLanguage}>
            <Globe className="w-5 h-5 mr-2" />
            {translations[language].toggleLanguage}
          </LanguageButton>
        </ControlsContainer>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
                        {slot === "08:00" && "Morning Session"}
                        {slot === "10:00" && "Mid Morning"}
                        {slot === "14:00" && "Afternoon Session"}
                      </div>
                    </div>
                  </div>

                  {/* Day Cells - Scrollable */}
                  {dayOrder.map((dayKey) => {
                    const session = scheduleMatrix[slot][dayKey];
                    const moduleStyle = session
                      ? getModuleStyle(session.subject)
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
                                  {session.subject}
                                </h3>
                              </div>

                              {/* Teacher Info */}
                              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-gray-500 flex-shrink-0" />
                                <span className="text-xs sm:text-xs lg:text-sm font-medium text-gray-700 truncate">
                                  {session.teacher}
                                </span>
                              </div>

                              {/* Location */}
                              <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 mb-2 sm:mb-2.5 lg:mb-3">
                                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-gray-500 flex-shrink-0" />
                                <span className="text-xs sm:text-xs lg:text-sm text-gray-600 font-medium truncate">
                                  {session.room}
                                </span>
                              </div>

                              {/* Week Badge - Bottom aligned */}
                              <div className="flex justify-between items-center mt-auto">
                                <span className="text-xs bg-white/80 px-2 py-1 rounded-full font-medium text-gray-600">
                                  Week {session.weeks}
                                </span>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-blue-500" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50/50 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-gray-100 border-dashed">
                            <div className="text-center text-gray-400">
                              <div className="text-xs sm:text-xs lg:text-sm font-medium">
                                Free Period
                              </div>
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

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-4 lg:p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 lg:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <GraduationCap className="w-8 h-8 lg:w-16 lg:h-16 text-blue-600" />
                </div>
                <div className="relative z-10">
                  <div className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1 lg:mb-2">
                    {Object.values(scheduleMatrix).reduce(
                      (total, daySlots) =>
                        total +
                        Object.values(daySlots).filter(
                          (session) => session !== null
                        ).length,
                      0
                    )}
                  </div>
                  <p className="text-gray-700 font-semibold text-sm lg:text-base mb-1">
                    Total Sessions
                  </p>
                  <p className="text-xs lg:text-sm text-gray-600">
                    Weekly classes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-4 lg:p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 lg:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <User className="w-8 h-8 lg:w-16 lg:h-16 text-purple-600" />
                </div>
                <div className="relative z-10">
                  <div className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 lg:mb-2">
                    {
                      new Set(
                        Object.values(scheduleMatrix).flatMap((daySlots) =>
                          Object.values(daySlots)
                            .filter((session) => session !== null)
                            .map((session) => session.teacher)
                        )
                      ).size
                    }
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

            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-4 lg:p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 lg:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <MapPin className="w-8 h-8 lg:w-16 lg:h-16 text-emerald-600" />
                </div>
                <div className="relative z-10">
                  <div className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1 lg:mb-2">
                    {
                      new Set(
                        Object.values(scheduleMatrix).flatMap((daySlots) =>
                          Object.values(daySlots)
                            .filter((session) => session !== null)
                            .map((session) => session.room)
                        )
                      ).size
                    }
                  </div>
                  <p className="text-gray-700 font-semibold text-sm lg:text-base mb-1">
                    Classrooms
                  </p>
                  <p className="text-xs lg:text-sm text-gray-600">
                    Used this week
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-4 lg:p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 lg:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Calendar className="w-8 h-8 lg:w-16 lg:h-16 text-amber-600" />
                </div>
                <div className="relative z-10">
                  <div className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1 lg:mb-2">
                    {Math.round(
                      (Object.values(scheduleMatrix).reduce(
                        (total, daySlots) =>
                          total +
                          Object.values(daySlots).filter(
                            (session) => session !== null
                          ).length,
                        0
                      ) /
                        40) *
                        100
                    )}
                    %
                  </div>
                  <p className="text-gray-700 font-semibold text-sm lg:text-base mb-1">
                    Utilization
                  </p>
                  <p className="text-xs lg:text-sm text-gray-600">
                    Weekly schedule
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </StyledContainer>
  );
}
