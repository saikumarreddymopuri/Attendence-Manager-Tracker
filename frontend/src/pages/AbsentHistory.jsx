import AbsentTable from "../components/Attendance/AbsentTable";

export default function AbsentHistory() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Absent History</h1>
      <p>
        This table shows only the classes you missed.
      </p>

      <AbsentTable />
    </div>
  );
}
