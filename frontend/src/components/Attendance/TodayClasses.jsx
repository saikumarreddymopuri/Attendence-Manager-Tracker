import { useEffect, useState } from "react";
import { getTimetableByDay, markAttendance } from "../../utils/api";

export default function TodayClasses() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marked, setMarked] = useState({});

  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const dateStr = today.toISOString().split("T")[0];

  useEffect(() => {
    getTimetableByDay(dayName)
      .then((res) => {
        setSubjects(res.data?.subjects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [dayName]);

  const handleMark = async (subject, status) => {
    await markAttendance({
      date: dateStr,
      subject,
      status,
    });

    setMarked((prev) => ({
      ...prev,
      [subject]: status,
    }));
  };

  window.dispatchEvent(new Event("attendance-updated"));



  if (loading) return <p>Loading today’s classes...</p>;

  if (subjects.length === 0)
    return <p>No classes scheduled for today 🎉</p>;

  return (
    <div>
      <h2>
        Today – {dayName} ({dateStr})
      </h2>

      {subjects.map((sub) => (
        <div
          key={sub}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <h3>{sub}</h3>

          {marked[sub] ? (
            <p>
              Marked as <strong>{marked[sub]}</strong>
            </p>
          ) : (
            <>
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
            </>
          )}
        </div>
      ))}
    </div>
  );
}
