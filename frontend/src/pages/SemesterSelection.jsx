import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import BackButton from "../components/Common/BackButton";

export default function SemesterSelection() {
  const [semesters, setSemesters] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const fetchSemesters = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/semesters",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSemesters(res.data);
    };

    fetchSemesters();
  }, []);

  return (
    
    <div style={{ maxWidth: 500, margin: "60px auto" }}>
      {/* 🔐 LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            background: "#f44336",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
        <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Glad to see you back <p style={{ margin: 0, color: "#555" }}>{user?.name}👋</p> </h2>
      </div>
      {/* <BackButton /> */}
      <h2>Select Semester</h2>
      

      {semesters.map((sem) => (
        <div
          key={sem._id}
          onClick={() =>
            navigate(`/semester/${sem._id}/dashboard`)
          }
          style={{
            padding: 12,
            border: "1px solid #ccc",
            borderRadius: 6,
            marginBottom: 10,
            cursor: "pointer",
          }}
        >
          <strong>{sem.name}</strong>
          <div style={{ fontSize: 12, color: "#666" }}>
            {new Date(sem.startDate).toLocaleDateString()} –{" "}
            {new Date(sem.endDate).toLocaleDateString()}
          </div>
        </div>
      ))}

      <button
        onClick={() => navigate("/add-semester")}
        style={{ marginTop: 20 }}
      >
        + Add New Semester
      </button>
    </div>
  );
}
