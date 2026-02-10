import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MonthlyTimetableCalendar() {
  const { semesterId } = useParams();
  const token = localStorage.getItem("token");

  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/timetable/${semesterId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setTimetable(res.data);
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getSubjectsForDate = (date) => {
    const dayName = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const dayEntry = timetable.find(
      (d) => d.day === dayName
    );

    return dayEntry ? dayEntry.subjects : [];
  };

  return (
    <div>
      <h3>Monthly Timetable</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 8,
        }}
      >
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(year, month, i + 1);
          const isSunday = date.getDay() === 0;
          if (isSunday) return null;

          const subjects = getSubjectsForDate(date);

          return (
            <div
              key={i}
              style={{
                border: "1px solid #ccc",
                padding: 6,
                borderRadius: 6,
                background:
                  date.toDateString() === today.toDateString()
                    ? "#e6f7ff"
                    : "#fff",
              }}
            >
              <strong>{i + 1}</strong>
              <div style={{ fontSize: 12 }}>
                {subjects.map((s) => (
                  <div key={s}>{s}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
