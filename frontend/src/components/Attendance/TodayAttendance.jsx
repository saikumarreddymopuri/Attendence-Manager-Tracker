import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TodayAttendance() {
  const { semesterId } = useParams();
  const token = localStorage.getItem("token");
  const [data, setData] = useState(null);
  const [editSubject, setEditSubject] = useState(null);

  useEffect(() => {
    fetchToday();
  }, []);

  const fetchToday = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/attendance/today/${semesterId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    setData(res.data);
  };

  const markAttendance = async (subject, status) => {
    await axios.post(
      `http://localhost:5000/api/attendance/mark/${semesterId}`,
      { subject, status, date: data.date },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setEditSubject(null);
    fetchToday();
    window.dispatchEvent(new Event("attendance-updated"));
  };

  if (!data)
    return (
      <div className="text-slate-500 font-bold animate-pulse">
        Loading today's schedule...
      </div>
    );

  return (
    <div className="glass-panel p-6 rounded-[2rem]">
      <header className="mb-8">
        <h2 className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">
          Mark Attendance
        </h2>
        <h3 className="text-2xl font-black text-white mt-1">
          {data.day}{" "}
          <span className="text-neon-cyan text-sm block font-medium tracking-normal opacity-60">
            {data.date}
          </span>
        </h3>
      </header>

      {data.subjects.length === 0 ? (
        <div className="p-10 text-center border-2 border-dashed border-white/5 rounded-3xl">
          <p className="text-slate-500 font-bold">
            No classes today 🎉 <br /> Relax, buddy!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.subjects.map((subject) => {
            const marked = data.marked.find((m) => m.subject === subject);
            const isEditing = editSubject === subject;

            return (
              <div
                key={subject}
                className="bg-white/5 p-5 rounded-3xl border border-white/5 group hover:border-white/10 transition-all"
              >
                <div className="flex justify-between items-center mb-4">
                  <strong className="text-lg text-white group-hover:text-neon-cyan transition-colors">
                    {subject}
                  </strong>
                  {marked && !isEditing && (
                    <span
                      className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${marked.status === "Present" ? "bg-cyan-500/10 text-neon-cyan" : "bg-red-500/10 text-red-400"}`}
                    >
                      {marked.status}
                    </span>
                  )}
                </div>

                {marked && !isEditing ? (
                  <button
                    onClick={() => setEditSubject(subject)}
                    className="text-xs font-bold text-slate-500 hover:text-white transition-colors"
                  >
                    ✏️ Change Status
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => markAttendance(subject, "Present")}
                      className="flex-1 py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-midnight font-black text-sm shadow-lg shadow-green-500/20 active:scale-95 transition-all cursor-pointer"
                    >
                      Present
                    </button>
                    <button
                      onClick={() => markAttendance(subject, "Absent")}
                      className="flex-1 py-3 rounded-2xl border border-red-500/30 text-red-400 font-black text-sm hover:bg-red-500/10 active:scale-95 transition-all cursor-pointer"
                    >
                      Absent
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
