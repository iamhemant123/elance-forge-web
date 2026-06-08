import { useEffect, useState } from "react";

const ProjectManagement = () => {

  // Project records
  const [projects, setProjects] = useState([]);

  // Client list
  const [clients, setClients] = useState([]);

  // Page loading
  const [loading, setLoading] = useState(true);

  // Create project modal
  const [showModal, setShowModal] = useState(false);

  // Corner notifications
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Project form
  const [formData, setFormData] = useState({
    clientId: "",
    clientName: "",
    clientEmail: "",
    projectName: "",
    description: "",
    deadline: "",
    priority: "Medium",
    status: "Pending",
    progress: 0,
    notes: "",
    team: "",
    budget: "",
    paidAmount: 0,
    remainingAmount: 0,
  });

  // Load project list
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

  // Status progress mapping
  const getProgress = (status) => {

    if (status === "Pending") return 0;

    if (status === "In Progress") return 30;

    if (status === "Review") return 75;

    if (status === "Completed") return 100;

    return 0;

  };

  // Progress bar color
  const getBarColor = (status) => {

    if (status === "Pending") return "bg-orange-500";

    if (status === "In Progress") return "bg-blue-500";

    if (status === "Review") return "bg-yellow-500";

    if (status === "Completed") return "bg-green-500";

    return "bg-orange-500";

  };

  // Success popup
  const showSuccess = (msg) => {

    setSuccess(msg);

    setTimeout(() => {

      setSuccess("");

    }, 3000);

  };

  // Error popup
  const showError = (msg) => {

    setError(msg);

    setTimeout(() => {

      setError("");

    }, 3000);

  };

  // Create project
  const createProject = async (e) => {

    e.preventDefault();

    try {

      const progress = getProgress(
        formData.status
      );

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...formData,
            progress,
            paidAmount: 0,
            remainingAmount:
              formData.budget,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {

        setProjects((prev) => [
          data.project,
          ...prev,
        ]);

        showSuccess(
          "Project Created Successfully"
        );

        setShowModal(false);

        setFormData({
          clientId: "",
          clientName: "",
          clientEmail: "",
          projectName: "",
          description: "",
          deadline: "",
          priority: "Medium",
          status: "Pending",
          progress: 0,
          notes: "",
          team: "",
          budget: "",
          paidAmount: 0,
          remainingAmount: 0,
        });

      }

    } catch (error) {

      console.log(error);

      showError(
        "Something Went Wrong"
      );

    }
  };

  // Delete project
  const deleteProject = async (id) => {

    try {

      await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
        {
          method: "DELETE",
        }
      );

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project._id !== id
        )
      );

      showSuccess(
        "Project Deleted Successfully"
      );

    } catch (error) {

      console.log(error);

      showError("Delete Failed");

    }
  };

  // Update status
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      const progress =
        getProgress(status);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
            progress,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {

        setProjects((prev) =>
          prev.map((project) =>
            project._id === id
              ? {
                  ...project,
                  status,
                  progress,
                }
              : project
          )
        );

        showSuccess(
          "Project Updated Successfully"
        );

      }

    } catch (error) {

      console.log(error);

      showError("Update Failed");

    }
  };
    // Initial page load
  useEffect(() => {

    const loadData = async () => {

      try {

        setLoading(true);

        await Promise.all([
          fetchProjects(),
          fetchClients(),
        ]);

        const storedClient =
          JSON.parse(
            localStorage.getItem(
              "selectedClient"
            )
          );

        if (storedClient) {

          setShowModal(true);

          setFormData((prev) => ({
            ...prev,
            clientId:
              storedClient._id,
            clientName:
              storedClient.name || "",
            clientEmail:
              storedClient.email || "",
            projectName:
              storedClient.subject || "",
            description:
              storedClient.message || "",
          }));

          localStorage.removeItem(
            "selectedClient"
          );

        }

      } finally {

        setLoading(false);

      }

    };

    loadData();

  }, []);

  // Loading screen
  if (loading) {

    return (

      <div className="min-h-[70vh] flex items-center justify-center">

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

    <div className="w-full px-3 md:px-4 py-4">

      {/* Success popup */}
      {success && (

        <div className="fixed top-5 right-5 z-[9999] bg-green-500 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium max-w-xs">
          {success}
        </div>

      )}

      {/* Error popup */}
      {error && (

        <div className="fixed top-5 right-5 z-[9999] bg-red-500 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium max-w-xs">
          {error}
        </div>

      )}

      {/* Page heading */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

        <div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Project Management
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage project delivery, team assignments and billing
          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-orange-500 hover:bg-orange-600 transition text-white px-5 py-3 rounded-xl font-medium text-sm"
        >
          + Add Project
        </button>

      </div>

      {/* Project statistics */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-3 mb-5">

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <p className="text-xs text-slate-500">
            Total
          </p>

          <h2 className="text-2xl font-bold mt-1">
            {projects.length}
          </h2>

        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <p className="text-xs text-slate-500">
            Pending
          </p>

          <h2 className="text-2xl font-bold mt-1 text-orange-500">
            {
              projects.filter(
                (p) =>
                  p.status === "Pending"
              ).length
            }
          </h2>

        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <p className="text-xs text-slate-500">
            In Progress
          </p>

          <h2 className="text-2xl font-bold mt-1 text-blue-500">
            {
              projects.filter(
                (p) =>
                  p.status ===
                  "In Progress"
              ).length
            }
          </h2>

        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <p className="text-xs text-slate-500">
            Review
          </p>

          <h2 className="text-2xl font-bold mt-1 text-yellow-500">
            {
              projects.filter(
                (p) =>
                  p.status === "Review"
              ).length
            }
          </h2>

        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <p className="text-xs text-slate-500">
            Completed
          </p>

          <h2 className="text-2xl font-bold mt-1 text-green-500">
            {
              projects.filter(
                (p) =>
                  p.status ===
                  "Completed"
              ).length
            }
          </h2>

        </div>

      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {Array.isArray(projects) &&
          projects.map((project) => (

            <div
              key={project._id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition"
            >

              {/* Project header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-4">

                <div className="min-w-0">

                  <h2 className="text-lg md:text-xl font-semibold text-slate-800 break-words">
                    {project.projectName}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1 break-all">
                    {project.clientName}
                  </p>

                </div>

                <select
                  value={project.status}
                  onChange={(e) =>
                    updateStatus(
                      project._id,
                      e.target.value
                    )
                  }
                  className="border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none bg-white"
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Review</option>
                  <option>Completed</option>
                </select>

              </div>
                            {/* Project description */}
              <p className="text-sm text-slate-600 leading-6 mb-4 break-words">
                {project.description}
              </p>

              {/* Progress section */}
              <div className="mb-4">

                <div className="flex items-center justify-between mb-2">

                  <p className="text-xs font-medium text-slate-600">
                    Progress
                  </p>

                  <p
                    className={`text-xs font-semibold ${
                      project.status === "Completed"
                        ? "text-green-500"
                        : project.status === "Review"
                        ? "text-yellow-500"
                        : project.status === "In Progress"
                        ? "text-blue-500"
                        : "text-orange-500"
                    }`}
                  >
                    {project.progress}%
                  </p>

                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

                  <div
                    style={{
                      width: `${project.progress}%`,
                    }}
                    className={`h-2 rounded-full transition-all duration-500 ${getBarColor(
                      project.status
                    )}`}
                  ></div>

                </div>

              </div>

              {/* Project information */}
              <div className="grid grid-cols-2 gap-3 text-sm">

                <div>

                  <p className="text-slate-500 text-xs">
                    Deadline
                  </p>

                  <h3 className="font-medium text-red-500 break-words">
                    {project.deadline}
                  </h3>

                </div>

                <div>

                  <p className="text-slate-500 text-xs">
                    Priority
                  </p>

                  <h3 className="font-medium text-slate-800">
                    {project.priority}
                  </h3>

                </div>

                <div>

                  <p className="text-slate-500 text-xs">
                    Budget
                  </p>

                  <h3 className="font-medium text-green-600">
                    ₹{project.budget || 0}
                  </h3>

                </div>

                <div>

                  <p className="text-slate-500 text-xs">
                    Paid Amount
                  </p>

                  <h3 className="font-medium text-blue-600">
                    ₹{project.paidAmount || 0}
                  </h3>

                </div>

                <div>

                  <p className="text-slate-500 text-xs">
                    Remaining
                  </p>

                  <h3 className="font-medium text-red-500">
                    ₹{project.remainingAmount || 0}
                  </h3>

                </div>

                <div>

                  <p className="text-slate-500 text-xs">
                    Team
                  </p>

                  <h3 className="font-medium text-slate-800 break-words">
                    {project.team}
                  </h3>

                </div>

                <div>

                  <p className="text-slate-500 text-xs">
                    Created
                  </p>

                  <h3 className="font-medium text-slate-800">
                    {new Date(
                      project.createdAt
                    ).toLocaleDateString()}
                  </h3>

                </div>

              </div>

              {/* Admin notes */}
              {project.notes && (

                <div className="mt-4 bg-orange-50 border border-orange-100 rounded-xl p-3">

                  <p className="text-xs text-slate-500 mb-1">
                    Notes
                  </p>

                  <p className="text-sm text-slate-700 leading-6 break-words">
                    {project.notes}
                  </p>

                </div>

              )}

              {/* Delete project */}
              <button
                onClick={() =>
                  deleteProject(
                    project._id
                  )
                }
                className="mt-4 w-full bg-red-100 hover:bg-red-200 transition text-red-600 rounded-xl py-3 text-sm font-medium"
              >
                Delete Project
              </button>

            </div>

          ))}

      </div>

      {/* Create project modal */}
      {showModal && (

        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">

          <div className="min-h-screen flex items-center justify-center p-3">

            <form
              onSubmit={createProject}
              className="bg-white w-full max-w-2xl rounded-2xl p-5 space-y-4"
            >

              {/* Modal header */}
              <div className="flex items-center justify-between">

                <h2 className="text-xl md:text-2xl font-semibold text-slate-800">
                  Create Project
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="text-2xl font-bold text-slate-500"
                >
                  ×
                </button>

              </div>
                            {/* Client selection */}
              <div>

                <label className="block text-sm font-medium mb-2">
                  Client Name
                </label>

                <select
                  required
                  value={formData.clientId}
                  onChange={(e) => {

                    const selectedClient =
                      clients.find(
                        (client) =>
                          client._id ===
                          e.target.value
                      );

                    setFormData({
                      ...formData,
                      clientId:
                        e.target.value,
                      clientName:
                        selectedClient?.name || "",
                      clientEmail:
                        selectedClient?.email || "",
                      projectName:
                        selectedClient?.subject || "",
                      description:
                        selectedClient?.message || "",
                    });

                  }}
                  className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-orange-500 bg-white"
                >

                  <option value="">
                    Select Client
                  </option>

                  {Array.isArray(clients) &&
                    clients.map((client) => (

                      <option
                        key={client._id}
                        value={client._id}
                      >
                        {client.name}
                      </option>

                    ))}

                </select>

              </div>

              {/* Auto project title */}
              <div>

                <label className="block text-sm font-medium mb-2">
                  Project Title
                </label>

                <input
                  type="text"
                  value={formData.projectName}
                  readOnly
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 outline-none"
                />

              </div>

              {/* Auto project description */}
              <div>

                <label className="block text-sm font-medium mb-2">
                  Project Description
                </label>

                <textarea
                  value={formData.description}
                  readOnly
                  rows="4"
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 outline-none resize-none"
                />

              </div>

              {/* Deadline */}
              <div>

                <label className="block text-sm font-medium mb-2">
                  Deadline
                </label>

                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deadline:
                        e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-orange-500"
                />

              </div>

              {/* Priority */}
              <div>

                <label className="block text-sm font-medium mb-2">
                  Priority Level
                </label>

                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority:
                        e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-orange-500 bg-white"
                >

                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Urgent</option>

                </select>

              </div>

              {/* Status */}
              <div>

                <label className="block text-sm font-medium mb-2">
                  Project Status
                </label>

                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status:
                        e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-orange-500 bg-white"
                >

                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Review</option>
                  <option>Completed</option>

                </select>

              </div>

              {/* Budget */}
              <div>

                <label className="block text-sm font-medium mb-2">
                  Project Budget (₹)
                </label>

                <input
                  type="number"
                  required
                  placeholder="Enter Project Budget"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      budget:
                        e.target.value,
                      remainingAmount:
                        e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-orange-500"
                />

              </div>

              {/* Team */}
              <div>

                <label className="block text-sm font-medium mb-2">
                  Assigned Team
                </label>

                <input
                  type="text"
                  placeholder="Frontend / Backend / Design"
                  value={formData.team}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      team:
                        e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-orange-500"
                />

              </div>

              {/* Notes */}
              <div>

                <label className="block text-sm font-medium mb-2">
                  Admin Notes
                </label>

                <textarea
                  placeholder="Write admin notes"
                  rows="4"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notes:
                        e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-orange-500 resize-none"
                />

              </div>

              {/* Actions */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-xl text-sm font-medium"
                >
                  Create Project
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="bg-slate-200 hover:bg-slate-300 transition py-3 rounded-xl text-sm font-medium"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

};

export default ProjectManagement;