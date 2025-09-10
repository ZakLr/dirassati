"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import apiCall from "@/components/utils/apiCall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Calendar, DollarSign } from "lucide-react";

// Dummy data for payments
const dummyPayments = [
  {
    id: 1,
    parent_id: 1,
    parent_name: "Ahmed Ali",
    amount: 50000,
    description: "Registration fees - Academic year 2023-2024",
    status: "succeeded",
    created_at: "2023-09-01T10:00:00Z",
    due_date: "2023-09-15T00:00:00Z",
    payment_method: "bank_transfer",
  },
  {
    id: 2,
    parent_id: 1,
    parent_name: "Ahmed Ali",
    amount: 25000,
    description: "First installment - September",
    status: "succeeded",
    created_at: "2023-09-15T14:30:00Z",
    due_date: "2023-09-30T00:00:00Z",
    payment_method: "online",
  },
  {
    id: 3,
    parent_id: 1,
    parent_name: "Ahmed Ali",
    amount: 25000,
    description: "Second installment - October",
    status: "pending",
    created_at: "2023-10-01T09:00:00Z",
    due_date: "2023-10-15T00:00:00Z",
    payment_method: "cash",
  },
  {
    id: 4,
    parent_id: 1,
    parent_name: "Ahmed Ali",
    amount: 30000,
    description: "Sports activities fees",
    status: "unpaid",
    created_at: "2023-10-05T11:15:00Z",
    due_date: "2023-10-20T00:00:00Z",
    payment_method: null,
  },
  {
    id: 5,
    parent_id: 1,
    parent_name: "Ahmed Ali",
    amount: 15000,
    description: "Books and study materials fees",
    status: "failed",
    created_at: "2023-10-10T16:45:00Z",
    due_date: "2023-10-25T00:00:00Z",
    payment_method: "online",
  },
];

const dummyParents = [
  { id: 1, first_name: "Ahmed", last_name: "Ali" },
  { id: 2, first_name: "Fatima", last_name: "Ben Omar" },
  { id: 3, first_name: "Mohamed", last_name: "Kheroubi" },
  { id: 4, first_name: "Leila", last_name: "Bouziane" },
  { id: 5, first_name: "Yassine", last_name: "Saghir" },
];

export default function ParentPaymentsPage({ params }) {
  const { parentId } = use(params);
  const router = useRouter();
  const token = useSelector((state) => state.auth.accessToken);

  const [payments, setPayments] = useState([]);
  const [parentName, setParentName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetchParentPayments();
  }, [token, parentId]);

  const fetchParentPayments = async () => {
    setLoading(true);
    try {
      const response = await apiCall(
        "get",
        `/api/fees/?parent_id=${parentId}&per_page=100&page=1`,
        null,
        { token }
      );

      setPayments(response.fees || []);

      if (response.data?.[0]?.parent_name) {
        setParentName(response.data[0].parent_name);
      } else {
        setParentName(`Parent ID: ${parentId}`);
      }
    } catch (err) {
      console.warn("API call failed, using dummy data:", err.message);
      toast.info("Using demo data - API not available");

      // Use dummy data as fallback
      const filteredPayments = dummyPayments.filter(
        (p) => p.parent_id.toString() === parentId.toString()
      );
      setPayments(filteredPayments);

      const parent = dummyParents.find(
        (p) => p.id.toString() === parentId.toString()
      );
      if (parent) {
        setParentName(`${parent.first_name} ${parent.last_name}`);
      } else {
        setParentName(`Parent ID: ${parentId}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const statusColor = {
    succeeded: "green",
    unpaid: "red",
    failed: "volcano",
    pending: "orange",
  };

  const getStatusBadge = (status) => {
    const variants = {
      succeeded: "bg-green-100 text-green-800 border-green-200",
      unpaid: "bg-red-100 text-red-800 border-red-200",
      failed: "bg-orange-100 text-orange-800 border-orange-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };

    const labels = {
      succeeded: "Paid",
      unpaid: "Unpaid",
      failed: "Failed",
      pending: "Pending",
    };

    return (
      <Badge
        className={`${
          variants[status] || "bg-gray-100 text-gray-800 border-gray-200"
        } border`}
      >
        {labels[status] || status}
      </Badge>
    );
  };

  const totalPaid = payments
    .filter((p) => p.status === "succeeded")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalUnpaid = payments
    .filter((p) => p.status === "unpaid")
    .reduce((sum, p) => sum + p.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#667eea] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <ShadcnButton
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </ShadcnButton>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
            {parentName}'s Payments
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Manage and monitor school payments
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Payments
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {new Intl.NumberFormat("ar-DZ", {
                      style: "currency",
                      currency: "DZD",
                    }).format(totalPaid)}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {new Intl.NumberFormat("ar-DZ", {
                      style: "currency",
                      currency: "DZD",
                    }).format(totalPending)}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unpaid</p>
                  <p className="text-3xl font-bold text-red-600">
                    {new Intl.NumberFormat("ar-DZ", {
                      style: "currency",
                      currency: "DZD",
                    }).format(totalUnpaid)}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <CreditCard className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payments Table */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-[#667eea]" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-right p-4 font-medium text-gray-700">
                      Payment ID
                    </th>
                    <th className="text-right p-4 font-medium text-gray-700">
                      Date
                    </th>
                    <th className="text-right p-4 font-medium text-gray-700">
                      Description
                    </th>
                    <th className="text-right p-4 font-medium text-gray-700">
                      Amount
                    </th>
                    <th className="text-right p-4 font-medium text-gray-700">
                      Status
                    </th>
                    <th className="text-right p-4 font-medium text-gray-700">
                      Due Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-4 text-gray-900">#{payment.id}</td>
                      <td className="p-4 text-gray-600">
                        {dayjs(payment.created_at).format("DD/MM/YYYY HH:mm")}
                      </td>
                      <td className="p-4 text-gray-900">
                        {payment.description}
                      </td>
                      <td className="p-4 text-gray-900 font-medium">
                        {new Intl.NumberFormat("ar-DZ", {
                          style: "currency",
                          currency: "DZD",
                        }).format(payment.amount)}
                      </td>
                      <td className="p-4">{getStatusBadge(payment.status)}</td>
                      <td className="p-4 text-gray-600">
                        {payment.due_date
                          ? dayjs(payment.due_date).format("DD/MM/YYYY")
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {payments.length === 0 && (
              <div className="text-center py-12">
                <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No payments found for this parent
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
