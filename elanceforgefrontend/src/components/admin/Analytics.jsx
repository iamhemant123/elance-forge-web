import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const Analytics = () => {

  // Dashboard data

  const [projects, setProjects] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [clients, setClients] = useState([]);
  const [payments, setPayments] = useState([]);

  // Keep loading visible until all APIs finish

  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
      const data = await res.json();
      if (data.success) setProjects(data.projects || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMilestones = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/milestones`);
      const data = await res.json();
      if (data.success) setMilestones(data.milestones || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/contacts`);
      const data = await res.json();
      if (data.success) setClients(data.contacts || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payments`);
      const data = await res.json();
      setPayments(Array.isArray(data) ? data : data.payments || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        await Promise.all([
          fetchProjects(),
          fetchMilestones(),
          fetchClients(),
          fetchPayments(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const totalProjects = projects.length;

  const completedProjects =
    projects.filter((p) => p.status === "Completed").length;

  const pendingProjects =
    projects.filter((p) => p.status === "Pending").length;

  const inProgressProjects =
    projects.filter((p) => p.status === "In Progress").length;

  const reviewProjects =
    projects.filter((p) => p.status === "Review").length;

  const totalMilestones = milestones.length;

  const completedMilestones =
    milestones.filter((m) => m.status === "Completed").length;

  const workingMilestones =
    milestones.filter((m) => m.status === "Working").length;

  const totalClients = clients.length;

  const averageProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce((acc, p) => acc + (p.progress || 0), 0) /
            projects.length
        )
      : 0;

  const completionRate =
    totalProjects > 0
      ? Math.round((completedProjects / totalProjects) * 100)
      : 0;

  const totalRevenue = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((total, payment) => total + Number(payment.amount || 0), 0);

  const monthlyRevenue = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  payments
    .filter((payment) => payment.status === "Paid")
    .forEach((payment) => {
      const date = new Date(payment.createdAt);

      const month = date.toLocaleString("default", {
        month: "short",
      });

      if (monthlyRevenue[month] !== undefined) {
        monthlyRevenue[month] += Number(payment.amount || 0);
      }
    });

  const revenueChartData = Object.entries(monthlyRevenue).map(
    ([month, revenue]) => ({
      name: month,
      revenue,
    })
  );

  const projectStatusData = [
    { name: "Pending", value: pendingProjects },
    { name: "In Progress", value: inProgressProjects },
    { name: "Review", value: reviewProjects },
    { name: "Completed", value: completedProjects },
  ];

  const milestoneData = [
    { name: "Completed", value: completedMilestones },
    { name: "Working", value: workingMilestones },
    {
      name: "Remaining",
      value:
        totalMilestones -
        completedMilestones -
        workingMilestones,
    },
  ];

  const progressData = projects.map((project) => ({
    name: project.projectName,
    progress: project.progress,
  }));

  const performanceData = [
    { name: "Projects", value: totalProjects },
    { name: "Milestones", value: totalMilestones },
    { name: "Clients", value: totalClients },
  ];

  const COLORS = ["#2563eb", "#0ea5e9", "#f59e0b", "#22c55e"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white px-8 py-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
            <p className="text-sm font-medium text-slate-600">
              Loading analytics data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (

    <div className="w-full min-h-screen bg-slate-50 px-3 sm:px-4 md:px-5 py-4">

      <div className="mb-5">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
          Analytics Dashboard
        </h1>

        <p className="text-slate-500 text-sm mt-1">
          Monitor projects, milestones, revenue and business growth.
        </p>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-5">

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500">Total Projects</p>
          <h2 className="text-2xl font-bold mt-1">{totalProjects}</h2>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500">Completed</p>
          <h2 className="text-2xl font-bold mt-1 text-green-600">
            {completedProjects}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500">Milestones</p>
          <h2 className="text-2xl font-bold mt-1 text-blue-600">
            {totalMilestones}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500">Clients</p>
          <h2 className="text-2xl font-bold mt-1 text-orange-500">
            {totalClients}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500">Completion Rate</p>
          <h2 className="text-2xl font-bold mt-1 text-violet-600">
            {completionRate}%
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500">Revenue</p>
          <h2 className="text-2xl font-bold mt-1 text-emerald-600">
            ₹{totalRevenue.toLocaleString()}
          </h2>
        </div>

      </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5">

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <div className="flex items-center justify-between mb-3">

            <h2 className="text-base font-semibold text-slate-800">
              Project Status
            </h2>

            <span className="text-xs px-2 py-1 rounded-lg bg-blue-50 text-blue-600">
              Live
            </span>

          </div>

          <div className="h-[300px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  dataKey="value"
                  label
                >

                  {projectStatusData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <div className="flex items-center justify-between mb-3">

            <h2 className="text-base font-semibold text-slate-800">
              Milestone Analytics
            </h2>

            <span className="text-xs px-2 py-1 rounded-lg bg-sky-50 text-sky-600">
              Updated
            </span>

          </div>

          <div className="h-[300px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={milestoneData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" tick={{ fontSize: 11 }} />

                <YAxis tick={{ fontSize: 11 }} />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-5">

        <div className="flex items-center justify-between mb-3">

          <h2 className="text-base font-semibold text-slate-800">
            Project Progress Analytics
          </h2>

          <span className="text-xs px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600">
            Performance
          </span>

        </div>

        <div className="h-[340px]">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={progressData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
              />

              <YAxis
                tick={{ fontSize: 11 }}
              />

              <Tooltip />

              <Legend />

              <Area
                type="monotone"
                dataKey="progress"
                stroke="#22c55e"
                fill="#bbf7d0"
                strokeWidth={2}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-5">

        <div className="flex items-center justify-between mb-3">

          <h2 className="text-base font-semibold text-slate-800">
            Revenue Analytics
          </h2>

          <span className="text-xs px-2 py-1 rounded-lg bg-green-50 text-green-600">
            Revenue
          </span>

        </div>

        <div className="h-[340px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={revenueChartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
              />

              <YAxis
                tick={{ fontSize: 11 }}
              />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="revenue"
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <div className="flex items-center justify-between mb-3">

            <h2 className="text-base font-semibold text-slate-800">
              Business Performance
            </h2>

            <span className="text-xs px-2 py-1 rounded-lg bg-violet-50 text-violet-600">
              Insights
            </span>

          </div>

          <div className="h-[300px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={performanceData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                />

                <YAxis
                  tick={{ fontSize: 11 }}
                />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#7c3aed"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <div className="flex items-center justify-between mb-3">

            <h2 className="text-base font-semibold text-slate-800">
              Business Insights
            </h2>

            <span className="text-xs px-2 py-1 rounded-lg bg-amber-50 text-amber-600">
              Reports
            </span>

          </div>

          <div className="space-y-3">

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">

              <p className="text-sm text-slate-700 leading-6">
                You currently have{" "}
                <span className="font-semibold text-orange-600">
                  {totalProjects}
                </span>{" "}
                projects and{" "}
                <span className="font-semibold text-green-600">
                  {completedProjects}
                </span>{" "}
                completed projects.
              </p>

            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">

              <p className="text-sm text-slate-700 leading-6">
                Average project completion progress is{" "}
                <span className="font-semibold text-blue-600">
                  {averageProgress}%
                </span>.
              </p>

            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-4">

              <p className="text-sm text-slate-700 leading-6">
                Total revenue generated is{" "}
                <span className="font-semibold text-green-600">
                  ₹{totalRevenue.toLocaleString()}
                </span>.
              </p>

            </div>

            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">

              <p className="text-sm text-slate-700 leading-6">
                Current completion rate is{" "}
                <span className="font-semibold text-purple-600">
                  {completionRate}%
                </span>{" "}
                which reflects overall project performance.
              </p>

            </div>
                      </div>

        </div>

      </div>

    </div>

  );

};

export default Analytics;