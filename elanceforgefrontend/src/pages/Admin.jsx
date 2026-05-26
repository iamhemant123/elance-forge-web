import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CheckCircle2,
  Activity,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import DashboardContent from "../components/admin/DashboardContent";
import ClientManagement from "../components/admin/ClientManagement";
import ProjectManagement from "../components/admin/ProjectManagement";
import Milestones from "../components/admin/Milestones";
import Analytics from "../components/admin/Analytics";

const Admin = () => {

  const navigate = useNavigate();

  const [page, setPage] = useState("dashboard");

  const [open, setOpen] = useState(false);

  const pages = {
    dashboard: <DashboardContent />,
    clients: <ClientManagement />,
    projects: <ProjectManagement />,
    milestones: <Milestones />,
    analytics: <Analytics />,
  };

  const menu = [
    ["dashboard", "Dashboard", <LayoutDashboard size={20} />],
    ["clients", "Clients", <Users size={20} />],
    ["projects", "Projects", <FolderKanban size={20} />],
    ["milestones", "Milestones", <CheckCircle2 size={20} />],
    ["analytics", "Analytics", <Activity size={20} />],
  ];

  const logout = () => {

    localStorage.removeItem("adminAuth");

    navigate("/admin-login");

  };

  return (

    <div className="flex h-screen bg-[#f5f7fb] overflow-hidden">

      {/* MOBILE TOPBAR */}

      <div className="lg:hidden fixed top-0 left-0 w-full bg-[#0f172a] text-white flex justify-between items-center px-5 py-4 z-50 shadow-md">

        <h1 className="text-2xl font-black text-orange-500">
          ElanceForge
        </h1>

        <button onClick={() => setOpen(!open)}>

          {open ? <X size={28} /> : <Menu size={28} />}

        </button>

      </div>

      {/* SIDEBAR */}

      <div
        className={`
fixed lg:relative top-0 left-0
h-screen w-72
bg-[#0f172a] text-white
z-50
transition-transform duration-300
flex flex-col
overflow-hidden
${open ? "translate-x-0" : "-translate-x-full"}
lg:translate-x-0
`}
      >

        {/* SIDEBAR HEADER */}

        <div className="p-5 border-b border-white/10 flex-shrink-0">

          <h1 className="text-3xl font-black text-orange-500">
            ElanceForge
          </h1>

        </div>

        {/* SIDEBAR MENU */}

        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-3">

          {menu.map(([id, name, icon]) => (

            <button
              key={id}
              onClick={() => {
                setPage(id);
                setOpen(false);
              }}
              className={`
w-full flex items-center gap-3
px-4 py-3 rounded-2xl
transition-all duration-200
${page === id
                  ? "bg-orange-500 shadow-lg"
                  : "hover:bg-white/10"
                }
`}
            >

              {icon}

              <span className="font-semibold text-base">
                {name}
              </span>

            </button>

          ))}

        </div>

        {/* LOGOUT BUTTON */}

        <div className="p-5 border-t border-white/10 flex-shrink-0">

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition py-3 rounded-2xl font-semibold"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </div>

      {/* OVERLAY */}

      {open && (

        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />

      )}

      {/* PAGE CONTENT */}

      <div className="flex-1 overflow-y-auto mt-16 lg:mt-0">

        <div className="p-4 sm:p-5 lg:p-8 min-h-screen">

          {pages[page]}

        </div>

      </div>

    </div>

  );

};

export default Admin;