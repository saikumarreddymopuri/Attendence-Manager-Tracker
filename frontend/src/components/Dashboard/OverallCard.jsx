const STATUS_COLORS = {
  SAFE: "var(--color-neon-cyan)",
  BORDER: "#f59e0b",
  DANGER: "#ef4444",
};

export default function OverallCard({ overall }) {
  if (!overall) return null;

  const percentage = Math.round((overall.totalAttended / overall.totalPlanned) * 100);
  const status = overall.status;
  const color = STATUS_COLORS[status] || "var(--color-neon-cyan)";

  const needToAttend = Math.max(0, Math.ceil(overall.totalPlanned * 0.75) - overall.totalAttended);

  return (
    <div className="glass-panel p-6 rounded-[2rem] mb-8 border-l-4" style={{ borderColor: color }}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Overall Attendance</h2>
          <div className="text-5xl font-black mt-2 tracking-tighter text-white">
            {percentage}<span className="text-xl text-slate-500 font-medium">%</span>
          </div>
        </div>
        <div className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5" style={{ color }}>
          {status}
        </div>
      </div>

      {/* Modern Progress Bar */}
      <div className="relative h-4 bg-white/5 rounded-full overflow-hidden mb-6">
        <div 
          className="h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
        <div className="absolute left-[75%] top-0 w-0.5 h-full bg-white/20" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Present</p>
          <p className="text-xl font-bold text-white">{overall.totalAttended} <span className="text-xs text-slate-500">/ {overall.totalPlanned}</span></p>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Required</p>
          <p className="text-xl font-bold text-white">{needToAttend} <span className="text-xs text-slate-500">classes</span></p>
        </div>
      </div>
    </div>
  );
}