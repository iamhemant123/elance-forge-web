import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import {
  Wallet,
  IndianRupee,
  Clock3,
  Receipt,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

const ClientPayments = () => {

  // Client projects
  const [projects, setProjects] =
    useState([]);

  // Payment records
  const [payments, setPayments] =
    useState([]);

  // Real page loading
  const [loading, setLoading] =
    useState(true);

  // Razorpay processing
  const [processing, setProcessing] =
    useState(false);

  // Payment history modal
  const [selectedProject, setSelectedProject] =
    useState(null);

  // Receipt modal
  const [selectedReceipt, setSelectedReceipt] =
    useState(null);

  // Custom amount inputs
  const [customAmounts, setCustomAmounts] =
    useState({});

  const client = JSON.parse(
    localStorage.getItem("client")
  );

  // Load client data
  useEffect(() => {

    const loadData = async () => {

      try {

        setLoading(true);

        await Promise.all([
          fetchProjects(),
          fetchPayments(),
        ]);

      } finally {

        setLoading(false);

      }

    };

    loadData();

  }, []);

  // Client projects
  const fetchProjects = async () => {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/client/${client.email}`
      );

      const data =
        await res.json();

      setProjects(data || []);

    } catch (error) {

      console.log(error);

      setProjects([]);

    }
  };

  // Payment history
  const fetchPayments = async () => {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payments/client/${client.email}`
      );

      const data =
        await res.json();

      setPayments(data || []);

    } catch (error) {

      console.log(error);

      setPayments([]);

    }
  };

  // Invoice PDF
  const downloadReceipt = (
    payment,
    project
  ) => {

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
      `Invoice No : EF-${payment._id.slice(-6)}`,
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
      project.clientName,
      14,
      65
    );

    doc.text(
      project.clientEmail,
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
      project.projectName,
      130,
      65
    );

    doc.text(
      new Date(
        payment.createdAt
      ).toLocaleDateString(),
      130,
      73
    );

    autoTable(doc, {
      startY: 90,
      theme: "grid",
      head: [["Description", "Amount"]],
      body: [[
        project.projectName,
        `Rs. ${project.budget}`,
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
          `Rs. ${project.budget}`,
        ],
        [
          "Paid Amount",
          `Rs. ${project.paidAmount}`,
        ],
        [
          "Remaining Due",
          `Rs. ${project.remainingAmount}`,
        ],
        [
          "Current Payment",
          `Rs. ${payment.amount}`,
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
          payment.method,
        ],
        [
          "Status",
          payment.status,
        ],
        [
          "Order ID",
          payment.razorpayOrderId,
        ],
        [
          "Payment ID",
          payment.razorpayPaymentId,
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
      `ElanceForge-Invoice-${payment._id}.pdf`
    );

  };

  // Razorpay payment
  const handlePayment = async (
    project,
    payAmount
  ) => {

    const amount =
      Number(payAmount);

    if (
      !amount ||
      amount <= 0 ||
      amount >
        project.remainingAmount
    ) {

      alert(
        `Enter amount between Rs.1 and Rs.${project.remainingAmount}`
      );

      return;

    }

    try {

      setProcessing(true);

      const orderRes =
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/payments/create-order`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              amount,
              projectId:
                project._id,
              projectName:
                project.projectName,
              clientName:
                project.clientName,
              clientEmail:
                project.clientEmail,
            }),
          }
        );

      const orderData =
        await orderRes.json();

      if (
        !orderData.success
      ) {

        alert(
          "Failed To Create Order"
        );

        return;

      }

      const options = {

        key:
          import.meta.env
            .VITE_RAZORPAY_KEY_ID,

        amount:
          orderData.order.amount,

        currency:
          orderData.order.currency,

        name:
          "ElanceForge",

        description:
          project.projectName,

        order_id:
          orderData.order.id,

        prefill: {
          name:
            project.clientName,
          email:
            project.clientEmail,
        },

        handler: async (
          response
        ) => {

          try {

            const verifyRes =
              await fetch(
                `${import.meta.env.VITE_API_URL}/api/payments/verify`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body: JSON.stringify({
                    razorpay_order_id:
                      response.razorpay_order_id,
                    razorpay_payment_id:
                      response.razorpay_payment_id,
                  }),
                }
              );

            const verifyData =
              await verifyRes.json();

            if (
              verifyData.success
            ) {

              alert(
                "Payment Successful"
              );

              await fetchProjects();

              await fetchPayments();

              setCustomAmounts(
                (prev) => ({
                  ...prev,
                  [project._id]:
                    "",
                })
              );

            } else {

              alert(
                "Payment Verification Failed"
              );

            }

          } catch (error) {

            console.log(error);

            alert(
              "Verification Failed"
            );

          }

        },

        theme: {
          color:
            "#f97316",
        },

      };

      const razor =
        new window.Razorpay(
          options
        );

      razor.open();

    } catch (error) {

      console.log(error);

      alert(
        "Payment Failed"
      );

    } finally {

      setProcessing(false);

    }

  };
    const totalBudget =
    projects.reduce(
      (acc, item) =>
        acc +
        Number(
          item.budget || 0
        ),
      0
    );

  const totalPaid =
    projects.reduce(
      (acc, item) =>
        acc +
        Number(
          item.paidAmount || 0
        ),
      0
    );

  const totalDue =
    projects.reduce(
      (acc, item) =>
        acc +
        Number(
          item.remainingAmount || 0
        ),
      0
    );

  // Loading screen
  if (loading) {

    return (

      <div className="min-h-[60vh] flex items-center justify-center">

        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm flex items-center gap-3">

          <div className="h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

          <span className="text-sm font-medium text-slate-600">
            Loading Payments...
          </span>

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-5">

      {/* Payment summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

          <div className="flex items-center justify-between">

            <IndianRupee
              size={22}
              className="text-orange-500"
            />

            <h2 className="text-2xl font-bold">
              ₹{totalBudget}
            </h2>

          </div>

          <p className="text-xs text-slate-500 mt-2">
            Total Budget
          </p>

        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

          <div className="flex items-center justify-between">

            <Wallet
              size={22}
              className="text-green-600"
            />

            <h2 className="text-2xl font-bold text-green-600">
              ₹{totalPaid}
            </h2>

          </div>

          <p className="text-xs text-slate-500 mt-2">
            Paid Amount
          </p>

        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

          <div className="flex items-center justify-between">

            <Clock3
              size={22}
              className="text-red-500"
            />

            <h2 className="text-2xl font-bold text-red-500">
              ₹{totalDue}
            </h2>

          </div>

          <p className="text-xs text-slate-500 mt-2">
            Remaining Due
          </p>

        </div>

      </div>

      {/* Project payment cards */}
      <div className="space-y-4">

        {projects.map(
          (project) => (

            <div
              key={project._id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
            >

              <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

                <div>

                  <h2 className="text-xl font-semibold text-slate-800">
                    {project.projectName}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Status : {project.status}
                  </p>

                  <p className="text-sm text-slate-500">
                    Deadline : {project.deadline}
                  </p>

                </div>

                <button
                  onClick={() =>
                    setSelectedProject(
                      project
                    )
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-medium"
                >

                  <Receipt size={16} />

                  Payment History

                </button>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">

                <div className="bg-slate-50 rounded-xl p-4">

                  <p className="text-xs text-slate-500">
                    Budget
                  </p>

                  <h3 className="text-lg font-semibold mt-2">
                    ₹{project.budget}
                  </h3>

                </div>

                <div className="bg-green-50 rounded-xl p-4">

                  <p className="text-xs text-green-700">
                    Paid
                  </p>

                  <h3 className="text-lg font-semibold text-green-700 mt-2">
                    ₹{project.paidAmount}
                  </h3>

                </div>

                <div className="bg-red-50 rounded-xl p-4">

                  <p className="text-xs text-red-700">
                    Remaining
                  </p>

                  <h3 className="text-lg font-semibold text-red-700 mt-2">
                    ₹{project.remainingAmount}
                  </h3>

                </div>

              </div>
                            {project.remainingAmount > 0 ? (

                <div className="mt-5 flex flex-col lg:flex-row gap-3">

                  <input
                    type="number"
                    placeholder="Enter Amount"
                    value={
                      customAmounts[
                        project._id
                      ] || ""
                    }
                    onChange={(e) =>
                      setCustomAmounts({
                        ...customAmounts,
                        [project._id]:
                          e.target.value,
                      })
                    }
                    className="w-full lg:w-60 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                  />

                  <button
                    disabled={processing}
                    onClick={() =>
                      handlePayment(
                        project,
                        customAmounts[
                          project._id
                        ]
                      )
                    }
                    className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white px-5 py-3 rounded-xl text-sm font-medium"
                  >
                    Pay Custom
                  </button>

                  <button
                    disabled={processing}
                    onClick={() =>
                      handlePayment(
                        project,
                        project.remainingAmount
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white px-5 py-3 rounded-xl text-sm font-medium"
                  >
                    Pay Full Due
                  </button>

                </div>

              ) : (

                <div className="mt-5 bg-green-100 text-green-700 rounded-xl p-4 text-sm font-medium flex items-center gap-2">

                  <CheckCircle2 size={18} />

                  Project Fully Paid

                </div>

              )}

            </div>

          )
        )}

      </div>

      {/* Payment history modal */}
      {selectedProject && (

        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto">

            <div className="p-5 border-b border-slate-200 flex items-center justify-between">

              <h2 className="text-xl md:text-2xl font-semibold text-slate-800">
                Payment History
              </h2>

              <button
                onClick={() =>
                  setSelectedProject(null)
                }
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
              >
                Close
              </button>

            </div>

            <div className="p-5 space-y-3">

              {payments
                .filter(
                  (payment) =>
                    String(payment.projectId) ===
                    String(selectedProject._id)
                )
                .map((payment) => (

                  <div
                    key={payment._id}
                    className="border border-slate-200 rounded-xl p-4"
                  >

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                      <div>

                        <p className="text-xs text-slate-500">
                          Amount
                        </p>

                        <p className="font-semibold">
                          ₹{payment.amount}
                        </p>

                      </div>

                      <div>

                        <p className="text-xs text-slate-500">
                          Method
                        </p>

                        <p className="font-semibold">
                          {payment.method}
                        </p>

                      </div>

                      <div>

                        <p className="text-xs text-slate-500">
                          Status
                        </p>

                        <p className="font-semibold">
                          {payment.status}
                        </p>

                      </div>

                      <div>

                        <button
                          onClick={() =>
                            setSelectedReceipt({
                              payment,
                              project:
                                selectedProject,
                            })
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm"
                        >
                          See Receipt
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

            </div>

          </div>

        </div>

      )}
            {/* Receipt modal */}
      {selectedReceipt && (

        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto">

            <div className="p-5 border-b border-slate-200 flex items-center justify-between">

              <h2 className="text-xl md:text-2xl font-semibold text-slate-800">
                Payment Receipt
              </h2>

              <button
                onClick={() =>
                  setSelectedReceipt(null)
                }
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
              >
                Close
              </button>

            </div>

            <div className="p-5">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>

                  <p className="text-xs text-slate-500">
                    Client Name
                  </p>

                  <p className="font-semibold mt-1">
                    {
                      selectedReceipt.project
                        .clientName
                    }
                  </p>

                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Client Email
                  </p>

                  <p className="font-semibold mt-1 break-all">
                    {
                      selectedReceipt.project
                        .clientEmail
                    }
                  </p>

                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Project Name
                  </p>

                  <p className="font-semibold mt-1">
                    {
                      selectedReceipt.project
                        .projectName
                    }
                  </p>

                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Budget
                  </p>

                  <p className="font-semibold mt-1">
                    ₹
                    {
                      selectedReceipt.project
                        .budget
                    }
                  </p>

                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Paid Amount
                  </p>

                  <p className="font-semibold text-green-600 mt-1">
                    ₹
                    {
                      selectedReceipt.project
                        .paidAmount
                    }
                  </p>

                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Remaining Due
                  </p>

                  <p className="font-semibold text-red-600 mt-1">
                    ₹
                    {
                      selectedReceipt.project
                        .remainingAmount
                    }
                  </p>

                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Payment Amount
                  </p>

                  <p className="font-semibold mt-1">
                    ₹
                    {
                      selectedReceipt.payment
                        .amount
                    }
                  </p>

                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Payment Method
                  </p>

                  <p className="font-semibold mt-1">
                    {
                      selectedReceipt.payment
                        .method
                    }
                  </p>

                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Payment ID
                  </p>

                  <p className="font-semibold break-all mt-1">
                    {
                      selectedReceipt.payment
                        .razorpayPaymentId
                    }
                  </p>

                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Order ID
                  </p>

                  <p className="font-semibold break-all mt-1">
                    {
                      selectedReceipt.payment
                        .razorpayOrderId
                    }
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  downloadReceipt(
                    selectedReceipt.payment,
                    selectedReceipt.project
                  )
                }
                className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium"
              >
                Download Invoice PDF
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default ClientPayments;