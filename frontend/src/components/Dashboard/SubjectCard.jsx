import SubjectPie from "./SubjectPie";

const colors = {
  SAFE: "green",
  BORDER: "orange",
  DANGER: "red",
};

export default function SubjectCard({ data }) {
  const percentage = Math.round(
    (data.attended / data.totalClasses) * 100
  );

  return (
    <div
      style={{
        border: `2px solid ${colors[data.status]}`,
        borderRadius: 8,
        padding: 14,
        marginBottom: 14,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT CONTENT */}
      <div>
        <h3 style={{ marginBottom: 6 }}>
          {data.subject}
        </h3>

        {/* Percentage */}
        <div
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: colors[data.status],
            marginBottom: 6,
          }}
        >
          {percentage}%
        </div>

        {/* Absolute numbers (IMPORTANT) */}
        <div style={{ marginBottom: 6 }}>
          <strong>{data.attended}</strong> /{" "}
          <strong>{data.totalClasses}</strong>{" "}
          classes attended
        </div>

        {/* Eligibility numbers */}
        <div>
          <strong>Safe Miss Left:</strong>{" "}
          {data.safeMissLeft}
        </div>
        <div>
          <strong>Classes to Attend More:</strong>{" "}
          {data.classesToAttendMore}
        </div>
      </div>

      {/* RIGHT PIE */}
      <SubjectPie
  attended={data.attended}
  needToAttend={data.classesToAttendMore}
/>

    </div>
  );
}
