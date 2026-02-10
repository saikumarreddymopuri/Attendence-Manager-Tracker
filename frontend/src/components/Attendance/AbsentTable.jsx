import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAbsentHistory } from "../../utils/api";

export default function AbsentTable() {
  const { semesterId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    getAbsentHistory(semesterId).then((res) =>
      setData(res.data)
    );
  }, [semesterId]);

  if (data.length === 0) {
    return (
      <div className="p-10 text-center glass-panel rounded-[2.5rem] border-dashed border-white/10">
        <p className="text-slate-500 font-black uppercase tracking-widest text-sm">
          No absences recorded 🎉
        </p>
        <p className="text-neon-cyan text-xs mt-2 opacity-60 italic">Your attendance is perfect, buddy!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((day) => (
        <div
          key={day.date}
          className="glass-panel p-6 rounded-[2rem] border border-white/5 hover:border-red-500/20 transition-all group"
        >
          {/* Date with Calendar Icon Visual */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-xl shadow-inner border border-red-500/20">
              📅
            </div>
            <div>
              <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors tracking-tight">
                {new Date(day.date).toLocaleDateString('en-GB', { 
                   day: '2-digit', month: 'short', year: 'numeric' 
                })}
              </h3>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest leading-none mt-1">
                Absence Logged
              </p>
            </div>
          </div>

          {/* Subjects List as Professional Tags */}
          <div className="flex flex-wrap gap-3 ml-2 border-l-2 border-white/5 pl-8 py-1">
            {day.subjects.map((sub, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"></span>
                <span className="text-slate-200 font-bold text-sm">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}