"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Users,
  Plus,
  Trash2,
  Edit,
  Download,
  Search,
  UserCheck,
  UserX,
  GraduationCap,
  BookOpen,
  Filter,
  RefreshCw,
  BarChart3,
  Target,
  Award,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Hash,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Settings,
  Eye,
  UserPlus,
  Group,
  School,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Info,
  Zap,
} from "lucide-react";
import { message } from "antd";
import { useSelector } from "react-redux";
import apiCall from "@/components/utils/apiCall";

// Algerian Education System Levels
const algerianLevels = [
  {
    id: 1,
    name: "السنة الأولى ابتدائي",
    english: "1st Year Primary",
    short: "1AP",
  },
  {
    id: 2,
    name: "السنة الثانية ابتدائي",
    english: "2nd Year Primary",
    short: "2AP",
  },
  {
    id: 3,
    name: "السنة الثالثة ابتدائي",
    english: "3rd Year Primary",
    short: "3AP",
  },
  {
    id: 4,
    name: "السنة الرابعة ابتدائي",
    english: "4th Year Primary",
    short: "4AP",
  },
  {
    id: 5,
    name: "السنة الخامسة ابتدائي",
    english: "5th Year Primary",
    short: "5AP",
  },
  {
    id: 6,
    name: "السنة السادسة متوسط",
    english: "1st Year Middle",
    short: "1AM",
  },
  {
    id: 7,
    name: "السنة السابعة متوسط",
    english: "2nd Year Middle",
    short: "2AM",
  },
  {
    id: 8,
    name: "السنة الثامنة متوسط",
    english: "3rd Year Middle",
    short: "3AM",
  },
  {
    id: 9,
    name: "السنة التاسعة متوسط",
    english: "4th Year Middle",
    short: "4AM",
  },
  {
    id: 10,
    name: "السنة الأولى ثانوي",
    english: "1st Year Secondary",
    short: "1AS",
  },
  {
    id: 11,
    name: "السنة الثانية ثانوي",
    english: "2nd Year Secondary",
    short: "2AS",
  },
  {
    id: 12,
    name: "السنة الثالثة ثانوي",
    english: "3rd Year Secondary",
    short: "3AS",
  },
];

// Algerian Academic Modules
const algerianModules = [
  { id: 1, name: "الرياضيات", english: "Mathematics", category: "علوم أساسية" },
  { id: 2, name: "الفيزياء", english: "Physics", category: "علوم أساسية" },
  { id: 3, name: "الكيمياء", english: "Chemistry", category: "علوم أساسية" },
  { id: 4, name: "الأحياء", english: "Biology", category: "علوم أساسية" },
  {
    id: 5,
    name: "اللغة العربية",
    english: "Arabic Language",
    category: "لغات",
  },
  {
    id: 6,
    name: "اللغة الفرنسية",
    english: "French Language",
    category: "لغات",
  },
  {
    id: 7,
    name: "اللغة الإنجليزية",
    english: "English Language",
    category: "لغات",
  },
  {
    id: 8,
    name: "التاريخ والجغرافيا",
    english: "History & Geography",
    category: "علوم إنسانية",
  },
  { id: 9, name: "الفلسفة", english: "Philosophy", category: "علوم إنسانية" },
  {
    id: 10,
    name: "التربية الإسلامية",
    english: "Islamic Education",
    category: "تربية إسلامية",
  },
  {
    id: 11,
    name: "علوم الحاسوب",
    english: "Computer Science",
    category: "تكنولوجيا",
  },
  {
    id: 12,
    name: "التربية البدنية",
    english: "Physical Education",
    category: "تربية بدنية",
  },
  { id: 13, name: "الفنون", english: "Arts", category: "فنون" },
  { id: 14, name: "الموسيقى", english: "Music", category: "فنون" },
  {
    id: 15,
    name: "التربية المدنية",
    english: "Civic Education",
    category: "تربية مدنية",
  },
];

// Dummy data for parents
const dummyParents = [
  {
    id: 1,
    first_name: "محمد",
    last_name: "بن علي",
    email: "mohammed.benali@email.com",
    phone_number: "+213 555 123 456",
  },
  {
    id: 2,
    first_name: "فاطمة",
    last_name: "العمري",
    email: "fatima.elamrani@email.com",
    phone_number: "+213 555 234 567",
  },
  {
    id: 3,
    first_name: "أحمد",
    last_name: "تازي",
    email: "ahmed.tazi@email.com",
    phone_number: "+213 555 345 678",
  },
  {
    id: 4,
    first_name: "أمينة",
    last_name: "بوعزة",
    email: "amina.bouazza@email.com",
    phone_number: "+213 555 456 789",
  },
  {
    id: 5,
    first_name: "كريم",
    last_name: "بناني",
    email: "karim.bennani@email.com",
    phone_number: "+213 555 567 890",
  },
  {
    id: 6,
    first_name: "ليلى",
    last_name: "منصوري",
    email: "leila.mansouri@email.com",
    phone_number: "+213 555 678 901",
  },
  {
    id: 7,
    first_name: "يوسف",
    last_name: "تازي",
    email: "youssef.tazi@email.com",
    phone_number: "+213 555 789 012",
  },
  {
    id: 8,
    first_name: "مريم",
    last_name: "الزهراء",
    email: "meriem.elzahra@email.com",
    phone_number: "+213 555 890 123",
  },
];

// Dummy data for teachers
const dummyTeachers = [
  {
    id: 1,
    first_name: "سارة",
    last_name: "جونسون",
    email: "sarah.johnson@school.dz",
    phone_number: "+213 555 111 222",
  },
  {
    id: 2,
    first_name: "أحمد",
    last_name: "تازي",
    email: "ahmed.tazi@school.dz",
    phone_number: "+213 555 222 333",
  },
  {
    id: 3,
    first_name: "فاطمة",
    last_name: "العلوي",
    email: "fatima.alaoui@school.dz",
    phone_number: "+213 555 333 444",
  },
  {
    id: 4,
    first_name: "ليلى",
    last_name: "منصوري",
    email: "leila.mansouri@school.dz",
    phone_number: "+213 555 444 555",
  },
  {
    id: 5,
    first_name: "كريم",
    last_name: "بناني",
    email: "karim.bennani@school.dz",
    phone_number: "+213 555 555 666",
  },
];

// Dummy data for groups
const dummyGroups = [
  {
    id: 1,
    name: "الرياضيات أ",
    level_id: 10,
    teacher_id: 1,
    module_ids: [1],
    students: [],
  },
  {
    id: 2,
    name: "الفيزياء ب",
    level_id: 11,
    teacher_id: 2,
    module_ids: [2],
    students: [],
  },
  {
    id: 3,
    name: "الكيمياء أ",
    level_id: 10,
    teacher_id: 3,
    module_ids: [3],
    students: [],
  },
  {
    id: 4,
    name: "الأحياء ب",
    level_id: 11,
    teacher_id: 4,
    module_ids: [4],
    students: [],
  },
  {
    id: 5,
    name: "العربية أ",
    level_id: 12,
    teacher_id: 5,
    module_ids: [5],
    students: [],
  },
  {
    id: 6,
    name: "الفرنسية أ",
    level_id: 10,
    teacher_id: 1,
    module_ids: [6],
    students: [],
  },
  {
    id: 7,
    name: "الإنجليزية ب",
    level_id: 11,
    teacher_id: 2,
    module_ids: [7],
    students: [],
  },
  {
    id: 8,
    name: "التاريخ أ",
    level_id: 12,
    teacher_id: 3,
    module_ids: [8],
    students: [],
  },
];

// Dummy data for students
const dummyStudents = [
  {
    id: 1,
    first_name: "أحمد",
    last_name: "بن علي",
    email: "ahmed.benali@school.dz",
    level_id: 10,
    group_id: 1,
    parent_id: 1,
    date_of_birth: "2008-05-15",
    national_id: "1234567890",
    gender: "M",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 2,
    first_name: "فاطمة",
    last_name: "العمري",
    email: "fatima.elamrani@school.dz",
    level_id: 11,
    group_id: 2,
    parent_id: 2,
    date_of_birth: "2007-03-22",
    national_id: "1234567891",
    gender: "F",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 3,
    first_name: "محمد",
    last_name: "تازي",
    email: "mohammed.tazi@school.dz",
    level_id: 10,
    group_id: 3,
    parent_id: 3,
    date_of_birth: "2008-07-10",
    national_id: "1234567892",
    gender: "M",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 4,
    first_name: "أمينة",
    last_name: "بوعزة",
    email: "amina.bouazza@school.dz",
    level_id: 11,
    group_id: 4,
    parent_id: 4,
    date_of_birth: "2007-01-18",
    national_id: "1234567893",
    gender: "F",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 5,
    first_name: "كريم",
    last_name: "بناني",
    email: "karim.bennani@school.dz",
    level_id: 12,
    group_id: 5,
    parent_id: 5,
    date_of_birth: "2006-09-05",
    national_id: "1234567894",
    gender: "M",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 6,
    first_name: "ليلى",
    last_name: "منصوري",
    email: "leila.mansouri@school.dz",
    level_id: 10,
    group_id: 6,
    parent_id: 6,
    date_of_birth: "2008-11-30",
    national_id: "1234567895",
    gender: "F",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 7,
    first_name: "يوسف",
    last_name: "تازي",
    email: "youssef.tazi@school.dz",
    level_id: 11,
    group_id: 7,
    parent_id: 7,
    date_of_birth: "2007-06-14",
    national_id: "1234567896",
    gender: "M",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 8,
    first_name: "مريم",
    last_name: "الزهراء",
    email: "meriem.elzahra@school.dz",
    level_id: 12,
    group_id: 8,
    parent_id: 8,
    date_of_birth: "2006-12-08",
    national_id: "1234567897",
    gender: "F",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 9,
    first_name: "عمر",
    last_name: "الشريف",
    email: "omar.elcherif@school.dz",
    level_id: 10,
    group_id: 1,
    parent_id: 1,
    date_of_birth: "2008-04-25",
    national_id: "1234567898",
    gender: "M",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 10,
    first_name: "سارة",
    last_name: "بناني",
    email: "sara.bennani@school.dz",
    level_id: 11,
    group_id: 2,
    parent_id: 5,
    date_of_birth: "2007-08-12",
    national_id: "1234567899",
    gender: "F",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 11,
    first_name: "حسن",
    last_name: "العلوي",
    email: "hassan.alaoui@school.dz",
    level_id: 10,
    group_id: 3,
    parent_id: 3,
    date_of_birth: "2008-02-28",
    national_id: "1234567800",
    gender: "M",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 12,
    first_name: "نور",
    last_name: "منصوري",
    email: "nour.mansouri@school.dz",
    level_id: 11,
    group_id: 4,
    parent_id: 6,
    date_of_birth: "2007-10-03",
    national_id: "1234567801",
    gender: "F",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 13,
    first_name: "علي",
    last_name: "تازي",
    email: "ali.tazi@school.dz",
    level_id: 12,
    group_id: 5,
    parent_id: 7,
    date_of_birth: "2006-07-19",
    national_id: "1234567802",
    gender: "M",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 14,
    first_name: "خديجة",
    last_name: "بوعزة",
    email: "khadija.bouazza@school.dz",
    level_id: 10,
    group_id: 6,
    parent_id: 4,
    date_of_birth: "2008-09-07",
    national_id: "1234567803",
    gender: "F",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 15,
    first_name: "إبراهيم",
    last_name: "بن علي",
    email: "ibrahim.benali@school.dz",
    level_id: 11,
    group_id: 7,
    parent_id: 1,
    date_of_birth: "2007-12-16",
    national_id: "1234567804",
    gender: "M",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 16,
    first_name: "زينب",
    last_name: "العمري",
    email: "zineb.elamrani@school.dz",
    level_id: 12,
    group_id: 8,
    parent_id: 2,
    date_of_birth: "2006-11-24",
    national_id: "1234567805",
    gender: "F",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  // Unassigned students
  {
    id: 17,
    first_name: "عبدالله",
    last_name: "الشريف",
    email: "abdallah.elcherif@school.dz",
    level_id: 10,
    group_id: 0,
    parent_id: 3,
    date_of_birth: "2008-06-20",
    national_id: "1234567806",
    gender: "M",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 18,
    first_name: "فاطمة",
    last_name: "بناني",
    email: "fatima.bennani@school.dz",
    level_id: 11,
    group_id: 0,
    parent_id: 5,
    date_of_birth: "2007-05-11",
    national_id: "1234567807",
    gender: "F",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 19,
    first_name: "محمد",
    last_name: "العلوي",
    email: "mohammed.alaoui@school.dz",
    level_id: 12,
    group_id: 0,
    parent_id: 3,
    date_of_birth: "2006-03-09",
    national_id: "1234567808",
    gender: "M",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
  {
    id: 20,
    first_name: "لينا",
    last_name: "منصوري",
    email: "lina.mansouri@school.dz",
    level_id: 10,
    group_id: 0,
    parent_id: 6,
    date_of_birth: "2008-08-14",
    national_id: "1234567809",
    gender: "F",
    is_approved: true,
    is_active: true,
    docs_url: "",
    enrollment_date: "2023-09-01",
  },
];

// Droppable Group Component
const DroppableGroup = ({ id, label, levelName, teacherName, isActive }) => {
  return (
    <div
      className={`p-3 rounded-lg border-2 transition-colors ${
        isActive
          ? "border-primary bg-primary/10"
          : "border-border bg-background-light hover:bg-background-dark"
      } ${id === "new-group" ? "border-dashed" : ""}`}
      style={{ minWidth: "150px" }}
    >
      <p className="font-semibold text-text">{label}</p>
      {levelName && (
        <p className="text-sm text-text-muted">Level: {levelName}</p>
      )}
      {teacherName && (
        <p className="text-sm text-text-muted">Teacher: {teacherName}</p>
      )}
    </div>
  );
};

// Sortable Student Component
const SortableStudent = ({
  student,
  onEdit,
  onDelete,
  onSelect,
  isSelected,
  isDragging,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: student.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 bg-card rounded-lg shadow-card flex items-center justify-between hover:bg-background-dark transition-colors"
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(student.id)}
          className="border-border"
        />
        <Avatar className="w-10 h-10">
          <AvatarImage src="/images/default_profile.png" />
          <AvatarFallback>
            {student.first_name?.[0]}
            {student.last_name?.[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-text">
            {student.first_name} {student.last_name}
          </p>
          <p className="text-sm text-text-muted">{student.email}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(student)}
          className="text-text-muted hover:text-primary"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(student.id)}
          className="text-text-muted hover:text-error"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Student List Component
const StudentList = ({
  title,
  students,
  onEdit,
  onDelete,
  onSelect,
  bulkSelected,
  activeStudent,
}) => {
  if (!students || !Array.isArray(students)) {
    return (
      <Card className="bg-background-light h-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-text flex justify-between items-center">
            {title}
            <Badge className="bg-primary text-text-inverted">0 students</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-muted text-center">No students</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-background-light h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-text flex justify-between items-center">
          {title}
          <Badge className="bg-primary text-text-inverted">
            {students.length} {students.length === 1 ? "student" : "students"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SortableContext
          items={students.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
            {students.length ? (
              students.map((student) => (
                <SortableStudent
                  key={student.id}
                  student={student}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onSelect={onSelect}
                  isSelected={bulkSelected.includes(student.id)}
                  isDragging={activeStudent?.id === student.id}
                />
              ))
            ) : (
              <p className="text-text-muted text-center">No students</p>
            )}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  );
};

export default function StudentsGroups() {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [levels] = useState(algerianLevels);
  const [modules] = useState(algerianModules);
  const [parents, setParents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [levelFilter, setLevelFilter] = useState("All");
  const [groupFilter, setGroupFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isEditStudentOpen, setIsEditStudentOpen] = useState(false);
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
    level_id: "",
    group_id: "",
    parent_id: "",
    date_of_birth: "",
    national_id: "",
    gender: "",
  });
  const [editStudent, setEditStudent] = useState(null);
  const [newGroup, setNewGroup] = useState({
    name: "",
    level_id: "",
    teacher_id: "",
    module_ids: [],
  });
  const [bulkSelected, setBulkSelected] = useState([]);
  const [activeStudent, setActiveStudent] = useState(null);
  const [isNewGroupPromptOpen, setIsNewGroupPromptOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [expandedGroups, setExpandedGroups] = useState({});
  const token = useSelector((state) => state.auth.accessToken);

  // Data Fetching and Manipulation Functions
  const getStudents = async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      message.success("Data loaded successfully");
      return dummyStudents;
    } catch (err) {
      message.error("Failed to load student data");
      throw err;
    }
  };

  const updateStudent = async (id, values) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      message.success("Student updated successfully");
    } catch (err) {
      message.error("Failed to update student");
      throw err;
    }
  };

  const getGroups = async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return dummyGroups;
    } catch (err) {
      message.error("Failed to load group data");
      throw err;
    }
  };

  const getLevels = async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return algerianLevels;
    } catch (err) {
      message.error("Failed to load level data");
      throw err;
    }
  };

  const getParents = async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return dummyParents;
    } catch (err) {
      message.error("Failed to load parent data");
      throw err;
    }
  };

  const getTeachers = async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return dummyTeachers;
    } catch (err) {
      message.error("Failed to load teacher data");
      throw err;
    }
  };

  const addGroup = async (groupData) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newGroup = {
        ...groupData,
        id: dummyGroups.length + 1,
        students: [],
      };
      message.success(`Group ${groupData.name} created successfully`);
      return newGroup;
    } catch (err) {
      message.error("Failed to create group");
      throw err;
    }
  };

  const deleteStudent = async (id) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      message.success("Student deleted successfully");
    } catch (err) {
      message.error("Failed to delete student");
      throw err;
    }
  };

  const addStudent = async (studentData) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      message.success("Student added successfully");
    } catch (err) {
      message.error("Failed to add student");
      throw err;
    }
  };

  // Initial Data Fetch
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [
          studentsData,
          groupsData,
          levelsData,
          parentsData,
          teachersData,
        ] = await Promise.all([
          getStudents(),
          getGroups(),
          getLevels(),
          getParents(),
          getTeachers(),
        ]);
        setStudents(Array.isArray(studentsData) ? studentsData : []);
        setGroups(Array.isArray(groupsData) ? groupsData : []);
        setLevels(Array.isArray(levelsData) ? levelsData : []);
        setParents(Array.isArray(parentsData) ? parentsData : []);
        setTeachers(Array.isArray(teachersData) ? teachersData : []);
      } catch (error) {
        message.error("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredStudents = useMemo(() => {
    if (!students || !Array.isArray(students)) return [];
    return students.filter((student) => {
      const matchesLevel =
        levelFilter === "All" || student.level_id === Number(levelFilter);
      const matchesGroup =
        groupFilter === "All" ||
        (!student.group_id && groupFilter === "unassigned") ||
        student.group_id === Number(groupFilter);
      const matchesSearch =
        student.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.national_id?.includes(searchQuery);
      return matchesLevel && matchesGroup && student.is_active !== false;
    });
  }, [students, levelFilter, groupFilter, searchQuery]);

  const groupStudents = useMemo(() => {
    return filteredStudents.filter(
      (s) => s.group_id && groupFilter !== "unassigned"
    );
  }, [filteredStudents, groupFilter]);

  const unassignedStudents = useMemo(() => {
    return filteredStudents.filter((s) => !s.group_id);
  }, [filteredStudents]);

  const stats = useMemo(() => {
    const total = filteredStudents.length;
    const assigned = filteredStudents.filter((s) => s.group_id).length;
    return { total, assigned, unassigned: total - assigned };
  }, [filteredStudents]);

  const availableGroups = useMemo(() => {
    if (!newStudent.level_id && !editStudent?.level_id) return groups;
    const levelId = Number(newStudent.level_id || editStudent?.level_id);
    return groups.filter((g) => g.level_id === levelId);
  }, [groups, newStudent.level_id, editStudent]);

  const addStudentHandler = useCallback(() => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const requiredFields = [
      { key: "first_name", label: "First Name" },
      { key: "last_name", label: "Last Name" },
      { key: "email", label: "Email" },
      { key: "level_id", label: "Level" },
      { key: "parent_id", label: "Parent" },
      { key: "date_of_birth", label: "Date of Birth" },
      { key: "national_id", label: "National ID" },
      { key: "gender", label: "Gender" },
    ];
    for (const field of requiredFields) {
      if (!newStudent[field.key]?.trim()) {
        message.error(`Please fill in ${field.label}`);
        setIsSubmitting(false);
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newStudent.email)) {
      message.error("Please enter a valid email");
      setIsSubmitting(false);
      return;
    }

    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobRegex.test(newStudent.date_of_birth)) {
      message.error("Please enter a valid date of birth (YYYY-MM-DD)");
      setIsSubmitting(false);
      return;
    }

    const nationalIdRegex = /^\d{10}$/;
    if (!nationalIdRegex.test(newStudent.national_id)) {
      message.error("National ID must be 10 digits");
      setIsSubmitting(false);
      return;
    }

    if (!["M", "F"].includes(newStudent.gender)) {
      message.error("Gender must be 'Male' or 'Female'");
      setIsSubmitting(false);
      return;
    }

    const level = levels.find((l) => l.id === Number(newStudent.level_id));
    if (!level) {
      message.error("Invalid level selected");
      setIsSubmitting(false);
      return;
    }

    const group =
      newStudent.group_id && newStudent.group_id !== "none"
        ? groups.find((g) => g.id === Number(newStudent.group_id))
        : null;
    if (newStudent.group_id && newStudent.group_id !== "none" && !group) {
      message.error("Invalid group selected");
      setIsSubmitting(false);
      return;
    }
    if (group && group.level_id !== Number(newStudent.level_id)) {
      message.error("Group level must match student level");
      setIsSubmitting(false);
      return;
    }

    const student = {
      first_name: newStudent.first_name.trim(),
      last_name: newStudent.last_name.trim(),
      email: newStudent.email.trim(),
      level_id: Number(newStudent.level_id),
      group_id:
        newStudent.group_id === "none" ? 0 : Number(newStudent.group_id),
      parent_id: Number(newStudent.parent_id),
      is_approved: false,
      docs_url: "",
      is_active: true,
      date_of_birth: newStudent.date_of_birth,
      national_id: newStudent.national_id,
      gender: newStudent.gender,
      enrollment_date: new Date().toISOString().split("T")[0],
    };

    addStudent(student)
      .then(() => getStudents())
      .then((updatedStudents) => {
        setStudents(updatedStudents);
        setNewStudent({
          first_name: "",
          last_name: "",
          email: "",
          level_id: "",
          group_id: "",
          parent_id: "",
          date_of_birth: "",
          national_id: "",
          gender: "",
        });
        setIsAddStudentOpen(false);
      })
      .catch((error) => {
        console.error("Failed to add student:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [newStudent, isSubmitting, levels, groups]);

  const editStudentGroup = useCallback(() => {
    if (!editStudent || isSubmitting) return;
    setIsSubmitting(true);

    const level = levels.find((l) => l.id === Number(editStudent.level_id));
    if (!level) {
      message.error("Invalid level selected");
      setIsSubmitting(false);
      return;
    }

    const group =
      editStudent.group_id !== "none"
        ? groups.find((g) => g.id === Number(editStudent.group_id))
        : null;
    if (editStudent.group_id !== "none" && !group) {
      message.error("Invalid group selected");
      setIsSubmitting(false);
      return;
    }
    if (group && group.level_id !== Number(editStudent.level_id)) {
      message.error("Group level must match student level");
      setIsSubmitting(false);
      return;
    }

    const updates = {
      first_name: editStudent.first_name.trim(),
      last_name: editStudent.last_name.trim(),
      level_id: Number(editStudent.level_id),
      group_id:
        editStudent.group_id === "none" ? 0 : Number(editStudent.group_id),
      docs_url: editStudent.docs_url || "",
    };

    updateStudent(editStudent.id, updates)
      .then(() => getStudents())
      .then((updatedStudents) => {
        setStudents(updatedStudents);
        setEditStudent(null);
        setIsEditStudentOpen(false);
      })
      .catch((error) => {
        message.error("Failed to update student");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [editStudent, isSubmitting, levels, groups]);

  const handleDeleteStudent = useCallback((id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (!deleteId || isSubmitting) return;
    setIsSubmitting(true);

    deleteStudent(deleteId)
      .then(() => getStudents())
      .then((updatedStudents) => {
        setStudents(updatedStudents);
        setBulkSelected((prev) => prev.filter((sid) => sid !== deleteId));
        setIsDeleteOpen(false);
        setDeleteId(null);
      })
      .catch((error) => {
        console.error("Failed to delete student:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [deleteId, isSubmitting]);

  const addGroupHandler = useCallback(() => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!newGroup.name.trim() || !newGroup.level_id) {
      message.error("Please fill in Group Name and Level");
      setIsSubmitting(false);
      return;
    }

    const trimmedGroupName = newGroup.name.trim();
    if (
      groups.some(
        (g) => g.name.toLowerCase() === trimmedGroupName.toLowerCase()
      )
    ) {
      message.error("Group already exists");
      setIsSubmitting(false);
      return;
    }

    const level = levels.find((l) => l.id === Number(newGroup.level_id));
    if (!level) {
      message.error("Invalid level selected");
      setIsSubmitting(false);
      return;
    }

    const teacher =
      newGroup.teacher_id !== "none" &&
      teachers.find((t) => t.id === Number(newGroup.teacher_id));
    if (newGroup.teacher_id !== "none" && !teacher) {
      message.error("Invalid teacher selected");
      setIsSubmitting(false);
      return;
    }

    const group = {
      name: trimmedGroupName,
      level_id: Number(newGroup.level_id),
      teacher_id:
        newGroup.teacher_id === "none" ? null : Number(newGroup.teacher_id),
    };

    addGroup(group)
      .then((newGroupResponse) => {
        setGroups((prev) => [...prev, newGroupResponse]);
        if (bulkSelected.length > 0) {
          const invalidStudents = bulkSelected
            .map((id) => students.find((s) => s.id === id))
            .filter((s) => s && s.level_id !== Number(newGroup.level_id));
          if (invalidStudents.length > 0) {
            message.error("Some selected students have mismatched levels");
            setIsSubmitting(false);
            return Promise.reject();
          }
          return Promise.all(
            bulkSelected.map((id) => {
              const student = students.find((s) => s.id === id);
              return updateStudent(id, {
                first_name: student.first_name.trim(),
                last_name: student.last_name.trim(),
                level_id: Number(student.level_id),
                group_id: newGroupResponse.id,
                docs_url: student.docs_url || "",
              });
            })
          ).then(() => getStudents());
        }
        return getStudents();
      })
      .then((updatedStudents) => {
        setStudents(updatedStudents);
        setNewGroup({ name: "", level_id: "", teacher_id: "" });
        setBulkSelected([]);
        setIsAddGroupOpen(false);
      })
      .catch(() => {})
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [
    newGroup,
    bulkSelected,
    groups,
    isSubmitting,
    levels,
    teachers,
    students,
  ]);

  const addGroupFromDrag = useCallback(() => {
    if (!activeStudent || isSubmitting) return;
    setIsSubmitting(true);

    if (!newGroup.name.trim() || !newGroup.level_id) {
      message.error("Please fill in Group Name and Level");
      setIsSubmitting(false);
      return;
    }

    if (Number(newGroup.level_id) !== activeStudent.level_id) {
      message.error("Group level must match student level");
      setIsSubmitting(false);
      return;
    }

    const trimmedGroupName = newGroup.name.trim();
    if (groups.some((g) => g.name === trimmedGroupName)) {
      message.error("Group already exists");
      setIsSubmitting(false);
      return;
    }

    const level = levels.find((l) => l.id === Number(newGroup.level_id));
    if (!level) {
      message.error("Invalid level selected");
      setIsSubmitting(false);
      return;
    }

    const teacher =
      newGroup.teacher_id !== "none" &&
      teachers.find((t) => t.id === Number(newGroup.teacher_id));
    if (newGroup.teacher_id !== "none" && !teacher) {
      message.error("Invalid teacher selected");
      setIsSubmitting(false);
      return;
    }

    const group = {
      name: trimmedGroupName,
      level_id: Number(newGroup.level_id),
      teacher_id:
        newGroup.teacher_id === "none" ? null : Number(newGroup.teacher_id),
    };

    addGroup(group)
      .then((newGroupResponse) => {
        return getGroups().then((updatedGroups) => ({
          newGroupResponse,
          updatedGroups,
        }));
      })
      .then(({ newGroupResponse, updatedGroups }) => {
        return updateStudent(activeStudent.id, {
          first_name: activeStudent.first_name.trim(),
          last_name: activeStudent.last_name.trim(),
          level_id: Number(activeStudent.level_id),
          group_id: newGroupResponse.id,
          docs_url: activeStudent.docs_url || "",
        }).then(() =>
          Promise.all([getStudents(), Promise.resolve(updatedGroups)])
        );
      })
      .then(([updatedStudents, updatedGroups]) => {
        setStudents(updatedStudents);
        setGroups(updatedGroups);
        setNewGroup({ name: "", level_id: "", teacher_id: "" });
        setIsNewGroupPromptOpen(false);
        setActiveStudent(null);
      })
      .catch((error) => {
        console.error("Failed to add group from drag:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [newGroup, activeStudent, groups, isSubmitting, levels, teachers]);

  const handleDragStart = useCallback(
    (event) => {
      const student = students.find((s) => s.id === event.active.id);
      if (student) {
        setActiveStudent(student);
      }
    },
    [students]
  );

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      if (!over) {
        setActiveStudent(null);
        return;
      }
      const student = students.find((s) => s.id === active.id);
      if (!student) {
        setActiveStudent(null);
        return;
      }
      if (over.id === "new-group") {
        setIsNewGroupPromptOpen(true);
        return;
      }
      const targetGroupId =
        over.id === "unassigned" ? 0 : Number(over.id.split("-")[1]);
      const group = targetGroupId
        ? groups.find((g) => g.id === targetGroupId)
        : null;
      if (group && group.level_id !== student.level_id) {
        message.error("Cannot assign to group with different level");
        setActiveStudent(null);
        return;
      }
      if (targetGroupId === 0 || groups.some((g) => g.id === targetGroupId)) {
        if (student.group_id !== targetGroupId) {
          updateStudent(student.id, {
            first_name: student.first_name.trim(),
            last_name: student.last_name.trim(),
            level_id: Number(student.level_id),
            group_id: targetGroupId,
            docs_url: student.docs_url || "",
          })
            .then(() => getStudents())
            .then((updatedStudents) => {
              setStudents(updatedStudents);
              message.success("Student reassigned successfully");
            })
            .catch((error) => {
              message.error("Failed to reassign student");
            });
        }
      }
      setActiveStudent(null);
    },
    [students, groups]
  );

  const toggleSelectStudent = useCallback((id) => {
    setBulkSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  }, []);

  const bulkAssignGroup = useCallback(
    (groupId) => {
      if (!bulkSelected.length || isSubmitting) return;
      setIsSubmitting(true);

      const targetGroupId = groupId === "unassigned" ? 0 : Number(groupId);
      const group = targetGroupId
        ? groups.find((g) => g.id === targetGroupId)
        : null;
      const invalidStudents = bulkSelected
        .map((id) => students.find((s) => s.id === id))
        .filter((s) => s && group && s.level_id !== group.level_id);
      if (invalidStudents.length > 0) {
        message.error("Some selected students have mismatched levels");
        setIsSubmitting(false);
        return;
      }

      if (targetGroupId === 0 || groups.some((g) => g.id === targetGroupId)) {
        Promise.all(
          bulkSelected.map((id) => {
            const student = students.find((s) => s.id === id);
            if (!student) {
              return Promise.reject(new Error(`Student ${id} not found`));
            }
            return updateStudent(id, {
              first_name: student.first_name.trim(),
              last_name: student.last_name.trim(),
              level_id: Number(student.level_id),
              group_id: targetGroupId,
              docs_url: student.docs_url || "",
            });
          })
        )
          .then(() => getStudents())
          .then((updatedStudents) => {
            setStudents(updatedStudents);
            setBulkSelected([]);
            message.success("Students assigned successfully");
          })
          .catch(() => {
            message.error("Failed to assign students");
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      } else {
        message.error("Invalid group selected");
        setIsSubmitting(false);
      }
    },
    [bulkSelected, isSubmitting, groups, students]
  );

  const exportCSV = useCallback(() => {
    const headers = [
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Level",
      "Group",
      "Parent",
      "Approved",
      "Date of Birth",
      "National ID",
      "Gender",
      "Enrollment Date",
    ];
    const rows = filteredStudents.map((s) => [
      s.id,
      s.first_name,
      s.last_name,
      s.email,
      levels.find((l) => l.id === s.level_id)?.name || "N/A",
      groups.find((g) => g.id === s.group_id)?.name || "Unassigned",
      parents.find((p) => p.id === s.parent_id)?.email || "N/A",
      s.is_approved ? "Yes" : "No",
      s.date_of_birth,
      s.national_id,
      s.gender === "M" ? "Male" : "Female",
      s.enrollment_date,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students_groups.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    message.success("CSV exported successfully");
  }, [filteredStudents, levels, groups, parents]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading groups data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                Groups & Students Management
              </h1>
              <p className="text-gray-600 text-lg">
                Organize students into study groups according to the Algerian
                curriculum
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setIsAddStudentOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                disabled={isSubmitting}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
              <Button
                onClick={() => setIsAddGroupOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
                disabled={isSubmitting}
              >
                <Group className="w-4 h-4 mr-2" />
                Create Group
              </Button>
              <Button
                onClick={exportCSV}
                variant="outline"
                className="border-gray-300 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Students
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {stats.total}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Students registered in system
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Active Groups
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {groups.length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Study groups</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <School className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Enrolled Students
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {stats.assigned}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">In groups</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Unassigned
                  </p>
                  <p className="text-3xl font-bold text-orange-600">
                    {stats.unassigned}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Need registration
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <UserX className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-48 border-gray-300">
                    <SelectValue placeholder="Select academic year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">جميع السنوات</SelectItem>
                    {levels.map((level) => (
                      <SelectItem key={level.id} value={String(level.id)}>
                        {level.name} ({level.short})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={groupFilter} onValueChange={setGroupFilter}>
                  <SelectTrigger className="w-48 border-gray-300">
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">جميع المجموعات</SelectItem>
                    <SelectItem value="unassigned">غير مسجلين</SelectItem>
                    {groups
                      .filter(
                        (g) =>
                          levelFilter === "All" ||
                          g.level_id === Number(levelFilter)
                      )
                      .map((group) => (
                        <SelectItem key={group.id} value={String(group.id)}>
                          {group.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="px-3"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="px-3"
                  >
                    <Target className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {bulkSelected.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <p className="text-blue-800 font-medium">
                    {bulkSelected.length} students selected
                  </p>
                  <div className="flex gap-2">
                    <Select onValueChange={bulkAssignGroup}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Move to group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassign</SelectItem>
                        {groups.map((group) => (
                          <SelectItem key={group.id} value={String(group.id)}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBulkSelected([])}
                    >
                      Cancel Selection
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        {/* Main Content Area */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Groups Grid */}
              {groups
                .filter(
                  (g) =>
                    levelFilter === "All" || g.level_id === Number(levelFilter)
                )
                .map((group) => {
                  const groupStudents = students.filter(
                    (s) => s.group_id === group.id
                  );
                  return (
                    <Card
                      key={group.id}
                      className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Group className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg font-bold text-gray-800">
                                {group.name}
                              </CardTitle>
                              <p className="text-sm text-gray-600">
                                {levels.find((l) => l.id === group.level_id)
                                  ?.english || "Unknown Level"}
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            {groupStudents.length} students
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {groupStudents.slice(0, 3).map((student) => (
                            <div
                              key={student.id}
                              className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                            >
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                  {student.first_name?.[0]}
                                  {student.last_name?.[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">
                                  {student.first_name} {student.last_name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {student.email}
                                </p>
                              </div>
                            </div>
                          ))}
                          {groupStudents.length > 3 && (
                            <p className="text-sm text-gray-500 text-center">
                              +{groupStudents.length - 3} more students
                            </p>
                          )}
                          {groupStudents.length === 0 && (
                            <p className="text-sm text-gray-500 text-center">
                              No students in this group
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

              {/* Unassigned Students Card */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-dashed border-orange-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <UserX className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-800">
                        Unassigned Students
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        {unassignedStudents.length} students need registration
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {unassignedStudents.slice(0, 3).map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center gap-3 p-2 bg-orange-50 rounded-lg"
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="bg-orange-100 text-orange-600 text-xs">
                            {student.first_name?.[0]}
                            {student.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {student.first_name} {student.last_name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    ))}
                    {unassignedStudents.length > 3 && (
                      <p className="text-sm text-gray-500 text-center">
                        +{unassignedStudents.length - 3} more students
                      </p>
                    )}
                    {unassignedStudents.length === 0 && (
                      <p className="text-sm text-gray-500 text-center">
                        All students are assigned to groups
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* List View */
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Students and Groups List
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Checkbox
                          checked={bulkSelected.includes(student.id)}
                          onCheckedChange={() =>
                            toggleSelectStudent(student.id)
                          }
                        />
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {student.first_name?.[0]}
                            {student.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-800">
                            {student.first_name} {student.last_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {student.email}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {levels.find((l) => l.id === student.level_id)
                                ?.short || "N/A"}
                            </Badge>
                            {student.group_id ? (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                {groups.find((g) => g.id === student.group_id)
                                  ?.name || "Unknown"}
                              </Badge>
                            ) : (
                              <Badge className="bg-orange-100 text-orange-800 text-xs">
                                Unassigned
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditStudent(student);
                            setIsEditStudentOpen(true);
                          }}
                          className="text-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteStudent(student.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <DragOverlay>
            {activeStudent && (
              <div className="p-4 bg-white rounded-lg shadow-2xl border-2 border-blue-300">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={activeStudent.avatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {activeStudent.first_name?.[0]}
                      {activeStudent.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {activeStudent.first_name} {activeStudent.last_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {levels.find((l) => l.id === activeStudent.level_id)
                        ?.english || "Unknown Level"}
                    </p>
                  </div>
                  <Badge
                    className={
                      activeStudent.group_id
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }
                  >
                    {groups.find((g) => g.id === activeStudent.group_id)
                      ?.name || "Unassigned"}
                  </Badge>
                </div>
              </div>
            )}
          </DragOverlay>
        </DndContext>
        <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
          <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <UserPlus className="w-6 h-6 text-blue-600" />
                Add New Student
              </DialogTitle>
              <p className="text-gray-600">
                Enter student information to add them to the system
              </p>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">First Name</Label>
                <Input
                  value={newStudent.first_name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, first_name: e.target.value })
                  }
                  placeholder="e.g., Ahmed"
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Last Name</Label>
                <Input
                  value={newStudent.last_name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, last_name: e.target.value })
                  }
                  placeholder="e.g., Ben Ali"
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Email</Label>
                <Input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, email: e.target.value })
                  }
                  placeholder="example@school.dz"
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  Date of Birth
                </Label>
                <Input
                  type="date"
                  value={newStudent.date_of_birth}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      date_of_birth: e.target.value,
                    })
                  }
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">National ID</Label>
                <Input
                  value={newStudent.national_id}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      national_id: e.target.value,
                    })
                  }
                  placeholder="1234567890"
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Gender</Label>
                <Select
                  value={newStudent.gender}
                  onValueChange={(value) =>
                    setNewStudent({ ...newStudent, gender: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  Academic Year
                </Label>
                <Select
                  value={newStudent.level_id}
                  onValueChange={(value) =>
                    setNewStudent({
                      ...newStudent,
                      level_id: value,
                      group_id: "",
                    })
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select academic year" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level.id} value={String(level.id)}>
                        {level.name} ({level.short})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  Group (Optional)
                </Label>
                <Select
                  value={newStudent.group_id || "none"}
                  onValueChange={(value) =>
                    setNewStudent({ ...newStudent, group_id: value })
                  }
                  disabled={!newStudent.level_id}
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Unassigned</SelectItem>
                    {availableGroups.map((group) => (
                      <SelectItem key={group.id} value={String(group.id)}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-gray-700 font-medium">Parent</Label>
                <Select
                  value={newStudent.parent_id}
                  onValueChange={(value) =>
                    setNewStudent({ ...newStudent, parent_id: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select parent" />
                  </SelectTrigger>
                  <SelectContent>
                    {parents.map((parent) => (
                      <SelectItem key={parent.id} value={String(parent.id)}>
                        {parent.first_name} {parent.last_name} - {parent.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setNewStudent({
                    first_name: "",
                    last_name: "",
                    email: "",
                    level_id: "",
                    group_id: "",
                    parent_id: "",
                    date_of_birth: "",
                    national_id: "",
                    gender: "",
                  });
                  setIsAddStudentOpen(false);
                }}
                disabled={isSubmitting}
                className="border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={addStudentHandler}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Student
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isEditStudentOpen} onOpenChange={setIsEditStudentOpen}>
          <DialogContent className="bg-background-light max-w-md animate-zoom-in">
            <DialogHeader>
              <DialogTitle className="text-lg text-text">
                Edit Student
              </DialogTitle>
            </DialogHeader>
            {editStudent ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-text">First Name</Label>
                  <p className="p-2 bg-background-dark rounded-md text-text">
                    {editStudent.first_name} {editStudent.last_name}
                  </p>
                </div>
                <div>
                  <Label className="text-text">Email</Label>
                  <p className="p-2 bg-background-dark rounded-md text-text">
                    {editStudent.email}
                  </p>
                </div>
                <div>
                  <Label className="text-text">Date of Birth</Label>
                  <p className="p-2 bg-background-dark rounded-md text-text">
                    {editStudent.date_of_birth}
                  </p>
                </div>
                <div>
                  <Label className="text-text">National ID</Label>
                  <p className="p-2 bg-background-dark rounded-md text-text">
                    {editStudent.national_id}
                  </p>
                </div>
                <div>
                  <Label className="text-text">Gender</Label>
                  <p className="p-2 bg-background-dark rounded-md text-text">
                    {editStudent.gender === "M" ? "Male" : "Female"}
                  </p>
                </div>
                <div>
                  <Label htmlFor="edit-level_id" className="text-text">
                    Level
                  </Label>
                  <Select
                    value={String(editStudent.level_id || "")}
                    onValueChange={(value) =>
                      setEditStudent({
                        ...editStudent,
                        level_id: value,
                        group_id: "none",
                      })
                    }
                  >
                    <SelectTrigger
                      id="edit-level_id"
                      className="border-border bg-background-light text-text"
                    >
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      {levels.map((l) => (
                        <SelectItem key={l.id} value={String(l.id)}>
                          {l.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-group_id" className="text-text">
                    Group (Optional)
                  </Label>
                  <Select
                    value={
                      editStudent.group_id
                        ? String(editStudent.group_id)
                        : "none"
                    }
                    onValueChange={(value) =>
                      setEditStudent({ ...editStudent, group_id: value })
                    }
                    disabled={!editStudent.level_id}
                  >
                    <SelectTrigger
                      id="edit-group_id"
                      className="border-border bg-background-light text-text"
                    >
                      <SelectValue placeholder="Select Group" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="none">Unassigned</SelectItem>
                      {availableGroups.map((g) => (
                        <SelectItem key={g.id} value={String(g.id)}>
                          {g.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <p className="text-text-muted">No students</p>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditStudentOpen(false)}
                className="border-border text-text hover:bg-background-dark"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={editStudentGroup}
                className="bg-primary text-text-inverted hover:bg-primary-light"
                disabled={isSubmitting || !editStudent}
                style={{ backgroundColor: "#0771CB" }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isAddGroupOpen} onOpenChange={setIsAddGroupOpen}>
          <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Group className="w-6 h-6 text-green-600" />
                Create New Group
              </DialogTitle>
              <p className="text-gray-600">
                Create a study group and select the required subjects
              </p>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">
                    Group Name
                  </Label>
                  <Input
                    value={newGroup.name}
                    onChange={(e) =>
                      setNewGroup({ ...newGroup, name: e.target.value })
                    }
                    placeholder="e.g., Science Group 1"
                    className="border-gray-300 focus:border-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">
                    Academic Year
                  </Label>
                  <Select
                    value={newGroup.level_id}
                    onValueChange={(value) =>
                      setNewGroup({
                        ...newGroup,
                        level_id: value,
                        module_ids: [],
                      })
                    }
                  >
                    <SelectTrigger className="border-gray-300 focus:border-green-500">
                      <SelectValue placeholder="Select academic year" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level.id} value={String(level.id)}>
                          {level.name} ({level.short})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  Supervisor Teacher (Optional)
                </Label>
                <Select
                  value={newGroup.teacher_id || "none"}
                  onValueChange={(value) =>
                    setNewGroup({ ...newGroup, teacher_id: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-green-500">
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No supervisor</SelectItem>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={String(teacher.id)}>
                        {teacher.first_name} {teacher.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {newGroup.level_id && (
                <div className="space-y-4">
                  <Label className="text-gray-700 font-medium">
                    Study Subjects
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto">
                    {modules
                      .filter((module) => {
                        // Filter modules based on level (primary, middle, secondary)
                        const levelId = Number(newGroup.level_id);
                        if (levelId <= 5)
                          return [
                            "علوم أساسية",
                            "لغات",
                            "تربية إسلامية",
                            "فنون",
                          ].includes(module.category);
                        if (levelId <= 9)
                          return [
                            "علوم أساسية",
                            "لغات",
                            "علوم إنسانية",
                            "تربية إسلامية",
                            "تكنولوجيا",
                            "تربية بدنية",
                            "فنون",
                          ].includes(module.category);
                        return true; // All modules for secondary
                      })
                      .map((module) => (
                        <div
                          key={module.id}
                          className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <Checkbox
                            id={`module-${module.id}`}
                            checked={
                              newGroup.module_ids?.includes(module.id) || false
                            }
                            onCheckedChange={(checked) => {
                              const currentIds = newGroup.module_ids || [];
                              if (checked) {
                                setNewGroup({
                                  ...newGroup,
                                  module_ids: [...currentIds, module.id],
                                });
                              } else {
                                setNewGroup({
                                  ...newGroup,
                                  module_ids: currentIds.filter(
                                    (id) => id !== module.id
                                  ),
                                });
                              }
                            }}
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor={`module-${module.id}`}
                              className="text-sm font-medium text-gray-800 cursor-pointer"
                            >
                              {module.name}
                            </Label>
                            <p className="text-xs text-gray-500">
                              {module.category}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                  {newGroup.module_ids?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-gray-600">
                        Selected subjects:
                      </span>
                      {newGroup.module_ids.map((moduleId) => {
                        const module = modules.find((m) => m.id === moduleId);
                        return (
                          <Badge
                            key={moduleId}
                            className="bg-blue-100 text-blue-800"
                          >
                            {module?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
            <DialogFooter className="gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setNewGroup({
                    name: "",
                    level_id: "",
                    teacher_id: "",
                    module_ids: [],
                  });
                  setIsAddGroupOpen(false);
                }}
                disabled={isSubmitting}
                className="border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={addGroupHandler}
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Group className="w-4 h-4 mr-2" />
                    Create Group
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isNewGroupPromptOpen}
          onOpenChange={setIsNewGroupPromptOpen}
        >
          <DialogContent className="bg-background-light max-w-md animate-zoom-in">
            <DialogHeader>
              <DialogTitle className="text-lg text-text">
                Create New Group
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="drag_group_name" className="text-text">
                  Group Name
                </Label>
                <Input
                  id="drag_group_name"
                  value={newGroup.name}
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, name: e.target.value })
                  }
                  placeholder="e.g., Science Group B"
                  className="border-border bg-background-light text-text"
                />
              </div>
              <div>
                <Label htmlFor="drag_group_level_id" className="text-text">
                  Level
                </Label>
                <Select
                  value={newGroup.level_id}
                  onValueChange={(value) =>
                    setNewGroup({ ...newGroup, level_id: value })
                  }
                >
                  <SelectTrigger
                    id="drag_group_level_id"
                    className="border-border bg-background-light text-text"
                  >
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    {levels.map((l) => (
                      <SelectItem key={l.id} value={String(l.id)}>
                        {l.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="drag_teacher_id" className="text-text">
                  Teacher (Optional)
                </Label>
                <Select
                  value={newGroup.teacher_id || "none"}
                  onValueChange={(value) =>
                    setNewGroup({ ...newGroup, teacher_id: value })
                  }
                >
                  <SelectTrigger
                    id="drag_teacher_id"
                    className="border-border bg-background-light text-text"
                  >
                    <SelectValue placeholder="Select Teacher" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="none">None</SelectItem>
                    {teachers.map((t) => (
                      <SelectItem key={t.id} value={String(t.id)}>
                        {t.first_name} {t.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setNewGroup({ name: "", level_id: "", teacher_id: "" });
                  setIsNewGroupPromptOpen(false);
                  setActiveStudent(null);
                }}
                className="border-border text-text hover:bg-background-dark"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={addGroupFromDrag}
                className="bg-primary text-text-inverted hover:bg-primary-light"
                disabled={isSubmitting}
                style={{ backgroundColor: "#0771CB" }}
              >
                Create and Assign
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent className="bg-background-light max-w-md animate-zoom-in">
            <DialogHeader>
              <DialogTitle className="text-lg text-text">
                Confirm Deletion
              </DialogTitle>
            </DialogHeader>
            <p className="text-text-muted">
              Are you sure you want to delete this student? This action is
              irreversible.
            </p>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteOpen(false)}
                className="border-border text-text hover:bg-background-dark"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="bg-error text-text-inverted hover:bg-error-light"
                disabled={isSubmitting}
                style={{ backgroundColor: "#EA5455" }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
