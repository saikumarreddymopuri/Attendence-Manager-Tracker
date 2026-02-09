import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SemesterGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSemesters = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/semesters",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const semesters = res.data;

      // 🔒 FINAL RULE
      if (semesters.length === 0) {
        navigate("/add-semester");
      } else {
        navigate("/select-semester");
      }
    };

    checkSemesters();
  }, []);

  return null;
}
