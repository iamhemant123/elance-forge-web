import { useEffect, useState } from "react";
import { Trash2, Search, Mail, CalendarDays, MessageSquare, Copy } from "lucide-react";

const ClientManagement = () => {

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");
  const [expanded, setExpanded] = useState({});
  const [filter, setFilter] = useState("All");

  const fetchClients = async () => {

    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/contacts`);
      const data = await res.json();

      if (data.success) {
        setClients(data.contacts);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id) => {

    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/contacts/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {

        fetchClients();

        setSuccess("Client Deleted Successfully");

        setTimeout(() => {
          setSuccess("");
        }, 3000);

      }

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {

    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/contacts/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.success) {

        setClients((prev) =>
          prev.map((client) =>
            client._id === id
              ? { ...client, status }
              : client
          )
        );

        setSuccess("Status Updated Successfully");

        setTimeout(() => {
          setSuccess("");
        }, 3000);

      }

    } catch (error) {
      console.log(error);
    }
  };

  const copyEmail = (email) => {

    navigator.clipboard.writeText(email);

    setSuccess("Email Copied Successfully");

    setTimeout(() => {
      setSuccess("");
    }, 2000);

  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter((client) => {

    const matchSearch = client.name?.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "All"
      ? true
      : client.status === filter;

    return matchSearch && matchFilter;

  });

  return (

    <div className="w-full overflow-hidden">

      {success && (
        <div className="mb-5 bg-green-100 border border-green-300 text-green-700 px-5 py-4 rounded-2xl font-medium">
          {success}
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-7">

        <div>

          <h1 className="text-2xl md:text-4xl font-black text-gray-800">
            Client Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage client inquiries & live status
          </p>

        </div>

        <div className="relative w-full lg:w-auto">

          <input
            type="text"
            placeholder="Search client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-[320px] bg-white border border-gray-300 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-orange-500 shadow-sm"
          />

          <Search
            size={18}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
          />

        </div>

      </div>

      <div className="flex flex-wrap gap-3 mb-7">

        {["All", "New", "Contacted", "Working", "Completed"].map((item) => (

          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-5 py-2 rounded-2xl font-medium transition ${filter === item ? "bg-orange-500 text-white" : "bg-white border hover:bg-orange-50"}`}
          >

            {item}

          </button>

        ))}

      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-7">

        <div className="bg-white rounded-3xl p-6 shadow">
          <p className="text-gray-500">Total</p>
          <h1 className="text-4xl font-black mt-2">
            {clients.length}
          </h1>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <p className="text-gray-500">New</p>
          <h1 className="text-4xl font-black mt-2 text-orange-500">
            {clients.filter((c) => c.status === "New").length}
          </h1>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <p className="text-gray-500">Contacted</p>
          <h1 className="text-4xl font-black mt-2 text-yellow-500">
            {clients.filter((c) => c.status === "Contacted").length}
          </h1>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <p className="text-gray-500">Working</p>
          <h1 className="text-4xl font-black mt-2 text-blue-500">
            {clients.filter((c) => c.status === "Working").length}
          </h1>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <p className="text-gray-500">Completed</p>
          <h1 className="text-4xl font-black mt-2 text-green-500">
            {clients.filter((c) => c.status === "Completed").length}
          </h1>
        </div>

      </div>

      <div className="space-y-7">

        {loading ? (

          <div className="bg-white rounded-3xl p-10 text-center shadow">
            Loading Clients...
          </div>

        ) : filteredClients.length > 0 ? (

          filteredClients.map((client) => (

            <div
              key={client._id}
              className="bg-white rounded-3xl shadow-lg p-4 md:p-7 border border-gray-100 overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
            >

              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-6">

                <div className="flex gap-4 md:gap-5 min-w-0">

                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-3xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-2xl shrink-0">
                    {client.name?.charAt(0)}
                  </div>

                  <div className="min-w-0">

                    <h2 className="text-2xl md:text-3xl font-black text-gray-800 break-all">
                      {client.name}
                    </h2>

                    <div className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-5 mt-3 text-gray-500 text-sm">

                      <div className="flex items-center gap-3 break-all">

                        <Mail size={16} />

                        {client.email}

                        <button
                          onClick={() => copyEmail(client.email)}
                          className="text-orange-500 hover:scale-110 transition"
                        >

                          <Copy size={16} />

                        </button>

                      </div>

                      <div className="flex items-center gap-2">

                        <CalendarDays size={16} />

                        {new Date(client.createdAt).toLocaleString()}

                      </div>

                    </div>

                    <div className="mt-4">

                      <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold break-all">
                        {client.subject}
                      </span>

                    </div>

                  </div>

                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full xl:w-auto">

                  <div className="flex items-center gap-3">

                    <div className="bg-green-100 text-green-600 px-5 py-3 rounded-2xl font-semibold text-sm animate-pulse">
                      ● {client.status || "New"}
                    </div>

                    <select
                      value={client.status || "New"}
                      onChange={(e) => updateStatus(client._id, e.target.value)}
                      className="px-5 py-3 rounded-2xl border bg-white outline-none font-medium"
                    >

                      <option>New</option>
                      <option>Contacted</option>
                      <option>Working</option>
                      <option>Completed</option>

                    </select>

                  </div>

                  <button
                    onClick={() => deleteClient(client._id)}
                    className="bg-red-100 text-red-600 hover:bg-red-200 p-4 rounded-2xl transition"
                  >

                    <Trash2 size={20} />

                  </button>

                </div>

              </div>

              <div className="bg-gray-50 rounded-3xl p-4 md:p-7 border overflow-hidden">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">

                    <MessageSquare size={24} />

                  </div>

                  <div>

                    <h2 className="text-lg md:text-xl font-bold text-gray-800">
                      Client Message
                    </h2>

                    <p className="text-sm text-gray-500">
                      Full inquiry details
                    </p>

                  </div>

                </div>

                <div className="bg-white border rounded-3xl p-5 md:p-7 shadow-sm overflow-hidden">

                  <p className="text-gray-700 leading-8 whitespace-pre-wrap break-all text-[15px] md:text-[16px]">

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

                      className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
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

          <div className="bg-white rounded-3xl p-10 text-center shadow text-gray-500">
            No Clients Found
          </div>

        )}

      </div>

    </div>

  );
};

export default ClientManagement;