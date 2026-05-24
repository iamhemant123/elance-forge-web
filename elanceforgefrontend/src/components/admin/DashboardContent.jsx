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
  const [projects, setProjects] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [clients, setClients] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects`
      );

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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/milestones`
      );

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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/contacts`
      );

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
            (acc, p) => acc + p.progress,
            0
          ) / projects.length
        )
      : 0;

  return (
    <div className="w-full overflow-hidden px-3 sm:px-5 md:px-7 py-5 bg-[#f5f7fb] min-h-screen">
      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Welcome back, manage your business performance in one place
          </p>
        </div>

        <div className="bg-white rounded-2xl px-5 py-4 shadow flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500">
            <Activity size={24} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              System Status
            </p>

            <h3 className="font-bold text-green-500">
              Online
            </h3>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-3xl p-5 shadow hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-5">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">
              <FolderKanban size={28} />
            </div>

            <div className="bg-orange-100 text-orange-500 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1">
              <ArrowUpRight size={14} />
              Projects
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black">
            {projects.length}
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Total Projects
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-5">
            <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-500 flex items-center justify-center">
              <CheckCircle2 size={28} />
            </div>

            <div className="bg-green-100 text-green-500 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1">
              <ArrowUpRight size={14} />
              Done
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black">
            {completedProjects}
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Completed Projects
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center">
              <BriefcaseBusiness size={28} />
            </div>

            <div className="bg-blue-100 text-blue-500 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1">
              <ArrowUpRight size={14} />
              Tasks
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black">
            {milestones.length}
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Total Milestones
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-5">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-500 flex items-center justify-center">
              <Users size={28} />
            </div>

            <div className="bg-purple-100 text-purple-500 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1">
              <ArrowUpRight size={14} />
              Clients
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black">
            {clients.length}
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Total Clients
          </p>
        </div>
      </div>

      {/* MAIN SECTION */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* RECENT PROJECTS */}

        <div className="xl:col-span-2 bg-white rounded-3xl p-5 md:p-7 shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black">
              Recent Projects
            </h2>

            <div className="bg-orange-100 text-orange-500 px-4 py-2 rounded-xl text-sm font-semibold">
              Live
            </div>
          </div>

          <div className="space-y-5">
            {projects.slice(0, 5).map((project) => (
              <div
                key={project._id}
                className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-black break-words">
                      {project.projectName}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      {project.clientName}
                    </p>
                  </div>

                  <div
                    className={`px-4 py-2 rounded-xl text-sm font-semibold w-fit ${
                      project.status === "Completed"
                        ? "bg-green-100 text-green-500"
                        : project.status === "Review"
                        ? "bg-yellow-100 text-yellow-500"
                        : project.status ===
                          "In Progress"
                        ? "bg-blue-100 text-blue-500"
                        : "bg-orange-100 text-orange-500"
                    }`}
                  >
                    {project.status}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">
                      Progress
                    </p>

                    <p className="text-sm font-bold">
                      {project.progress}%
                    </p>
                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      style={{
                        width: `${project.progress}%`,
                      }}
                      className={`h-3 rounded-full ${
                        project.status ===
                        "Completed"
                          ? "bg-green-500"
                          : project.status ===
                            "Review"
                          ? "bg-yellow-500"
                          : project.status ===
                            "In Progress"
                          ? "bg-blue-500"
                          : "bg-orange-500"
                      }`}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock3 size={16} />
                    {project.deadline}
                  </div>

                  <div>{project.priority}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PERFORMANCE */}

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-5 md:p-7 shadow">
            <h2 className="text-2xl font-black mb-6">
              Performance
            </h2>

            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">
                    Project Completion
                  </p>

                  <p className="text-sm font-bold text-green-500">
                    {completedProjects}/
                    {projects.length}
                  </p>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${
                        projects.length > 0
                          ? (completedProjects /
                              projects.length) *
                            100
                          : 0
                      }%`,
                    }}
                    className="h-3 bg-green-500 rounded-full"
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">
                    Milestone Completion
                  </p>

                  <p className="text-sm font-bold text-blue-500">
                    {completedMilestones}/
                    {milestones.length}
                  </p>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${
                        milestones.length > 0
                          ? (completedMilestones /
                              milestones.length) *
                            100
                          : 0
                      }%`,
                    }}
                    className="h-3 bg-blue-500 rounded-full"
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">
                    Average Progress
                  </p>

                  <p className="text-sm font-bold text-orange-500">
                    {averageProgress}%
                  </p>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${averageProgress}%`,
                    }}
                    className="h-3 bg-orange-500 rounded-full"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 md:p-7 shadow">
            <h2 className="text-2xl font-black mb-6">
              Quick Insights
            </h2>

            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
                <p className="text-sm text-gray-700 leading-7">
                  You currently have{" "}
                  <span className="font-black text-orange-500">
                    {pendingProjects}
                  </span>{" "}
                  pending projects that
                  require attention.
                </p>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                <p className="text-sm text-gray-700 leading-7">
                  A total of{" "}
                  <span className="font-black text-green-500">
                    {completedProjects}
                  </span>{" "}
                  projects are completed
                  successfully.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-sm text-gray-700 leading-7">
                  Current average project
                  progress is{" "}
                  <span className="font-black text-blue-500">
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