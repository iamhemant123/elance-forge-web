import { useEffect, useState } from "react";
import {
  Trash2,
  Search,
  Mail,
  CalendarDays,
  MessageSquare,
  Copy,
} from "lucide-react";

const ClientManagement = () => {

  // Client records
  const [clients, setClients] = useState([]);

  // Initial page loading
  const [loading, setLoading] = useState(true);

  // Search input
  const [search, setSearch] = useState("");

  // Success toast
  const [success, setSuccess] = useState("");

  // Message expand state
  const [expanded, setExpanded] = useState({});

  // Status filter
  const [filter, setFilter] = useState("All");

  // Small reusable success popup
  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 3000);
  };

  // Load all clients
  const fetchClients = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/contacts`
      );

      const data = await res.json();

      if (data.success) {
        setClients(data.contacts || []);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // Delete selected client
  const deleteClient = async (id) => {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/contacts/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {

        await fetchClients();

        showSuccess("Client Deleted Successfully");

      }

    } catch (error) {

      console.log(error);

    }
  };

  // Update lead status
  const updateStatus = async (id, status) => {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/contacts/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (data.success) {

        setClients((prev) =>
          prev.map((client) =>
            client._id === id
              ? { ...client, status }
              : client
          )
        );

        showSuccess("Status Updated Successfully");

      }

    } catch (error) {

      console.log(error);

    }
  };

  // Copy email quickly
  const copyEmail = (email) => {

    navigator.clipboard.writeText(email);

    showSuccess("Email Copied Successfully");

  };

  // Load data on mount
  useEffect(() => {
    fetchClients();
  }, []);

  // Search + filter logic
  const filteredClients = clients.filter((client) => {

    const matchSearch =
      client.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchFilter =
      filter === "All"
        ? true
        : client.status === filter;

    return matchSearch && matchFilter;

  });

  if (loading) {

    return (

      <div className="min-h-[60vh] flex items-center justify-center">

        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm flex items-center gap-3">

          <div className="h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

          <span className="text-sm font-medium text-slate-600">
            Loading Clients...
          </span>

        </div>

      </div>

    );

  }

  return (

    <div className="w-full">

      {/* Floating success notification */}
      {success && (

        <div className="fixed top-5 right-5 z-[9999] bg-green-500 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium max-w-xs">
          {success}
        </div>

      )}

      {/* Page heading */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

        <div>

          <h1 className="text-xl md:text-3xl font-bold text-slate-800">
            Client Management
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage client inquiries & live status
          </p>

        </div>

        {/* Search box */}
        <div className="relative w-full lg:w-auto">

          <input
            type="text"
            placeholder="Search client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-[280px] h-11 bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-3 text-sm outline-none focus:border-orange-500"
          />

          <Search
            size={16}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
          />

        </div>

      </div>
            {/* Status filters */}
      <div className="flex flex-wrap gap-2 mb-5">

        {["All", "New", "Contacted", "Working", "Completed"].map((item) => (

          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 h-10 rounded-xl text-sm font-medium transition-all ${
              filter === item
                ? "bg-orange-500 text-white"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-orange-50"
            }`}
          >
            {item}
          </button>

        ))}

      </div>

      {/* Quick statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mb-5">

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500">
            Total
          </p>
          <h2 className="text-2xl font-bold mt-1">
            {clients.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500">
            New
          </p>
          <h2 className="text-2xl font-bold mt-1 text-orange-500">
            {clients.filter((c) => c.status === "New").length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500">
            Contacted
          </p>
          <h2 className="text-2xl font-bold mt-1 text-yellow-500">
            {clients.filter((c) => c.status === "Contacted").length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500">
            Working
          </p>
          <h2 className="text-2xl font-bold mt-1 text-blue-500">
            {clients.filter((c) => c.status === "Working").length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500">
            Completed
          </p>
          <h2 className="text-2xl font-bold mt-1 text-green-500">
            {clients.filter((c) => c.status === "Completed").length}
          </h2>
        </div>

      </div>

      {/* Client listing */}
      <div className="space-y-4">

        {filteredClients.length > 0 ? (

          filteredClients.map((client) => (

            <div
              key={client._id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 transition-all"
            >

              {/* Top section */}
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-4">

                <div className="flex gap-3 min-w-0">

                  {/* Client avatar */}
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg shrink-0">
                    {client.name?.charAt(0)}
                  </div>

                  {/* Client details */}
                  <div className="min-w-0">

                    <h2 className="text-lg md:text-xl font-bold text-slate-800 break-all">
                      {client.name}
                    </h2>

                    <div className="flex flex-col md:flex-row md:flex-wrap gap-2 mt-2 text-slate-500 text-xs">

                      <div className="flex items-center gap-2 break-all">

                        <Mail size={14} />

                        {client.email}

                        <button
                          onClick={() => copyEmail(client.email)}
                          className="text-orange-500"
                        >
                          <Copy size={14} />
                        </button>

                      </div>

                      <div className="flex items-center gap-2">

                        <CalendarDays size={14} />

                        {new Date(client.createdAt).toLocaleString()}

                      </div>

                    </div>

                    {/* Subject badge */}
                    <div className="mt-3">

                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-medium">
                        {client.subject}
                      </span>

                    </div>

                  </div>

                </div>
                                {/* Actions section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full xl:w-auto">

                  {/* Status controls */}
                  <div className="flex items-center gap-2">

                    <div className="bg-green-100 text-green-600 px-3 py-2 rounded-xl text-xs font-medium">
                      ● {client.status || "New"}
                    </div>

                    <select
                      value={client.status || "New"}
                      onChange={(e) =>
                        updateStatus(
                          client._id,
                          e.target.value
                        )
                      }
                      className="h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm outline-none"
                    >

                      <option>New</option>
                      <option>Contacted</option>
                      <option>Working</option>
                      <option>Completed</option>

                    </select>

                  </div>

                  {/* Delete client */}
                  <button
                    onClick={() =>
                      deleteClient(client._id)
                    }
                    className="bg-red-100 text-red-600 hover:bg-red-200 p-3 rounded-xl transition"
                  >

                    <Trash2 size={16} />

                  </button>

                </div>

              </div>

              {/* Client message section */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">

                <div className="flex items-center gap-3 mb-4">

                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">

                    <MessageSquare size={18} />

                  </div>

                  <div>

                    <h3 className="text-base font-semibold text-slate-800">
                      Client Message
                    </h3>

                    <p className="text-xs text-slate-500">
                      Full inquiry details
                    </p>

                  </div>

                </div>

                {/* Message content */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4">

                  <p className="text-sm text-slate-700 leading-6 whitespace-pre-wrap break-all">

                    {
                      expanded[client._id]
                        ? client.message
                        : client.message?.slice(0, 160) + "..."
                    }

                  </p>

                  {client.message?.length > 160 && (

                    <button
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [client._id]: !prev[client._id],
                        }))
                      }
                      className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 h-10 rounded-xl text-sm font-medium transition"
                    >

                      {
                        expanded[client._id]
                          ? "Show Less"
                          : "Show More"
                      }

                    </button>

                  )}

                </div>

              </div>

            </div>

          ))

        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">

            <h3 className="text-base font-semibold text-slate-700">
              No Clients Found
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              No matching client records available.
            </p>

          </div>

        )}

      </div>

    </div>

  );

};

export default ClientManagement;