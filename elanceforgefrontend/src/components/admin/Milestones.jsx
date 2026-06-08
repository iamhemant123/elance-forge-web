import { useEffect, useState } from "react";

const Milestones = () => {

  // Milestone records
  const [milestones, setMilestones] = useState([]);

  // Project list for dropdown
  const [projects, setProjects] = useState([]);

  // Create milestone modal
  const [showModal, setShowModal] = useState(false);

  // Real page loading
  const [loading, setLoading] = useState(true);

  // Corner notifications
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Form values
  const [formData, setFormData] = useState({
    projectId: "",
    title: "",
    assignedTo: "",
    deadline: "",
    priority: "Medium",
    status: "Pending",
    progress: 0,
    notes: "",
  });

  // Load available projects
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

  // Load milestone list
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

  // Status based progress
  const getProgress = (status) => {

    if (status === "Pending") return 0;

    if (status === "Working") return 40;

    if (status === "Review") return 80;

    if (status === "Completed") return 100;

    return 0;

  };

  // Progress bar color
  const getBarColor = (status) => {

    if (status === "Pending") return "bg-orange-500";

    if (status === "Working") return "bg-blue-500";

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

  // Create new milestone
  const createMilestone = async (e) => {

    e.preventDefault();

    try {

      const progress = getProgress(
        formData.status
      );

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/milestones`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            progress,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {

        setMilestones((prev) => [
          data.milestone,
          ...prev,
        ]);

        showSuccess(
          "Milestone Created Successfully"
        );

        setShowModal(false);

        setFormData({
          projectId: "",
          title: "",
          assignedTo: "",
          deadline: "",
          priority: "Medium",
          status: "Pending",
          progress: 0,
          notes: "",
        });

      }

    } catch (error) {

      console.log(error);

      showError("Something Went Wrong");

    }
  };
  // Delete milestone
  const deleteMilestone = async (id) => {

    try {

      await fetch(
        `${import.meta.env.VITE_API_URL}/api/milestones/${id}`,
        {
          method: "DELETE",
        }
      );

      setMilestones((prev) =>
        prev.filter(
          (milestone) =>
            milestone._id !== id
        )
      );

      showSuccess(
        "Milestone Deleted Successfully"
      );

    } catch (error) {

      console.log(error);

      showError("Delete Failed");

    }
  };

  // Update milestone status
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      const progress =
        getProgress(status);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/milestones/status/${id}`,
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

        setMilestones((prev) =>
          prev.map((milestone) =>
            milestone._id === id
              ? {
                ...milestone,
                status,
                progress,
              }
              : milestone
          )
        );

        showSuccess(
          "Milestone Updated Successfully"
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
          fetchMilestones(),
        ]);

      } finally {

        setLoading(false);

      }

    };

    loadData();

  }, []);

  // Real loading state
  if (loading) {

    return (

      <div className="min-h-[70vh] flex items-center justify-center">

        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm flex items-center gap-3">

          <div className="h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

          <span className="text-sm font-medium text-slate-600">
            Loading Milestones...
          </span>

        </div>

      </div>

    );

  }

  return (

    <div className="w-full min-h-screen bg-slate-50 px-3 md:px-4 py-4">

      {/* Success notification */}
      {success && (

        <div className="fixed top-5 right-5 z-[9999] bg-green-500 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium max-w-xs">
          {success}
        </div>

      )}

      {/* Error notification */}
      {error && (

        <div className="fixed top-5 right-5 z-[9999] bg-red-500 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium max-w-xs">
          {error}
        </div>

      )}

      {/* Page heading */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

        <div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Milestones
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Track project delivery and team progress
          </p>

        </div>

        {/* Create milestone button */}
        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-orange-500 hover:bg-orange-600 transition text-white px-5 py-3 rounded-xl font-medium text-sm"
        >
          + Add Milestone
        </button>

      </div>

      {/* Quick statistics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-5">

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <p className="text-xs text-slate-500">
            Total
          </p>

          <h2 className="text-2xl font-bold mt-1">
            {milestones.length}
          </h2>

        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <p className="text-xs text-slate-500">
            Pending
          </p>

          <h2 className="text-2xl font-bold mt-1 text-orange-500">
            {
              milestones.filter(
                (m) =>
                  m.status === "Pending"
              ).length
            }
          </h2>

        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">

          <p className="text-xs text-slate-500">
            Working
          </p>

          <h2 className="text-2xl font-bold mt-1 text-blue-500">
            {
              milestones.filter(
                (m) =>
                  m.status === "Working"
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
              milestones.filter(
                (m) =>
                  m.status === "Completed"
              ).length
            }
          </h2>

        </div>

      </div>

      {/* Milestone cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {Array.isArray(milestones) &&
          milestones.map((milestone) => (

            <div
              key={milestone._id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition"
            >

              {/* Card header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-4">

                <div className="min-w-0">

                  <p className="text-xs text-slate-500">
                    {
                      milestone.projectId
                        ?.projectName ||
                      "No Project"
                    }
                  </p>

                  <h2 className="text-lg md:text-xl font-semibold text-slate-800 mt-1 break-words">
                    {milestone.title}
                  </h2>

                </div>

                {/* Status selector */}
                <select
                  value={milestone.status}
                  onChange={(e) =>
                    updateStatus(
                      milestone._id,
                      e.target.value
                    )
                  }
                  className="border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none bg-white"
                >

                  <option>Pending</option>
                  <option>Working</option>
                  <option>Review</option>
                  <option>Completed</option>

                </select>

              </div>

              {/* Progress section */}
              <div className="mb-4">

                <div className="flex items-center justify-between mb-2">

                  <p className="text-xs font-medium text-slate-600">
                    Progress
                  </p>

                  <p
                    className={`text-xs font-semibold ${milestone.status === "Completed"
                        ? "text-green-500"
                        : milestone.status === "Review"
                          ? "text-yellow-500"
                          : milestone.status === "Working"
                            ? "text-blue-500"
                            : "text-orange-500"
                      }`}
                  >
                    {milestone.progress}%
                  </p>

                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

                  <div
                    style={{
                      width: `${milestone.progress}%`,
                    }}
                    className={`h-2 rounded-full transition-all duration-500 ${getBarColor(
                      milestone.status
                    )}`}
                  ></div>

                </div>

              </div>

              {/* Milestone details */}
              <div className="grid grid-cols-2 gap-3 text-sm">

                <div>

                  <p className="text-slate-500 text-xs">
                    Assigned To
                  </p>

                  <h3 className="font-medium text-slate-800 break-words">
                    {milestone.assignedTo}
                  </h3>

                </div>

                <div>

                  <p className="text-slate-500 text-xs">
                    Deadline
                  </p>

                  <h3 className="font-medium text-red-500 break-words">
                    {milestone.deadline}
                  </h3>

                </div>

                <div>

                  <p className="text-slate-500 text-xs">
                    Priority
                  </p>

                  <h3 className="font-medium text-slate-800">
                    {milestone.priority}
                  </h3>

                </div>

                <div>

                  <p className="text-slate-500 text-xs">
                    Created
                  </p>

                  <h3 className="font-medium text-slate-800">
                    {new Date(
                      milestone.createdAt
                    ).toLocaleDateString()}
                  </h3>

                </div>

              </div>
              {/* Notes section */}
              {milestone.notes && (

                <div className="mt-4 bg-orange-50 border border-orange-100 rounded-xl p-3">

                  <p className="text-xs text-slate-500 mb-1">
                    Notes
                  </p>

                  <p className="text-sm text-slate-700 leading-6 break-words">
                    {milestone.notes}
                  </p>

                </div>

              )}

              {/* Delete action */}
              <button
                onClick={() =>
                  deleteMilestone(
                    milestone._id
                  )
                }
                className="mt-4 w-full bg-red-100 hover:bg-red-200 text-red-600 rounded-xl py-3 text-sm font-medium transition"
              >
                Delete Milestone
              </button>

            </div>

          ))}

      </div>

      {/* Create milestone modal */}
      {showModal && (

        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">

          <div className="min-h-screen flex items-center justify-center p-3">

            <form
              onSubmit={createMilestone}
              className="bg-white w-full max-w-2xl rounded-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto"
            >

              {/* Modal header */}
              <div className="flex items-center justify-between">

                <h2 className="text-xl md:text-2xl font-semibold text-slate-800">
                  Create Milestone
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

              {/* Project */}
              <div>

                <label className="block text-sm font-medium mb-2">
                  Select Project
                </label>

                <select
                  required
                  value={formData.projectId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      projectId: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-orange-500"
                >

                  <option value="">
                    Choose Project
                  </option>

                  {Array.isArray(projects) &&
                    projects.map((project) => (

                      <option
                        key={project._id}
                        value={project._id}
                      >
                        {project.projectName}
                      </option>

                    ))}

                </select>

              </div>

              {/* Title */}
              <div>

                <label className="block text-sm font-medium mb-2">
                  Milestone Title
                </label>

                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-orange-500"
                  placeholder="Enter milestone title"
                />

              </div>

              {/* Assigned Team */}
              <div>

                <label className="block text-sm font-medium mb-2">
                  Assigned Team
                </label>

                <input
                  type="text"
                  value={formData.assignedTo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      assignedTo: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-orange-500"
                  placeholder="Frontend / Backend / Design"
                />

              </div>

              {/* Deadline + Priority */}
              <div className="grid md:grid-cols-2 gap-4">

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
                        deadline: e.target.value,
                      })
                    }
                    className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-orange-500"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Priority
                  </label>

                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: e.target.value,
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

              </div>

              {/* Notes */}
              <div>

                <label className="block text-sm font-medium mb-2">
                  Notes
                </label>

                <textarea
                  rows="4"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notes: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-orange-500 resize-none"
                  placeholder="Milestone notes..."
                />

              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">

                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium transition"
                >
                  Create Milestone
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 py-3 rounded-xl font-medium transition"
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

export default Milestones;