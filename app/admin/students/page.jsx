"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Dropdown,
  Button,
  message,
  Input,
  Space,
  Tag,
  Avatar,
} from "antd";
import {
  MoreOutlined,
  FilePdfOutlined,
  EyeOutlined,
  EditOutlined,
  BellOutlined,
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  IdcardOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import apiCall from "@/components/utils/apiCall";
import { useRouter } from "next/navigation";

const translations = {
  fr: {
    title: "Étudiants Approuvés",
    success: {
      loadData: "Données chargées avec succès !",
      updateStudent: "Étudiant mis à jour avec succès !",
    },
    errors: {
      loadDataFailed: "Échec du chargement des données.",
      updateStudentFailed: "Échec de la mise à jour de l'étudiant.",
      invalidLevel: "Le niveau sélectionné est invalide.",
      invalidGroup: "Le groupe sélectionné est invalide.",
    },
    viewStudentTitle: "Détails de l'étudiant",
    editStudentTitle: "Modifier l'étudiant",
    firstName: "Prénom",
    lastName: "Nom de famille",
    email: "Email",
    level: "Niveau",
    group: "Groupe",
    dob: "Date de naissance",
    nationalId: "Numéro national",
    gender: "Genre",
    male: "Homme",
    female: "Femme",
    unassigned: "Non affecté",
    notify: "Envoyer une notification",
    saveChanges: "Enregistrer les modifications",
    cancel: "Annuler",
    viewDocuments: "Voir les documents",
    view: "Voir",
    edit: "Modifier",
    loading: "Chargement...",
  },
};

export default function ApprovedStudents() {
  const [students, setStudents] = useState([]);
  const [levels, setLevels] = useState([]);
  const [groups, setGroups] = useState([]);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const router = useRouter();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const token = useSelector((state) => state.auth.accessToken);
  const language = "fr";
  const t = translations[language];

  // Helper functions to get level and group names
  const getLevelName = (levelId) => {
    const level = levels.find((l) => l.id === levelId);
    return level ? level.name : "Unknown Level";
  };

  const getGroupName = (groupId) => {
    if (!groupId) return "Unassigned";
    const group = groups.find((g) => g.id === groupId);
    return group ? group.name : "Unknown Group";
  };

  // Dummy data for students
  const dummyStudents = [
    {
      id: 1,
      first_name: "Ahmed",
      last_name: "Ben Ali",
      email: "ahmed.benali@school.dz",
      level_id: 10, // 1st Year Secondary
      group_id: 1,
      date_of_birth: "2005-03-15",
      national_id: "123456789",
      gender: "male",
      is_approved: true,
      is_active: true,
      docs_url: "student_docs/1",
    },
    {
      id: 2,
      first_name: "Fatima",
      last_name: "Al-Zahra",
      email: "fatima.alzahra@school.dz",
      level_id: 11, // 2nd Year Secondary
      group_id: 2,
      date_of_birth: "2004-07-22",
      national_id: "987654321",
      gender: "female",
      is_approved: true,
      is_active: true,
      docs_url: "student_docs/2",
    },
    {
      id: 3,
      first_name: "Mohammed",
      last_name: "El Hassan",
      email: "mohammed.elhassan@school.dz",
      level_id: 9, // 4th Year Middle
      group_id: 3,
      date_of_birth: "2006-01-10",
      national_id: "456789123",
      gender: "male",
      is_approved: true,
      is_active: true,
      docs_url: "student_docs/3",
    },
    {
      id: 4,
      first_name: "Amina",
      last_name: "Bouazza",
      email: "amina.bouazza@school.dz",
      level_id: 12, // 3rd Year Secondary
      group_id: 1,
      date_of_birth: "2003-11-05",
      national_id: "789123456",
      gender: "female",
      is_approved: true,
      is_active: true,
      docs_url: "student_docs/4",
    },
    {
      id: 5,
      first_name: "Youssef",
      last_name: "Tazi",
      email: "youssef.tazi@school.dz",
      level_id: 8, // 3rd Year Middle
      group_id: 2,
      date_of_birth: "2005-09-18",
      national_id: "321654987",
      gender: "male",
      is_approved: true,
      is_active: true,
      docs_url: "student_docs/5",
    },
    {
      id: 6,
      first_name: "Sara",
      last_name: "El Amrani",
      email: "sara.elamrani@school.dz",
      level_id: 7, // 2nd Year Middle
      group_id: 3,
      date_of_birth: "2006-04-30",
      national_id: "654987321",
      gender: "female",
      is_approved: true,
      is_active: true,
      docs_url: "student_docs/6",
    },
    {
      id: 7,
      first_name: "Omar",
      last_name: "Benjelloun",
      email: "omar.benjelloun@school.dz",
      level_id: 6, // 1st Year Middle
      group_id: 1,
      date_of_birth: "2004-12-08",
      national_id: "147258369",
      gender: "male",
      is_approved: true,
      is_active: true,
      docs_url: "student_docs/7",
    },
    {
      id: 8,
      first_name: "Leila",
      last_name: "Mouline",
      email: "leila.mouline@school.dz",
      level_id: 5, // 5th Year Primary
      group_id: 2,
      date_of_birth: "2005-06-14",
      national_id: "963852741",
      gender: "female",
      is_approved: true,
      is_active: true,
      docs_url: "student_docs/8",
    },
  ];

  // Dummy data for levels (Algerian Education System)
  const dummyLevels = [
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

  // Dummy data for groups
  const dummyGroups = [
    { id: 1, name: "مجموعة العلوم الأساسية أ" },
    { id: 2, name: "مجموعة اللغات ب" },
    { id: 3, name: "مجموعة العلوم الإنسانية ج" },
    { id: 4, name: "مجموعة التكنولوجيا د" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [{ data, total }, levelsData, groupsData] = await Promise.all([
          getStudents(pagination.current, pagination.pageSize),
          getLevels(),
          getGroups(),
        ]);
        setStudents(data);
        setLevels(levelsData);
        setGroups(groupsData);
        setPagination((prev) => ({ ...prev, total }));
      } catch {
        // Use dummy data as fallback
        message.warning(t.errors.loadDataFailed + " - Using demo data");
        setStudents(dummyStudents.slice(0, pagination.pageSize));
        setLevels(dummyLevels);
        setGroups(dummyGroups);
        setPagination((prev) => ({ ...prev, total: dummyStudents.length }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pagination.current, pagination.pageSize]);

  const getStudents = async (page = 1, limit = 10) => {
    try {
      const res = await apiCall(
        "get",
        `/api/students/?is_approved=1&page=${page}&limit=${limit}`,
        null,
        { token }
      );
      return {
        data: Array.isArray(res.students) ? res.students : [],
        total: res.total || 0,
      };
    } catch {
      // Return dummy data as fallback
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      return {
        data: dummyStudents.slice(startIndex, endIndex),
        total: dummyStudents.length,
      };
    }
  };

  const getLevels = async () => {
    try {
      const res = await apiCall("get", "/api/levels/", null, { token });
      return Array.isArray(res.levels) ? res.levels : [];
    } catch {
      return dummyLevels;
    }
  };

  const getGroups = async () => {
    try {
      const res = await apiCall("get", "/api/groups/", null, { token });
      return Array.isArray(res.groups) ? res.groups : [];
    } catch {
      return dummyGroups;
    }
  };

  const updateStudent = async (id, values) => {
    await apiCall("put", `/api/students/${id}`, values, { token });
    message.success(t.success.updateStudent);
  };

  const handleTableChange = (paginationInfo) => {
    setPagination({
      ...pagination,
      current: paginationInfo.current,
      pageSize: paginationInfo.pageSize,
    });
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      `${student.first_name} ${student.last_name}`
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      student.email.toLowerCase().includes(searchText.toLowerCase());

    const matchesLevel =
      !selectedLevel || student.level_id.toString() === selectedLevel;
    const matchesGroup =
      !selectedGroup || student.group_id?.toString() === selectedGroup;

    return matchesSearch && matchesLevel && matchesGroup;
  });

  const clearFilters = () => {
    setSearchText("");
    setSelectedLevel("");
    setSelectedGroup("");
  };

  const openPdf = (url) => {
    setPdfFile(
      url ||
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    );
    setPdfDialogOpen(true);
  };

  const openNotify = (student) => {
    setSelectedStudent(student);
    setNotifyDialogOpen(true);
  };

  const openView = (student) => {
    setSelectedStudent(student);
    setViewDialogOpen(true);
  };

  const openEdit = (student) => {
    setEditStudent({
      id: student.id,
      level_id: String(student.level_id || ""),
      group_id: student.group_id ? String(student.group_id) : "none",
    });
    setEditDialogOpen(true);
  };

  const handleEditStudent = async () => {
    if (!editStudent) return;
    const levelValid = levels.some(
      (l) => l.id === Number(editStudent.level_id)
    );
    const groupValid =
      editStudent.group_id === "none" ||
      groups.some((g) => g.id === Number(editStudent.group_id));
    if (!levelValid) return message.error(t.errors.invalidLevel);
    if (!groupValid) return message.error(t.errors.invalidGroup);

    await updateStudent(editStudent.id, {
      level_id: Number(editStudent.level_id),
      group_id:
        editStudent.group_id === "none" ? null : Number(editStudent.group_id),
    });

    const { data } = await getStudents(pagination.current, pagination.pageSize);
    setStudents(data);
    setEditDialogOpen(false);
    setEditStudent(null);
  };

  const sendNotification = async () => {
    if (!notificationText.trim())
      return message.error("Veuillez entrer un message.");
    await apiCall(
      "post",
      `/api/notifications/`,
      {
        student_id: selectedStudent.id,
        message: notificationText,
      },
      { token }
    );
    message.success(`Notification envoyée à l'étudiant ${selectedStudent.id}`);
    setNotifyDialogOpen(false);
    setNotificationText("");
    setSelectedStudent(null);
  };

  const actionMenu = (record) => ({
    items: [
      {
        key: "view",
        label: (
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-md transition-colors">
            <EyeOutlined className="text-blue-600" />
            <span className="text-gray-700 font-medium">{t.view}</span>
          </div>
        ),
        onClick: () => router.push(`/admin/studentProfile/${record.id}`),
      },
      {
        key: "edit",
        label: (
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-green-50 rounded-md transition-colors">
            <EditOutlined className="text-green-600" />
            <span className="text-gray-700 font-medium">{t.edit}</span>
          </div>
        ),
        onClick: () => openEdit(record),
      },
      {
        key: "docs",
        label: (
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-purple-50 rounded-md transition-colors">
            <FilePdfOutlined className="text-purple-600" />
            <span className="text-gray-700 font-medium">{t.viewDocuments}</span>
          </div>
        ),
        onClick: () => openPdf(record.docs_url),
      },
      {
        key: "notify",
        label: (
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-orange-50 rounded-md transition-colors">
            <BellOutlined className="text-orange-600" />
            <span className="text-gray-700 font-medium">{t.notify}</span>
          </div>
        ),
        onClick: () => openNotify(record),
      },
    ],
  });

  const columns = [
    {
      title: "Student",
      key: "student",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <div className="font-medium text-gray-900">
              {record.first_name} {record.last_name}
            </div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
      sorter: (a, b) =>
        `${a.first_name} ${a.last_name}`.localeCompare(
          `${b.first_name} ${b.last_name}`
        ),
    },
    {
      title: "Level",
      render: (_, record) => (
        <Badge variant="outline" className="font-medium">
          {getLevelName(record.level_id)}
        </Badge>
      ),
      filters: levels.map((level) => ({
        text: level.name,
        value: level.id,
      })),
      onFilter: (value, record) => record.level_id === value,
    },
    {
      title: "Group",
      render: (_, record) => (
        <Tag color="blue" className="font-medium">
          {getGroupName(record.group_id)}
        </Tag>
      ),
      filters: groups.map((group) => ({
        text: group.name,
        value: group.id,
      })),
      onFilter: (value, record) => record.group_id === value,
    },
    {
      title: "Status",
      render: (_, record) => (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          Approved
        </Badge>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          menu={actionMenu(record)}
          trigger={["click"]}
          placement="bottomRight"
          overlayClassName="shadow-lg rounded-lg"
        >
          <Button
            type="text"
            className="flex items-center gap-2 hover:bg-blue-50 rounded-lg px-3 py-2"
          >
            <MoreOutlined className="text-gray-600" />
            <span className="text-gray-600">Actions</span>
          </Button>
        </Dropdown>
      ),
      width: 120,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t.title}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Manage and monitor approved students in the system
            </p>
          </CardHeader>
        </Card>

        {/* Filters and Search */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  <SearchOutlined className="mr-2" />
                  Search Students
                </Label>
                <Input
                  placeholder="Search by name or email..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  prefix={<SearchOutlined />}
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  <FilterOutlined className="mr-2" />
                  Filter by Level
                </Label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-levels">All Levels</SelectItem>
                    {levels.map((level) => (
                      <SelectItem key={level.id} value={level.id.toString()}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  <TeamOutlined className="mr-2" />
                  Filter by Group
                </Label>
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All Groups" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-groups">All Groups</SelectItem>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.id.toString()}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={clearFilters}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-lg"
                >
                  Clear Filters
                </Button>
              </div>
            </div>

            {/* Filter Summary */}
            {(searchText || selectedLevel || selectedGroup) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchText && (
                  <Tag color="blue" closable onClose={() => setSearchText("")}>
                    Search: {searchText}
                  </Tag>
                )}
                {selectedLevel && (
                  <Tag
                    color="green"
                    closable
                    onClose={() => setSelectedLevel("")}
                  >
                    Level:{" "}
                    {
                      levels.find((l) => l.id.toString() === selectedLevel)
                        ?.name
                    }
                  </Tag>
                )}
                {selectedGroup && (
                  <Tag
                    color="purple"
                    closable
                    onClose={() => setSelectedGroup("")}
                  >
                    Group:{" "}
                    {
                      groups.find((g) => g.id.toString() === selectedGroup)
                        ?.name
                    }
                  </Tag>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table
                columns={columns}
                dataSource={filteredStudents.filter(
                  (s) => s.is_approved && s.is_active !== false
                )}
                rowKey="id"
                bordered={false}
                loading={isLoading}
                onChange={handleTableChange}
                pagination={{
                  current: pagination.current,
                  pageSize: pagination.pageSize,
                  total: filteredStudents.length,
                  showSizeChanger: true,
                  showTotal: (total, range) =>
                    `Showing ${range[0]}-${range[1]} of ${total} students`,
                  className: "px-6 py-4",
                }}
                scroll={{ x: 1000 }}
                size="middle"
                className="custom-table"
                rowClassName="hover:bg-blue-50/50 transition-colors duration-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* View Student Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserOutlined />
                {t.viewStudentTitle}
              </DialogTitle>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-6">
                {/* Student Avatar and Basic Info */}
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <Avatar size={64} icon={<UserOutlined />} />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedStudent.first_name} {selectedStudent.last_name}
                    </h3>
                    <p className="text-gray-600 flex items-center gap-2">
                      <MailOutlined />
                      {selectedStudent.email}
                    </p>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <IdcardOutlined />
                        Personal Information
                      </h4>
                      <div className="space-y-2">
                        <p className="flex justify-between">
                          <span className="text-gray-600">First Name:</span>
                          <span className="font-medium">
                            {selectedStudent.first_name}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600">Last Name:</span>
                          <span className="font-medium">
                            {selectedStudent.last_name}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600">Date of Birth:</span>
                          <span className="font-medium">
                            {selectedStudent.date_of_birth}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600">National ID:</span>
                          <span className="font-medium">
                            {selectedStudent.national_id}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600">Gender:</span>
                          <Badge
                            variant={
                              selectedStudent.gender === "male"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {selectedStudent.gender === "male"
                              ? t.male
                              : t.female}
                          </Badge>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <TeamOutlined />
                        Academic Information
                      </h4>
                      <div className="space-y-2">
                        <p className="flex justify-between">
                          <span className="text-gray-600">Level:</span>
                          <span className="font-medium">
                            {getLevelName(selectedStudent.level_id)}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600">Group:</span>
                          <span className="font-medium">
                            {getGroupName(selectedStudent.group_id)}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <Badge
                            variant="default"
                            className="bg-green-100 text-green-800"
                          >
                            Approved
                          </Badge>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Information */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <PhoneOutlined />
                      Contact Information
                    </h4>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">
                          {selectedStudent.email}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">
                          {selectedStudent.phone_number || "Not provided"}
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Student Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-md md:max-w-lg">
            <DialogHeader>
              <DialogTitle>{t.editStudentTitle}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-sm md:text-base">{t.level}</Label>
                <Select
                  value={editStudent?.level_id || ""}
                  onValueChange={(value) =>
                    setEditStudent((prev) => ({ ...prev, level_id: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisir un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level.id} value={String(level.id)}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm md:text-base">{t.group}</Label>
                <Select
                  value={editStudent?.group_id || "none"}
                  onValueChange={(value) =>
                    setEditStudent((prev) => ({ ...prev, group_id: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisir un groupe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{t.unassigned}</SelectItem>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={String(group.id)}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="flex flex-col-reverse md:flex-row gap-2">
              <ShadcnButton
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
              >
                {t.cancel}
              </ShadcnButton>
              <ShadcnButton onClick={handleEditStudent}>
                {t.saveChanges}
              </ShadcnButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* PDF Dialog */}
        <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
          <DialogContent className="w-full h-[80vh] max-w-5xl p-2 md:p-6">
            {pdfFile && (
              <iframe
                src={pdfFile}
                className="w-full h-full rounded-md"
                frameBorder="0"
                title="PDF Document"
              ></iframe>
            )}
          </DialogContent>
        </Dialog>

        {/* Notification Dialog */}
        <Dialog open={notifyDialogOpen} onOpenChange={setNotifyDialogOpen}>
          <DialogContent className="max-w-md md:max-w-lg">
            <DialogHeader>
              <DialogTitle>{t.notify}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <ShadcnInput
                value={notificationText}
                onChange={(e) => setNotificationText(e.target.value)}
                placeholder="Entrez votre message ici"
                className="w-full"
              />
            </div>
            <DialogFooter className="flex flex-col-reverse md:flex-row gap-2">
              <ShadcnButton
                variant="outline"
                onClick={() => setNotifyDialogOpen(false)}
              >
                {t.cancel}
              </ShadcnButton>
              <ShadcnButton onClick={sendNotification}>
                {t.saveChanges}
              </ShadcnButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
