import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  CreditCard,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";
import { useNavigate, } from "react-router-dom";

const ClientSidebar = ({
  page,
  onLogout,
}) => {
  const [open, setOpen] =
    useState(false);
  const navigate =
    useNavigate();

  const menuItems = [
    {
      id: "overview",
      name: "Overview",
      icon: (
        <LayoutDashboard size={18} />
      ),
    },
    {
      id: "projects",
      name: "Projects",
      icon: (
        <FolderKanban size={18} />
      ),
    },
    {
      id: "documents",
      name: "Documents",
      icon: (
        <FileText size={18} />
      ),
    },
    {
      id: "payments",
      name: "Payments",
      icon: (
        <CreditCard size={18} />
      ),
    },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 flex items-center justify-between px-4 z-[60] border-b border-white/10">

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

      {/* Mobile Overlay */}
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
          fixed
          top-0
          left-0
          h-screen
          w-64
          bg-slate-900
          flex flex-col
          z-50
          shadow-xl
          transition-transform duration-300
          ${open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* Logo */}
        <div className="h-20 flex items-center px-5 border-b border-white/10 flex-shrink-0">

          <h1 className="text-2xl font-bold text-orange-500">
            ElanceForge
          </h1>

        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">

          {menuItems.map(
            (item) => (

              <button
                key={item.id}
                onClick={() => {

                  navigate(
                    `/client-dashboard/${item.id}`
                  );

                  setOpen(
                    false
                  );

                }}
                className={`
                  w-full
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  text-sm font-medium
                  transition-all duration-200
                  ${page ===
                    item.id
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-slate-200 hover:bg-white/10"
                  }
                `}
              >

                {item.icon}

                {item.name}

              </button>

            )
          )}

        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/10 flex-shrink-0">

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-all"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </aside>
    </>
  );
};

export default ClientSidebar;