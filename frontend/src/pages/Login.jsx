import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-midnight transition-colors duration-500">
      {/* Subtle Background Glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md glass-panel p-10 rounded-3xl animate-in fade-in zoom-in duration-500">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Welcome <span className="text-neon-cyan">Back.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">Log in to your student dashboard</p>
        </header>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-2xl bg-midnight/50 cyan-glow-border text-white placeholder:text-slate-600 outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-2xl bg-midnight/50 cyan-glow-border text-white placeholder:text-slate-600 outline-none transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 mt-2 bg-neon-cyan hover:bg-cyan-400 text-[#0a0f1d] font-bold text-lg rounded-2xl shadow-lg shadow-neon-cyan/20 active:scale-95 transition-all cursor-pointer"
          >
            Login
          </button>
        </form>

        <footer className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-slate-500 text-sm font-medium">
            New user?{" "}
            <Link to="/register" className="text-neon-cyan hover:text-white transition-colors ml-1 font-bold">
              Register here
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}