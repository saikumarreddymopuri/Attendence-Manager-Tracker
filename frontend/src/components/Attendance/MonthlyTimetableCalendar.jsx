import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MonthlyTimetableCalendar() {
  const { semesterId } = useParams();
  const token = localStorage.getItem("token");
  const [timetable, setTimetable] = useState([]);

  useEffect(() => { fetchTimetable(); }, []);

  const fetchTimetable = async () => {
    const res = await axios.get(`http://localhost:5000/api/timetable/${semesterId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTimetable(res.data);
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getSubjectsForDate = (date) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const dayEntry = timetable.find((d) => d.day === dayName);
    return dayEntry ? dayEntry.subjects : [];
  };

  return (
    <div className="glass-panel p-6 rounded-[2rem] overflow-hidden">
      <header className="flex justify-between items-center mb-6">
        <h3 className="text-white font-black uppercase tracking-widest text-sm italic">Schedule</h3>
        <span className="bg-neon-cyan/10 text-neon-cyan px-4 py-1 rounded-full text-xs font-black uppercase">
          {monthName} {year}
        </span>
      </header>

      {/* Day Names Row */}
      <div className="grid grid-cols-6 gap-2 mb-4">
        {dayLabels.map(day => (
          <div key={day} className="text-center text-[10px] font-black text-slate-600 uppercase tracking-tighter">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(year, month, i + 1);
          if (date.getDay() === 0) return null; // Skip Sundays

          const subjects = getSubjectsForDate(date);
          const isToday = date.toDateString() === today.toDateString();

          return (
            <div
              key={i}
              className={`min-h-[80px] p-2 rounded-xl border transition-all flex flex-col ${
                isToday 
                ? "bg-neon-cyan/10 border-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.2)]" 
                : "bg-white/5 border-white/5 hover:border-white/20"
              }`}
            >
              <span className={`text-xs font-black mb-1 ${isToday ? "text-neon-cyan" : "text-slate-500"}`}>
                {i + 1}
              </span>
              
              {/* Subject Names inside date box */}
              <div className="flex flex-col gap-1 overflow-hidden">
                {subjects.map((s, idx) => (
                  <div key={idx} className="text-[7px] leading-tight font-bold text-slate-300 bg-white/5 px-1 py-0.5 rounded truncate">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}