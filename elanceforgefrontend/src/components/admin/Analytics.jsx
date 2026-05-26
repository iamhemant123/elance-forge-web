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

  const [projects, setProjects] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [clients, setClients] = useState([]);

  const fetchProjects = async () => {

    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);

      const data = await res.json();

      if (data.success) {
        setProjects(data.projects);
      }

    } catch (error) {
      console.log(error);
    }

  };

  const fetchMilestones = async () => {

    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/milestones`);

      const data = await res.json();

      if (data.success) {
        setMilestones(data.milestones);
      }

    } catch (error) {
      console.log(error);
    }

  };

  const fetchClients = async () => {

    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/contacts`);

      const data = await res.json();

      if (data.success) {
        setClients(data.contacts);
      }

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchProjects();
    fetchMilestones();
    fetchClients();
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
        projects.reduce((acc, p) => acc + p.progress, 0) / projects.length
      )
      : 0;

  const completionRate =
    totalProjects > 0
      ? Math.round((completedProjects / totalProjects) * 100)
      : 0;

  const projectStatusData = [
    {
      name: "Pending",
      value: pendingProjects,
    },
    {
      name: "In Progress",
      value: inProgressProjects,
    },
    {
      name: "Review",
      value: reviewProjects,
    },
    {
      name: "Completed",
      value: completedProjects,
    },
  ];

  const milestoneData = [
    {
      name: "Completed",
      value: completedMilestones,
    },
    {
      name: "Working",
      value: workingMilestones,
    },
    {
      name: "Remaining",
      value: totalMilestones - completedMilestones - workingMilestones,
    },
  ];

  const progressData = projects.map((project) => ({
    name: project.projectName,
    progress: project.progress,
  }));

  const performanceData = [
    {
      name: "Projects",
      value: totalProjects,
    },
    {
      name: "Milestones",
      value: totalMilestones,
    },
    {
      name: "Clients",
      value: totalClients,
    },
  ];

  const COLORS = [
    "#f97316",
    "#3b82f6",
    "#eab308",
    "#22c55e",
  ];

  return (

    <div className="w-full overflow-hidden px-3 sm:px-5 md:px-7 py-5 bg-[#f5f7fb] min-h-screen">

      <div className="mb-8">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
          Analytics Dashboard
        </h1>

        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Monitor projects, milestones and business growth in real time
        </p>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">

        <div className="bg-white rounded-3xl p-5 shadow hover:shadow-xl transition">

          <p className="text-gray-500 text-sm">
            Total Projects
          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-2">
            {totalProjects}
          </h1>

        </div>

        <div className="bg-white rounded-3xl p-5 shadow hover:shadow-xl transition">

          <p className="text-gray-500 text-sm">
            Completed
          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-2 text-green-500">
            {completedProjects}
          </h1>

        </div>

        <div className="bg-white rounded-3xl p-5 shadow hover:shadow-xl transition">

          <p className="text-gray-500 text-sm">
            Milestones
          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-2 text-blue-500">
            {totalMilestones}
          </h1>

        </div>

        <div className="bg-white rounded-3xl p-5 shadow hover:shadow-xl transition">

          <p className="text-gray-500 text-sm">
            Clients
          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-2 text-orange-500">
            {totalClients}
          </h1>

        </div>

        <div className="bg-white rounded-3xl p-5 shadow hover:shadow-xl transition">

          <p className="text-gray-500 text-sm">
            Completion Rate
          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-2 text-purple-500">
            {completionRate}%
          </h1>

        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        <div className="bg-white rounded-3xl p-5 md:p-7 shadow hover:shadow-xl transition">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl font-black">
              Project Status
            </h2>

            <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl text-sm font-semibold">
              Live Data
            </div>

          </div>

          <div className="w-full h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
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

        <div className="bg-white rounded-3xl p-5 md:p-7 shadow hover:shadow-xl transition">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl font-black">
              Milestone Analytics
            </h2>

            <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold">
              Updated
            </div>

          </div>

          <div className="w-full h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={milestoneData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-3xl p-5 md:p-7 shadow hover:shadow-xl transition mb-8">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-2xl font-black">
            Project Progress Analytics
          </h2>

          <div className="bg-green-100 text-green-600 px-4 py-2 rounded-xl text-sm font-semibold">
            Performance
          </div>

        </div>

        <div className="w-full h-[400px]">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={progressData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Area
                type="monotone"
                dataKey="progress"
                stroke="#22c55e"
                fill="#bbf7d0"
                strokeWidth={3}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl p-5 md:p-7 shadow hover:shadow-xl transition">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl font-black">
              Business Performance
            </h2>

            <div className="bg-purple-100 text-purple-600 px-4 py-2 rounded-xl text-sm font-semibold">
              Insights
            </div>

          </div>

          <div className="w-full h-[320px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={performanceData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8b5cf6"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-5 md:p-7 shadow hover:shadow-xl transition">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-2xl font-black">
              Business Insights
            </h2>

            <div className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-xl text-sm font-semibold">
              Reports
            </div>

          </div>

          <div className="space-y-5">

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">

              <p className="text-gray-700 leading-8 text-sm sm:text-base">
                You currently have{" "}
                <span className="font-black text-orange-500">
                  {totalProjects}
                </span>{" "}
                projects and{" "}
                <span className="font-black text-green-500">
                  {completedProjects}
                </span>{" "}
                completed projects.
              </p>

            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">

              <p className="text-gray-700 leading-8 text-sm sm:text-base">
                Average project completion progress is{" "}
                <span className="font-black text-blue-500">
                  {averageProgress}%
                </span>.
              </p>

            </div>

            <div className="bg-green-50 border border-green-100 rounded-2xl p-5">

              <p className="text-gray-700 leading-8 text-sm sm:text-base">
                You are managing{" "}
                <span className="font-black text-green-500">
                  {totalMilestones}
                </span>{" "}
                milestones across all projects.
              </p>

            </div>

            <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">

              <p className="text-gray-700 leading-8 text-sm sm:text-base">
                Current completion rate is{" "}
                <span className="font-black text-purple-500">
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