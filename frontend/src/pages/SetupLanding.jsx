import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function SetupLanding() {
  const { semesterId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSetupStatus = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `http://localhost:5000/api/semesters/${semesterId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.isSetupComplete) {
          navigate(`/semester/${semesterId}/dashboard`);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load semester", err);
      }
    };
    checkSetupStatus();
  }, [semesterId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight p-6 flex items-center justify-center">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-xl glass-panel p-10 rounded-[3rem] border-white/10 relative">
        {/* Back Button */}
        <button 
          onClick={() => navigate("/select-semester")}
          className="absolute top-8 left-8 text-slate-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-tighter"
        >
          ← Back
        </button>

        <header className="text-center mt-6 mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            New Semester Found
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter italic">
            SEMESTER <span className="text-neon-cyan">SETUP</span>
          </h2>
          <p className="text-slate-400 mt-4 font-medium leading-relaxed">
            Before we track your attendance, we need to map your academic schedule.
          </p>
        </header>

        {/* Setup Progress Cards */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-white/10 transition-all">
            <div className="w-12 h-12 bg-neon-cyan/10 rounded-2xl flex items-center justify-center text-2xl">📅</div>
            <div>
              <h4 className="text-white font-bold text-lg">Weekly Timetable</h4>
              <p className="text-slate-500 text-sm">Organize your classes for each day.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-white/10 transition-all">
            <div className="w-12 h-12 bg-neon-purple/10 rounded-2xl flex items-center justify-center text-2xl">📚</div>
            <div>
              <h4 className="text-white font-bold text-lg">Subject Details</h4>
              <p className="text-slate-500 text-sm">Class names and tracking metrics.</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate(`/semester/${semesterId}/setup/timetable`)}
          className="w-full py-5 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-[2rem] text-midnight font-black text-xl shadow-[0_20px_40px_rgba(34,211,238,0.2)] hover:shadow-neon-cyan/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
        >
          START SETUP →
        </button>

        <p className="text-center mt-8 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
          Estimated time: 2 Minutes
        </p>
      </div>
    </div>
  );
}