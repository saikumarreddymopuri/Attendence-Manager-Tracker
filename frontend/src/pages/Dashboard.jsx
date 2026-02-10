import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // useNavigate add chesa
import { getEligibility } from "../utils/api";
import OverallCard from "../components/Dashboard/OverallCard";
import SubjectCard from "../components/Dashboard/SubjectCard";

export default function Dashboard() {
  const { semesterId } = useParams();
  const navigate = useNavigate(); // Navigation handle cheyadaniki
  const [data, setData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchEligibility = async () => {
    const res = await getEligibility(semesterId);
    setData(res.data);
  };

  useEffect(() => { fetchEligibility(); }, [semesterId]);

  if (!data) return (
    <div className="min-h-screen bg-midnight flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-midnight pb-32 p-6">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[100px]"></div>
      </div>

      {/* ⬅️ SLEEK BACK BUTTON */}
      <div className="mb-6">
        <button 
          onClick={() => navigate("/")} // Direct ga semester selection (home) ki velladaniki
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all group active:scale-95"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-xs font-bold uppercase tracking-widest">Change Semester</span>
        </button>
      </div>

      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Dashboard</h1>
          <h2 className="text-2xl font-black text-white">Hey, {user?.name.split(' ')[0]}! 👋</h2>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple p-[1px]">
          <div className="w-full h-full rounded-2xl bg-midnight flex items-center justify-center text-white font-bold">
            {user?.name[0]}
          </div>
        </div>
      </header>

      <OverallCard overall={data.overall} />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-lg font-bold uppercase tracking-tighter">My Subjects</h2>
        <div className="h-[1px] flex-1 mx-4 bg-white/5"></div>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {data.subjects.map((sub) => (
          <SubjectCard key={sub.subject} data={sub} />
        ))}
      </div>

      {/* 📱 BOTTOM NAVBAR */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md glass-panel rounded-[2rem] p-4 flex justify-around items-center z-50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10">
        <Link to={`/semester/${semesterId}/dashboard`} className="flex flex-col items-center text-neon-cyan">
           <span className="text-xs font-bold uppercase tracking-tighter mt-1">Status</span>
        </Link>
        <Link to={`/semester/${semesterId}/today`} className="flex flex-col items-center text-slate-500 hover:text-white transition-colors">
           <span className="text-xs font-bold uppercase tracking-tighter mt-1">Today</span>
        </Link>
        <Link to={`/semester/${semesterId}/calendar`} className="flex flex-col items-center text-slate-500 hover:text-white transition-colors">
           <span className="text-xs font-bold uppercase tracking-tighter mt-1">Stats</span>
        </Link>
      </nav>
    </div>
  );
}