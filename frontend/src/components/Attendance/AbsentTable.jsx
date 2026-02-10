import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAbsentHistory } from "../../utils/api";

export default function AbsentTable() {
  const { semesterId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    getAbsentHistory(semesterId).then((res) =>
      setData(res.data)
    );
  }, [semesterId]);

  if (data.length === 0) {
    return <p>No absences recorded 🎉</p>;
  }

  return (
    <div>
      {data.map((day) => (
        <div
          key={day.date}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            borderRadius: 8,
            marginBottom: 14,
          }}
        >
          <h3 style={{ marginBottom: 8 }}>
            📅 {day.date}
          </h3>

          <ul style={{ marginLeft: 16 }}>
            {day.subjects.map((sub, idx) => (
              <li key={idx}>❌ {sub}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
