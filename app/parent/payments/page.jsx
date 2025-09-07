"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  amin_dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  CreditCard,
  Filter,
  Download,
  FileText,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  GraduationCap,
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import apiCall from "@/components/utils/apiCall";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import styled from "styled-components";

const stripePromise = loadStripe(
  "pk_test_51RS3zNPq3NiYKo7rr5EALXBIEjXBjObVT9AOOGDK1W16BUcabN4Ej9gyUKAplz0lT2cDBJXzTD3d9Xr1oCal8fN300j4MPdKUH"
);

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

const SummaryCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
`;

const SummaryValue = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-top: 8px;
`;

const SummaryLabel = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 4px;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const EnhancedInput = styled(Input)`
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  background: #ffffff;
  transition: all 0.3s ease;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }
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

const ActionButton = styled(Button)`
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  }
`;

const SecondaryButton = styled(Button)`
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  background: #ffffff;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    transform: translateY(-1px);
  }
`;

// Assuming you have a Redux store setup
function PaymentForm({ onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("PaymentMethod created:", paymentMethod);
      onPaymentSuccess(paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="text-sm text-slate-600 mb-1 block">
          Détails de la carte
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <Button type="submit" disabled={!stripe} className="mt-4">
        Payer
      </Button>
    </form>
  );
}

export default function ParentPayments({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [historiqueTransaction, setHistoriqueTransaction] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const [totalOverdue, setTotalOverdue] = useState(0);

  const paymentsPerPage = 5;
  // Dummy data for payments
  const dummyPayments = [
    {
      id: "fee_001",
      amount: 150000, // 1500.00 DZD in cents
      currency: "DZD",
      status: "paid",
      created: "2024-09-01",
      payment_method: {
        type: "card",
        brand: "visa",
        last4: "1234",
      },
      description: "Frais de scolarité annuels - Amina Bouchama",
      student_ids: ["s1"],
      invoice_id: "inv_001",
      frequency: "annual",
      tax_rate: 17,
      notes: "Paiement des frais scolaires pour l'année académique 2024-2025",
    },
    {
      id: "fee_002",
      amount: 150000, // 1500.00 DZD in cents
      currency: "DZD",
      status: "paid",
      created: "2024-09-01",
      payment_method: {
        type: "card",
        brand: "mastercard",
        last4: "5678",
      },
      description: "Frais de scolarité annuels - Youssef Bouchama",
      student_ids: ["s2"],
      invoice_id: "inv_002",
      frequency: "annual",
      tax_rate: 17,
      notes: "Paiement des frais scolaires pour l'année académique 2024-2025",
    },
    {
      id: "fee_003",
      amount: 75000, // 750.00 DZD in cents
      currency: "DZD",
      status: "unpaid",
      created: "2024-10-01",
      payment_method: {
        type: "card",
        brand: "visa",
        last4: "1234",
      },
      description: "Frais d'examen trimestriel - Amina Bouchama",
      student_ids: ["s1"],
      invoice_id: "inv_003",
      frequency: "quarterly",
      tax_rate: 17,
      notes: "Frais d'examen pour le premier trimestre",
    },
    {
      id: "fee_004",
      amount: 75000, // 750.00 DZD in cents
      currency: "DZD",
      status: "unpaid",
      created: "2024-10-01",
      payment_method: {
        type: "card",
        brand: "mastercard",
        last4: "5678",
      },
      description: "Frais d'examen trimestriel - Youssef Bouchama",
      student_ids: ["s2"],
      invoice_id: "inv_004",
      frequency: "quarterly",
      tax_rate: 17,
      notes: "Frais d'examen pour le premier trimestre",
    },
    {
      id: "fee_005",
      amount: 50000, // 500.00 DZD in cents
      currency: "DZD",
      status: "overdue",
      created: "2024-08-15",
      payment_method: {
        type: "card",
        brand: "visa",
        last4: "1234",
      },
      description: "Frais d'inscription - Amina Bouchama",
      student_ids: ["s1"],
      invoice_id: "inv_005",
      frequency: "one-time",
      tax_rate: 17,
      notes:
        "Frais d'inscription pour l'année académique 2024-2025 (en retard)",
    },
    {
      id: "fee_006",
      amount: 25000, // 250.00 DZD in cents
      currency: "DZD",
      status: "paid",
      created: "2024-08-20",
      payment_method: {
        type: "card",
        brand: "mastercard",
        last4: "5678",
      },
      description: "Frais de bibliothèque - Youssef Bouchama",
      student_ids: ["s2"],
      invoice_id: "inv_006",
      frequency: "monthly",
      tax_rate: 17,
      notes: "Frais d'abonnement à la bibliothèque",
    },
    {
      id: "fee_007",
      amount: 100000, // 1000.00 DZD in cents
      currency: "DZD",
      status: "paid",
      created: "2024-07-15",
      payment_method: {
        type: "card",
        brand: "visa",
        last4: "1234",
      },
      description: "Frais d'activités parascolaires - Amina Bouchama",
      student_ids: ["s1"],
      invoice_id: "inv_007",
      frequency: "semesterly",
      tax_rate: 17,
      notes: "Frais pour les activités sportives et culturelles",
    },
    {
      id: "fee_008",
      amount: 20000, // 200.00 DZD in cents
      currency: "DZD",
      status: "unpaid",
      created: "2024-09-15",
      payment_method: {
        type: "card",
        brand: "mastercard",
        last4: "5678",
      },
      description: "Frais de cantine - Youssef Bouchama",
      student_ids: ["s2"],
      invoice_id: "inv_008",
      frequency: "monthly",
      tax_rate: 17,
      notes: "Frais de repas scolaires pour le mois de septembre",
    },
  ];

  useEffect(() => {
    // Initialize with dummy data
    setHistoriqueTransaction(dummyPayments);

    // Calculate totals from dummy data
    const totalPaidAmount = dummyPayments
      .filter((fee) => fee.status === "paid")
      .reduce((sum, fee) => sum + fee.amount, 0);

    const totalUnpaidAmount = dummyPayments
      .filter((fee) => fee.status === "unpaid")
      .reduce((sum, fee) => sum + fee.amount, 0);

    const totalOverdueAmount = dummyPayments
      .filter((fee) => fee.status === "overdue")
      .reduce((sum, fee) => sum + fee.amount, 0);

    setTotalPaid(totalPaidAmount);
    setTotalUnpaid(totalUnpaidAmount);
    setTotalOverdue(totalOverdueAmount);

    // Update summary stats
    setSummary({
      total_paid: totalPaidAmount,
      total_pending: totalUnpaidAmount,
      total_refunded: totalOverdueAmount,
    });

    setIsLoading(false);
  }, []);

  const [paymentForm, setPaymentForm] = useState({
    student_ids: ["s1", "s2"], // Default: Amina and Youssef
    amount: 150000, // 1500.00 DZD in cents
  });

  // Hardcoded students
  const students = [
    { id: "s1", first_name: "Amina", last_name: "Bouchama" },
    { id: "s2", first_name: "Youssef", last_name: "Bouchama" },
  ];

  // Mock school details
  const schoolDetails = {
    name: "École Dirassati",
    address: "Tlemcen, Tlemcen",
    phone: "+213 522 123 456",
    email: "contact@dirassati.dz",
  };

  // Convert dummy data to payment format
  const initialPayments = historiqueTransaction.map((transaction) => ({
    id: transaction.id,
    amount: transaction.amount,
    currency: transaction.currency,
    status:
      transaction.status === "paid"
        ? "succeeded"
        : transaction.status === "unpaid"
        ? "pending"
        : transaction.status === "overdue"
        ? "failed"
        : transaction.status,
    created: transaction.created,
    payment_method: transaction.payment_method,
    description: transaction.description,
    student_ids: transaction.student_ids,
    invoice_id: transaction.invoice_id,
    frequency: transaction.frequency,
    tax_rate: transaction.tax_rate,
    notes: transaction.notes,
  }));

  // State for payments
  const [payments, setPayments] = useState(initialPayments);

  // Summary stats
  const [summary, setSummary] = useState({
    total_paid: 0,
    total_pending: 0,
    total_refunded: 0,
  });

  // Mock filter/sort function
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.id
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Mock sort function
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "desc"
        ? new Date(b.created) - new Date(a.created)
        : new Date(a.created) - new Date(b.created);
    }
    if (sortBy === "amount") {
      return sortOrder === "desc" ? b.amount - a.amount : a.amount - b.amount;
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedPayments.length / paymentsPerPage);
  const paginatedPayments = sortedPayments.slice(
    (currentPage - 1) * paymentsPerPage,
    currentPage * paymentsPerPage
  );

  // Format amount
  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency,
    }).format(amount / 100);
  };

  // Format date
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
    }).format(new Date(date));
  };

  // Handle payment submission
  const handlePayment = () => {
    if (!paymentForm.student_ids.length || !paymentForm.amount) {
      alert("Veuillez sélectionner au moins un élève et entrer un montant.");
      return;
    }

    const newPayment = {
      id: `pi_mock_${Date.now()}`,
      amount: parseInt(paymentForm.amount),
      currency: "DZD",
      status: "succeeded",
      created: new Date().toISOString(),
      payment_method: {
        type: "card",
        brand: "visa",
        last4: "1234",
      },
      description: `Frais de scolarité - ${paymentForm.student_ids
        .map((id) => students.find((s) => s.id === id)?.first_name)
        .join(", ")}`,
      student_ids: paymentForm.student_ids,
      invoice_id: `in_mock_${Date.now()}`,
      frequency: "annual",
      tax_rate: 20,
      notes: "Paiement des frais annuels via le portail parent.",
    };

    setPayments((prev) => [...prev, newPayment]);
    setSummary((prev) => ({
      ...prev,
      total_paid: prev.total_paid + parseInt(paymentForm.amount),
    }));
    setTotalPaid((prev) => prev + parseInt(paymentForm.amount));
    setIsPaymentModalOpen(false);
    setPaymentForm({
      student_ids: ["s1", "s2"],
      amount: 150000,
    });
    alert("Paiement simulé avec succès !");
  };

  // Handle view invoice
  const handleViewInvoice = (payment) => {
    setSelectedInvoice(payment);
    setIsInvoiceModalOpen(true);
  };

  const handlePaymentSuccess = (paymentMethod) => {
    alert(`Paiement réussi avec la méthode: ${paymentMethod.id}`);
  };

  if (isLoading) {
    return <div className="p-6 text-center text-slate-800">Chargement...</div>;
  }

  return (
    <Elements stripe={stripePromise}>
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
              <PageTitle>Gestion des paiements</PageTitle>
              <PageSubtitle>
                Gérez vos paiements scolaires en toute sécurité
              </PageSubtitle>
            </div>
          </StyledHeader>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <ActionButton onClick={() => setIsPaymentModalOpen(true)}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Nouveau paiement
            </ActionButton>
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <EnhancedCard className="mb-6">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-slate-600" />
                  Résumé des paiements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <SummaryCard>
                    <SummaryLabel>Total payé</SummaryLabel>
                    <SummaryValue style={{ color: "#0771CB" }}>
                      {formatAmount(totalPaid, "DZD")}
                    </SummaryValue>
                  </SummaryCard>
                  <SummaryCard>
                    <SummaryLabel>Total en attente</SummaryLabel>
                    <SummaryValue style={{ color: "#f59e0b" }}>
                      {formatAmount(totalUnpaid, "DZD")}
                    </SummaryValue>
                  </SummaryCard>
                  <SummaryCard>
                    <SummaryLabel>Total remboursé</SummaryLabel>
                    <SummaryValue style={{ color: "#ef4444" }}>
                      {formatAmount(totalOverdue, "DZD")}
                    </SummaryValue>
                  </SummaryCard>
                </div>
              </CardContent>
            </EnhancedCard>
          </motion.div>

          {/* Filters and Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ControlsContainer>
              <EnhancedInput
                placeholder="Rechercher par ID de transaction..."
                className="w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="succeeded">Réussi</SelectItem>
                  <SelectItem value="failed">Échoué</SelectItem>
                  <SelectItem value="refunded">Remboursé</SelectItem>
                </SelectContent>
              </Select>
              <SecondaryButton
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Réinitialiser
              </SecondaryButton>
              <ActionButton
                onClick={() => alert("Exportation CSV non implémentée")}
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter en CSV
              </ActionButton>
            </ControlsContainer>
          </motion.div>

          {/* Payment Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <EnhancedCard>
              <CardHeader>
                <CardTitle className="text-slate-800">
                  Historique des transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-100 hover:bg-slate-200">
                        <TableHead className="text-slate-800 font-semibold">
                          ID Transaction
                        </TableHead>
                        <TableHead
                          className="text-slate-800 font-semibold cursor-pointer"
                          onClick={() => {
                            setSortBy("date");
                            setSortOrder(sortOrder === "desc" ? "asc" : "desc");
                          }}
                        >
                          Date{" "}
                          {sortBy === "date" &&
                            (sortOrder === "desc" ? (
                              <ChevronDown className="inline w-4 h-4" />
                            ) : (
                              <ChevronUp className="inline w-4 h-4" />
                            ))}
                        </TableHead>
                        <TableHead
                          className="text-slate-800 font-semibold cursor-pointer"
                          onClick={() => {
                            setSortBy("amount");
                            setSortOrder(sortOrder === "desc" ? "asc" : "desc");
                          }}
                        >
                          Montant{" "}
                          {sortBy === "amount" &&
                            (sortOrder === "desc" ? (
                              <ChevronDown className="inline w-4 h-4" />
                            ) : (
                              <ChevronUp className="inline w-4 h-4" />
                            ))}
                        </TableHead>
                        <TableHead className="text-slate-800 font-semibold">
                          Statut
                        </TableHead>
                        <TableHead className="text-slate-800 font-semibold">
                          Méthode
                        </TableHead>
                        <TableHead className="text-slate-800 font-semibold">
                          Élèves
                        </TableHead>
                        <TableHead className="text-slate-800 font-semibold">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedPayments.length > 0 ? (
                        paginatedPayments.map((payment) => (
                          <motion.tr
                            key={payment.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="hover:bg-slate-50"
                          >
                            <TableCell className="text-slate-800">
                              {payment.id}
                            </TableCell>
                            <TableCell className="text-slate-800">
                              {formatDate(payment.created)}
                            </TableCell>
                            <TableCell className="text-slate-800">
                              {formatAmount(payment.amount, payment.currency)}
                            </TableCell>
                            <TableCell className="text-slate-800">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  payment.status === "succeeded"
                                    ? "bg-green-100 text-green-800"
                                    : payment.status === "failed"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {payment.status === "succeeded"
                                  ? "Réussi"
                                  : payment.status === "failed"
                                  ? "Échoué"
                                  : "Remboursé"}
                              </span>
                            </TableCell>
                            <TableCell className="text-slate-800">
                              {payment.payment_method.type === "card"
                                ? `${payment.payment_method.brand.toUpperCase()} ****${
                                    payment.payment_method.last4
                                  }`
                                : payment.payment_method.type}
                            </TableCell>
                            <TableCell className="text-slate-800">
                              {payment.student_ids
                                .map((id) => {
                                  const student = students.find(
                                    (s) => s.id === id
                                  );
                                  return student
                                    ? `${student.first_name} ${student.last_name}`
                                    : "";
                                })
                                .join(", ")}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="text-slate-800"
                                  >
                                    <span className="sr-only">Actions</span>
                                    <span className="text-slate-800">...</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem
                                    onClick={() => handleViewInvoice(payment)}
                                  >
                                    <FileText className="w-4 h-4 mr-2" />
                                    Voir la facture
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      alert(
                                        "Demande de remboursement non implémentée"
                                      )
                                    }
                                    disabled={payment.status !== "succeeded"}
                                  >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Demander un remboursement
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </motion.tr>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="text-center text-slate-400"
                          >
                            Aucun paiement trouvé
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-slate-600">
                    Affichage de {(currentPage - 1) * paymentsPerPage + 1} à{" "}
                    {Math.min(
                      currentPage * paymentsPerPage,
                      sortedPayments.length
                    )}{" "}
                    sur {sortedPayments.length} paiement(s)
                  </p>
                  <div className="flex gap-2">
                    <SecondaryButton
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      disabled={currentPage === 1}
                    >
                      Précédent
                    </SecondaryButton>
                    <SecondaryButton
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Suivant
                    </SecondaryButton>
                  </div>
                </div>
              </CardContent>
            </EnhancedCard>
          </motion.div>

          {/* Payment Modal */}
          <AnimatePresence>
            {isPaymentModalOpen && (
              <Dialog
                open={isPaymentModalOpen}
                onOpenChange={setIsPaymentModalOpen}
              >
                <DialogContent
                  totalUnpaid={totalUnpaid} // Pass totalUnpaid dynamically to the dialog
                  className="bg-white rounded-lg shadow-xl max-w-md"
                >
                  <DialogHeader>
                    <DialogTitle className="text-slate-800 flex items-center gap-2">
                      <CreditCard className="w-6 h-6 text-[#0771CB]" />
                      Nouveau paiement
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {/* Student Selection */}
                    <div>
                      <label className="text-sm text-slate-600 mb-1 block">
                        Élèves concernés
                      </label>
                      <Select
                        value={paymentForm.student_ids}
                        onValueChange={(value) =>
                          setPaymentForm({ ...paymentForm, student_ids: value })
                        }
                        multiple
                      >
                        <SelectTrigger className="w-full border-slate-300 rounded-lg shadow-sm">
                          <SelectValue placeholder="Sélectionner les élèves" />
                        </SelectTrigger>
                        <SelectContent>
                          {students.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.first_name} {student.last_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Amount */}
                    <div>
                      <label className="text-sm text-slate-600 mb-1 block">
                        Montant (DZD)
                      </label>
                      <Input
                        type="number"
                        placeholder="1500.00"
                        className="w-full border-slate-300 rounded-lg shadow-sm"
                        value={totalUnpaid / 100 || ""}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            amount: parseInt(e.target.value * 100) || 0,
                          })
                        }
                      />
                    </div>
                    {/* Payment Method */}
                    <div>
                      <label className="text-sm text-slate-600 mb-1 block">
                        Méthode de paiement
                      </label>
                      <Select
                        value="card_visa_1234"
                        onValueChange={(value) =>
                          setPaymentForm({
                            ...paymentForm,
                            payment_method: value,
                          })
                        }
                      >
                        <SelectTrigger className="w-full border-slate-300 rounded-lg shadow-sm">
                          <SelectValue placeholder="Sélectionner une méthode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card_visa_1234">
                            Visa ****1234
                          </SelectItem>
                          <SelectItem value="new_card">
                            Nouvelle carte
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {paymentForm.payment_method === "new_card" && (
                        <div className="mt-2 p-3 bg-slate-100 rounded-lg">
                          <p className="text-sm text-slate-600">
                            Numéro de carte
                          </p>
                          <Input
                            placeholder="**** **** **** ****"
                            className="mt-1 border-slate-300 rounded-lg"
                            disabled
                          />
                          <div className="flex gap-2 mt-2">
                            <div>
                              <p className="text-sm text-slate-600">
                                Expiration
                              </p>
                              <Input
                                placeholder="MM/AA"
                                className="mt-1 border-slate-300 rounded-lg"
                                disabled
                              />
                            </div>
                            <div>
                              <p className="text-sm text-slate-600">CVC</p>
                              <Input
                                placeholder="***"
                                className="mt-1 border-slate-300 rounded-lg"
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      className="border-slate-300 text-slate-800 rounded-lg"
                      onClick={() => setIsPaymentModalOpen(false)}
                    >
                      Annuler
                    </Button>
                    <Button
                      className="bg-[#0771CB] hover:bg-[#055a9e] text-white rounded-lg"
                      onClick={handlePayment}
                    >
                      Payer maintenant
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </AnimatePresence>

          {/* Invoice Modal */}
          <AnimatePresence>
            {isInvoiceModalOpen && selectedInvoice && (
              <Dialog
                open={isInvoiceModalOpen}
                onOpenChange={setIsInvoiceModalOpen}
              >
                <DialogContent className="bg-white rounded-lg shadow-xl max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-slate-800 flex items-center gap-2">
                      <FileText className="w-6 h-6 text-[#0771CB]" />
                      Facture #{selectedInvoice.invoice_id}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800">
                          {schoolDetails.name}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {schoolDetails.address}
                        </p>
                        <p className="text-sm text-slate-600">
                          Tél: {schoolDetails.phone}
                        </p>
                        <p className="text-sm text-slate-600">
                          Email: {schoolDetails.email}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">
                          Date d’émission: {formatDate(selectedInvoice.created)}
                        </p>
                        <p className="text-sm text-slate-600">
                          Facture #: {selectedInvoice.invoice_id}
                        </p>
                      </div>
                    </div>
                    {/* Transaction Info */}
                    <div className="border-t border-slate-200 pt-4">
                      <h4 className="text-lg font-semibold text-slate-800 mb-2">
                        Détails de la transaction
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-600">
                            ID Transaction
                          </p>
                          <p className="text-slate-800">{selectedInvoice.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Statut</p>
                          <p className="text-slate-800">
                            {selectedInvoice.status === "succeeded"
                              ? "Réussi"
                              : selectedInvoice.status === "failed"
                              ? "Échoué"
                              : "Remboursé"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Fréquence</p>
                          <p className="text-slate-800">
                            {selectedInvoice.frequency === "annual"
                              ? "Annuel"
                              : selectedInvoice.frequency === "trimestrial"
                              ? "Trimestriel"
                              : "Mensuel"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">
                            Méthode de paiement
                          </p>
                          <p className="text-slate-800">
                            {selectedInvoice.payment_method.type === "card"
                              ? `${selectedInvoice.payment_method.brand.toUpperCase()} ****${
                                  selectedInvoice.payment_method.last4
                                }`
                              : selectedInvoice.payment_method.type}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Élèves</p>
                          <p className="text-slate-800">
                            {selectedInvoice.student_ids
                              .map((id) => {
                                const student = students.find(
                                  (s) => s.id === id
                                );
                                return student
                                  ? `${student.first_name} ${student.last_name}`
                                  : "";
                              })
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Amount Breakdown */}
                    <div className="border-t border-slate-200 pt-4">
                      <h4 className="text-lg font-semibold text-slate-800 mb-2">
                        Résumé du montant
                      </h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-slate-800">
                              Description
                            </TableHead>
                            <TableHead className="text-slate-800 text-right">
                              Montant
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-slate-800">
                              {selectedInvoice.description}
                            </TableCell>
                            <TableCell className="text-slate-800 text-right">
                              {formatAmount(
                                selectedInvoice.amount /
                                  (1 + selectedInvoice.tax_rate / 100),
                                selectedInvoice.currency
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-slate-800">
                              TVA ({selectedInvoice.tax_rate}%)
                            </TableCell>
                            <TableCell className="text-slate-800 text-right">
                              {formatAmount(
                                (selectedInvoice.amount *
                                  selectedInvoice.tax_rate) /
                                  (100 + selectedInvoice.tax_rate),
                                selectedInvoice.currency
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-slate-800 font-semibold">
                              Total
                            </TableCell>
                            <TableCell className="text-slate-800 font-semibold text-right">
                              {formatAmount(
                                selectedInvoice.amount,
                                selectedInvoice.currency
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    {/* Notes */}
                    <div className="border-t border-slate-200 pt-4">
                      <h4 className="text-lg font-semibold text-slate-800 mb-2">
                        Notes
                      </h4>
                      <p className="text-sm text-slate-600">
                        {selectedInvoice.notes}
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      className="border-slate-300 text-slate-800 rounded-lg"
                      onClick={() => setIsInvoiceModalOpen(false)}
                    >
                      Fermer
                    </Button>
                    <Button
                      className="bg-[#0771CB] hover:bg-[#055a9e] text-white rounded-lg"
                      onClick={() =>
                        alert(
                          `Téléchargement PDF de la facture ${selectedInvoice.invoice_id} non implémenté`
                        )
                      }
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger PDF
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </AnimatePresence>
        </div>
      </StyledContainer>
    </Elements>
  );
}
