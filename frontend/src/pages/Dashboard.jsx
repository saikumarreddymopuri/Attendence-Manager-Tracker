import { useEffect, useState } from "react";
import { getEligibility } from "../utils/api";

import OverallCard from "../components/Dashboard/OverallCard";
import SubjectCard from "../components/Dashboard/SubjectCard";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getEligibility().then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    const refetch = () => getEligibility().then((res) => setData(res.data));
    window.addEventListener("attendance-updated", refetch);
    return () => window.removeEventListener("attendance-updated", refetch);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>MedAttend Dashboard</h1>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Glad to see you back <p style={{ margin: 0, color: "#555" }}>{user?.name}👋</p> </h2>
      </div>

      <OverallCard overall={data.overall} />

      <h2>Subjects</h2>
      {data.subjects.map((sub) => (
        <SubjectCard key={sub.subject} data={sub} />
      ))}

      {/* <AttendanceBarChart subjects={data.subjects} /> */}
    </div>
  );
}
