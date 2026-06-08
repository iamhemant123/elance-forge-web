import { useEffect, useState } from "react";

import {
  FolderKanban,
  Clock3,
  CheckCircle2,
  Activity,
  IndianRupee,
  Wallet,
} from "lucide-react";

const ClientOverview = () => {

  // Client projects
  const [projects, setProjects] =
    useState([]);

  // Real loading state
  const [loading, setLoading] =
    useState(true);

  const client = JSON.parse(
    localStorage.getItem("client")
  );

  // Load dashboard data
  useEffect(() => {

    fetchProjects();

  }, []);

  // Fetch client projects
  const fetchProjects =
    async () => {

      try {

        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/projects/client/${client.email}`
        );

        const data =
          await res.json();

        setProjects(data || []);

      } catch (error) {

        console.log(error);

        setProjects([]);

      } finally {

        setLoading(false);

      }

    };

  const totalProjects =
    projects.length;

  const activeProjects =
    projects.filter(
      (project) =>
        project.status ===
        "In Progress"
    ).length;

  const completedProjects =
    projects.filter(
      (project) =>
        project.status ===
        "Completed"
    ).length;

  const pendingProjects =
    projects.filter(
      (project) =>
        project.status ===
        "Pending"
    ).length;

  const totalBudget =
    projects.reduce(
      (sum, project) =>
        sum +
        Number(
          project.budget || 0
        ),
      0
    );

  const totalPaid =
    projects.reduce(
      (sum, project) =>
        sum +
        Number(
          project.paidAmount || 0
        ),
      0
    );

  const latestProject =
    projects[0];

  // Loading screen
  if (loading) {

    return (

      <div className="min-h-[60vh] flex items-center justify-center">

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

    <div className="space-y-5">

      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-sm">

        <h2 className="text-2xl md:text-3xl font-bold">
          Welcome Back, {client?.name}
        </h2>

        <p className="mt-2 text-sm text-orange-100">
          Track your projects, payments and latest updates from ElanceForge.
        </p>

      </div>

      {/* Client profile */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">

            {client?.name?.charAt(0)}

          </div>

          <div>

            <h3 className="text-xl font-semibold text-slate-800">
              {client?.name}
            </h3>

            <p className="text-sm text-slate-500">
              {client?.email}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Client Dashboard
            </p>

          </div>

        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

          <div className="flex items-center justify-between">

            <FolderKanban size={20} />

            <span className="text-2xl font-bold">
              {totalProjects}
            </span>

          </div>

          <p className="mt-2 text-xs text-slate-500">
            Total Projects
          </p>

        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

          <div className="flex items-center justify-between">

            <Activity
              size={20}
              className="text-blue-500"
            />

            <span className="text-2xl font-bold text-blue-500">
              {activeProjects}
            </span>

          </div>

          <p className="mt-2 text-xs text-slate-500">
            Active Projects
          </p>

        </div>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

          <div className="flex items-center justify-between">

            <CheckCircle2
              size={20}
              className="text-green-500"
            />

            <span className="text-2xl font-bold text-green-500">
              {completedProjects}
            </span>

          </div>

          <p className="mt-2 text-xs text-slate-500">
            Completed
          </p>

        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

          <div className="flex items-center justify-between">

            <Clock3
              size={20}
              className="text-orange-500"
            />

            <span className="text-2xl font-bold text-orange-500">
              {pendingProjects}
            </span>

          </div>

          <p className="mt-2 text-xs text-slate-500">
            Pending
          </p>

        </div>

      </div>

      {/* Payment summary */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-green-50 border border-green-100 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <Wallet
              size={24}
              className="text-green-700"
            />

            <span className="text-2xl font-bold text-green-700">
              ₹{totalPaid}
            </span>

          </div>

          <p className="mt-2 text-sm text-green-700">
            Total Paid
          </p>

        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <IndianRupee
              size={24}
              className="text-orange-700"
            />

            <span className="text-2xl font-bold text-orange-700">
              ₹{totalBudget}
            </span>

          </div>

          <p className="mt-2 text-sm text-orange-700">
            Total Budget
          </p>

        </div>

      </div>

      {/* Current project */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">

        <h3 className="text-xl font-semibold text-slate-800 mb-5">
          Current Project
        </h3>

        {latestProject ? (

          <>

            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

              <div>

                <h4 className="text-xl font-semibold text-slate-800">
                  {latestProject.projectName}
                </h4>

                <p className="text-sm text-slate-500 mt-3 leading-6">
                  {latestProject.description}
                </p>

              </div>

              <div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    latestProject.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : latestProject.status === "Review"
                      ? "bg-yellow-100 text-yellow-700"
                      : latestProject.status === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {latestProject.status}
                </span>

              </div>

            </div>

            {/* Progress */}
            <div className="mt-5">

              <div className="flex justify-between mb-2">

                <span className="text-sm font-medium text-slate-600">
                  Progress
                </span>

                <span className="text-sm font-semibold text-orange-500">
                  {latestProject.progress}%
                </span>

              </div>

              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${latestProject.progress}%`,
                  }}
                />

              </div>

            </div>
                        {/* Budget cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">

              <div className="bg-slate-50 rounded-xl p-4">

                <p className="text-xs text-slate-500">
                  Budget
                </p>

                <h4 className="text-lg font-semibold mt-2 text-slate-800">
                  ₹{latestProject.budget || 0}
                </h4>

              </div>

              <div className="bg-green-50 rounded-xl p-4">

                <p className="text-xs text-green-600">
                  Paid Amount
                </p>

                <h4 className="text-lg font-semibold mt-2 text-green-700">
                  ₹{latestProject.paidAmount || 0}
                </h4>

              </div>

              <div className="bg-red-50 rounded-xl p-4">

                <p className="text-xs text-red-600">
                  Remaining Due
                </p>

                <h4 className="text-lg font-semibold mt-2 text-red-700">
                  ₹{latestProject.remainingAmount || 0}
                </h4>

              </div>

            </div>

            {/* Project details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">

              <div className="bg-slate-50 rounded-xl p-3">

                <p className="text-[11px] text-slate-500 uppercase">
                  Deadline
                </p>

                <p className="font-medium mt-2 text-sm">
                  {latestProject.deadline}
                </p>

              </div>

              <div className="bg-slate-50 rounded-xl p-3">

                <p className="text-[11px] text-slate-500 uppercase">
                  Priority
                </p>

                <p className="font-medium mt-2 text-sm">
                  {latestProject.priority}
                </p>

              </div>

              <div className="bg-slate-50 rounded-xl p-3">

                <p className="text-[11px] text-slate-500 uppercase">
                  Team
                </p>

                <p className="font-medium mt-2 text-sm break-words">
                  {latestProject.team || "Not Assigned"}
                </p>

              </div>

              <div className="bg-slate-50 rounded-xl p-3">

                <p className="text-[11px] text-slate-500 uppercase">
                  Created
                </p>

                <p className="font-medium mt-2 text-sm">
                  {new Date(
                    latestProject.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>

            </div>

            {/* Admin update */}
            <div className="mt-5 bg-orange-50 border border-orange-100 rounded-xl p-4">

              <div className="flex items-center justify-between mb-2">

                <h4 className="text-sm font-semibold text-orange-700">
                  Latest Update
                </h4>

                <span className="text-[11px] text-orange-600">
                  Admin Note
                </span>

              </div>

              <p className="text-sm text-slate-700 leading-6">
                {latestProject.notes ||
                  "No updates available yet."}
              </p>

            </div>

          </>

        ) : (

          <div className="text-center py-10">

            <h4 className="text-lg font-semibold text-slate-700">
              No Projects Available
            </h4>

            <p className="text-sm text-slate-500 mt-2">
              Projects will appear here once assigned.
            </p>

          </div>

        )}

      </div>
          </div>

  );

};

export default ClientOverview;