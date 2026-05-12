import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import {LockKeyhole,Eye,EyeOff} from "lucide-react";

const AdminLogin=()=>{

  const [password,setPassword]=useState("");
  const [showPassword,setShowPassword]=useState(false);
  const [error,setError]=useState("");

  const navigate=useNavigate();

  const handleLogin=(e)=>{
    e.preventDefault();

    if(password==="elance123"){
      localStorage.setItem("adminAuth","true");
      navigate("/admin");
    }else{
      setError("Wrong Password");
    }
  };

  return(
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">

      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-orange-100"
      >

        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <LockKeyhole size={36}/>
          </div>
        </div>

        <h1 className="text-3xl font-black text-center text-gray-900 mb-2">
          Admin Login
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Enter password to access dashboard
        </p>

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl px-4 py-4 pr-14 outline-none focus:border-orange-500"
          />

          <button
            type="button"
            onClick={()=>setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-orange-600 transition"
          >
            {showPassword ? <EyeOff size={22}/> : <Eye size={22}/>}
          </button>

        </div>

        <p className="text-sm text-center text-gray-500 mt-4">
          Demo Password :
          <span className="font-bold text-orange-600 ml-1">
            elance123
          </span>
        </p>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center font-medium">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02]"
        >
          Login To Dashboard
        </button>

      </form>
    </div>
  );
};

export default AdminLogin;