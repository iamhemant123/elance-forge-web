import {
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import ClientSidebar from "../components/client/ClientSidebar";

const ClientDashboard = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [client, setClient] =
    useState(null);

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

  useEffect(() => {

    if (
      location.pathname ===
      "/client-dashboard"
    ) {

      navigate(
        "/client-dashboard/overview",
        {
          replace: true,
        }
      );

    }

  }, [
    location.pathname,
    navigate,
  ]);

  const logout = () => {

    localStorage.removeItem(
      "client"
    );

    window.location.href =
      "/client-login";

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

  return (

    <div className="min-h-screen bg-slate-50">

      <ClientSidebar
        page={
          location.pathname
            .split("/")
            .pop()
        }
        onLogout={logout}
      />

      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">

        <div className="p-3 sm:p-4 lg:p-6">

          <Outlet />

        </div>

      </main>

    </div>

  );

};

export default ClientDashboard;