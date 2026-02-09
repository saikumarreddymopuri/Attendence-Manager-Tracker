import { useEffect, useState } from "react";
import { getFullTimetable } from "../../utils/api";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function WeeklyTimetable() {
  const [table, setTable] = useState({});

  useEffect(() => {
    getFullTimetable().then((res) => {
      const map = {};
      res.data.forEach((d) => {
        map[d.day] = d.subjects;
      });
      setTable(map);
    });
  }, []);

  return (
    <div>
      <h3>Weekly Timetable</h3>

      {DAYS.map((day) => (
        <div key={day} style={{ marginBottom: 8 }}>
          <strong>{day}</strong>
          <div style={{ marginLeft: 10 }}>
            {table[day]?.length ? (
              table[day].map((s) => (
                <div key={s}>• {s}</div>
              ))
            ) : (
              <span>No class</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
