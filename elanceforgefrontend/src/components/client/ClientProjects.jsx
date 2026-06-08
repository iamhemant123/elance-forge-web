import { useEffect, useState } from "react";

import {
  FolderKanban,
  Activity,
  CheckCircle2,
  Clock3,
  IndianRupee,
  Wallet,
} from "lucide-react";

const ClientProjects = () => {

  // Client projects
  const [projects, setProjects] =
    useState([]);

  // Real loading state
  const [loading, setLoading] =
    useState(true);

  const client = JSON.parse(
    localStorage.getItem("client")
  );

  // Load projects
  useEffect(() => {

    fetchProjects();

  }, []);

  // Fetch project list
  const fetchProjects =
    async () => {

      try {

        if (!client?.email) {

          setLoading(false);

          return;

        }

        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/projects/client/${client.email}`
        );

        const data =
          await res.json();

        setProjects(
          data || []
        );

      } catch (error) {

        console.log(error);

        setProjects([]);

      } finally {

        setLoading(false);

      }

    };

  // Payment status badge
  const getPaymentStatus = (
    project
  ) => {

    if (
      project.remainingAmount <= 0
    ) {

      return {
        text: "Fully Paid",
        color:
          "bg-green-100 text-green-700",
      };

    }

    if (
      project.paidAmount > 0
    ) {

      return {
        text: "Partially Paid",
        color:
          "bg-yellow-100 text-yellow-700",
      };

    }

    return {
      text: "Payment Due",
      color:
        "bg-red-100 text-red-700",
    };

  };

  // Dashboard counters
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

  // Loading screen
  if (loading) {

    return (

      <div className="min-h-[60vh] flex items-center justify-center">

        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm flex items-center gap-3">

          <div className="h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

          <span className="text-sm font-medium text-slate-600">
            Loading Projects...
          </span>

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-5">

      {/* Page heading */}
      <div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          My Projects
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Track project progress, payments and updates.
        </p>

      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

          <div className="flex items-center justify-between">

            <FolderKanban size={20} />

            <span className="text-2xl font-bold">
              {totalProjects}
            </span>

          </div>

          <p className="text-xs text-slate-500 mt-2">
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

          <p className="text-xs text-slate-500 mt-2">
            Active
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

          <p className="text-xs text-slate-500 mt-2">
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

          <p className="text-xs text-slate-500 mt-2">
            Pending
          </p>

        </div>

      </div>
            {/* Empty state */}
      {projects.length === 0 ? (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">

          <FolderKanban
            size={55}
            className="mx-auto text-slate-300"
          />

          <h3 className="text-lg font-semibold text-slate-700 mt-4">
            No Projects Found
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            No projects have been assigned yet.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {projects.map(
            (project) => {

              const paymentStatus =
                getPaymentStatus(
                  project
                );

              return (

                <div
                  key={project._id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition p-5"
                >

                  {/* Project header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                    <div>

                      <h3 className="text-xl md:text-2xl font-semibold text-slate-800 break-words">
                        {project.projectName}
                      </h3>

                      <p className="text-sm text-slate-500 mt-3 leading-6">
                        {project.description}
                      </p>

                    </div>

                    <div className="flex flex-wrap gap-2">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status ===
                          "Completed"
                            ? "bg-green-100 text-green-700"
                            : project.status ===
                              "Review"
                            ? "bg-yellow-100 text-yellow-700"
                            : project.status ===
                              "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {project.status}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${paymentStatus.color}`}
                      >
                        {paymentStatus.text}
                      </span>

                    </div>

                  </div>

                  {/* Progress */}
                  <div className="mt-5">

                    <div className="flex justify-between mb-2">

                      <span className="text-sm font-medium text-slate-600">
                        Project Progress
                      </span>

                      <span className="text-sm font-semibold text-orange-500">
                        {project.progress}%
                      </span>

                    </div>

                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-orange-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${project.progress}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* Budget cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">

                      <div className="flex items-center justify-between">

                        <IndianRupee
                          size={18}
                          className="text-slate-500"
                        />

                        <span className="text-lg font-semibold">
                          ₹{project.budget || 0}
                        </span>

                      </div>

                      <p className="text-xs text-slate-500 mt-2">
                        Total Budget
                      </p>

                    </div>

                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">

                      <div className="flex items-center justify-between">

                        <Wallet
                          size={18}
                          className="text-green-600"
                        />

                        <span className="text-lg font-semibold text-green-700">
                          ₹{project.paidAmount || 0}
                        </span>

                      </div>

                      <p className="text-xs text-green-700 mt-2">
                        Paid Amount
                      </p>

                    </div>

                    <div className="bg-red-50 rounded-xl p-4 border border-red-100">

                      <div className="flex items-center justify-between">

                        <Clock3
                          size={18}
                          className="text-red-500"
                        />

                        <span className="text-lg font-semibold text-red-700">
                          ₹{project.remainingAmount || 0}
                        </span>

                      </div>

                      <p className="text-xs text-red-700 mt-2">
                        Remaining Due
                      </p>

                    </div>

                  </div>
                                    {/* Project details */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">

                    <div className="bg-slate-50 rounded-xl p-3">

                      <p className="text-[11px] text-slate-500 uppercase">
                        Deadline
                      </p>

                      <p className="font-medium mt-2 text-sm">
                        {project.deadline}
                      </p>

                    </div>

                    <div className="bg-slate-50 rounded-xl p-3">

                      <p className="text-[11px] text-slate-500 uppercase">
                        Priority
                      </p>

                      <p className="font-medium mt-2 text-sm">
                        {project.priority}
                      </p>

                    </div>

                    <div className="bg-slate-50 rounded-xl p-3">

                      <p className="text-[11px] text-slate-500 uppercase">
                        Team
                      </p>

                      <p className="font-medium mt-2 text-sm break-words">
                        {project.team || "Not Assigned"}
                      </p>

                    </div>

                    <div className="bg-slate-50 rounded-xl p-3">

                      <p className="text-[11px] text-slate-500 uppercase">
                        Created
                      </p>

                      <p className="font-medium mt-2 text-sm">
                        {new Date(
                          project.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                  </div>

                  {/* Latest update */}
                  <div className="mt-5 bg-orange-50 border border-orange-100 rounded-xl p-4">

                    <div className="flex items-center justify-between mb-2">

                      <h4 className="text-sm font-semibold text-orange-700">
                        Latest Project Update
                      </h4>

                      <span className="text-[11px] text-orange-600">
                        Admin Note
                      </span>

                    </div>

                    <p className="text-sm text-slate-700 leading-6">
                      {project.notes ||
                        "No project updates available yet."}
                    </p>

                  </div>

                  {/* Footer information */}
                  <div className="mt-5 border-t border-slate-200 pt-4">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                      <div>

                        <p className="text-[11px] text-slate-500 uppercase">
                          Project Started
                        </p>

                        <p className="font-medium mt-1 text-sm">
                          {new Date(
                            project.createdAt
                          ).toLocaleDateString()}
                        </p>

                      </div>

                      <div>

                        <p className="text-[11px] text-slate-500 uppercase">
                          Expected Delivery
                        </p>

                        <p className="font-medium mt-1 text-sm">
                          {project.deadline}
                        </p>

                      </div>

                      <div>

                        <p className="text-[11px] text-slate-500 uppercase">
                          Client Email
                        </p>

                        <p className="font-medium mt-1 text-sm break-all">
                          {project.clientEmail}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              );

            }
          )}

        </div>

      )}
          </div>

  );

};

export default ClientProjects;
