import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ClientSidebar from "../components/client/ClientSidebar";
import ClientOverview from "../components/client/ClientOverview";
import ClientProjects from "../components/client/ClientProjects";
import ClientDocuments from "../components/client/ClientDocuments";
import ClientPayments from "../components/client/ClientPayments";

const ClientDashboard = () => {

  const navigate = useNavigate();

  const [client, setClient] =
    useState(null);

  const [page, setPage] =
    useState("overview");

  useEffect(() => {

    const storedClient =
      localStorage.getItem(
        "client"
      );

    if (!storedClient) {

      navigate(
        "/client-login",
        {
          replace: true,
        }
      );

      return;

    }

    setClient(
      JSON.parse(
        storedClient
      )
    );

  }, [navigate]);

  const logout = () => {

    localStorage.removeItem(
      "client"
    );

    navigate(
      "/client-login",
      {
        replace: true,
      }
    );

  };

  if (!client) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-50">

        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm flex items-center gap-3">

          <div className="h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

          <span className="text-sm font-medium text-slate-600">
            Loading Dashboard...
          </span>

        </div>

      </div>

    );

  }

  const renderPage = () => {

    switch (page) {

      case "overview":
        return (
          <ClientOverview />
        );

      case "projects":
        return (
          <ClientProjects />
        );

      case "documents":
        return (
          <ClientDocuments />
        );

      case "payments":
        return (
          <ClientPayments />
        );

      default:
        return (
          <ClientOverview />
        );

    }

  };

  return (

    <div className="min-h-screen bg-slate-50">

      <ClientSidebar
        page={page}
        setPage={setPage}
        onLogout={logout}
      />

      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">

        <div className="p-3 sm:p-4 lg:p-6">

          {renderPage()}

        </div>

      </main>

    </div>

  );

};

export default ClientDashboard;