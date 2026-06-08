import { useEffect, useState } from "react";

import {
  FileText,
  Download,
  Calendar,
  FolderKanban,
} from "lucide-react";

const ClientDocuments = () => {

  // Client documents
  const [documents, setDocuments] =
    useState([]);

  // Real loading state
  const [loading, setLoading] =
    useState(true);

  const client = JSON.parse(
    localStorage.getItem("client")
  );

  // Load documents
  useEffect(() => {

    fetchDocuments();

  }, []);

  // Fetch client files
  const fetchDocuments =
    async () => {

      try {

        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/client/documents/${client.email}`
        );

        const data =
          await res.json();

        setDocuments(
          data.documents || []
        );

      } catch (error) {

        console.log(error);

        setDocuments([]);

      } finally {

        setLoading(false);

      }

    };

  // Loading screen
  if (loading) {

    return (

      <div className="min-h-[60vh] flex items-center justify-center">

        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm flex items-center gap-3">

          <div className="h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

          <span className="text-sm font-medium text-slate-600">
            Loading Documents...
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
          My Documents
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Download agreements, invoices, reports and project files uploaded by admin.
        </p>

      </div>

      {/* Empty state */}
      {documents.length === 0 ? (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">

          <FileText
            size={55}
            className="mx-auto text-slate-300"
          />

          <h3 className="text-lg font-semibold text-slate-700 mt-4">
            No Documents Found
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            Uploaded documents will appear here.
          </p>

        </div>

      ) : (

        <div className="grid gap-4">

          {documents.map((doc) => (

            <div
              key={doc._id}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition p-4"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div className="min-w-0">

                  <h3 className="text-lg font-semibold text-slate-800 break-words">
                    {doc.documentName}
                  </h3>

                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500">

                    <div className="flex items-center gap-2">

                      <FolderKanban size={14} />

                      <span>
                        {doc.projectName}
                      </span>

                    </div>

                    <div className="flex items-center gap-2">

                      <FileText size={14} />

                      <span>
                        {doc.documentType}
                      </span>

                    </div>

                    <div className="flex items-center gap-2">

                      <Calendar size={14} />

                      <span>
                        {new Date(
                          doc.createdAt
                        ).toLocaleDateString()}
                      </span>

                    </div>

                  </div>

                  <div className="mt-3">

                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600 break-all">
                      {doc.fileName}
                    </span>

                  </div>

                </div>
                                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-2 lg:min-w-[240px]">

                  {/* View document */}
                  <a
                    href={`${import.meta.env.VITE_API_URL}/api/documents/${doc._id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-3 rounded-xl text-sm font-medium"
                  >

                    <FileText size={16} />

                    View

                  </a>

                  {/* Download document */}
                  <a
                    href={`${import.meta.env.VITE_API_URL}/api/documents/download/${doc._id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 transition text-white px-4 py-3 rounded-xl text-sm font-medium"
                  >

                    <Download size={16} />

                    Download

                  </a>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default ClientDocuments;