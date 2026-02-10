import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function TimetableSetup() {
  const { semesterId } = useParams();
  const navigate = useNavigate();

  const [timetable, setTimetable] = useState(
    DAYS.reduce((acc, day) => {
      acc[day] = "";
      return acc;
    }, {}),
  );

  const handleChange = (day, value) => {
    setTimetable({ ...timetable, [day]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    const formatted = Object.entries(timetable).map(
      ([day, subjects]) => ({
        day,
        subjects: subjects
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      })
    );

    for (const dayObj of formatted) {
      if (dayObj.subjects.length === 0) continue;

      await axios.post(
        `http://localhost:5000/api/timetable/${semesterId}`,
        {
          day: dayObj.day,
          subjects: dayObj.subjects,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    navigate(`/semester/${semesterId}/setup/subjects`);
  };

  return (
    <div className="min-h-screen bg-midnight pb-20 p-6 md:p-12">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[5%] left-[10%] w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[5%] right-[10%] w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Back Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest cursor-pointer"
        >
          <span className="text-lg leading-none">←</span> Back to Setup
        </button>

        <header className="mb-12">
          <h2 className="text-4xl font-black text-white italic tracking-tighter">
            WEEKLY <span className="text-neon-cyan">TIMETABLE</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm font-medium">
            Enter subjects conducted on each day. Separate them with 
            <span className="text-neon-cyan font-black mx-1">commas</span> (e.g. Anatomy, Physiology).
          </p>
        </header>

        {/* Input Grid */}
        <div className="grid gap-4">
          {DAYS.map((day) => (
            <div 
              key={day} 
              className="glass-panel p-6 rounded-3xl border border-white/5 group hover:border-white/10 transition-all focus-within:border-neon-cyan/50"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label className="w-32 text-slate-300 font-black text-xs uppercase tracking-[0.2em] group-hover:text-neon-cyan transition-colors">
                  {day}
                </label>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Subject Names..."
                    value={timetable[day]}
                    onChange={(e) => handleChange(day, e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-midnight/50 border border-white/5 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-all font-medium text-sm"
                  />
                  {timetable[day] && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                      {timetable[day].split(',').filter(Boolean).length > 0 && (
                        <span className="bg-neon-cyan/10 text-neon-cyan text-[10px] px-2 py-1 rounded-md font-black">
                          {timetable[day].split(',').filter(Boolean).length} CLASSES
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Save Footer */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleSave}
            className="w-full max-w-sm py-5 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-[2rem] text-midnight font-black text-lg shadow-[0_20px_40px_rgba(34,211,238,0.2)] hover:shadow-neon-cyan/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            SAVE & CONTINUE →
          </button>
        </div>
      </div>
    </div>
  );
}