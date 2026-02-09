import { useEffect, useState } from "react";
import { getFullTimetable } from "../../utils/api";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthlyTimetableCalendar() {
  const [timetable, setTimetable] = useState({});

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed

  useEffect(() => {
    getFullTimetable().then((res) => {
      const map = {};
      res.data.forEach((d) => {
        map[d.day] = d.subjects;
      });
      setTimetable(map);
    });
  }, []);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  return (
    <div>
      <h3 style={{ marginBottom: 10 }}>
        {today.toLocaleString("default", { month: "long" })} {year}
      </h3>

      {/* Day headers */}
      <div style={grid}>
        {DAYS.map((d) => (
          <strong key={d} style={{ textAlign: "center" }}>
            {d}
          </strong>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={grid}>
        {/* Empty boxes before month starts */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Date boxes */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = new Date(year, month, i + 1);
          const dayName = date.toLocaleDateString("en-US", {
            weekday: "long",
          });

          const subjects =
            dayName === "Sunday" ? [] : timetable[dayName] || [];

          const isToday =
            date.toDateString() === new Date().toDateString();

          return (
            <div
              key={i}
              style={{
                border: "1px solid #ddd",
                padding: 6,
                minHeight: 80,
                background: isToday ? "#eef" : "white",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                {i + 1} ({dayName.slice(0, 3)})
              </div>

              {subjects.map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    marginTop: 4,
                    fontSize: 12,
                    background: "#e6f4ea",
                    padding: "2px 4px",
                    borderRadius: 4,
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: 4,
};
