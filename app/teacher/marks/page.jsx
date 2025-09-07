"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Select,
  Table,
  InputNumber,
  Button,
  message,
  Spin,
  Alert,
  Row,
  Col,
  Progress,
  Statistic,
} from "antd";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import apiCall from "@/components/utils/apiCall";
import styled from "styled-components";
import {
  BookOpen,
  Users,
  TrendingUp,
  Download,
  Save,
  Award,
  GraduationCap,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const StyledSection = styled.div`
  margin-bottom: 32px;
  position: relative;
`;

const StyledHeader = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1a1a1a;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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

const StyledSubHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MarksCard = styled(Card)`
  border-radius: 16px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #ffffff 0%, #fafbff 100%);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  }

  h3 {
    margin: 0 0 8px 0;
    font-size: 1.5rem;
    font-weight: 700;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const FiltersSection = styled.div`
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid #e8e8e8;
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 600;
    border: none;
  }

  .ant-table-tbody > tr:hover > td {
    background: #f8f9ff;
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const ActionButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  height: 32px;
  font-weight: 500;

  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    transform: translateY(-1px);
  }
`;

// ===== FETCHERS OUTSIDE COMPONENT =====

// ========== COMPONENT ==========

export default function TeacherMarksPage() {
  const token = useSelector((state) => state.auth.accessToken);
  const [modules, setModules] = useState([]);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [saving, setSaving] = useState({ test: false, cc: false, exam: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const teacherId = token ? jwtDecode(token)?.teacher_id : null;

  // Dummy data
  const dummyModules = [
    {
      id: 1,
      name: "Mathematics - Algebra",
      groups: [
        { id: 1, name: "Group A" },
        { id: 2, name: "Group B" },
      ],
    },
    {
      id: 2,
      name: "English - Literature",
      groups: [
        { id: 1, name: "Group A" },
        { id: 3, name: "Group C" },
      ],
    },
    {
      id: 3,
      name: "Science - Physics",
      groups: [
        { id: 2, name: "Group B" },
        { id: 3, name: "Group C" },
      ],
    },
    {
      id: 4,
      name: "History - World History",
      groups: [{ id: 1, name: "Group A" }],
    },
    {
      id: 5,
      name: "Computer Science - Programming",
      groups: [
        { id: 2, name: "Group B" },
        { id: 3, name: "Group C" },
      ],
    },
  ];

  const dummyGroups = [
    { id: 1, name: "Group A" },
    { id: 2, name: "Group B" },
    { id: 3, name: "Group C" },
  ];

  const dummyStudents = [
    {
      id: 1,
      first_name: "Ahmed",
      last_name: "Alami",
      test: 85,
      cc: 90,
      exam: 88,
    },
    {
      id: 2,
      first_name: "Fatima",
      last_name: "Benali",
      test: 92,
      cc: 85,
      exam: 90,
    },
    {
      id: 3,
      first_name: "Youssef",
      last_name: "Tazi",
      test: 78,
      cc: 82,
      exam: 85,
    },
    {
      id: 4,
      first_name: "Amina",
      last_name: "El Fassi",
      test: 88,
      cc: 91,
      exam: 87,
    },
    {
      id: 5,
      first_name: "Omar",
      last_name: "Alaoui",
      test: 76,
      cc: 80,
      exam: 82,
    },
    {
      id: 6,
      first_name: "Sara",
      last_name: "Bouazza",
      test: 95,
      cc: 88,
      exam: 92,
    },
    {
      id: 7,
      first_name: "Karim",
      last_name: "Rachidi",
      test: 82,
      cc: 87,
      exam: 89,
    },
    {
      id: 8,
      first_name: "Leila",
      last_name: "Mouline",
      test: 89,
      cc: 93,
      exam: 91,
    },
  ];

  const fetchModulesAndGroups = async (teacherId, token) => {
    try {
      const res = await apiCall(
        "get",
        `/api/modules/?teacher_id=${teacherId}`,
        null,
        { token }
      );
      const fetchedModules = res.modules || res.data || [];
      const allGroups = fetchedModules
        .flatMap((m) => m.groups || [])
        .filter((g, i, self) => self.findIndex((x) => x.id === g.id) === i);
      return { modules: fetchedModules, groups: allGroups };
    } catch (err) {
      // Use dummy data as fallback
      return { modules: dummyModules, groups: dummyGroups };
    }
  };

  const fetchStudentsForGroup = async (groupId, token) => {
    try {
      const res = await apiCall(
        "get",
        `/api/groups/${groupId}/students/`,
        null,
        {
          token,
        }
      );
      return res.students || res.data || [];
    } catch (err) {
      // Use dummy data as fallback
      return dummyStudents.map((s) => ({
        ...s,
        test: null,
        cc: null,
        exam: null,
      }));
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      if (!token || !teacherId) {
        // Use dummy data when no token
        setModules(dummyModules);
        setGroups(dummyGroups);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { modules, groups } = await fetchModulesAndGroups(
          teacherId,
          token
        );
        setModules(modules);
        setGroups(groups);
        setLoading(false);
      } catch (err) {
        message.warning("Failed to load modules - Using demo data");
        setModules(dummyModules);
        setGroups(dummyGroups);
        setLoading(false);
      }
    };

    initializeData();
  }, [token, teacherId]);

  useEffect(() => {
    if (!selectedGroup) {
      setStudents([]);
      return;
    }

    setLoadingStudents(true);
    fetchStudentsForGroup(selectedGroup, token)
      .then((data) => {
        setStudents(
          data.map((s) => ({
            ...s,
            test: s.test || null,
            cc: s.cc || null,
            exam: s.exam || null,
          }))
        );
      })
      .catch(() => {
        message.warning("Failed to load students - Using demo data");
        setStudents(
          dummyStudents.map((s) => ({ ...s, test: null, cc: null, exam: null }))
        );
      })
      .finally(() => setLoadingStudents(false));
  }, [selectedGroup, token]);

  useEffect(() => {
    setSelectedGroup(null);
    setStudents([]);
  }, [selectedModule]);

  const handleMarkChange = (id, field, value) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = async (field) => {
    if (!selectedModule) return;

    setSaving((prev) => ({ ...prev, [field]: true }));
    try {
      const payload = students
        .filter((s) => s[field] !== null && s[field] !== undefined)
        .map((s) => ({
          student_id: s.id,
          module_id: selectedModule,
          value: s[field],
          type: field,
          comment: "",
        }));

      await apiCall("post", "/api/notes/", payload, { token });
      message.success(`${field.toUpperCase()} marks saved successfully!`);
    } catch {
      message.error(`Failed to save ${field} marks.`);
    } finally {
      setSaving((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleExportCSV = () => {
    if (!students.length) {
      message.warn("No data to export.");
      return;
    }
    const header = ["Student ID", "Name", "Test", "CC", "Exam", "Average"];
    const rows = students.map((s) => [
      s.id,
      `${s.first_name || ""} ${s.last_name || s.name || ""}`,
      s.test ?? "",
      s.cc ?? "",
      s.exam ?? "",
      s.test && s.cc && s.exam
        ? Math.round(((s.test + s.cc + s.exam) / 3) * 100) / 100
        : "",
    ]);
    const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `marks_${selectedModule || "group"}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Marks exported successfully!");
  };

  // Calculate statistics
  const getMarksStats = () => {
    if (!students.length) return { average: 0, passed: 0, excellent: 0 };

    const validMarks = students.filter((s) => s.test && s.cc && s.exam);
    const averages = validMarks.map((s) => (s.test + s.cc + s.exam) / 3);
    const average = averages.length
      ? Math.round(averages.reduce((a, b) => a + b, 0) / averages.length)
      : 0;
    const passed = averages.filter((avg) => avg >= 50).length;
    const excellent = averages.filter((avg) => avg >= 85).length;

    return { average, passed, excellent };
  };

  const stats = getMarksStats();

  const columns = [
    {
      title: "Student ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (id) => <span style={{ fontWeight: 500 }}>#{id}</span>,
    },
    {
      title: "Name",
      key: "name",
      render: (_, s) => (
        <div>
          <div style={{ fontWeight: 600, color: "#333" }}>
            {`${s.first_name || ""} ${s.last_name || s.name || ""}`}
          </div>
        </div>
      ),
    },
    {
      title: (
        <div style={{ textAlign: "center" }}>
          <div>Test (20%)</div>
          <ActionButton
            size="small"
            onClick={() => handleSave("test")}
            loading={saving.test}
            style={{ marginTop: 4 }}
          >
            <Save size={14} style={{ marginRight: 4 }} />
            Save
          </ActionButton>
        </div>
      ),
      dataIndex: "test",
      key: "test",
      width: 120,
      render: (_, r) => (
        <InputNumber
          min={0}
          max={100}
          value={r.test}
          onChange={(v) => handleMarkChange(r.id, "test", v)}
          style={{ width: "100%" }}
          placeholder="0-100"
        />
      ),
    },
    {
      title: (
        <div style={{ textAlign: "center" }}>
          <div>CC (30%)</div>
          <ActionButton
            size="small"
            onClick={() => handleSave("cc")}
            loading={saving.cc}
            style={{ marginTop: 4 }}
          >
            <Save size={14} style={{ marginRight: 4 }} />
            Save
          </ActionButton>
        </div>
      ),
      dataIndex: "cc",
      key: "cc",
      width: 120,
      render: (_, r) => (
        <InputNumber
          min={0}
          max={100}
          value={r.cc}
          onChange={(v) => handleMarkChange(r.id, "cc", v)}
          style={{ width: "100%" }}
          placeholder="0-100"
        />
      ),
    },
    {
      title: (
        <div style={{ textAlign: "center" }}>
          <div>Exam (50%)</div>
          <ActionButton
            size="small"
            onClick={() => handleSave("exam")}
            loading={saving.exam}
            style={{ marginTop: 4 }}
          >
            <Save size={14} style={{ marginRight: 4 }} />
            Save
          </ActionButton>
        </div>
      ),
      dataIndex: "exam",
      key: "exam",
      width: 120,
      render: (_, r) => (
        <InputNumber
          min={0}
          max={100}
          value={r.exam}
          onChange={(v) => handleMarkChange(r.id, "exam", v)}
          style={{ width: "100%" }}
          placeholder="0-100"
        />
      ),
    },
    {
      title: "Average",
      key: "average",
      width: 100,
      render: (_, r) => {
        if (r.test && r.cc && r.exam) {
          const avg = Math.round(((r.test + r.cc + r.exam) / 3) * 100) / 100;
          return (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color:
                    avg >= 85 ? "#52c41a" : avg >= 50 ? "#1890ff" : "#ff4d4f",
                }}
              >
                {avg}
              </div>
              <Progress
                percent={avg}
                size="small"
                showInfo={false}
                strokeColor={
                  avg >= 85 ? "#52c41a" : avg >= 50 ? "#1890ff" : "#ff4d4f"
                }
              />
            </div>
          );
        }
        return <span style={{ color: "#999" }}>-</span>;
      },
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "24px",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
        }}
      >
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "24px",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
        <Col>
          <ElegantLogo>
            <LogoIcon>
              <GraduationCap size={24} color="#ffffff" />
            </LogoIcon>
            <LogoText>Dirassati</LogoText>
          </ElegantLogo>
          <StyledHeader>Student Marks Management</StyledHeader>
          <p style={{ color: "#666", fontSize: "1.1rem", margin: 0 }}>
            Enter and manage student marks for your modules.
          </p>
        </Col>
        <Col>
          <ActionButton
            type="primary"
            size="large"
            onClick={handleExportCSV}
            disabled={!students.length}
            style={{ marginRight: 16 }}
          >
            <Download size={16} style={{ marginRight: 8 }} />
            Export CSV
          </ActionButton>
        </Col>
      </Row>

      {/* Statistics */}
      <StatsGrid>
        <StatCard>
          <Award size={24} style={{ marginBottom: 8 }} />
          <h3>{stats.average}%</h3>
          <p>Class Average</p>
        </StatCard>
        <StatCard>
          <CheckCircle size={24} style={{ marginBottom: 8 }} />
          <h3>{stats.passed}</h3>
          <p>Students Passed</p>
        </StatCard>
        <StatCard>
          <TrendingUp size={24} style={{ marginBottom: 8 }} />
          <h3>{stats.excellent}</h3>
          <p>Excellent (≥85%)</p>
        </StatCard>
        <StatCard>
          <Users size={24} style={{ marginBottom: 8 }} />
          <h3>{students.length}</h3>
          <p>Total Students</p>
        </StatCard>
      </StatsGrid>

      {/* Filters Section */}
      <StyledSection>
        <StyledSubHeader>
          <BookOpen /> Module & Group Selection
        </StyledSubHeader>
        <FiltersSection>
          <Row gutter={16} align="middle">
            <Col xs={24} sm={12} md={8}>
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
                >
                  Select Module
                </label>
                <Select
                  placeholder="Choose a module"
                  style={{ width: "100%" }}
                  options={modules.map((m) => ({ label: m.name, value: m.id }))}
                  value={selectedModule}
                  onChange={(val) => setSelectedModule(val)}
                  size="large"
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
                >
                  Select Group
                </label>
                <Select
                  placeholder="Choose a group"
                  style={{ width: "100%" }}
                  options={
                    selectedModule
                      ? groups
                          .filter((g) =>
                            modules
                              .find((m) => m.id === selectedModule)
                              ?.groups?.some((mg) => mg.id === g.id)
                          )
                          .map((g) => ({ label: g.name, value: g.id }))
                      : []
                  }
                  value={selectedGroup}
                  onChange={(val) => setSelectedGroup(val)}
                  disabled={!selectedModule}
                  size="large"
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
                >
                  Quick Actions
                </label>
                <ActionButton
                  onClick={handleExportCSV}
                  disabled={!students.length}
                  style={{ width: "100%" }}
                >
                  <FileText size={16} style={{ marginRight: 8 }} />
                  Export Report
                </ActionButton>
              </div>
            </Col>
          </Row>
        </FiltersSection>
      </StyledSection>

      {/* Marks Table */}
      <StyledSection>
        <StyledSubHeader>
          <FileText /> Student Marks
        </StyledSubHeader>
        <MarksCard>
          <StyledTable
            dataSource={students}
            columns={columns}
            rowKey="id"
            loading={loadingStudents}
            pagination={false}
            bordered
            scroll={{ x: 800 }}
          />
        </MarksCard>
      </StyledSection>
    </div>
  );
}
