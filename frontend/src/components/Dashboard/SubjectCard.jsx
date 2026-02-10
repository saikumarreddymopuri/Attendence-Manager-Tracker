import SubjectPie from "./SubjectPie";

const STATUS_COLORS = {
  SAFE: "#4caf50",
  BORDER: "#ff9800",
  DANGER: "#f44336",
};

export default function SubjectCard({ data }) {
  const percentage = Math.round(
    (data.attended / data.totalClasses) * 100
  );

  const color = STATUS_COLORS[data.status];

  return (
    <div
      style={{
        border: `2px solid ${color}`,
        borderRadius: 8,
        padding: 14,
        marginBottom: 14,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT */}
      <div>
        <h3 style={{ marginBottom: 6 }}>
          {data.subject}
        </h3>

        <div
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color,
            marginBottom: 6,
          }}
        >
          {percentage}%
        </div>

        <div style={{ marginBottom: 6 }}>
          <strong>{data.attended}</strong> /{" "}
          <strong>{data.totalClasses}</strong>{" "}
          classes attended
        </div>

        <div>
          <strong>Safe Miss Left:</strong>{" "}
          {data.safeMissLeft}
        </div>

        <div>
          <strong>Need to Attend:</strong>{" "}
          {data.classesToAttendMore}
        </div>

        <div>
          Status:{" "}
          <strong style={{ color }}>
            {data.status}
          </strong>
        </div>
      </div>

      {/* RIGHT */}
      <SubjectPie
        attended={data.attended}
        needToAttend={data.classesToAttendMore}
        color={color}   // 🔥 pass same color
      />
    </div>
  );
}
