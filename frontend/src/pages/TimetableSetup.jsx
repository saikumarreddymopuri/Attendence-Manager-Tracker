import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function TimetableSetup() {
  const { semesterId } = useParams();
  const navigate = useNavigate();

  const [timetable, setTimetable] = useState(
    DAYS.reduce((acc, day) => {
      acc[day] = "";
      return acc;
    }, {})
  );

  const handleChange = (day, value) => {
    setTimetable({ ...timetable, [day]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    // Convert comma-separated subjects to array
    const formatted = Object.entries(timetable).map(
      ([day, subjects]) => ({
        day,
        subjects: subjects
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      })
    );

    await axios.post(
      `http://localhost:5000/api/timetable/${semesterId}`,
      { timetable: formatted },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    navigate(`/semester/${semesterId}/setup/subjects`);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2 style={{ marginTop: 20 }}>Weekly Timetable Setup</h2>
      <p>
        Enter subjects conducted on each day.  
        Separate multiple subjects with commas.
      </p>

      {DAYS.map((day) => (
        <div key={day} style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontWeight: "bold" }}>
            {day}
          </label>
          <input
            type="text"
            placeholder="e.g. Anatomy, Physiology"
            value={timetable[day]}
            onChange={(e) => handleChange(day, e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
      ))}

      <button
        onClick={handleSave}
        style={{
          marginTop: 20,
          padding: "10px 16px",
          fontSize: 16,
        }}
      >
        Save & Continue →
      </button>
    </div>
  );
}
