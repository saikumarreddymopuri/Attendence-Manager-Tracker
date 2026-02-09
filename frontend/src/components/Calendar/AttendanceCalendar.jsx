import { useEffect, useState } from "react";
import { getAttendanceByMonth } from "../../utils/api";

export default function AttendanceCalendar() {
  const today = new Date();
  const [month, setMonth] = useState(
    today.toISOString().slice(0, 7)
  );
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getAttendanceByMonth(month).then((res) =>
      setRecords(res.data)
    );
  }, [month]);

  // group by date
  const byDate = records.reduce((acc, r) => {
    acc[r.date] = acc[r.date] || [];
    acc[r.date].push(r);
    return acc;
  }, {});

  return (
    <div>
      <h2>Attendance Calendar</h2>

      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />

      <div style={{ marginTop: 20 }}>
        {Object.keys(byDate).length === 0 && (
          <p>No attendance data</p>
        )}

        {Object.entries(byDate).map(([date, items]) => (
          <div
            key={date}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <strong>{date}</strong>

            <ul>
              {items.map((i, idx) => (
                <li key={idx}>
                  {i.subject} —{" "}
                  <span
                    style={{
                      color:
                        i.status === "Present"
                          ? "green"
                          : "red",
                    }}
                  >
                    {i.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
