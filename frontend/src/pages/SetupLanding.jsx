import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/Common/BackButton";

export default function SetupLanding() {
  const { semesterId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSetupStatus = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          `http://localhost:5000/api/semesters/${semesterId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // 🔒 If setup already done → go to dashboard
        if (res.data.isSetupComplete) {
          navigate(`/semester/${semesterId}/dashboard`);
        } else {
          setLoading(false); // allow setup UI
        }
      } catch (err) {
        console.error("Failed to load semester", err);
      }
    };

    checkSetupStatus();
  }, [semesterId, navigate]);

  if (loading) {
    return <p>Checking setup status...</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "60px auto" }}>
      <BackButton to="/select-semester" label="Back to Semesters" />
      <h2>Semester Setup</h2>

      <p>
        Before you start tracking attendance, we need a few details about this
        semester.
      </p>

      <ul>
        <li>📅 Weekly timetable</li>
        <li>📚 Subject & class details</li>
      </ul>

      <button
        onClick={() =>
          navigate(`/semester/${semesterId}/setup/timetable`)
        }
        style={{ marginTop: 20 }}
      >
        Start Setup →
      </button>
    </div>
  );
}
