
import {
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from "react";

import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CheckCircle2,
  Activity,
  CreditCard,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";



const Admin = () => {

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {

    const isAuth =
      localStorage.getItem(
        "adminAuth"
      );

    if (!isAuth) {

      navigate(
        "/admin-login",
        {
          replace: true,
        }
      );

    }

  }, [navigate]);

  useEffect(() => {

    if (location.pathname === "/admin") {

      navigate(
        "/admin/dashboard",
        {
          replace: true,
        }
      );

    }

  }, [location.pathname, navigate]);
  // Active page


  // Mobile sidebar
  const [open, setOpen] =
    useState(false);

  // All pages


  // Sidebar menu
  const menu = [
    [
      "dashboard",
      "Dashboard",
      <LayoutDashboard size={18} />,
    ],
    [
      "clients",
      "Clients",
      <Users size={18} />,
    ],
    [
      "projects",
      "Projects",
      <FolderKanban size={18} />,
    ],
    [
      "milestones",
      "Milestones",
      <CheckCircle2 size={18} />,
    ],
    [
      "payments",
      "Payments",
      <CreditCard size={18} />,
    ],
    [
      "documents",
      "Client Documents",
      <FileText size={18} />,
    ],
    [
      "analytics",
      "Analytics",
      <Activity size={18} />,
    ],
  ];

  // Admin logout
  const logout = () => {

    localStorage.removeItem("adminAuth");

    window.location.href =
      "/admin-login";

  };

  return (

    <div className="flex h-screen bg-slate-50 overflow-hidden">

      {/* Mobile topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 flex items-center justify-between px-4 z-50 border-b border-white/10">

        <h1 className="text-xl font-bold text-orange-500">
          ElanceForge
        </h1>

        <button
          onClick={() =>
            setOpen(!open)
          }
          className="text-white"
        >

          {open ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}

        </button>

      </div>

      {/* Mobile overlay */}
      {open && (

        <div
          onClick={() =>
            setOpen(false)
          }
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />

      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative
          top-0 left-0
          h-screen
          w-64
          bg-slate-900
          text-white
          z-50
          flex flex-col
          transition-transform duration-300
          ${open
            ? "translate-x-0"
            : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >

        {/* Logo */}
        <div className="h-20 flex items-center px-5 border-b border-white/10">

          <h1 className="text-2xl font-bold text-orange-500">
            ElanceForge
          </h1>

        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">

          {menu.map(
            ([id, name, icon]) => (

              <button
                key={id}
                onClick={() => {

                  navigate(`/admin/${id}`);

                  setOpen(false);

                }}
                className={`
                  w-full
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  text-sm font-medium
                  transition-all
                  ${location.pathname === `/admin/${id}`
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-slate-200 hover:bg-white/10"
                  }
                `}
              >

                {icon}

                {name}

              </button>

            )
          )}

        </div>
        {/* Logout */}
        <div className="p-4 border-t border-white/10">

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition text-white text-sm font-medium"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto mt-16 lg:mt-0">

        <div className="p-3 sm:p-4 lg:p-6 min-h-screen">

          <Outlet />

        </div>

      </main>

    </div>

  );

};

export default Admin;