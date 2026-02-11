import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTodayAttendance, markAttendance } from "../../utils/api";

export default function TodayAttendance() {
  const { semesterId } = useParams();
  const [data, setData] = useState(null);
  const [editSubject, setEditSubject] = useState(null);

  useEffect(() => {
    fetchToday();
  }, [semesterId]);

  const fetchToday = async () => {
    const res = await getTodayAttendance(semesterId);
    setData(res.data);
  };

  const handleMark = async (subject, status) => {
    await markAttendance(semesterId, {
      subject,
      status,
      date: data.date,
    });

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
          {data.day}
          <span className="text-neon-cyan text-sm block font-medium opacity-60">
            {data.date}
          </span>
        </h3>
      </header>

      {data.subjects.length === 0 ? (
        <div className="p-10 text-center border-2 border-dashed border-white/5 rounded-3xl">
          <p className="text-slate-500 font-bold">
            No classes today 🎉
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.subjects.map((subject) => {
            const marked = data.marked.find(
              (m) => m.subject === subject
            );
            const isEditing = editSubject === subject;

            return (
              <div
                key={subject}
                className="bg-white/5 p-5 rounded-3xl border border-white/5"
              >
                <div className="flex justify-between items-center mb-4">
                  <strong className="text-lg text-white">
                    {subject}
                  </strong>

                  {marked && !isEditing && (
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        marked.status === "Present"
                          ? "bg-cyan-500/10 text-neon-cyan"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {marked.status}
                    </span>
                  )}
                </div>

                {marked && !isEditing ? (
                  <button
                    onClick={() => setEditSubject(subject)}
                    className="text-xs text-slate-500 hover:text-white"
                  >
                    ✏️ Change Status
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleMark(subject, "Present")}
                      className="flex-1 py-3 rounded-2xl bg-green-500 text-white font-bold"
                    >
                      Present
                    </button>

                    <button
                      onClick={() => handleMark(subject, "Absent")}
                      className="flex-1 py-3 rounded-2xl border border-red-500 text-red-400 font-bold"
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
