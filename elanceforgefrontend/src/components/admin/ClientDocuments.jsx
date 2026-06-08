import { useEffect, useState } from "react";

import {
  Search,
  Upload,
  FileText,
  User,
  FolderKanban,
  Trash2,
} from "lucide-react";

const ClientDocuments = () => {

  const [clientEmail, setClientEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [clientData, setClientData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [clients, setClients] = useState([]);

  const [selectedClient, setSelectedClient] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    projectName: "",
    documentName: "",
    documentType: "Agreement",
    file: null,
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 3000);
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 3000);
  };

  const fetchClients = async () => {
    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/documents/clients`
      );

      const data = await res.json();

      if (data.success) {
        setClients(data.clients || []);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const fetchDocuments = async () => {
    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/documents`
      );

      const data = await res.json();

      setDocuments(data.documents || []);

    } catch (error) {
      console.log(error);
    }
  };

  const loadInitialData = async () => {
    try {

      setPageLoading(true);

      await Promise.all([
        fetchClients(),
        fetchDocuments(),
      ]);

    } catch (error) {

      console.log(error);

    } finally {

      setPageLoading(false);

    }
  };

  const verifyClient = async (email) => {

    try {

      if (!email) {
        showError("Please Select Client");
        return;
      }

      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/documents/verify-client`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientEmail: email,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {

        setClientData(null);
        setProjects([]);

        showError("Client Not Found");

        return;
      }

      setClientData(data);
      setProjects(data.projects || []);

    } catch (error) {

      console.log(error);

      showError("Something Went Wrong");

    } finally {

      setLoading(false);

    }
  };

  const uploadDocument = async (e) => {

    e.preventDefault();

    try {

      if (!formData.file) {
        showError("Please Select File");
        return;
      }

      if (formData.file.size > 1024 * 1024) {
        showError("File size must be less than 1 MB");
        return;
      }

      setUploading(true);

      const fd = new FormData();

      fd.append("file", formData.file);
      fd.append("clientName", clientData.clientName);
      fd.append("clientEmail", clientData.clientEmail);
      fd.append("projectName", formData.projectName);
      fd.append("documentName", formData.documentName);
      fd.append("documentType", formData.documentType);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/documents/upload`,
        {
          method: "POST",
          body: fd,
        }
      );

      const data = await res.json();

      if (data.success) {

        showSuccess("Document Uploaded Successfully");

        await fetchDocuments();

        setClientData(null);

        setProjects([]);

        setSelectedClient("");

        setFormData({
          projectName: "",
          documentName: "",
          documentType: "Agreement",
          file: null,
        });

      } else {

        showError(data.message || "Upload Failed");

      }

    } catch (error) {

      console.log(error);

      showError("Upload Failed");

    } finally {

      setUploading(false);

    }
  };
  const deleteDocument = async (id) => {

    const ok = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!ok) return;

    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/documents/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {

        showSuccess("Document Deleted Successfully");

        await fetchDocuments();

      } else {

        showError(data.message || "Delete Failed");

      }

    } catch (error) {

      console.log(error);

      showError("Delete Failed");

    }
  };

  if (pageLoading) {

    return (

      <div className="min-h-[70vh] flex items-center justify-center">

        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm flex items-center gap-3">

          <div className="h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

          <span className="text-sm font-medium text-slate-600">
            Loading documents...
          </span>

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-4">

      {success && (

        <div className="fixed top-5 right-5 z-[9999] bg-green-500 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium max-w-xs">
          {success}
        </div>

      )}

      {error && (

        <div className="fixed top-5 right-5 z-[9999] bg-red-500 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium max-w-xs">
          {error}
        </div>

      )}

      <div>

        <h2 className="text-2xl font-bold text-slate-900">
          Client Documents
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Upload and manage client documents.
        </p>

      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

        <label className="text-sm font-semibold text-slate-700">
          Select Client
        </label>

        <div className="flex flex-col md:flex-row gap-3 mt-3">

          <select
            value={selectedClient}
            onChange={(e) =>
              setSelectedClient(e.target.value)
            }
            className="flex-1 h-11 px-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange-400"
          >

            <option value="">
              Select Client
            </option>

            {clients.map((client) => (

              <option
                key={client._id}
                value={client.email}
              >
                {client.name} - {client.email}
              </option>

            ))}

          </select>

          <button
            onClick={() =>
              verifyClient(selectedClient)
            }
            disabled={loading}
            className="h-11 px-5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-70"
          >

            <Search size={16} />

            {loading
              ? "Checking..."
              : "Verify"}

          </button>

        </div>

      </div>

      {clientData && (

        <form
          onSubmit={uploadDocument}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4"
        >

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">

              <User
                size={18}
                className="text-orange-600"
              />

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                {clientData.clientName}
              </h3>

              <p className="text-xs text-slate-500">
                {clientData.clientEmail}
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>

              <label className="text-sm font-medium text-slate-700">
                Project
              </label>

              <select
                value={formData.projectName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projectName: e.target.value,
                  })
                }
                className="w-full mt-2 h-11 px-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange-400"
              >

                <option value="">
                  Select Project
                </option>

                {projects.map((project) => (

                  <option
                    key={project._id}
                    value={project.projectName}
                  >
                    {project.projectName}
                  </option>

                ))}

              </select>

            </div>

            <div>

              <label className="text-sm font-medium text-slate-700">
                Document Name
              </label>

              <input
                type="text"
                value={formData.documentName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    documentName: e.target.value,
                  })
                }
                placeholder="Enter Document Name"
                className="w-full mt-2 h-11 px-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange-400"
              />

            </div>

            <div>

              <label className="text-sm font-medium text-slate-700">
                Document Type
              </label>

              <select
                value={formData.documentType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    documentType: e.target.value,
                  })
                }
                className="w-full mt-2 h-11 px-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange-400"
              >

                <option>Agreement</option>
                <option>Invoice</option>
                <option>Proposal</option>
                <option>Requirement</option>
                <option>Design</option>
                <option>Source Code</option>
                <option>Report</option>
                <option>Other</option>

              </select>

            </div>

            <div>

              <label className="text-sm font-medium text-slate-700">
                Upload File (Max 1 MB)
              </label>

              <input
                type="file"
                onChange={(e) => {

                  const file = e.target.files[0];

                  if (!file) return;

                  if (file.size > 1024 * 1024) {

                    showError(
                      "File size must be less than 1 MB"
                    );

                    e.target.value = "";

                    return;
                  }

                  setFormData({
                    ...formData,
                    file,
                  });

                }}
                className="w-full mt-2 h-11 px-3 border border-slate-200 rounded-xl text-sm"
              />

              <p className="text-xs text-red-500 mt-1">
                Maximum file size allowed: 1 MB
              </p>

            </div>

          </div>

          <button
            type="submit"
            disabled={uploading}
            className="h-11 px-5 bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center gap-2 text-sm font-medium disabled:opacity-70"
          >

            <Upload size={16} />

            {uploading
              ? "Uploading..."
              : "Upload Document"}

          </button>

        </form>

      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

        <div className="flex items-center gap-2 mb-4">

          <FileText
            size={18}
            className="text-orange-500"
          />

          <h3 className="text-lg font-semibold text-slate-900">
            Upload History
          </h3>

        </div>

        {documents.length === 0 ? (

          <div className="text-center py-8">

            <FileText
              size={40}
              className="mx-auto text-slate-300"
            />

            <h4 className="text-base font-semibold text-slate-700 mt-3">
              No Documents Found
            </h4>

          </div>

        ) : (

          <div className="space-y-3">

            {documents.map((doc) => (

              <div
                key={doc._id}
                className="border border-slate-200 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
              >
                <div>

                  <div className="flex items-center gap-2">

                    <FolderKanban
                      size={15}
                      className="text-orange-500"
                    />

                    <h4 className="font-semibold text-sm text-slate-900">
                      {doc.documentName}
                    </h4>

                  </div>

                  <p className="text-xs text-slate-500 mt-2">

                    {doc.clientName}
                    {" • "}
                    {doc.projectName}

                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">

                    <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-[11px] font-medium">
                      {doc.documentType}
                    </span>

                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-medium">
                      {doc.fileName}
                    </span>

                  </div>

                </div>

                <div className="flex flex-wrap gap-2">

                  <a
                    href={`${import.meta.env.VITE_API_URL}/api/documents/${doc._id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 h-10 rounded-xl text-sm font-medium flex items-center justify-center"
                  >
                    Download
                  </a>

                  <button
                    onClick={() =>
                      deleteDocument(doc._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 h-10 rounded-xl text-sm font-medium flex items-center gap-2"
                  >

                    <Trash2 size={14} />

                    Delete

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default ClientDocuments;