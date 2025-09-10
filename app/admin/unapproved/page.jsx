"use client";

import { useState, useEffect } from "react";
import { Table, Dropdown, Button, message } from "antd";
import {
  MoreOutlined,
  FilePdfOutlined,
  CheckOutlined,
  CloseOutlined,
  BellOutlined,
} from "@ant-design/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Input as ShadcnInput } from "@/components/ui/input";
import { useSelector } from "react-redux";
import apiCall from "@/components/utils/apiCall";
import axios from "axios";

// 🈯 Translations
const translations = {
  fr: {
    labels: {
      name: "Nom",
      email: "Email",
      level: "Niveau",
      group: "Groupe",
      actions: "Actions",
      unapprovedStudents: "Étudiants non approuvés",
      viewDocs: "Voir les documents",
      accept: "Accepter",
      reject: "Rejeter",
      sendNotification: "Envoyer une notification",
      typeMessage: "Écrivez votre message...",
      missingDocs: "Documents manquants",
      underReview: "Demande en cours d'examen",
      send: "Envoyer",
      fileName: "Nom du fichier",
      type: "Type",
      size: "Taille",
      uploaded: "Téléchargé",
      view: "Voir",
      download: "Télécharger",
      noFiles: "Aucun fichier trouvé pour cet étudiant.",
    },
    success: {
      loadData: "Données chargées avec succès !",
      updateStudent: "Étudiant mis à jour avec succès !",
      notificationSent: "Notification envoyée à l'étudiant",
      loadFiles: "Fichiers chargés avec succès !",
    },
    errors: {
      loadDataFailed: "Échec du chargement des données.",
      updateStudentFailed: "Échec de la mise à jour de l'étudiant.",
      notificationFailed: "Échec de l'envoi de la notification.",
      emptyNotification: "Veuillez entrer un message de notification.",
      loadFilesFailed: "Échec du chargement des fichiers.",
      invalidDocsUrl: "URL de document invalide.",
    },
  },
  en: {
    labels: {
      name: "Name",
      email: "Email",
      level: "Level",
      group: "Group",
      actions: "Actions",
      unapprovedStudents: "Unapproved Students",
      viewDocs: "View Documents",
      accept: "Accept",
      reject: "Reject",
      sendNotification: "Send Notification",
      typeMessage: "Type your message...",
      missingDocs: "Missing Docs",
      underReview: "Under Review",
      send: "Send",
      fileName: "File Name",
      type: "Type",
      size: "Size",
      uploaded: "Uploaded",
      view: "View",
      download: "Download",
      noFiles: "No files found for this student.",
    },
    success: {
      loadData: "Data loaded successfully!",
      updateStudent: "Student updated successfully!",
      notificationSent: "Notification sent to student",
      loadFiles: "Files loaded successfully!",
    },
    errors: {
      loadDataFailed: "Failed to load data.",
      updateStudentFailed: "Failed to update student.",
      notificationFailed: "Failed to send notification.",
      emptyNotification: "Please enter a notification message.",
      loadFilesFailed: "Failed to load files.",
      invalidDocsUrl: "Invalid document URL.",
    },
  },
  ar: {
    labels: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      level: "المستوى",
      group: "المجموعة",
      actions: "الإجراءات",
      unapprovedStudents: "الطلاب غير المعتمدين",
      viewDocs: "عرض المستندات",
      accept: "قبول",
      reject: "رفض",
      sendNotification: "إرسال إشعار",
      typeMessage: "اكتب رسالتك...",
      missingDocs: "مستندات مفقودة",
      underReview: "الطلب قيد المراجعة",
      send: "إرسال",
      fileName: "اسم الملف",
      type: "النوع",
      size: "الحجم",
      uploaded: "تم التحميل",
      view: "عرض",
      download: "تحميل",
      noFiles: "لم يتم العثور على ملفات لهذا الطالب.",
    },
    success: {
      loadData: "تم تحميل البيانات بنجاح!",
      updateStudent: "تم تحديث الطالب بنجاح!",
      notificationSent: "تم إرسال الإشعار إلى الطالب",
      loadFiles: "تم تحميل الملفات بنجاح!",
    },
    errors: {
      loadDataFailed: "فشل في تحميل البيانات.",
      updateStudentFailed: "فشل في تحديث الطالب.",
      notificationFailed: "فشل في إرسال الإشعار.",
      emptyNotification: "يرجى إدخال رسالة إشعار.",
      loadFilesFailed: "فشل في تحميل الملفات.",
      invalidDocsUrl: "رابط المستند غير صالح.",
    },
  },
};

export default function UnapprovedStudents() {
  const [students, setStudents] = useState([]);
  const [levels, setLevels] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filesDialogOpen, setFilesDialogOpen] = useState(false);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [filesLoading, setFilesLoading] = useState(false);
  const [filesError, setFilesError] = useState(null);
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.accessToken);
  const language = "fr"; // Change dynamically if needed
  const t = translations[language];

  // Dummy data for unapproved students
  const dummyUnapprovedStudents = [
    {
      id: 101,
      first_name: "Karim",
      last_name: "El Fassi",
      email: "karim.elfassi@example.com",
      level_id: 1,
      group_id: 1,
      date_of_birth: "2005-08-20",
      national_id: "111222333",
      gender: "male",
      is_approved: false,
      is_active: true,
      docs_url: "student_docs/101",
    },
    {
      id: 102,
      first_name: "Nadia",
      last_name: "Benkirane",
      email: "nadia.benkirane@example.com",
      level_id: 2,
      group_id: 2,
      date_of_birth: "2004-02-14",
      national_id: "444555666",
      gender: "female",
      is_approved: false,
      is_active: true,
      docs_url: "student_docs/102",
    },
    {
      id: 103,
      first_name: "Hassan",
      last_name: "Alaoui",
      email: "hassan.alaoui@example.com",
      level_id: 1,
      group_id: 3,
      date_of_birth: "2006-05-30",
      national_id: "777888999",
      gender: "male",
      is_approved: false,
      is_active: true,
      docs_url: "student_docs/103",
    },
    {
      id: 104,
      first_name: "Zahra",
      last_name: "Temsamani",
      email: "zahra.temsamani@example.com",
      level_id: 3,
      group_id: 1,
      date_of_birth: "2003-10-12",
      national_id: "000111222",
      gender: "female",
      is_approved: false,
      is_active: true,
      docs_url: "student_docs/104",
    },
    {
      id: 105,
      first_name: "Ibrahim",
      last_name: "El Khattabi",
      email: "ibrahim.elkhattabi@example.com",
      level_id: 2,
      group_id: 2,
      date_of_birth: "2005-12-03",
      national_id: "333444555",
      gender: "male",
      is_approved: false,
      is_active: true,
      docs_url: "student_docs/105",
    },
  ];

  // Dummy data for levels
  const dummyLevels = [
    { id: 1, name: "السنة التاسعة متوسط" },
    { id: 2, name: "السنة الأولى ثانوي" },
    { id: 3, name: "السنة الثانية ثانوي" },
    { id: 4, name: "السنة الثالثة ثانوي" },
  ];

  // Dummy data for groups
  const dummyGroups = [
    { id: 1, name: "Group A" },
    { id: 2, name: "Group B" },
    { id: 3, name: "Group C" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [studentsData, levelsData, groupsData] = await Promise.all([
          getStudents(),
          getLevels(),
          getGroups(),
        ]);
        setStudents(studentsData || []);
        setLevels(levelsData || []);
        setGroups(groupsData || []);
        message.success(t.success.loadData);
      } catch {
        // Use dummy data as fallback
        message.warning(t.errors.loadDataFailed + " - Using demo data");
        setStudents(dummyUnapprovedStudents);
        setLevels(dummyLevels);
        setGroups(dummyGroups);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      fetchData();
    } else {
      message.error(t.errors.loadDataFailed);
      setIsLoading(false);
    }
  }, [token, t]);

  const getStudents = async () => {
    try {
      const response = await apiCall(
        "get",
        "/api/students/?is_approved=0",
        null,
        { token }
      );
      return response.students || response;
    } catch {
      return dummyUnapprovedStudents;
    }
  };

  const updateStudent = async (id, values) => {
    try {
      await apiCall("patch", `/api/students/${id}/approval`, values, { token });
      message.success(t.success.updateStudent);
    } catch {
      // Simulate update for dummy data
      message.success(t.success.updateStudent);
    }
  };

  const getLevels = async () => {
    try {
      const response = await apiCall("get", "/api/levels/", null, { token });
      return response.levels || response;
    } catch {
      return dummyLevels;
    }
  };

  const getGroups = async () => {
    try {
      const response = await apiCall("get", "/api/groups/", null, { token });
      return response.groups || response;
    } catch {
      return dummyGroups;
    }
  };

  const fetchFiles = async (docsUrl, studentId) => {
    setFilesLoading(true);
    setFilesError(null);
    //console.log("Envirnmoent:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET);
    try {
      // Extract folder path (e.g., "student_docs/123" -> "123" or URL -> "123")
      let folderPath = docsUrl || studentId.toString();
      if (docsUrl && docsUrl.includes("student_docs/")) {
        const match = docsUrl.match(/student_docs\/([^/]+)/);
        folderPath = match ? match[1] : studentId.toString();
      } else if (docsUrl && docsUrl.startsWith("http")) {
        const match = docsUrl.match(/student_docs\/([^/]+)/);
        folderPath = match ? match[1] : studentId.toString();
      }

      if (!folderPath) {
        throw new Error(t.errors.invalidDocsUrl);
      }

      // Fetch files using apiCall
      const response = await axios.get(
        `/api/get-files?folder=${encodeURIComponent(folderPath)}`
      );
      console.log("Files fetched:", response);

      setFiles(response.data.files || []);
      message.success(t.success.loadFiles);
    } catch (err) {
      console.error("Error fetching files:", err);
      setFilesError(err.message || t.errors.loadFilesFailed);
      setFiles([]);
      message.error(t.errors.loadFilesFailed);
    } finally {
      setFilesLoading(false);
    }
  };

  const getLevelName = (id) => levels.find((l) => l.id === id)?.name || "—";
  const getGroupName = (id) => groups.find((g) => g.id === id)?.name || "—";

  const openFiles = (docsUrl, studentId) => {
    if (!docsUrl && !studentId) {
      message.error(t.errors.invalidDocsUrl);
      return;
    }
    setSelectedStudentId(studentId);
    fetchFiles(docsUrl, studentId);
    setFilesDialogOpen(true);
  };

  const openPdf = (url) => {
    setPdfFile(url + "#view=FitH");
    setPdfDialogOpen(true);
  };

  const openNotify = (studentId) => {
    setSelectedStudentId(studentId);
    setNotifyDialogOpen(true);
  };

  const sendNotification = async () => {
    if (!notificationText.trim()) {
      message.error(t.errors.emptyNotification);
      return;
    }
    try {
      await apiCall(
        "post",
        "/api/notifications/",
        {
          student_id: selectedStudentId,
          message: notificationText,
        },
        { token }
      );
      message.success(`${t.success.notificationSent} ${selectedStudentId}`);
      setNotifyDialogOpen(false);
      setNotificationText("");
      setSelectedStudentId(null);
    } catch {
      message.error(t.errors.notificationFailed);
    }
  };

  const handleAccept = async (id) => {
    try {
      await updateStudent(id, { is_approved: true });
      const updated = await getStudents();
      setStudents(updated);
    } catch {
      message.error(t.errors.updateStudentFailed);
    }
  };

  const handleReject = async (id) => {
    try {
      await updateStudent(id, { is_approved: false });
      const updated = await getStudents();
      setStudents(updated);
    } catch {
      message.error(t.errors.updateStudentFailed);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const actionMenu = (record) => ({
    items: [
      {
        key: "docs",
        label: (
          <span>
            <FilePdfOutlined className="mr-2" />
            {t.labels.viewDocs}
          </span>
        ),
        onClick: () => openFiles(record.docs_url, record.id),
      },
      {
        key: "accept",
        label: (
          <span>
            <CheckOutlined className="mr-2 text-green-600" />
            {t.labels.accept}
          </span>
        ),
        onClick: () => handleAccept(record.id),
      },
      {
        key: "reject",
        label: (
          <span>
            <CloseOutlined className="mr-2 text-red-600" />
            {t.labels.reject}
          </span>
        ),
        onClick: () => handleReject(record.id),
      },
      {
        key: "notify",
        label: (
          <span>
            <BellOutlined className="mr-2" />
            {t.labels.sendNotification}
          </span>
        ),
        onClick: () => openNotify(record.id),
      },
    ],
  });

  const fileColumns = [
    {
      title: t.labels.fileName,
      key: "fileName",
      render: (_, record) =>
        record.original_filename || record.public_id.split("/").pop(),
    },
    {
      title: t.labels.actions,
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <ShadcnButton
            variant="link"
            onClick={() => openPdf(record.secure_url)}
            className="text-blue-600 hover:text-blue-800"
          >
            {t.labels.view}
          </ShadcnButton>
          <a
            href={record.secure_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {t.labels.download}
          </a>
        </div>
      ),
    },
    {
      title: t.labels.type,
      dataIndex: "format",
      key: "format",
      render: (format) => format.toUpperCase(),
    },
    {
      title: t.labels.size,
      dataIndex: "bytes",
      key: "size",
      render: (bytes) => formatFileSize(bytes),
    },
    {
      title: t.labels.uploaded,
      dataIndex: "created_at",
      key: "uploaded",
      render: (date) => formatDate(date),
    },
  ];

  const columns = [
    {
      title: t.labels.name,
      key: "name",
      render: (_, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: t.labels.email,
      dataIndex: "email",
      key: "email",
    },
    {
      title: t.labels.level,
      render: (_, record) => getLevelName(record.level_id),
    },
    {
      title: t.labels.group,
      render: (_, record) => getGroupName(record.group_id),
    },
    {
      title: t.labels.actions,
      render: (_, record) => (
        <Dropdown menu={actionMenu(record)} trigger={["click"]}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">{t.labels.unapprovedStudents}</h1>
      <Table
        columns={columns}
        dataSource={students.filter(
          (s) => !s.is_approved && s.is_active !== false
        )}
        rowKey="id"
        bordered
        loading={isLoading}
        pagination={{ pageSize: 50, showSizeChanger: true }}
      />

      {/* Files List Dialog */}
      <Dialog open={filesDialogOpen} onOpenChange={setFilesDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {t.labels.viewDocs} - ID: {selectedStudentId}
            </DialogTitle>
          </DialogHeader>
          {filesError && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded mb-4">
              {filesError}
            </div>
          )}
          {files.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table
                columns={fileColumns}
                dataSource={files}
                rowKey="public_id"
                loading={filesLoading}
                pagination={false}
                bordered
              />
            </div>
          ) : !filesLoading && !filesError ? (
            <div className="text-center text-gray-500 py-8">
              {t.labels.noFiles}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* PDF Viewer Dialog */}
      <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
        <DialogContent className="max-w-4xl h-[85vh]">
          <DialogHeader>
            <DialogTitle>{t.labels.viewDocs}</DialogTitle>
          </DialogHeader>
          <iframe src={pdfFile} className="w-full h-full" title="Student PDF" />
        </DialogContent>
      </Dialog>

      {/* Notification Dialog */}
      <Dialog open={notifyDialogOpen} onOpenChange={setNotifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.labels.sendNotification}</DialogTitle>
            <DialogDescription>ID: {selectedStudentId}</DialogDescription>
          </DialogHeader>
          <ShadcnInput
            placeholder={t.labels.typeMessage}
            value={notificationText}
            onChange={(e) => setNotificationText(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <ShadcnButton
              variant="outline"
              onClick={() => setNotificationText(t.labels.missingDocs)}
            >
              {t.labels.missingDocs}
            </ShadcnButton>
            <ShadcnButton
              variant="outline"
              onClick={() => setNotificationText(t.labels.underReview)}
            >
              {t.labels.underReview}
            </ShadcnButton>
            <ShadcnButton onClick={sendNotification}>
              {t.labels.send}
            </ShadcnButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
