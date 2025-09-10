"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import apiCall from "../../../components/utils/apiCall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Search,
  Filter,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function Payments() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useSelector((state) => state.auth.accessToken);

  // Enhanced dummy data for payments
  const dummyPayments = [
    {
      id: 1,
      parent_id: 1,
      parent_name: "Mohammed Ben Ali",
      parent_email: "mohammed.benali@email.com",
      amount: 2500.0,
      description: "School fees for September 2024",
      due_date: "2024-09-30",
      status: "succeeded",
      payment_method: "Bank Transfer",
      created_at: "2024-09-15T10:30:00Z",
      paid_at: "2024-09-15T10:35:00Z",
    },
    {
      id: 2,
      parent_id: 2,
      parent_name: "Fatima El Amrani",
      parent_email: "fatima.elamrani@email.com",
      amount: 1800.0,
      description: "Transportation fees for September 2024",
      due_date: "2024-09-25",
      status: "pending",
      payment_method: "Credit Card",
      created_at: "2024-09-10T14:20:00Z",
      paid_at: null,
    },
    {
      id: 3,
      parent_id: 3,
      parent_name: "Ahmed Tazi",
      parent_email: "ahmed.tazi@email.com",
      amount: 3200.0,
      description: "School fees + Activity fees for September 2024",
      due_date: "2024-09-30",
      status: "succeeded",
      payment_method: "Cash",
      created_at: "2024-09-12T09:15:00Z",
      paid_at: "2024-09-12T09:20:00Z",
    },
    {
      id: 4,
      parent_id: 4,
      parent_name: "Amina Bouazza",
      parent_email: "amina.bouazza@email.com",
      amount: 1500.0,
      description: "Library fees for September 2024",
      due_date: "2024-09-20",
      status: "failed",
      payment_method: "Credit Card",
      created_at: "2024-09-08T16:45:00Z",
      paid_at: null,
    },
    {
      id: 5,
      parent_id: 5,
      parent_name: "Hassan Alaoui",
      parent_email: "hassan.alaoui@email.com",
      amount: 2800.0,
      description: "School fees for September 2024",
      due_date: "2024-09-30",
      status: "succeeded",
      payment_method: "Bank Transfer",
      created_at: "2024-09-14T11:30:00Z",
      paid_at: "2024-09-14T11:35:00Z",
    },
    {
      id: 6,
      parent_id: 6,
      parent_name: "Zahra Benkirane",
      parent_email: "zahra.benkirane@email.com",
      amount: 2100.0,
      description: "School fees for September 2024",
      due_date: "2024-09-30",
      status: "unpaid",
      payment_method: "Online Payment",
      created_at: "2024-09-01T08:00:00Z",
      paid_at: null,
    },
    {
      id: 7,
      parent_id: 1,
      parent_name: "Mohammed Ben Ali",
      parent_email: "mohammed.benali@email.com",
      amount: 1200.0,
      description: "Sports activity fees for September 2024",
      due_date: "2024-09-15",
      status: "succeeded",
      payment_method: "Cash",
      created_at: "2024-09-05T13:20:00Z",
      paid_at: "2024-09-05T13:25:00Z",
    },
    {
      id: 8,
      parent_id: 2,
      parent_name: "Fatima El Amrani",
      parent_email: "fatima.elamrani@email.com",
      amount: 950.0,
      description: "Art supplies fees for September 2024",
      due_date: "2024-09-18",
      status: "pending",
      payment_method: "Bank Transfer",
      created_at: "2024-09-03T10:10:00Z",
      paid_at: null,
    },
    {
      id: 9,
      parent_id: 7,
      parent_name: "Karim Bennani",
      parent_email: "karim.bennani@email.com",
      amount: 1950.0,
      description: "Music class fees for September 2024",
      due_date: "2024-09-22",
      status: "succeeded",
      payment_method: "Credit Card",
      created_at: "2024-09-16T15:45:00Z",
      paid_at: "2024-09-16T15:50:00Z",
    },
    {
      id: 10,
      parent_id: 8,
      parent_name: "Leila Mansouri",
      parent_email: "leila.mansouri@email.com",
      amount: 2750.0,
      description: "School fees + Transportation for September 2024",
      due_date: "2024-09-30",
      status: "overdue",
      payment_method: "Online Payment",
      created_at: "2024-09-02T12:15:00Z",
      paid_at: null,
    },
    {
      id: 11,
      parent_id: 9,
      parent_name: "Youssef Alaoui",
      parent_email: "youssef.alaoui@email.com",
      amount: 2200.0,
      description: "School fees for October 2024",
      due_date: "2024-10-30",
      status: "succeeded",
      payment_method: "Bank Transfer",
      created_at: "2024-10-15T10:30:00Z",
      paid_at: "2024-10-15T10:35:00Z",
    },
    {
      id: 12,
      parent_id: 10,
      parent_name: "Nadia Tazi",
      parent_email: "nadia.tazi@email.com",
      amount: 1650.0,
      description: "Transportation fees for October 2024",
      due_date: "2024-10-25",
      status: "pending",
      payment_method: "Credit Card",
      created_at: "2024-10-10T14:20:00Z",
      paid_at: null,
    },
    {
      id: 13,
      parent_id: 11,
      parent_name: "Omar Bennani",
      parent_email: "omar.bennani@email.com",
      amount: 3100.0,
      description: "School fees + Lab fees for October 2024",
      due_date: "2024-10-30",
      status: "succeeded",
      payment_method: "Cash",
      created_at: "2024-10-12T09:15:00Z",
      paid_at: "2024-10-12T09:20:00Z",
    },
    {
      id: 14,
      parent_id: 12,
      parent_name: "Sara El Fassi",
      parent_email: "sara.elfassi@email.com",
      amount: 1350.0,
      description: "Computer lab fees for October 2024",
      due_date: "2024-10-20",
      status: "failed",
      payment_method: "Credit Card",
      created_at: "2024-10-08T16:45:00Z",
      paid_at: null,
    },
    {
      id: 15,
      parent_id: 13,
      parent_name: "Mehdi Alaoui",
      parent_email: "mehdi.alaoui@email.com",
      amount: 2900.0,
      description: "School fees for October 2024",
      due_date: "2024-10-30",
      status: "succeeded",
      payment_method: "Bank Transfer",
      created_at: "2024-10-14T11:30:00Z",
      paid_at: "2024-10-14T11:35:00Z",
    },
    {
      id: 16,
      parent_id: 14,
      parent_name: "Laila Bouazza",
      parent_email: "laila.bouazza@email.com",
      amount: 1850.0,
      description: "School fees for October 2024",
      due_date: "2024-10-30",
      status: "unpaid",
      payment_method: "Online Payment",
      created_at: "2024-10-01T08:00:00Z",
      paid_at: null,
    },
    {
      id: 17,
      parent_id: 15,
      parent_name: "Ahmed Mansouri",
      parent_email: "ahmed.mansouri@email.com",
      amount: 1100.0,
      description: "Swimming activity fees for October 2024",
      due_date: "2024-10-15",
      status: "succeeded",
      payment_method: "Cash",
      created_at: "2024-10-05T13:20:00Z",
      paid_at: "2024-10-05T13:25:00Z",
    },
    {
      id: 18,
      parent_id: 16,
      parent_name: "Fatima Bennani",
      parent_email: "fatima.bennani@email.com",
      amount: 850.0,
      description: "Art supplies fees for October 2024",
      due_date: "2024-10-18",
      status: "pending",
      payment_method: "Bank Transfer",
      created_at: "2024-10-03T10:10:00Z",
      paid_at: null,
    },
    {
      id: 19,
      parent_id: 17,
      parent_name: "Karim El Amrani",
      parent_email: "karim.elamrani@email.com",
      amount: 1750.0,
      description: "Music class fees for October 2024",
      due_date: "2024-10-22",
      status: "succeeded",
      payment_method: "Credit Card",
      created_at: "2024-10-16T15:45:00Z",
      paid_at: "2024-10-16T15:50:00Z",
    },
    {
      id: 20,
      parent_id: 18,
      parent_name: "Zahra Tazi",
      parent_email: "zahra.tazi@email.com",
      amount: 2650.0,
      description: "School fees + Transportation for October 2024",
      due_date: "2024-10-30",
      status: "overdue",
      payment_method: "Online Payment",
      created_at: "2024-10-02T12:15:00Z",
      paid_at: null,
    },
    {
      id: 21,
      parent_id: 19,
      parent_name: "Youssef Bouazza",
      parent_email: "youssef.bouazza@email.com",
      amount: 2400.0,
      description: "School fees for November 2024",
      due_date: "2024-11-30",
      status: "succeeded",
      payment_method: "Bank Transfer",
      created_at: "2024-11-15T10:30:00Z",
      paid_at: "2024-11-15T10:35:00Z",
    },
    {
      id: 22,
      parent_id: 20,
      parent_name: "Nadia Mansouri",
      parent_email: "nadia.mansouri@email.com",
      amount: 1700.0,
      description: "Transportation fees for November 2024",
      due_date: "2024-11-25",
      status: "pending",
      payment_method: "Credit Card",
      created_at: "2024-11-10T14:20:00Z",
      paid_at: null,
    },
    {
      id: 23,
      parent_id: 21,
      parent_name: "Omar Alaoui",
      parent_email: "omar.alaoui@email.com",
      amount: 3150.0,
      description: "School fees + Science lab fees for November 2024",
      due_date: "2024-11-30",
      status: "succeeded",
      payment_method: "Cash",
      created_at: "2024-11-12T09:15:00Z",
      paid_at: "2024-11-12T09:20:00Z",
    },
    {
      id: 24,
      parent_id: 22,
      parent_name: "Sara Bennani",
      parent_email: "sara.bennani@email.com",
      amount: 1400.0,
      description: "Library fees for November 2024",
      due_date: "2024-11-20",
      status: "failed",
      payment_method: "Credit Card",
      created_at: "2024-11-08T16:45:00Z",
      paid_at: null,
    },
    {
      id: 25,
      parent_id: 23,
      parent_name: "Mehdi El Fassi",
      parent_email: "mehdi.elfassi@email.com",
      amount: 2850.0,
      description: "School fees for November 2024",
      due_date: "2024-11-30",
      status: "succeeded",
      payment_method: "Bank Transfer",
      created_at: "2024-11-14T11:30:00Z",
      paid_at: "2024-11-14T11:35:00Z",
    },
  ];

  const [data, setData] = useState(dummyPayments.slice(0, 10)); // Initialize with first 10 payments
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: dummyPayments.length, // Initialize with total count
  });
  const [loading, setLoading] = useState(false); // Start with false since we have initial data
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filters from URL
  const parentIdFilter = searchParams.get("parent_id") || null;
  const statusFilterParam = searchParams.get("status") || null;

  const fetchPayments = async (page = 1, perPage = 10) => {
    setLoading(true);
    try {
      // Always use dummy data for demo purposes
      console.log("Using enhanced dummy data for payments demo");

      // Apply filters to dummy data
      let filteredData = dummyPayments;

      if (parentIdFilter) {
        filteredData = filteredData.filter(
          (payment) => payment.parent_id === parseInt(parentIdFilter)
        );
      }
      if (statusFilterParam) {
        filteredData = filteredData.filter(
          (payment) => payment.status === statusFilterParam
        );
      }

      // Apply search filter
      if (searchTerm) {
        filteredData = filteredData.filter(
          (payment) =>
            payment.parent_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            payment.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply status filter from UI
      if (statusFilter !== "all") {
        filteredData = filteredData.filter(
          (payment) => payment.status === statusFilter
        );
      }

      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;

      setData(filteredData.slice(startIndex, endIndex));
      setPagination((prev) => ({
        ...prev,
        current: page,
        pageSize: perPage,
        total: filteredData.length,
      }));

      toast.success(`Loaded ${filteredData.length} payment records`);
    } catch (err) {
      console.warn("Error loading dummy data:", err.message);
      toast.error("Failed to load payment data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load dummy data immediately without backend dependency
    fetchPayments(pagination.current, pagination.pageSize);
  }, [parentIdFilter, statusFilterParam, searchTerm, statusFilter]);

  // Initial load of dummy data
  useEffect(() => {
    fetchPayments(1, 10);
  }, []);

  const handleTableChange = (newPagination) => {
    fetchPayments(newPagination.current, newPagination.pageSize);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "succeeded":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "unpaid":
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      succeeded:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      unpaid: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      overdue: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };

    return (
      <Badge className={variants[status] || variants.unpaid}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Calculate summary statistics
  const totalRevenue = dummyPayments
    .filter((p) => p.status === "succeeded")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = dummyPayments
    .filter((p) => p.status === "pending" || p.status === "unpaid")
    .reduce((sum, p) => sum + p.amount, 0);

  const overdueAmount = dummyPayments
    .filter((p) => p.status === "overdue")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
            Fees & Payments
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Manage and track all school fee payments
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    DZD {totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {
                      dummyPayments.filter((p) => p.status === "succeeded")
                        .length
                    }{" "}
                    successful payments
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Pending Payments
                  </p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    DZD {pendingAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {
                      dummyPayments.filter(
                        (p) => p.status === "pending" || p.status === "unpaid"
                      ).length
                    }{" "}
                    pending/unpaid
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Overdue Amount
                  </p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    DZD {overdueAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {dummyPayments.filter((p) => p.status === "overdue").length}{" "}
                    overdue payments
                  </p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Transactions
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {dummyPayments.length}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {dummyPayments.filter((p) => p.status === "failed").length}{" "}
                    failed payments
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="text-sm font-medium">
                  Search Payments
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Search by parent name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="w-full md:w-48">
                <Label htmlFor="status-filter" className="text-sm font-medium">
                  Filter by Status
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="succeeded">Succeeded</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Payment Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin h-8 w-8 text-[#667eea]" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  Loading payments...
                </span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parent</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${payment.parent_name}`}
                              />
                              <AvatarFallback className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-xs">
                                {payment.parent_name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {payment.parent_name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {payment.parent_email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            DZD {payment.amount.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600 dark:text-gray-300">
                            {payment.description}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-300">
                              {dayjs(payment.due_date).format("DD/MM/YYYY")}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(payment.status)}
                            {getStatusBadge(payment.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-[#667eea]/30 text-[#667eea] dark:border-[#667eea]/50 dark:text-[#667eea]"
                          >
                            {payment.payment_method}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <ShadcnButton
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              router.push(
                                `/admin/payments/parent/${payment.parent_id}`
                              )
                            }
                            className="border-[#667eea]/30 text-[#667eea] hover:bg-[#667eea]/10"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </ShadcnButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {(pagination.current - 1) * pagination.pageSize + 1} to{" "}
                {Math.min(
                  pagination.current * pagination.pageSize,
                  pagination.total
                )}{" "}
                of {pagination.total} payments
              </p>
              <div className="flex gap-2">
                <ShadcnButton
                  variant="outline"
                  disabled={pagination.current === 1}
                  onClick={() =>
                    handleTableChange({
                      ...pagination,
                      current: pagination.current - 1,
                    })
                  }
                  className="border-[#667eea]/30 text-[#667eea] hover:bg-[#667eea]/10"
                >
                  Previous
                </ShadcnButton>
                <ShadcnButton
                  variant="outline"
                  disabled={
                    pagination.current * pagination.pageSize >= pagination.total
                  }
                  onClick={() =>
                    handleTableChange({
                      ...pagination,
                      current: pagination.current + 1,
                    })
                  }
                  className="border-[#667eea]/30 text-[#667eea] hover:bg-[#667eea]/10"
                >
                  Next
                </ShadcnButton>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
