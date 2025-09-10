"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Dropdown,
  Button,
  Form,
  message,
  Input,
  Space,
  Tag,
  Avatar,
} from "antd";
import {
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Button as ShadcnButton } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import apiCall from "@/components/utils/apiCall";
import { useSelector } from "react-redux";

export default function Parents() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParent, setEditingParent] = useState(null);
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalParents, setTotalParents] = useState(0);
  const [searchText, setSearchText] = useState("");

  const token = useSelector((state) => state.auth.accessToken);
  const router = useRouter();

  // Dummy data for parents
  const dummyParents = [
    {
      id: 1,
      first_name: "Mohammed",
      last_name: "Ben Ali",
      email: "mohammed.benali@school.dz",
      phone_number: "+213 5 51 23 45 67",
      address: "123 Family Street, Algiers",
    },
    {
      id: 2,
      first_name: "Fatima",
      last_name: "El Amrani",
      email: "fatima.elamrani@school.dz",
      phone_number: "+213 4 12 34 56 78",
      address: "456 Parent Avenue, Oran",
    },
    {
      id: 3,
      first_name: "Ahmed",
      last_name: "Tazi",
      email: "ahmed.tazi@school.dz",
      phone_number: "+213 3 12 34 56 78",
      address: "789 Guardian Boulevard, Constantine",
    },
    {
      id: 4,
      first_name: "Amina",
      last_name: "Bouazza",
      email: "amina.bouazza@school.dz",
      phone_number: "+213 7 89 01 23 45",
      address: "321 Caretaker Street, Annaba",
    },
    {
      id: 5,
      first_name: "Hassan",
      last_name: "Alaoui",
      email: "hassan.alaoui@school.dz",
      phone_number: "+213 2 34 56 78 90",
      address: "654 Supervisor Lane, Blida",
    },
    {
      id: 6,
      first_name: "Zahra",
      last_name: "Benkirane",
      email: "zahra.benkirane@school.dz",
      phone_number: "+213 6 78 90 12 34",
      address: "987 Mentor Road, Batna",
    },
  ];

  // Dummy data for students (children)
  const dummyStudents = [
    {
      id: 1,
      first_name: "Ahmed",
      last_name: "Ben Ali",
      parent_id: 1,
    },
    {
      id: 2,
      first_name: "Fatima",
      last_name: "Ben Ali",
      parent_id: 1,
    },
    {
      id: 3,
      first_name: "Youssef",
      last_name: "El Amrani",
      parent_id: 2,
    },
    {
      id: 4,
      first_name: "Sara",
      last_name: "Tazi",
      parent_id: 3,
    },
    {
      id: 5,
      first_name: "Omar",
      last_name: "Bouazza",
      parent_id: 4,
    },
    {
      id: 6,
      first_name: "Leila",
      last_name: "Alaoui",
      parent_id: 5,
    },
    {
      id: 7,
      first_name: "Karim",
      last_name: "Benkirane",
      parent_id: 6,
    },
  ];

  const fetchParents = async (page = currentPage, perPage = pageSize) => {
    setLoading(true);
    try {
      const response = await apiCall(
        "get",
        `/api/parents/?page=${page}&per_page=${perPage}`,
        null,
        { token }
      );
      setData(response.parents || response.results || []);
      setTotalParents(response.total || response.count || 0);
      setError(null);
    } catch (err) {
      // Use dummy data as fallback
      message.warning("Failed to fetch parents - Using demo data");
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      setData(dummyParents.slice(startIndex, endIndex));
      setTotalParents(dummyParents.length);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParents(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchParentStudents = async (parentId) => {
    try {
      const response = await apiCall(
        "get",
        `api/students/?parent_id=${parentId}&page=1&per_page=100`,
        null,
        { token }
      );
      return response.students || response.results || [];
    } catch (err) {
      // Use dummy data as fallback
      return dummyStudents.filter((student) => student.parent_id === parentId);
    }
  };

  const updateParent = async (id, values) => {
    try {
      await apiCall("put", `api/parents/${id}`, values, { token });
      message.success("Parent updated successfully");
      fetchParents();
    } catch (err) {
      message.error("Failed to update parent");
    }
  };

  const deleteParent = async (id) => {
    try {
      await apiCall("delete", `api/parents/${id}`, null, { token });
      message.success("Parent deleted successfully");
      fetchParents();
    } catch (err) {
      message.error("Failed to delete parent");
    }
  };

  const actionMenu = (record) => ({
    items: [
      {
        key: "view",
        icon: <EyeOutlined className="text-blue-600" />,
        label: (
          <span className="text-blue-600 hover:text-blue-700">
            View Profile
          </span>
        ),
        onClick: () => router.push(`/admin/parentProfile/${record.id}`),
      },
      {
        key: "edit",
        icon: <EditOutlined className="text-emerald-600" />,
        label: (
          <span className="text-emerald-600 hover:text-emerald-700">
            Edit Parent
          </span>
        ),
        onClick: () => {
          setEditingParent(record);
          form.setFieldsValue(record);
          setIsModalOpen(true);
        },
      },
      {
        key: "archive",
        icon: <DeleteOutlined className="text-red-600" />,
        label: (
          <span className="text-red-600 hover:text-red-700">Delete Parent</span>
        ),
        onClick: () => deleteParent(record.id),
      },
    ],
  });

  const columns = [
    {
      title: "Parent",
      key: "parent",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <div className="font-medium text-gray-900">
              {record.first_name} {record.last_name}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <MailOutlined />
              {record.email}
            </div>
          </div>
        </div>
      ),
      sorter: (a, b) =>
        `${a.first_name} ${a.last_name}`.localeCompare(
          `${b.first_name} ${b.last_name}`
        ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_, record) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <PhoneOutlined className="text-blue-600" />
            <span>{record.phone_number}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) => (
        <div className="flex items-center gap-2 text-sm max-w-xs">
          <HomeOutlined className="text-green-600 flex-shrink-0" />
          <span className="truncate" title={address}>
            {address}
          </span>
        </div>
      ),
    },
    {
      title: "Children",
      key: "students",
      render: (_, record) => (
        <ShadcnButton
          variant="ghost"
          size="sm"
          className="text-emerald-600 hover:bg-emerald-50 rounded-lg px-3 py-1"
          onClick={async () => {
            const students = await fetchParentStudents(record.id);
            setSelectedStudents(students);
            setStudentDialogOpen(true);
          }}
        >
          <TeamOutlined className="mr-2" />
          View Children
        </ShadcnButton>
      ),
      width: 140,
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
            className="flex items-center gap-2 hover:bg-emerald-50 rounded-lg px-3 py-2"
          >
            <MoreOutlined className="text-gray-600" />
            <span className="text-gray-600">Actions</span>
          </Button>
        </Dropdown>
      ),
      width: 120,
    },
  ];

  const filteredParents = data.filter((parent) => {
    const matchesSearch =
      `${parent.first_name} ${parent.last_name}`
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchText.toLowerCase()) ||
      (parent.phone_number && parent.phone_number.includes(searchText));

    return matchesSearch;
  });

  const clearFilters = () => {
    setSearchText("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingParent(null);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await updateParent(editingParent.id, values);
      setIsModalOpen(false);
      form.resetFields();
      setEditingParent(null);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Parents Management
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Manage and monitor parent accounts in the system
            </p>
          </CardHeader>
        </Card>

        {/* Search and Filters */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  <SearchOutlined className="mr-2" />
                  Search Parents
                </Label>
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  prefix={<SearchOutlined />}
                  className="rounded-lg"
                  size="large"
                />
              </div>
              {searchText && (
                <Button
                  onClick={clearFilters}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-lg"
                >
                  Clear Search
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table
                columns={columns}
                dataSource={filteredParents}
                rowKey="id"
                bordered={false}
                loading={loading}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: totalParents,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50"],
                  onChange: (page, size) => {
                    setCurrentPage(page);
                    setPageSize(size);
                  },
                  showTotal: (total, range) =>
                    `Showing ${range[0]}-${range[1]} of ${total} parents`,
                  className: "px-6 py-4",
                }}
                scroll={{ x: 1000 }}
                size="middle"
                className="custom-table"
                rowClassName="hover:bg-emerald-50/50 transition-colors duration-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-background text-text rounded-lg">
            <DialogHeader>
              <DialogTitle>Edit Parent</DialogTitle>
            </DialogHeader>
            <Form form={form} layout="vertical" className="space-y-4">
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <ShadcnInput className="border-border" />
              </Form.Item>
              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <ShadcnInput className="border-border" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <ShadcnInput className="border-border" />
              </Form.Item>
              <Form.Item
                name="phone_number"
                label="Phone"
                rules={[
                  { required: true, message: "Please enter a phone number" },
                ]}
              >
                <ShadcnInput className="border-border" />
              </Form.Item>
              <Form.Item name="address" label="Address">
                <ShadcnInput className="border-border" />
              </Form.Item>
              <div className="flex gap-2 justify-end">
                <ShadcnButton
                  variant="outline"
                  onClick={handleCancel}
                  className="border-border hover:bg-accent"
                >
                  Cancel
                </ShadcnButton>
                <ShadcnButton
                  onClick={handleOk}
                  className="bg-secondary hover:bg-accent text-background"
                >
                  Save
                </ShadcnButton>
              </div>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Student Dialog */}
        <Dialog open={studentDialogOpen} onOpenChange={setStudentDialogOpen}>
          <DialogContent className="bg-background text-text rounded-lg max-w-md">
            <DialogHeader>
              <DialogTitle>Children</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 mt-2">
              {selectedStudents.length === 0 ? (
                <p className="text-muted-foreground">No children assigned.</p>
              ) : (
                selectedStudents.map((student) => (
                  <div
                    key={student.id}
                    onClick={() =>
                      router.push(`/admin/studentProfile/${student.id}`)
                    }
                    className="cursor-pointer p-3 rounded-lg border hover:bg-accent transition-colors duration-200"
                  >
                    <p className="font-medium text-sm">
                      {student.first_name} {student.last_name}
                    </p>
                  </div>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
