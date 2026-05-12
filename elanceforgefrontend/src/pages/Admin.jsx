import React,{useEffect,useState} from "react";

import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CheckCircle2,
  Clock3,
  Search,
  Bell,
  Trash2,
  Eye,
  Briefcase,
  Activity,
  LogOut,
} from "lucide-react";

const Admin=()=>{

  const [search,setSearch]=useState("");
  const [clients,setClients]=useState([]);
  const [loading,setLoading]=useState(true);

  const [deliveredProjects]=useState([
    {title:"Portfolio Website",client:"Rahul Sharma",status:"Delivered",tech:"React + Node",progress:"100%"},
    {title:"E-Commerce App",client:"Aman Verma",status:"Completed",tech:"MERN Stack",progress:"100%"},
  ]);

  const [workingProjects]=useState([
    {title:"RO Water Service Website",client:"Rohit Kumar",status:"In Progress",tech:"React + MongoDB",progress:"80%"},
    {title:"School Management System",client:"Priya Singh",status:"Working",tech:"Full Stack",progress:"65%"},
  ]);

  useEffect(()=>{

    const fetchClients=async()=>{

      try{

        const response=await fetch(
          "http://localhost:5000/api/admin/contacts"
        );

        const data=await response.json();

        if(data.success){
          setClients(data.contacts);
        }

      }catch(error){

        console.log(
          "Client Fetch Error :",
          error
        );

      }finally{
        setLoading(false);
      }
    };

    fetchClients();

  },[]);

  const filteredClients=clients.filter((client)=>
    client.name
    ?.toLowerCase()
    .includes(search.toLowerCase())
  );

  const handleLogout=()=>{

    localStorage.removeItem(
      "adminAuth"
    );

    window.location.href=
    "/admin-login";
  };

  return(

    <div className="min-h-screen bg-[#f4f7fb] flex">

      {/* Sidebar */}

      <div className="hidden lg:flex flex-col w-72 bg-[#0f172a] text-white p-6">

        <div>

          <h1 className="text-3xl font-black text-orange-500">
            ElanceForge
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Admin Dashboard
          </p>

        </div>

        <div className="mt-10 space-y-3">

          <button className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl bg-orange-500 text-white font-semibold">
            <LayoutDashboard size={20}/>
            Dashboard
          </button>

          <button className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-white/10 transition">
            <Users size={20}/>
            Clients
          </button>

          <button className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-white/10 transition">
            <FolderKanban size={20}/>
            Projects
          </button>

          <button className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-white/10 transition">
            <Activity size={20}/>
            Analytics
          </button>

        </div>

        <div className="mt-auto">

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 px-5 py-4 rounded-2xl font-semibold transition"
          >

            <LogOut size={18}/>
            Logout

          </button>

        </div>

      </div>

      {/* Main */}

      <div className="flex-1 p-5 md:p-8 overflow-hidden">

        {/* Topbar */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

          <div>

            <h2 className="text-4xl font-black text-gray-900">
              Dashboard Overview
            </h2>

            <p className="text-gray-500 mt-2">
              Welcome back Hemant 👋
            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="relative">

              <input
                type="text"
                placeholder="Search clients..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="w-[260px] bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-orange-500 shadow-sm"
              />

              <Search size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"/>

            </div>

            <button className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center hover:scale-105 transition">
              <Bell size={22}/>
            </button>

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500 text-sm">
                  Total Clients
                </p>

                <h2 className="text-4xl font-black text-gray-900 mt-2">
                  {clients.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Users size={28}/>
              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500 text-sm">
                  Delivered
                </p>

                <h2 className="text-4xl font-black text-gray-900 mt-2">
                  {deliveredProjects.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
                <CheckCircle2 size={28}/>
              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500 text-sm">
                  Working
                </p>

                <h2 className="text-4xl font-black text-gray-900 mt-2">
                  {workingProjects.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <Clock3 size={28}/>
              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500 text-sm">
                  Total Projects
                </p>

                <h2 className="text-4xl font-black text-gray-900 mt-2">
                  {deliveredProjects.length+workingProjects.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <FolderKanban size={28}/>
              </div>

            </div>

          </div>

        </div>

        {/* Clients */}

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-10">

          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-black text-gray-900">
                Client Details
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Real MongoDB Client Data
              </p>

            </div>

            <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-2xl font-semibold transition">
              Export Data
            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-orange-600 text-white">

                <tr>
                  <th className="text-left px-6 py-4">Client</th>
                  <th className="text-left px-6 py-4">Email</th>
                  <th className="text-left px-6 py-4">Subject</th>
                  <th className="text-left px-6 py-4">Actions</th>
                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>
                    <td colSpan="4" className="text-center py-10 text-gray-500 font-medium">
                      Loading Clients...
                    </td>
                  </tr>

                ) : filteredClients.length===0 ? (

                  <tr>
                    <td colSpan="4" className="text-center py-10 text-gray-500 font-medium">
                      No Clients Found
                    </td>
                  </tr>

                ) : (

                  filteredClients.map((client,index)=>(

                    <tr key={index} className="border-b border-gray-100 hover:bg-orange-50 transition">

                      <td className="px-6 py-5">
                        <h3 className="font-bold text-gray-900">
                          {client.name}
                        </h3>
                      </td>

                      <td className="px-6 py-5 text-gray-700">
                        {client.email}
                      </td>

                      <td className="px-6 py-5 text-gray-700">
                        {client.subject}
                      </td>

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <button className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center hover:scale-110 transition">
                            <Eye size={18}/>
                          </button>

                          <button className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center hover:scale-110 transition">
                            <Trash2 size={18}/>
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* Projects */}

        <div className="grid xl:grid-cols-2 gap-8">

          {/* Delivered */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
                <CheckCircle2 size={24}/>
              </div>

              <div>

                <h2 className="text-2xl font-black text-gray-900">
                  Delivered Projects
                </h2>

                <p className="text-gray-500 text-sm">
                  Successfully completed work
                </p>

              </div>

            </div>

            <div className="space-y-5">

              {deliveredProjects.map((project,index)=>(

                <div key={index} className="border border-gray-200 rounded-3xl p-5 hover:shadow-lg transition-all duration-300">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h3 className="text-xl font-bold text-gray-900">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 mt-2">
                        Client : {project.client}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {project.tech}
                      </p>

                    </div>

                    <button className="px-4 py-2 rounded-xl bg-green-500 text-white font-semibold">
                      {project.status}
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Working */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <Briefcase size={24}/>
              </div>

              <div>

                <h2 className="text-2xl font-black text-gray-900">
                  Working On It
                </h2>

                <p className="text-gray-500 text-sm">
                  Ongoing projects
                </p>

              </div>

            </div>

            <div className="space-y-5">

              {workingProjects.map((project,index)=>(

                <div key={index} className="border border-gray-200 rounded-3xl p-5 hover:shadow-lg transition-all duration-300">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h3 className="text-xl font-bold text-gray-900">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 mt-2">
                        Client : {project.client}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {project.tech}
                      </p>

                    </div>

                    <button className="px-4 py-2 rounded-xl bg-orange-500 text-white font-semibold">
                      {project.status}
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Admin;