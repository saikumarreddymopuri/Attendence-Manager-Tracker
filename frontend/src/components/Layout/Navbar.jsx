import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ❌ Invi hide chesina pages lo Logout kuda kanipinchadhu.
  // Dashboard (/semester/:id/dashboard) ikkada ledhu kabatti kachithamga kanipisthundi.
  const hideOn = ["/login", "/register", "/select-semester", "/add-semester"];
  if (hideOn.includes(location.pathname) || location.pathname.includes("/setup")) {
    return null;
  }

  const token = localStorage.getItem("token");
  if (!token) return null;

  const match = location.pathname.match(/\/semester\/([^/]+)/);
  const semesterId = match ? match[1] : null;

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <>
      {/* 📱 BOTTOM NAVBAR - Always On Top with z-50 */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-md z-[100] glass-panel rounded-[2.5rem] p-4 flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10">
        
        {semesterId && (
          <>
            <NavLink 
              to={`/semester/${semesterId}/dashboard`} 
              className={({ isActive }) => `flex flex-col items-center transition-all ${isActive ? 'text-neon-cyan scale-110' : 'text-slate-500 hover:text-white'}`}
            >
              <span className="text-[10px] font-black uppercase tracking-widest">Dashboard</span>
              {location.pathname.includes('dashboard') && <div className="w-5 h-[2px] bg-neon-cyan mt-1 rounded-full shadow-[0_0_10px_#22d3ee]"></div>}
            </NavLink>

            <NavLink 
              to={`/semester/${semesterId}/today`} 
              className={({ isActive }) => `flex flex-col items-center transition-all ${isActive ? 'text-neon-cyan scale-110' : 'text-slate-500 hover:text-white'}`}
            >
              <span className="text-[10px] font-black uppercase tracking-widest">Today</span>
              {location.pathname.includes('today') && <div className="w-5 h-[2px] bg-neon-cyan mt-1 rounded-full shadow-[0_0_10px_#22d3ee]"></div>}
            </NavLink>

            <NavLink 
              to={`/semester/${semesterId}/absent`} 
              className={({ isActive }) => `flex flex-col items-center transition-all ${isActive ? 'text-neon-cyan scale-110' : 'text-slate-500 hover:text-white'}`}
            >
              <span className="text-[10px] font-black uppercase tracking-widest">History</span>
              {location.pathname.includes('absent') && <div className="w-5 h-[2px] bg-neon-cyan mt-1 rounded-full shadow-[0_0_10px_#22d3ee]"></div>}
            </NavLink>
          </>
        )}

        {/* 🔑 Logout Button - Specifically forced to show */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex flex-col items-center text-red-500/80 hover:text-red-400 transition-all cursor-pointer px-2"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
        </button>
      </nav>

      {/* 🔐 STYLISH LOGOUT MODAL - Absolute Center */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-midnight/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-full max-w-sm glass-panel p-10 rounded-[3rem] border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in duration-300">
            <div className="text-center">
              <div className="text-5xl mb-6">👋</div>
              <h2 className="text-2xl font-black text-white mb-3 tracking-tight">Logging Out?</h2>
              <p className="text-slate-400 text-sm mb-10 font-medium">
                Do you really want to leave, buddy?
              </p>
              
              <div className="flex flex-col gap-4">
                <button
                  onClick={confirmLogout}
                  className="w-full py-4 rounded-2xl bg-red-500 text-white font-black uppercase tracking-widest text-[11px] hover:bg-red-600 transition-all shadow-lg shadow-red-500/30 active:scale-95 cursor-pointer"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="w-full py-4 rounded-2xl bg-white/5 text-slate-400 font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}