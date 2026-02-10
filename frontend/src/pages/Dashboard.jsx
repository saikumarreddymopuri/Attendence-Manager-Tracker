import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEligibility } from "../utils/api";

import OverallCard from "../components/Dashboard/OverallCard";
import SubjectCard from "../components/Dashboard/SubjectCard";
import BackButton from "../components/Common/BackButton";

export default function Dashboard() {
  const { semesterId } = useParams();
  const [data, setData] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch eligibility for this semester
  const fetchEligibility = async () => {
    const res = await getEligibility(semesterId);
    setData(res.data);
  };

  useEffect(() => {
    fetchEligibility();
  }, [semesterId]);

  // Optional live refresh after attendance update
  useEffect(() => {
    const refetch = () => fetchEligibility();
    window.addEventListener("attendance-updated", refetch);
    return () =>
      window.removeEventListener("attendance-updated", refetch);
  }, [semesterId]);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>MedAttend Dashboard</h1>

      <BackButton to="/select-semester" />

      {/* Greeting */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>
          Glad to see you back{" "}
          <span style={{ color: "#555" }}>
            {user?.name} 👋
          </span>
        </h2>
      </div>

      {/* Overall summary */}
      <OverallCard overall={data.overall} />

      {/* Subject-wise cards */}
      <h2>Subjects</h2>
      {data.subjects.map((sub) => (
        <SubjectCard key={sub.subject} data={sub} />
      ))}
    </div>
  );
}
