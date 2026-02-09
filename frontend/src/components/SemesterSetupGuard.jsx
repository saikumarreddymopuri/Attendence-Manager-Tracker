import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function SemesterSetupGuard({ children }) {
  const { semesterId } = useParams();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSetup = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          `http://localhost:5000/api/semesters/${semesterId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // 🔒 If setup NOT completed → go to setup landing
        if (!res.data.isSetupComplete) {
          navigate(`/semester/${semesterId}/setup`);
        } else {
          setChecking(false); // allow children
        }
      } catch (err) {
        console.error("Setup guard failed", err);
      }
    };

    checkSetup();
  }, [semesterId, navigate]);

  if (checking) {
    return <p>Checking semester setup...</p>;
  }

  return children;
}
