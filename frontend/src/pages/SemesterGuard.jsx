import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function SemesterGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSemesters = async () => {
      try {
        const res = await api.get("/semesters");
        const semesters = res.data;

        if (semesters.length === 0) {
          navigate("/add-semester");
        } else {
          navigate("/select-semester");
        }
      } catch (err) {
        console.error("Semester fetch failed", err);
        navigate("/login");
      }
    };

    checkSemesters();
  }, [navigate]);

  return null;
}
