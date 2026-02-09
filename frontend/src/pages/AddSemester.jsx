import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddSemester() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });
  const user = JSON.parse(localStorage.getItem("user"));

  const submit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    

    const res = await axios.post("http://localhost:5000/api/semesters", form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    nav(`/semester/${res.data._id}/dashboard`);
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto" }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Glad to see you back <p style={{ margin: 0, color: "#555" }}>{user?.name}👋</p> </h2>
        
      </div>

      <h2>Add Semester</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Semester name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <br />
        <br />

        <label>Start Date</label>
        <input
          type="date"
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          required
        />
        <br />
        <br />

        <label>End Date</label>
        <input
          type="date"
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          required
        />
        <br />
        <br />

        <button>Create Semester</button>
      </form>
    </div>
  );
}
