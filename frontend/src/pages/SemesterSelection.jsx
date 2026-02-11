import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function SemesterSelection() {
  const [semesters, setSemesters] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const res = await api.get("/semesters");
        setSemesters(res.data);
      } catch (err) {
        console.error("Fetch semesters failed", err);
        navigate("/login");
      }
    };

    fetchSemesters();
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-midnight p-6 flex flex-col items-center">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-neon-cyan/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-10 glass-panel p-6 rounded-2xl">
          <div>
            <h2 className="text-xl font-medium text-slate-400">
              Glad to see you back,
            </h2>
            <h1 className="text-3xl font-black text-white leading-tight">
              {user?.name} <span className="text-neon-cyan text-2xl">👋</span>
            </h1>
          </div>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer text-sm"
          >
            Logout
          </button>
        </div>

        <h2 className="text-white text-lg font-bold mb-6 px-2 uppercase tracking-widest flex items-center gap-2">
          <span className="w-8 h-[2px] bg-neon-cyan"></span> Select Semester
        </h2>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {semesters.map((sem) => (
            <div
              key={sem._id}
              onClick={() =>
                navigate(`/semester/${sem._id}/dashboard`)
              }
              className="glass-panel p-6 rounded-2xl cursor-pointer hover:border-neon-cyan/50 transition-all group"
            >
              <strong className="text-xl text-white group-hover:text-neon-cyan transition-colors">
                {sem.name}
              </strong>

              <div className="mt-4 space-y-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Timeline (DD/MM/YYYY)
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <span className="bg-white/5 px-3 py-1 rounded-lg">
                    {new Date(sem.startDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </span>

                  <span className="text-neon-cyan/50">—</span>

                  <span className="bg-white/5 px-3 py-1 rounded-lg">
                    {new Date(sem.endDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate("/add-semester")}
            className="border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 text-slate-500 hover:border-neon-cyan/50 hover:text-neon-cyan transition-all group cursor-pointer min-h-[140px]"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-cyan/10 transition-all">
              <span className="text-2xl font-bold">+</span>
            </div>

            <span className="font-bold text-sm">
              Add New Semester
            </span>
          </button>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-midnight/80 backdrop-blur-xl">
          <div className="w-full max-w-sm glass-panel p-10 rounded-[3rem] border-white/20">
            <div className="text-center">
              <div className="text-5xl mb-6">👋</div>

              <h2 className="text-2xl font-black text-white mb-3">
                Logging Out?
              </h2>

              <p className="text-slate-400 text-sm mb-10 font-medium">
                Do you really want to leave?
              </p>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleLogout}
                  className="w-full py-4 rounded-2xl bg-red-500 text-white font-black uppercase tracking-widest text-[11px]"
                >
                  Yes, Logout
                </button>

                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="w-full py-4 rounded-2xl bg-white/5 text-slate-400 font-black uppercase tracking-widest text-[11px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
