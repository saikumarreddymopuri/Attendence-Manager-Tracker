import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

export default function SemesterSetupGuard({ children }) {
  const { semesterId } = useParams();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSetup = async () => {
      try {
        const res = await api.get(`/semesters/${semesterId}`);

        if (!res.data.isSetupComplete) {
          navigate(`/semester/${semesterId}/setup`);
        } else {
          setChecking(false);
        }
      } catch (err) {
        console.error("Setup guard failed", err);
      }
    };

    checkSetup();
  }, [semesterId, navigate]);

  if (checking) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return children;
}
