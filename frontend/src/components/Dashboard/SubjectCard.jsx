// SubjectCard.jsx
import SubjectPie from "./SubjectPie";

const STATUS_COLORS = {
  SAFE: "var(--color-neon-cyan)",
  BORDER: "#f59e0b",
  DANGER: "#ef4444",
};

export default function SubjectCard({ data }) {
  const percentage = Math.round((data.attended / data.totalClasses) * 100);
  const color = STATUS_COLORS[data.status] || "var(--color-neon-cyan)";

  return (
    <div className="glass-panel p-5 rounded-3xl flex justify-between items-center group hover:border-white/20 transition-all border border-transparent">
      <div className="flex-1">
        <h3 className="text-white font-bold text-lg leading-tight group-hover:text-neon-cyan transition-colors">
          {data.subject}
        </h3>
        
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-black" style={{ color }}>{percentage}%</span>
          <span className="text-xs text-slate-500 font-medium">{data.attended}/{data.totalClasses} classes</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-[10px] px-2 py-1 bg-white/5 rounded-md text-slate-400 font-bold">
            Safe Miss: {data.safeMissLeft}
          </span>
          <span className="text-[10px] px-2 py-1 bg-white/5 rounded-md text-slate-400 font-bold">
            Required: {data.classesToAttendMore}
          </span>
        </div>
      </div>

      <div className="relative">
        <SubjectPie attended={data.attended} total={data.totalClasses} color={color} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-midnight blur-[10px]" />
        </div>
      </div>
    </div>
  );
}