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
      }
    );
    setData(res.data);
  };

  const markAttendance = async (subject, status) => {
    await axios.post(
      `http://localhost:5000/api/attendance/mark/${semesterId}`,
      {
        subject,
        status,
        date: data.date,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setEditSubject(null);
    fetchToday();

    // notify dashboard
    window.dispatchEvent(new Event("attendance-updated"));
  };

  if (!data) return <p>Loading today...</p>;

  return (
    <div>
      <h3>
        Today – {data.day} ({data.date})
      </h3>

      {data.subjects.length === 0 && <p>No classes today 🎉</p>}

      {data.subjects.map((subject) => {
        const marked = data.marked.find(
          (m) => m.subject === subject
        );

        const isEditing = editSubject === subject;

        return (
          <div
            key={subject}
            style={{
              border: "1px solid #ccc",
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <strong>{subject}</strong>

            {/* STATUS VIEW */}
            {marked && !isEditing && (
              <div style={{ marginTop: 6 }}>
                <p>
                  Status:{" "}
                  <strong>{marked.status}</strong>
                </p>
                <button
                  onClick={() => setEditSubject(subject)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  ✏️ Update
                </button>
              </div>
            )}

            {/* MARK / UPDATE VIEW */}
            {(!marked || isEditing) && (
              <div style={{ marginTop: 6 }}>
                <button
                  onClick={() =>
                    markAttendance(subject, "Present")
                  }
                >
                  Present
                </button>
                <button
                  onClick={() =>
                    markAttendance(subject, "Absent")
                  }
                  style={{ marginLeft: 10 }}
                >
                  Absent
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
