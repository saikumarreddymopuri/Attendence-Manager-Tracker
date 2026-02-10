import { useParams } from "react-router-dom";
import AbsentTable from "../components/Attendance/AbsentTable";

export default function AbsentHistory() {
  const { semesterId } = useParams();

  return (
    <div className="min-h-screen bg-midnight pb-32 p-6">
      {/* Background Decor - Subtle Red Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px]"></div>
      </div>

      <header className="mb-10">
        <h1 className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-1">
          Attendance Log
        </h1>
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
          BUNK <span className="text-red-500">HISTORY</span>
        </h2>
        <div className="h-[3px] w-16 bg-gradient-to-r from-red-500 to-transparent mt-2 rounded-full"></div>
      </header>

      {/* Main Table Container */}
      <div className="max-w-4xl mx-auto">
        <AbsentTable />
      </div>
    </div>
  );
}