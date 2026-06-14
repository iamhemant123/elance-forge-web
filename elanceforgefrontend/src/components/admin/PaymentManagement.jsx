import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import {
  IndianRupee,
  Wallet,
  AlertCircle,
  Users,
  Search,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  History,
  Send,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

const PaymentManagement = () => {

  // Project billing data
  const [projects, setProjects] = useState([]);

  // Real page loading
  const [loading, setLoading] = useState(true);

  // Search input
  const [search, setSearch] = useState("");

  // Payment status filter
  const [filter, setFilter] = useState("All");

  // Toast messages
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Payment history modal
  const [showHistory, setShowHistory] = useState(false);

  const [paymentHistory, setPaymentHistory] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);

  // Manual payment modal
  const [showManualPayment, setShowManualPayment] = useState(false);

  // Global transaction history modal
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);

  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Manual payment form
  const [manualPayment, setManualPayment] = useState({
    amount: "",
    method: "Cash",
    notes: "",
  });

  // Initial page load
  useEffect(() => {

    const loadData = async () => {

      try {

        setLoading(true);

        await Promise.all([
          fetchProjects(),
          fetchAllTransactions(),
        ]);

      } finally {

        setLoading(false);

      }

    };

    loadData();

  }, []);

  // Success notification
  const showSuccess = (msg) => {

    setSuccess(msg);

    setTimeout(() => {

      setSuccess("");

    }, 3000);

  };

  // Error notification
  const showError = (msg) => {

    setError(msg);

    setTimeout(() => {

      setError("");

    }, 3000);

  };

  // Load projects
  const fetchProjects = async () => {

    try {

      const { data } =
        await axios.get(
          `${API}/api/projects`
        );

      setProjects(
        data.projects || []
      );

    } catch (error) {

      console.log(error);

      showError(
        "Failed To Load Projects"
      );

    }
  };

  // Load transactions
  const fetchAllTransactions =
    async () => {

      try {

        const { data } =
          await axios.get(
            `${API}/api/payments`
          );

        setAllTransactions(
          data || []
        );

      } catch (error) {

        console.log(error);

      }
    };

  // Calculate payment status
  const getStatus = (
    project
  ) => {

    const paid =
      Number(
        project.paidAmount || 0
      );

    const remaining =
      Number(
        project.remainingAmount || 0
      );

    if (
      paid > 0 &&
      remaining === 0
    ) {
      return "Paid";
    }

    if (
      paid > 0 &&
      remaining > 0
    ) {
      return "Partial";
    }

    return "Due";

  };

  // Open client payment history
  const openHistory =
    async (project) => {

      try {

        const { data } =
          await axios.get(
            `${API}/api/payments/client/${project.clientEmail}`
          );

        setPaymentHistory(data);

        setSelectedProject(
          project
        );

        setShowHistory(true);

      } catch (error) {

        console.log(error);

        showError(
          "History Load Failed"
        );

      }
    };

  // Open manual payment popup
  const openManualPayment =
    (project) => {

      setSelectedProject(
        project
      );

      setShowManualPayment(
        true
      );
    };

  // Save manual payment
  const saveManualPayment =
    async () => {

      try {

        await axios.post(
          `${API}/api/payments/manual`,
          {
            projectId:
              selectedProject._id,

            clientEmail:
              selectedProject.clientEmail,

            amount:
              Number(
                manualPayment.amount
              ),

            method:
              manualPayment.method,

            notes:
              manualPayment.notes,
          }
        );

        showSuccess(
          "Payment Added Successfully"
        );

        setShowManualPayment(false);

        setManualPayment({
          amount: "",
          method: "Cash",
          notes: "",
        });

        fetchProjects();

        fetchAllTransactions();

      } catch (error) {

        console.log(error);

        showError(
          "Failed To Add Payment"
        );

      }
    };
  const downloadReceipt = (
  payment,
  project
) => {

  if (!payment) {
    alert("Payment data not found");
    return;
  }

  project = project || {};

  const doc = new jsPDF();

  doc.setFillColor(
    249,
    115,
    22
  );

  doc.rect(
    0,
    0,
    210,
    35,
    "F"
  );

  doc.setTextColor(
    255,
    255,
    255
  );

  doc.setFontSize(24);

  doc.text(
    "ELANCEFORGE",
    14,
    18
  );

  doc.setFontSize(10);

  doc.text(
    "Freelance Development Agency",
    14,
    26
  );

  doc.setTextColor(
    0,
    0,
    0
  );

  doc.setFontSize(22);

  doc.text(
    "INVOICE",
    150,
    20
  );

  doc.setFontSize(11);

  doc.text(
    `Invoice No : EF-${payment?._id?.slice(-6) || "000000"}`,
    140,
    30
  );

  doc.setFontSize(14);

  doc.text(
    "BILL TO",
    14,
    55
  );

  doc.setFontSize(11);

  doc.text(
    project?.clientName || "-",
    14,
    65
  );

  doc.text(
    project?.clientEmail || "-",
    14,
    73
  );

  doc.setFontSize(14);

  doc.text(
    "PROJECT",
    130,
    55
  );

  doc.setFontSize(11);

  doc.text(
    project?.projectName || "-",
    130,
    65
  );

  doc.text(
    payment?.createdAt
      ? new Date(payment.createdAt).toLocaleDateString()
      : "-",
    130,
    73
  );

  autoTable(doc, {
    startY: 90,
    theme: "grid",
    head: [["Description", "Amount"]],
    body: [[
      project?.projectName || "-",
      `Rs. ${project?.budget || 0}`,
    ]],
  });

  autoTable(doc, {
    startY:
      doc.lastAutoTable.finalY +
      10,
    theme: "striped",
    head: [["Payment Summary", "Value"]],
    body: [
      [
        "Total Budget",
        `Rs. ${project?.budget || 0}`,
      ],
      [
        "Paid Amount",
        `Rs. ${project?.paidAmount || 0}`,
      ],
      [
        "Remaining Due",
        `Rs. ${project?.remainingAmount || 0}`,
      ],
      [
        "Current Payment",
        `Rs. ${payment?.amount || 0}`,
      ],
    ],
  });

  autoTable(doc, {
    startY:
      doc.lastAutoTable.finalY +
      10,
    theme: "grid",
    head: [["Transaction Details", "Value"]],
    body: [
      [
        "Method",
        payment?.method || "-",
      ],
      [
        "Status",
        payment?.status || "-",
      ],
      [
        "Order ID",
        payment?.razorpayOrderId || "-",
      ],
      [
        "Payment ID",
        payment?.razorpayPaymentId || "-",
      ],
    ],
  });

  const footerY =
    doc.lastAutoTable.finalY +
    20;

  doc.setFontSize(12);

  doc.text(
    "Thank You For Your Payment",
    105,
    footerY,
    {
      align: "center",
    }
  );

  doc.setFontSize(10);

  doc.text(
    "ElanceForge Freelance Development Agency",
    105,
    footerY + 10,
    {
      align: "center",
    }
  );

  doc.save(
    `ElanceForge-Invoice-${payment?._id || "invoice"}.pdf`
  );

};
  // Search + filter logic
  const filteredProjects =
    useMemo(() => {

      return projects.filter(
        (project) => {

          const searchMatch =

            project.clientName
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            project.projectName
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            project.clientEmail
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          if (
            filter === "All"
          ) {
            return searchMatch;
          }

          return (
            searchMatch &&
            getStatus(project) ===
            filter
          );

        }
      );

    }, [
      projects,
      search,
      filter,
    ]);

  // Revenue calculations
  const totalRevenue =
    projects.reduce(
      (acc, item) =>
        acc +
        Number(
          item.budget || 0
        ),
      0
    );

  const collectedRevenue =
    projects.reduce(
      (acc, item) =>
        acc +
        Number(
          item.paidAmount || 0
        ),
      0
    );

  const remainingRevenue =
    projects.reduce(
      (acc, item) =>
        acc +
        Number(
          item.remainingAmount || 0
        ),
      0
    );

  // Client statistics
  const totalClients =
    projects.length;

  const fullyPaid =
    projects.filter(
      (project) =>
        getStatus(project) ===
        "Paid"
    ).length;

  const partialPaid =
    projects.filter(
      (project) =>
        getStatus(project) ===
        "Partial"
    ).length;

  const fullyDue =
    projects.filter(
      (project) =>
        getStatus(project) ===
        "Due"
    ).length;

  // Loading screen
  if (loading) {

    return (

      <div className="min-h-[70vh] flex items-center justify-center">

        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm flex items-center gap-3">

          <div className="h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

          <span className="text-sm font-medium text-slate-600">
            Loading Payment Data...
          </span>

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-5">

      {/* Success toast */}
      {success && (

        <div className="fixed top-5 right-5 z-[9999] bg-green-500 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium max-w-xs">
          {success}
        </div>

      )}

      {/* Error toast */}
      {error && (

        <div className="fixed top-5 right-5 z-[9999] bg-red-500 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium max-w-xs">
          {error}
        </div>

      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Payment Management
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage client billing, revenue and transactions
          </p>

        </div>

        <button
          onClick={() =>
            setShowTransactionHistory(true)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2"
        >

          <History size={16} />

          Transaction History

        </button>

      </div>

      {/* Revenue overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-slate-500">
                Total Revenue
              </p>

              <h2 className="text-2xl font-bold mt-1">
                ₹{totalRevenue}
              </h2>

            </div>

            <IndianRupee
              size={28}
              className="text-green-600"
            />

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-slate-500">
                Collected Revenue
              </p>

              <h2 className="text-2xl font-bold mt-1 text-blue-600">
                ₹{collectedRevenue}
              </h2>

            </div>

            <Wallet
              size={28}
              className="text-blue-600"
            />

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-slate-500">
                Remaining Revenue
              </p>

              <h2 className="text-2xl font-bold mt-1 text-red-500">
                ₹{remainingRevenue}
              </h2>

            </div>

            <AlertCircle
              size={28}
              className="text-red-500"
            />

          </div>

        </div>

      </div>
      {/* Status overview */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

        <div
          onClick={() =>
            setFilter("All")
          }
          className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-4 cursor-pointer transition ${filter === "All"
            ? "ring-2 ring-orange-500"
            : ""
            }`}
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-slate-500">
                Total Clients
              </p>

              <h2 className="text-2xl font-bold mt-1">
                {totalClients}
              </h2>

            </div>

            <Users
              size={28}
              className="text-orange-500"
            />

          </div>

        </div>

        <div
          onClick={() =>
            setFilter("Paid")
          }
          className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-4 cursor-pointer transition ${filter === "Paid"
            ? "ring-2 ring-green-500"
            : ""
            }`}
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-slate-500">
                Fully Paid
              </p>

              <h2 className="text-2xl font-bold mt-1 text-green-600">
                {fullyPaid}
              </h2>

            </div>

            <CheckCircle
              size={28}
              className="text-green-600"
            />

          </div>

        </div>

        <div
          onClick={() =>
            setFilter("Partial")
          }
          className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-4 cursor-pointer transition ${filter === "Partial"
            ? "ring-2 ring-orange-500"
            : ""
            }`}
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-slate-500">
                Partial Paid
              </p>

              <h2 className="text-2xl font-bold mt-1 text-orange-500">
                {partialPaid}
              </h2>

            </div>

            <Clock
              size={28}
              className="text-orange-500"
            />

          </div>

        </div>

        <div
          onClick={() =>
            setFilter("Due")
          }
          className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-4 cursor-pointer transition ${filter === "Due"
            ? "ring-2 ring-red-500"
            : ""
            }`}
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-slate-500">
                Fully Due
              </p>

              <h2 className="text-2xl font-bold mt-1 text-red-500">
                {fullyDue}
              </h2>

            </div>

            <XCircle
              size={28}
              className="text-red-500"
            />

          </div>

        </div>

      </div>

      {/* Search section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search Client, Email or Project..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:w-[420px] h-11 border border-slate-200 rounded-xl pl-10 pr-4 text-sm outline-none focus:border-orange-500"
          />

        </div>

      </div>

      {/* Client cards */}
      {filteredProjects.length === 0 ? (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">

          <Users
            size={60}
            className="mx-auto text-slate-300"
          />

          <h3 className="text-xl font-semibold mt-4">
            No Client Found
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            Try changing search or filters.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">

          {filteredProjects.map((project) => {

            const status =
              getStatus(project);

            return (

              <div
                key={project._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition"
              >

                {/* Client header */}
                <div className="p-4 border-b border-slate-100">

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <h3 className="text-lg font-semibold text-slate-800 break-words">
                        {project.clientName}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1 break-all">
                        {project.clientEmail}
                      </p>

                    </div>

                    {status === "Paid" && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        Paid
                      </span>
                    )}

                    {status === "Partial" && (
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                        Partial
                      </span>
                    )}

                    {status === "Due" && (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                        Due
                      </span>
                    )}

                  </div>

                </div>

                {/* Project information */}
                <div className="p-4">

                  <h4 className="font-semibold text-slate-800 mb-4 break-words">
                    {project.projectName}
                  </h4>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-green-50 rounded-xl p-3">

                      <p className="text-[11px] text-slate-500">
                        Budget
                      </p>

                      <h4 className="font-semibold text-green-600 mt-1">
                        ₹{project.budget || 0}
                      </h4>

                    </div>

                    <div className="bg-blue-50 rounded-xl p-3">

                      <p className="text-[11px] text-slate-500">
                        Paid
                      </p>

                      <h4 className="font-semibold text-blue-600 mt-1">
                        ₹{project.paidAmount || 0}
                      </h4>

                    </div>

                    <div className="bg-red-50 rounded-xl p-3">

                      <p className="text-[11px] text-slate-500">
                        Due
                      </p>

                      <h4 className="font-semibold text-red-600 mt-1">
                        ₹{project.remainingAmount || 0}
                      </h4>

                    </div>

                  </div>

                  {/* Project details */}
                  <div className="space-y-2 text-sm">

                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Priority
                      </span>

                      <span className="font-medium">
                        {project.priority}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Deadline
                      </span>

                      <span className="font-medium">
                        {project.deadline}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Project Status
                      </span>

                      <span className="font-medium">
                        {project.status}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Card actions */}
                <div className="p-4 border-t border-slate-100">

                  <div className="grid gap-2">

                    <button
                      onClick={() =>
                        openHistory(project)
                      }
                      className="bg-orange-500 hover:bg-orange-600 text-white h-11 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                    >

                      <Eye size={16} />

                      Payment History

                    </button>

                    <button
                      onClick={() =>
                        openManualPayment(project)
                      }
                      className="bg-green-600 hover:bg-green-700 text-white h-11 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                    >

                      <Plus size={16} />

                      Add Manual Payment

                    </button>

                    {/* <button
                      className="bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                    >

                      <Send size={16} />

                      Send Payment Link

                    </button> */}

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}
      {/* PAYMENT HISTORY MODAL */}

      {showHistory && selectedProject && (

        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden max-h-[95vh]">

            {/* Modal header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-semibold text-slate-800">
                  Payment History
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {selectedProject.clientName}
                </p>

              </div>

              <button
                onClick={() => {
                  setShowHistory(false);
                  setSelectedProject(null);
                  setPaymentHistory([]);
                }}
                className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl text-sm font-medium"
              >
                Close
              </button>

            </div>

            {/* Summary */}
            <div className="p-5 bg-slate-50 border-b border-slate-200">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                <div className="bg-white rounded-xl border border-slate-200 p-4">

                  <p className="text-xs text-slate-500">
                    Budget
                  </p>

                  <h3 className="text-xl font-semibold text-green-600 mt-1">
                    ₹{selectedProject.budget || 0}
                  </h3>

                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4">

                  <p className="text-xs text-slate-500">
                    Paid
                  </p>

                  <h3 className="text-xl font-semibold text-blue-600 mt-1">
                    ₹{selectedProject.paidAmount || 0}
                  </h3>

                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4">

                  <p className="text-xs text-slate-500">
                    Remaining
                  </p>

                  <h3 className="text-xl font-semibold text-red-500 mt-1">
                    ₹{selectedProject.remainingAmount || 0}
                  </h3>

                </div>

              </div>

            </div>

            {/* Payment list */}
            <div className="p-5 max-h-[450px] overflow-y-auto">

              {paymentHistory.length === 0 ? (

                <div className="text-center py-10">

                  <History
                    size={50}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="text-lg font-semibold mt-3">
                    No Payment History
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    No transactions available for this client.
                  </p>

                </div>

              ) : (

                <div className="space-y-3">

                  {paymentHistory.map((payment) => (

                    <div
                      key={payment._id}
                      className="border border-slate-200 rounded-xl p-4"
                    >

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                        <div>

                          <h4 className="text-lg font-semibold">
                            ₹{payment.amount}
                          </h4>

                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(
                              payment.createdAt
                            ).toLocaleString()}
                          </p>

                        </div>

                        <div>

                          {payment.status === "Paid" && (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                              Paid
                            </span>
                          )}

                          {payment.status === "Pending" && (
                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                              Pending
                            </span>
                          )}

                          {payment.status === "Failed" && (
                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                              Failed
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      )}
      {/* MANUAL PAYMENT MODAL */}

      {showManualPayment && selectedProject && (

        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden max-h-[95vh] overflow-y-auto">

            {/* Modal header */}
            <div className="p-5 border-b border-slate-200">

              <h2 className="text-xl font-semibold text-slate-800">
                Add Manual Payment
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {selectedProject.clientName}
              </p>

            </div>

            {/* Project summary */}
            <div className="p-5 bg-slate-50 border-b border-slate-200">

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                <div>

                  <p className="text-xs text-slate-500">
                    Budget
                  </p>

                  <h3 className="text-lg font-semibold text-green-600 mt-1">
                    ₹{selectedProject.budget || 0}
                  </h3>

                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Paid
                  </p>

                  <h3 className="text-lg font-semibold text-blue-600 mt-1">
                    ₹{selectedProject.paidAmount || 0}
                  </h3>

                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Due
                  </p>

                  <h3 className="text-lg font-semibold text-red-500 mt-1">
                    ₹{selectedProject.remainingAmount || 0}
                  </h3>

                </div>

              </div>

            </div>

            {/* Payment form */}
            <div className="p-5 space-y-4">

              <div>

                <label className="block text-sm font-medium mb-2">
                  Amount
                </label>

                <input
                  type="number"
                  value={manualPayment.amount}
                  onChange={(e) =>
                    setManualPayment({
                      ...manualPayment,
                      amount: e.target.value,
                    })
                  }
                  placeholder="Enter Amount"
                  className="w-full h-11 border border-slate-200 rounded-xl px-3 outline-none focus:border-orange-500"
                />

              </div>

              <div>

                <label className="block text-sm font-medium mb-2">
                  Payment Method
                </label>

                <select
                  value={manualPayment.method}
                  onChange={(e) =>
                    setManualPayment({
                      ...manualPayment,
                      method: e.target.value,
                    })
                  }
                  className="w-full h-11 border border-slate-200 rounded-xl px-3 outline-none focus:border-orange-500 bg-white"
                >

                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Bank Transfer</option>

                </select>

              </div>

              <div>

                <label className="block text-sm font-medium mb-2">
                  Notes
                </label>

                <textarea
                  rows="4"
                  value={manualPayment.notes}
                  onChange={(e) =>
                    setManualPayment({
                      ...manualPayment,
                      notes: e.target.value,
                    })
                  }
                  placeholder="Optional Notes..."
                  className="w-full border border-slate-200 rounded-xl px-3 py-3 outline-none focus:border-orange-500 resize-none"
                />

              </div>

            </div>

            {/* Modal footer */}
            <div className="border-t border-slate-200 p-5 flex justify-end gap-3">

              <button
                onClick={() => {

                  setShowManualPayment(false);

                  setManualPayment({
                    amount: "",
                    method: "Cash",
                    notes: "",
                  });

                }}
                className="bg-slate-200 hover:bg-slate-300 px-5 py-3 rounded-xl text-sm font-medium"
              >
                Cancel
              </button>

              <button
                onClick={saveManualPayment}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl text-sm font-medium"
              >
                Save Payment
              </button>

            </div>

          </div>

        </div>

      )}

      {/* GLOBAL TRANSACTION HISTORY MODAL */}

      {showTransactionHistory && (

        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-6xl rounded-2xl shadow-xl overflow-hidden max-h-[95vh]">

            {/* Modal header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-semibold text-slate-800">
                  Transaction History
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  All Client Transactions
                </p>

              </div>

              <button
                onClick={() =>
                  setShowTransactionHistory(false)
                }
                className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-xl text-sm font-medium"
              >
                Close
              </button>

            </div>

            {/* Summary cards */}
            <div className="p-5 bg-slate-50 border-b border-slate-200">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                <div className="bg-white border border-slate-200 rounded-xl p-4">

                  <p className="text-xs text-slate-500">
                    Total Transactions
                  </p>

                  <h3 className="text-2xl font-semibold mt-1">
                    {allTransactions.length}
                  </h3>

                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4">

                  <p className="text-xs text-slate-500">
                    Total Paid
                  </p>

                  <h3 className="text-2xl font-semibold text-green-600 mt-1">

                    ₹{
                      allTransactions
                        .filter(
                          (item) =>
                            item.status === "Paid"
                        )
                        .reduce(
                          (acc, item) =>
                            acc + Number(item.amount || 0),
                          0
                        )
                    }

                  </h3>

                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4">

                  <p className="text-xs text-slate-500">
                    Pending Amount
                  </p>

                  <h3 className="text-2xl font-semibold text-orange-500 mt-1">

                    ₹{
                      allTransactions
                        .filter(
                          (item) =>
                            item.status === "Pending"
                        )
                        .reduce(
                          (acc, item) =>
                            acc + Number(item.amount || 0),
                          0
                        )
                    }

                  </h3>

                </div>

              </div>

            </div>

            {/* Transaction table */}
            <div className="overflow-y-auto max-h-[55vh]">

              <table className="w-full">

                <thead className="bg-slate-100 sticky top-0">

                  <tr>

                    <th className="p-4 text-left text-sm">
                      Client
                    </th>

                    <th className="p-4 text-left text-sm">
                      Project
                    </th>

                    <th className="p-4 text-left text-sm">
                      Amount
                    </th>

                    <th className="p-4 text-left text-sm">
                      Status
                    </th>

                    <th className="p-4 text-left text-sm">
                      Payment ID
                    </th>

                    <th className="p-4 text-left text-sm">
                      Date
                    </th>
                    <th className="p-4 text-left text-sm">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {allTransactions.map((item) => (

                    <tr
                      key={item._id}
                      className="border-b border-slate-100"
                    >

                      <td className="p-4 text-sm">
                        {item.clientName}
                      </td>

                      <td className="p-4 text-sm">
                        {item.projectName}
                      </td>

                      <td className="p-4 text-sm font-semibold">
                        ₹{item.amount}
                      </td>

                      <td className="p-4">

                        {item.status === "Paid" && (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                            Paid
                          </span>
                        )}

                        {item.status === "Pending" && (
                          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                            Pending
                          </span>
                        )}

                        {item.status === "Failed" && (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                            Failed
                          </span>
                        )}

                      </td>

                      <td className="p-4 text-sm break-all">
                        {item.razorpayPaymentId || "-"}
                      </td>

                      <td className="p-4 text-sm">
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </td>
                      <td className="p-4">

                        <button
                          onClick={() => {

                            const project = projects.find(
                              (p) =>
                                p.projectName === item.projectName
                            );

                            setSelectedReceipt({
                              payment: item,
                              project: project || {},
                            });

                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-medium"
                        >
                          View Details
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      )}
      {selectedReceipt && (

  <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">

    <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto">

      {/* Header */}
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">

        <h2 className="text-xl md:text-2xl font-semibold text-slate-800">
          Payment Receipt
        </h2>

        <button
          onClick={() => setSelectedReceipt(null)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
        >
          Close
        </button>

      </div>

      {/* Body */}
      <div className="p-5">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <p className="text-xs text-slate-500">Client Name</p>
            <p className="font-semibold mt-1">
              {selectedReceipt?.project?.clientName || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Client Email</p>
            <p className="font-semibold mt-1 break-all">
              {selectedReceipt?.project?.clientEmail || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Project Name</p>
            <p className="font-semibold mt-1">
              {selectedReceipt?.project?.projectName || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Budget</p>
            <p className="font-semibold mt-1">
              ₹{selectedReceipt?.project?.budget || 0}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Paid Amount</p>
            <p className="font-semibold text-green-600 mt-1">
              ₹{selectedReceipt?.project?.paidAmount || 0}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Remaining Due</p>
            <p className="font-semibold text-red-600 mt-1">
              ₹{selectedReceipt?.project?.remainingAmount || 0}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Payment Amount</p>
            <p className="font-semibold mt-1">
              ₹{selectedReceipt?.payment?.amount || 0}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Payment Method</p>
            <p className="font-semibold mt-1">
              {selectedReceipt?.payment?.method || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Payment ID</p>
            <p className="font-semibold break-all mt-1">
              {selectedReceipt?.payment?.razorpayPaymentId || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Order ID</p>
            <p className="font-semibold break-all mt-1">
              {selectedReceipt?.payment?.razorpayOrderId || "-"}
            </p>
          </div>

        </div>

        {/* Download Button */}
        <div className="mt-6">

          <button
            onClick={() =>
              downloadReceipt(
                selectedReceipt?.payment,
                selectedReceipt?.project
              )
            }
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
          >
            Download Invoice PDF
          </button>

        </div>

      </div>

    </div>

  </div>

)}

    </div>

  );

};

export default PaymentManagement;