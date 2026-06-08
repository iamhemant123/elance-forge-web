import { useEffect, useState } from "react";

import {
  FolderKanban,
  CheckCircle2,
  Users,
  Activity,
  ArrowUpRight,
  Clock3,
  BriefcaseBusiness,
} from "lucide-react";

const DashboardContent = () => {

  // Dashboard data
  const [projects, setProjects] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [clients, setClients] = useState([]);

  // Keep loader visible until APIs finish
  const [loading, setLoading] = useState(true);

  // Load projects
  const fetchProjects = async () => {
    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects`
      );

      const data = await res.json();

      if (data.success) {
        setProjects(data.projects || []);
      }

    } catch (error) {

      console.log(error);

    }
  };

  // Load milestones
  const fetchMilestones = async () => {
    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/milestones`
      );

      const data = await res.json();

      if (data.success) {
        setMilestones(data.milestones || []);
      }

    } catch (error) {

      console.log(error);

    }
  };

  // Load clients
  const fetchClients = async () => {
    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/contacts`
      );

      const data = await res.json();

      if (data.success) {
        setClients(data.contacts || []);
      }

    } catch (error) {

      console.log(error);

    }
  };

  // Initial dashboard load
  useEffect(() => {

    const loadDashboard = async () => {

      try {

        setLoading(true);

        await Promise.all([
          fetchProjects(),
          fetchMilestones(),
          fetchClients(),
        ]);

      } finally {

        setLoading(false);

      }

    };

    loadDashboard();

  }, []);

  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const pendingProjects = projects.filter(
    (p) => p.status === "Pending"
  ).length;

  const completedMilestones = milestones.filter(
    (m) => m.status === "Completed"
  ).length;

  const averageProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce(
            (acc, p) => acc + (p.progress || 0),
            0
          ) / projects.length
        )
      : 0;

  // Real loading state
  if (loading) {

    return (

      <div className="min-h-[70vh] flex items-center justify-center">

        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm flex items-center gap-3">

          <div className="h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

          <span className="text-sm font-medium text-slate-600">
            Loading Dashboard...
          </span>

        </div>

      </div>

    );

  }

  return (

    <div className="w-full min-h-screen bg-slate-50 px-3 md:px-4 py-4">

      {/* Dashboard header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

        <div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Welcome back, manage your business performance in one place
          </p>

        </div>

        {/* Live system status */}
        <div className="bg-white rounded-2xl px-4 py-3 border border-slate-200 shadow-sm flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500">
            <Activity size={18} />
          </div>

          <div>

            <p className="text-xs text-slate-500">
              System Status
            </p>

            <h3 className="text-sm font-semibold text-green-600">
              Online
            </h3>

          </div>

        </div>

      </div>

      {/* Dashboard stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-5">

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">

            <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
              <FolderKanban size={20} />
            </div>

            <div className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1">
              <ArrowUpRight size={12} />
              Projects
            </div>

          </div>

          <h2 className="text-2xl font-bold">
            {projects.length}
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Total Projects
          </p>

        </div>
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <div className="flex items-center justify-between mb-3">

            <div className="w-11 h-11 rounded-xl bg-green-100 text-green-500 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>

            <div className="bg-green-100 text-green-500 px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1">
              <ArrowUpRight size={12} />
              Done
            </div>

          </div>

          <h2 className="text-2xl font-bold">
            {completedProjects}
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Completed Projects
          </p>

        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <div className="flex items-center justify-between mb-3">

            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center">
              <BriefcaseBusiness size={20} />
            </div>

            <div className="bg-blue-100 text-blue-500 px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1">
              <ArrowUpRight size={12} />
              Tasks
            </div>

          </div>

          <h2 className="text-2xl font-bold">
            {milestones.length}
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Total Milestones
          </p>

        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <div className="flex items-center justify-between mb-3">

            <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-500 flex items-center justify-center">
              <Users size={20} />
            </div>

            <div className="bg-purple-100 text-purple-500 px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1">
              <ArrowUpRight size={12} />
              Clients
            </div>

          </div>

          <h2 className="text-2xl font-bold">
            {clients.length}
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Total Clients
          </p>

        </div>

      </div>

      {/* Main dashboard section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-5">

        {/* Recent projects */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-lg font-semibold text-slate-800">
              Recent Projects
            </h2>

            <div className="bg-orange-100 text-orange-500 px-3 py-1 rounded-lg text-xs font-medium">
              Live
            </div>

          </div>

          <div className="space-y-3">

            {projects.slice(0, 5).map((project) => (

              <div
                key={project._id}
                className="border border-slate-200 rounded-xl p-4 hover:shadow-sm transition"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">

                  <div>

                    <h3 className="text-base font-semibold text-slate-800 break-words">
                      {project.projectName}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                      {project.clientName}
                    </p>

                  </div>

                  <div
                    className={`px-3 py-1 rounded-lg text-xs font-medium w-fit ${
                      project.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : project.status === "Review"
                        ? "bg-yellow-100 text-yellow-600"
                        : project.status === "In Progress"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {project.status}
                  </div>

                </div>
                                <div className="mb-3">

                  <div className="flex items-center justify-between mb-2">

                    <p className="text-xs font-medium text-slate-600">
                      Progress
                    </p>

                    <p className="text-xs font-semibold text-slate-700">
                      {project.progress}%
                    </p>

                  </div>

                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

                    <div
                      style={{
                        width: `${project.progress}%`,
                      }}
                      className={`h-2 rounded-full ${
                        project.status === "Completed"
                          ? "bg-green-500"
                          : project.status === "Review"
                          ? "bg-yellow-500"
                          : project.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-orange-500"
                      }`}
                    ></div>

                  </div>

                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">

                  <div className="flex items-center gap-2">

                    <Clock3 size={14} />

                    {project.deadline}

                  </div>

                  <div>
                    {project.priority}
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Performance cards */}
        <div className="space-y-4">

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Performance
            </h2>

            <div className="space-y-4">

              <div>

                <div className="flex items-center justify-between mb-2">

                  <p className="text-xs font-medium text-slate-600">
                    Project Completion
                  </p>

                  <p className="text-xs font-semibold text-green-600">
                    {completedProjects}/{projects.length}
                  </p>

                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

                  <div
                    style={{
                      width: `${
                        projects.length > 0
                          ? (completedProjects / projects.length) * 100
                          : 0
                      }%`,
                    }}
                    className="h-2 bg-green-500 rounded-full"
                  ></div>

                </div>

              </div>

              <div>

                <div className="flex items-center justify-between mb-2">

                  <p className="text-xs font-medium text-slate-600">
                    Milestone Completion
                  </p>

                  <p className="text-xs font-semibold text-blue-600">
                    {completedMilestones}/{milestones.length}
                  </p>

                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

                  <div
                    style={{
                      width: `${
                        milestones.length > 0
                          ? (completedMilestones / milestones.length) * 100
                          : 0
                      }%`,
                    }}
                    className="h-2 bg-blue-500 rounded-full"
                  ></div>

                </div>

              </div>

              <div>

                <div className="flex items-center justify-between mb-2">

                  <p className="text-xs font-medium text-slate-600">
                    Average Progress
                  </p>

                  <p className="text-xs font-semibold text-orange-600">
                    {averageProgress}%
                  </p>

                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

                  <div
                    style={{
                      width: `${averageProgress}%`,
                    }}
                    className="h-2 bg-orange-500 rounded-full"
                  ></div>

                </div>

              </div>

            </div>

          </div>
                    {/* Quick insights */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Quick Insights
            </h2>

            <div className="space-y-3">

              <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">

                <p className="text-sm text-slate-700 leading-6">

                  You currently have{" "}

                  <span className="font-semibold text-orange-600">
                    {pendingProjects}
                  </span>

                  {" "}pending projects that require attention.

                </p>

              </div>

              <div className="bg-green-50 border border-green-100 rounded-xl p-3">

                <p className="text-sm text-slate-700 leading-6">

                  A total of{" "}

                  <span className="font-semibold text-green-600">
                    {completedProjects}
                  </span>

                  {" "}projects are completed successfully.

                </p>

              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">

                <p className="text-sm text-slate-700 leading-6">

                  Current average project progress is{" "}

                  <span className="font-semibold text-blue-600">
                    {averageProgress}%
                  </span>

                  .

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default DashboardContent;