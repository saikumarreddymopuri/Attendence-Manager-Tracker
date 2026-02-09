import { useEffect, useState } from "react";
import {
  getTimetableByDay,
  getTodayAttendance,
  markAttendance,
} from "../../utils/api";

export default function TodayAttendance() {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const dayName = today.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const [subjects, setSubjects] = useState([]);
  const [markedMap, setMarkedMap] = useState({});

  useEffect(() => {
    const loadData = async () => {
      // 1️⃣ get today's subjects
      const timetableRes = await getTimetableByDay(dayName);
      const todaysSubjects = timetableRes.data?.subjects || [];

      // 2️⃣ get today's attendance (DB truth)
      const attendanceRes = await getTodayAttendance(dateStr);
      const marked = {};
      attendanceRes.data.forEach((a) => {
        marked[a.subject] = a.status;
      });

      setSubjects(todaysSubjects);
      setMarkedMap(marked);
    };

    loadData();
  }, [dayName, dateStr]);

  const handleMark = async (subject, status) => {
    await markAttendance({
      date: dateStr,
      subject,
      status,
    });

    // lock UI immediately
    setMarkedMap((prev) => ({
      ...prev,
      [subject]: status,
    }));
  };

  return (
    <div>
      <h2>Today – {dayName}</h2>

      {subjects.length === 0 && (
        <p>No classes scheduled today 🎉</p>
      )}

      {subjects.map((sub) => (
        <div
          key={sub}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 6,
            marginBottom: 10,
          }}
        >
          <strong>{sub}</strong>

          {markedMap[sub] ? (
            <p style={{ marginTop: 6 }}>
              Marked: <b>{markedMap[sub]}</b>
            </p>
          ) : (
            <div style={{ marginTop: 6 }}>
              <button
                onClick={() => handleMark(sub, "Present")}
                style={{ marginRight: 10 }}
              >
                ✅ Present
              </button>
              <button
                onClick={() => handleMark(sub, "Absent")}
              >
                ❌ Absent
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
