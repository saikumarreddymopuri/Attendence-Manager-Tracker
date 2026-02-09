import { useEffect, useState } from "react";
import { getAbsentHistory } from "../../utils/api";

export default function AbsentTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAbsentHistory().then((res) => {
      setData(res.data);
    });
  }, []);

  if (data.length === 0) {
    return <p>🎉 No absents recorded</p>;
  }

  // GROUP BY DATE
  const grouped = data.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item.subject);
    return acc;
  }, {});

  return (
    <div style={{ marginTop: 20 }}>
      {Object.entries(grouped).map(([date, subjects]) => {
        const day = new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
        });

        return (
          <div
            key={date}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <strong>
              📅 {day} – {date}
            </strong>

            <ul style={{ marginTop: 8 }}>
              {subjects.map((sub, idx) => (
                <li key={idx}>❌ {sub}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
