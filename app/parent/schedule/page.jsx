"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Globe, GraduationCap } from "lucide-react";
import styled from "styled-components";

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

export default function ParentSchedule({ user }) {
  const [language, setLanguage] = useState("ar"); // Default: Arabic
  const [selectedChild, setSelectedChild] = useState("s1"); // Default: Amina
  const [isLoading, setIsLoading] = useState(true);

  // Hardcoded students
  const students = [
    { id: "s1", first_name: "Amina", last_name: "Bouchama", groupId: "1" }, // Group 3أ
    { id: "s2", first_name: "Youssef", last_name: "Bouchama", groupId: "2" }, // Group 3ب
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

  const hours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

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
            <PageSubtitle>
              Consultez l'emploi du temps de votre enfant
            </PageSubtitle>
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
          <EnhancedCard>
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-slate-600" />
                {translations[language].cardTitle} - {groupName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {translations[language].days.map((day, dayIndex) => (
                  <motion.div
                    key={day}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: dayIndex * 0.1 }}
                  >
                    <DayHeader>{day}</DayHeader>
                    <div className="space-y-2">
                      {hours.map((hour) => {
                        const session =
                          timetables[groupId]?.[
                            translations.ar.days[dayIndex]
                          ]?.[hour];
                        return (
                          <div key={hour}>
                            <TimeSlot>{hour}</TimeSlot>
                            {session ? (
                              <SubjectCard
                                className={
                                  subjectColors[session.subject] ||
                                  "bg-slate-500"
                                }
                              >
                                <SubjectTitle>
                                  {
                                    translations[language].subjects[
                                      session.subject
                                    ]
                                  }
                                </SubjectTitle>
                                <SubjectTeacher>
                                  {session.teacher}
                                </SubjectTeacher>
                                <SubjectRoom>{session.room}</SubjectRoom>
                              </SubjectCard>
                            ) : (
                              <SubjectCard className="empty">
                                <p className="text-slate-400 text-center text-sm">
                                  {translations[language].noSession}
                                </p>
                              </SubjectCard>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </EnhancedCard>
        </motion.div>
      </div>
    </StyledContainer>
  );
}
