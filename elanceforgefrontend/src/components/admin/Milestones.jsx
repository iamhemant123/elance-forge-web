import { useEffect, useState } from "react";

const Milestones = () => {
  const [milestones, setMilestones] = useState([]);
  const [projects, setProjects] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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

  const getProgress = (status) => {
    if (status === "Pending") return 0;
    if (status === "Working") return 40;
    if (status === "Review") return 80;
    if (status === "Completed") return 100;

    return 0;
  };

  const getBarColor = (status) => {
    if (status === "Pending")
      return "bg-orange-500";

    if (status === "Working")
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

  useEffect(() => {
    fetchProjects();
    fetchMilestones();
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
          Milestones
        </h1>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-orange-500 hover:bg-orange-600 transition text-white px-5 sm:px-6 py-3 sm:py-4 rounded-2xl font-semibold w-full lg:w-auto text-sm sm:text-base"
        >
          + Add Milestone
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
        <div className="bg-white rounded-2xl md:rounded-3xl p-5 shadow">
          <p className="text-gray-500 text-sm md:text-base">
            Total
          </p>

          <h1 className="text-3xl md:text-5xl font-black mt-2">
            {milestones.length}
          </h1>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl p-5 shadow">
          <p className="text-gray-500 text-sm md:text-base">
            Pending
          </p>

          <h1 className="text-3xl md:text-5xl font-black mt-2 text-orange-500">
            {
              milestones.filter(
                (m) =>
                  m.status === "Pending"
              ).length
            }
          </h1>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl p-5 shadow">
          <p className="text-gray-500 text-sm md:text-base">
            Working
          </p>

          <h1 className="text-3xl md:text-5xl font-black mt-2 text-blue-500">
            {
              milestones.filter(
                (m) =>
                  m.status === "Working"
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
              milestones.filter(
                (m) =>
                  m.status === "Completed"
              ).length
            }
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 md:gap-6">
        {Array.isArray(milestones) &&
          milestones.map((milestone) => (
            <div
              key={milestone._id}
              className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-7 shadow-lg border hover:shadow-2xl transition overflow-hidden"
            >
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-5">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500 break-words">
                    {milestone.projectId
                      ?.projectName ||
                      "No Project"}
                  </p>

                  <h1 className="text-xl sm:text-2xl md:text-4xl font-black break-words leading-tight">
                    {milestone.title}
                  </h1>
                </div>

                <select
                  value={milestone.status}
                  onChange={(e) =>
                    updateStatus(
                      milestone._id,
                      e.target.value
                    )
                  }
                  className="border rounded-xl md:rounded-2xl px-4 py-3 outline-none w-full xl:w-auto text-sm md:text-base"
                >
                  <option>Pending</option>
                  <option>Working</option>
                  <option>Review</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="mb-5">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="font-medium text-sm sm:text-base">
                    Progress
                  </p>

                  <p
                    className={`font-bold text-sm sm:text-base ${milestone.status ===
                        "Completed"
                        ? "text-green-500"
                        : milestone.status ===
                          "Review"
                          ? "text-yellow-500"
                          : milestone.status ===
                            "Working"
                            ? "text-blue-500"
                            : "text-orange-500"
                      }`}
                  >
                    {milestone.progress}%
                  </p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    style={{
                      width: `${milestone.progress}%`,
                    }}
                    className={`h-3 rounded-full transition-all duration-700 ${getBarColor(
                      milestone.status
                    )}`}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
                <div>
                  <p className="text-gray-500">
                    Assigned To
                  </p>

                  <h2 className="font-semibold break-words">
                    {milestone.assignedTo}
                  </h2>
                </div>

                <div>
                  <p className="text-gray-500">
                    Deadline
                  </p>

                  <h2 className="font-semibold text-red-500 break-words">
                    {milestone.deadline}
                  </h2>
                </div>

                <div>
                  <p className="text-gray-500">
                    Priority
                  </p>

                  <h2 className="font-semibold break-words">
                    {milestone.priority}
                  </h2>
                </div>

                <div>
                  <p className="text-gray-500">
                    Created
                  </p>

                  <h2 className="font-semibold break-words">
                    {new Date(
                      milestone.createdAt
                    ).toLocaleDateString()}
                  </h2>
                </div>
              </div>

              {milestone.notes && (
                <div className="mt-5 bg-orange-50 border border-orange-100 rounded-2xl p-4">
                  <p className="text-sm text-gray-700 break-words leading-7">
                    {milestone.notes}
                  </p>
                </div>
              )}

              <button
                onClick={() =>
                  deleteMilestone(
                    milestone._id
                  )
                }
                className="mt-6 bg-red-100 hover:bg-red-200 transition text-red-600 px-5 py-3 rounded-xl md:rounded-2xl font-medium w-full text-sm md:text-base"
              >
                Delete Milestone
              </button>
            </div>
          ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-start md:items-center justify-center px-2 sm:px-4 py-10 md:py-6">
            <form
              onSubmit={createMilestone}
              className="bg-white w-full max-w-2xl rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-7 space-y-5"
            >
              <div className="flex items-center justify-between sticky top-0 bg-white pb-3 z-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
                  Create Milestone
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
                  Select Project
                </label>

                <select
                  required
                  value={formData.projectId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      projectId:
                        e.target.value,
                    })
                  }
                  className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 outline-none text-sm md:text-base bg-white"
                >
                  <option value="">
                    Choose Project
                  </option>

                  {Array.isArray(projects) &&
                    projects.map(
                      (project) => (
                        <option
                          key={project._id}
                          value={
                            project._id
                          }
                        >
                          {
                            project.projectName
                          }
                        </option>
                      )
                    )}
                </select>
              </div>

              <div>
                <label className="font-semibold mb-2 block text-sm md:text-base">
                  Milestone Title
                </label>

                <input
                  type="text"
                  placeholder="Enter milestone title"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title:
                        e.target.value,
                    })
                  }
                  className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 outline-none text-sm md:text-base"
                />
              </div>

              <div>
                <label className="font-semibold mb-2 block text-sm md:text-base">
                  Assigned Team
                </label>

                <input
                  type="text"
                  placeholder="Frontend / Backend / Design"
                  value={formData.assignedTo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      assignedTo:
                        e.target.value,
                    })
                  }
                  className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 outline-none text-sm md:text-base"
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
                  Milestone Status
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
                  <option>Working</option>
                  <option>Review</option>
                  <option>Completed</option>
                </select>
              </div>

              <div>
                <label className="font-semibold mb-2 block text-sm md:text-base">
                  Notes
                </label>

                <textarea
                  placeholder="Write milestone notes"
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
                  Create Milestone
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

export default Milestones;