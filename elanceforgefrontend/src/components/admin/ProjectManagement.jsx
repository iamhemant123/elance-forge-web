import { useEffect, useState } from "react";

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    clientId: "",
    projectName: "",
    clientName: "",
    description: "",
    deadline: "",
    priority: "Medium",
    status: "Pending",
    progress: 0,
    notes: "",
    team: "",
  });

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

  const getProgress = (status) => {
    if (status === "Pending") return 0;

    if (status === "In Progress")
      return 30;

    if (status === "Review") return 75;

    if (status === "Completed")
      return 100;

    return 0;
  };

  const getBarColor = (status) => {
    if (status === "Pending")
      return "bg-orange-500";

    if (status === "In Progress")
      return "bg-blue-500";

    if (status === "Review")
      return "bg-yellow-500";

    if (status === "Completed")
      return "bg-green-500";

    return "bg-orange-500";
  };

  const showSuccess = (msg) => {
    setSuccess(msg);

    setTimeout(() => {
      setSuccess("");
    }, 5000);
  };

  const showError = (msg) => {
    setError(msg);

    setTimeout(() => {
      setError("");
    }, 5000);
  };

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
          projectName: "",
          clientName: "",
          description: "",
          deadline: "",
          priority: "Medium",
          status: "Pending",
          progress: 0,
          notes: "",
          team: "",
        });
      }
    } catch (error) {
      console.log(error);

      showError("Something Went Wrong");
    }
  };

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

  useEffect(() => {
    fetchProjects();
    fetchClients();

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
        clientId: storedClient._id,
        clientName:
          storedClient.name || "",
        projectName:
          storedClient.subject || "",
        description:
          storedClient.message || "",
      }));

      localStorage.removeItem(
        "selectedClient"
      );
    }
  }, []);

  return (
    <div className="w-full overflow-hidden px-3 sm:px-5 md:px-7 py-5">
      {success && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto sm:right-5 z-50 bg-green-500 text-white px-5 py-4 rounded-2xl shadow-2xl font-semibold text-sm sm:text-base text-center">
          {success}
        </div>
      )}

      {error && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto sm:right-5 z-50 bg-red-500 text-white px-5 py-4 rounded-2xl shadow-2xl font-semibold text-sm sm:text-base text-center">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-7">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black break-words leading-tight">
          Project Management
        </h1>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-orange-500 hover:bg-orange-600 transition text-white px-5 sm:px-6 py-3 sm:py-4 rounded-2xl font-semibold w-full lg:w-auto text-sm sm:text-base"
        >
          + Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-7">
        <div className="bg-white rounded-2xl md:rounded-3xl p-5 shadow">
          <p className="text-gray-500 text-sm md:text-base">
            Total
          </p>

          <h1 className="text-3xl md:text-5xl font-black mt-2">
            {projects.length}
          </h1>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl p-5 shadow">
          <p className="text-gray-500 text-sm md:text-base">
            Pending
          </p>

          <h1 className="text-3xl md:text-5xl font-black mt-2 text-orange-500">
            {
              projects.filter(
                (p) =>
                  p.status === "Pending"
              ).length
            }
          </h1>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl p-5 shadow">
          <p className="text-gray-500 text-sm md:text-base">
            In Progress
          </p>

          <h1 className="text-3xl md:text-5xl font-black mt-2 text-blue-500">
            {
              projects.filter(
                (p) =>
                  p.status ===
                  "In Progress"
              ).length
            }
          </h1>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl p-5 shadow">
          <p className="text-gray-500 text-sm md:text-base">
            Review
          </p>

          <h1 className="text-3xl md:text-5xl font-black mt-2 text-yellow-500">
            {
              projects.filter(
                (p) =>
                  p.status === "Review"
              ).length
            }
          </h1>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl p-5 shadow">
          <p className="text-gray-500 text-sm md:text-base">
            Completed
          </p>

          <h1 className="text-3xl md:text-5xl font-black mt-2 text-green-500">
            {
              projects.filter(
                (p) =>
                  p.status ===
                  "Completed"
              ).length
            }
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 md:gap-6">
        {Array.isArray(projects) &&
          projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-7 shadow-lg border hover:shadow-2xl transition overflow-hidden"
            >
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-5">
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl md:text-4xl font-black break-words leading-tight">
                    {
                      project.projectName
                    }
                  </h1>

                  <p className="text-gray-500 mt-2 break-all text-sm sm:text-base">
                    {
                      project.clientName
                    }
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
                  className="border rounded-xl md:rounded-2xl px-4 py-3 outline-none w-full xl:w-auto text-sm md:text-base"
                >
                  <option>Pending</option>
                  <option>
                    In Progress
                  </option>
                  <option>Review</option>
                  <option>
                    Completed
                  </option>
                </select>
              </div>

              <p className="text-gray-600 leading-7 mb-5 break-words text-sm sm:text-base">
                {project.description}
              </p>

              <div className="mb-5">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="font-medium text-sm sm:text-base">
                    Progress
                  </p>

                  <p
                    className={`font-bold text-sm sm:text-base ${project.status ===
                        "Completed"
                        ? "text-green-500"
                        : project.status ===
                          "Review"
                          ? "text-yellow-500"
                          : project.status ===
                            "In Progress"
                            ? "text-blue-500"
                            : "text-orange-500"
                      }`}
                  >
                    {project.progress}%
                  </p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    style={{
                      width: `${project.progress}%`,
                    }}
                    className={`h-3 rounded-full transition-all duration-700 ${getBarColor(
                      project.status
                    )}`}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
                <div>
                  <p className="text-gray-500">
                    Deadline
                  </p>

                  <h2 className="font-semibold text-red-500 break-words">
                    {project.deadline}
                  </h2>
                </div>

                <div>
                  <p className="text-gray-500">
                    Priority
                  </p>

                  <h2 className="font-semibold break-words">
                    {project.priority}
                  </h2>
                </div>

                <div>
                  <p className="text-gray-500">
                    Team
                  </p>

                  <h2 className="font-semibold break-words">
                    {project.team}
                  </h2>
                </div>

                <div>
                  <p className="text-gray-500">
                    Created
                  </p>

                  <h2 className="font-semibold break-words">
                    {new Date(
                      project.createdAt
                    ).toLocaleDateString()}
                  </h2>
                </div>
              </div>

              {project.notes && (
                <div className="mt-5 bg-orange-50 border border-orange-100 rounded-2xl p-4">
                  <p className="text-sm text-gray-700 break-words leading-7">
                    {project.notes}
                  </p>
                </div>
              )}

              <button
                onClick={() =>
                  deleteProject(
                    project._id
                  )
                }
                className="mt-6 bg-red-100 hover:bg-red-200 transition text-red-600 px-5 py-3 rounded-xl md:rounded-2xl font-medium w-full text-sm md:text-base"
              >
                Delete Project
              </button>
            </div>
          ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-start md:items-center justify-center px-2 sm:px-4 py-10 md:py-6">
            <form
              onSubmit={createProject}
              className="bg-white w-full max-w-2xl rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-7 space-y-5"
            >
              <div className="flex items-center justify-between sticky top-0 bg-white pb-3 z-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
                  Create Project
                </h1>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="text-3xl font-bold text-gray-500"
                >
                  ×
                </button>
              </div>

              <div>
                <label className="font-semibold mb-2 block text-sm md:text-base">
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
                        selectedClient?.name ||
                        "",
                      projectName:
                        selectedClient?.subject ||
                        "",
                      description:
                        selectedClient?.message ||
                        "",
                    });
                  }}
                  className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 outline-none text-sm md:text-base bg-white"
                >
                  <option value="">
                    Select Client
                  </option>

                  {Array.isArray(clients) &&
                    clients.map(
                      (client) => (
                        <option
                          key={client._id}
                          value={
                            client._id
                          }
                        >
                          {client.name}
                        </option>
                      )
                    )}
                </select>
              </div>

              <div>
                <label className="font-semibold mb-2 block text-sm md:text-base">
                  Project Title
                </label>

                <input
                  type="text"
                  value={
                    formData.projectName
                  }
                  readOnly
                  className="w-full bg-gray-100 border-2 border-gray-200 rounded-xl md:rounded-2xl p-3 md:p-4 outline-none text-sm md:text-base"
                />
              </div>

              <div>
                <label className="font-semibold mb-2 block text-sm md:text-base">
                  Project Description
                </label>

                <textarea
                  value={
                    formData.description
                  }
                  readOnly
                  className="w-full bg-gray-100 border-2 border-gray-200 rounded-xl md:rounded-2xl p-3 md:p-4 outline-none h-36 resize-none text-sm md:text-base"
                />
              </div>

              <div>
                <label className="font-semibold mb-2 block text-sm md:text-base">
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
                  className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 outline-none text-sm md:text-base"
                />
              </div>

              <div>
                <label className="font-semibold mb-2 block text-sm md:text-base">
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
                  className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 outline-none text-sm md:text-base bg-white"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>

              <div>
                <label className="font-semibold mb-2 block text-sm md:text-base">
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
                  className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 outline-none text-sm md:text-base bg-white"
                >
                  <option>Pending</option>
                  <option>
                    In Progress
                  </option>
                  <option>Review</option>
                  <option>
                    Completed
                  </option>
                </select>
              </div>

              <div>
                <label className="font-semibold mb-2 block text-sm md:text-base">
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
                  className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 outline-none text-sm md:text-base"
                />
              </div>

              <div>
                <label className="font-semibold mb-2 block text-sm md:text-base">
                  Admin Notes
                </label>

                <textarea
                  placeholder="Write admin notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notes:
                        e.target.value,
                    })
                  }
                  className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 outline-none h-28 resize-none text-sm md:text-base"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base"
                >
                  Create Project
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="w-full bg-gray-200 hover:bg-gray-300 transition py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base"
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