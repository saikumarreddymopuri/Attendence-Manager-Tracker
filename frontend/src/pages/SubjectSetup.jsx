import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function SubjectSetup() {
  const { semesterId } = useParams();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch subjects from timetable
  useEffect(() => {
    const fetchSubjects = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/timetable/${semesterId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Extract unique subject names
      const uniqueSubjects = [
        ...new Set(
          res.data.flatMap((d) => d.subjects)
        ),
      ];

      const prepared = uniqueSubjects.map((name) => ({
        name,
        totalPlannedClasses: "",
        requiredPercentage: 75,
      }));

      setSubjects(prepared);
      setLoading(false);
    };

    fetchSubjects();
  }, [semesterId]);

  const handleChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    // Basic validation
    for (const s of subjects) {
      if (!s.totalPlannedClasses) {
        alert(`Enter total classes for ${s.name}`);
        return;
      }
    }

    // Save subjects
    await axios.post(
      `http://localhost:5000/api/subjects/${semesterId}`,
      { subjects },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Mark semester setup complete
    await axios.patch(
      `http://localhost:5000/api/semesters/${semesterId}/complete-setup`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Go to dashboard 🎉
    navigate(`/semester/${semesterId}/dashboard`);
  };

  if (loading) return <p>Loading subjects...</p>;

  return (
    <div style={{ maxWidth: 700, margin: "50px auto" }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2 style={{ marginTop: 20 }}>Subject Setup</h2>
      <p>
        Enter total planned classes for each subject.
        Attendance eligibility will be calculated from this.
      </p>

      {subjects.map((subj, idx) => (
        <div
          key={subj.name}
          style={{
            border: "1px solid #ddd",
            padding: 12,
            borderRadius: 6,
            marginBottom: 12,
          }}
        >
          <h4>{subj.name}</h4>

          <div style={{ marginBottom: 8 }}>
            <label>Total Planned Classes</label>
            <input
              type="number"
              value={subj.totalPlannedClasses}
              onChange={(e) =>
                handleChange(
                  idx,
                  "totalPlannedClasses",
                  e.target.value
                )
              }
              style={{ width: "100%", padding: 6 }}
            />
          </div>

          <div>
            <label>Required Attendance %</label>
            <input
              type="number"
              value={subj.requiredPercentage}
              onChange={(e) =>
                handleChange(
                  idx,
                  "requiredPercentage",
                  e.target.value
                )
              }
              style={{ width: "100%", padding: 6 }}
            />
          </div>
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
        Finish Setup →
      </button>
    </div>
  );
}
