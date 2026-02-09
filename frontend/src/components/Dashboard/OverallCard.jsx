const getStatus = (percent) => {
  if (percent < 65) {
    return { text: "DANGER", color: "#f44336" };
  }
  if (percent < 75) {
    return { text: "NEED TO BE STRICT", color: "#ff9800" };
  }
  return { text: "SAFE", color: "#4caf50" };
};

export default function OverallCard({ overall }) {
  if (!overall) return null;

  const percentage = Math.round(
    (overall.totalAttended / overall.totalPlanned) * 100
  );

  const status = getStatus(percentage);

  return (
    <div
      style={{
        border: `2px solid ${status.color}`,
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
      }}
    >
      <h2>Overall Attendance</h2>

      {/* Percentage */}
      <div
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: status.color,
          marginBottom: 12,
        }}
      >
        {percentage}%
      </div>

      {/* Progress Bar */}
      <div
        style={{
          position: "relative",
          background: "#eee",
          borderRadius: 8,
          height: 18,
          marginBottom: 18,
        }}
      >
        {/* Filled part */}
        <div
          style={{
            width: `${percentage}%`,
            background: status.color,
            height: "100%",
            borderRadius: 8,
          }}
        />

        {/* 75% Target Badge */}
        <div
          style={{
            position: "absolute",
            left: "75%",
            top: -28,
            transform: "translateX(-50%)",
            background: "#000",
            color: "#fff",
            fontSize: 11,
            padding: "2px 6px",
            borderRadius: 4,
          }}
        >
          75% Target
        </div>

        {/* Target pointer */}
        <div
          style={{
            position: "absolute",
            left: "75%",
            top: 0,
            height: "100%",
            width: 2,
            background: "#000",
          }}
        />
      </div>

      {/* Numbers */}
      <div style={{ marginBottom: 6 }}>
        <strong>{overall.totalAttended}</strong> /{" "}
        <strong>{overall.totalPlanned}</strong>{" "}
        classes attended
      </div>

      {/* 🔥 FIXED: Need to Attend WITH NUMBER */}
      <div style={{ marginBottom: 6 }}>
  <strong>Need to Attend (to reach 75%):</strong>{" "}
  <strong>{Math.max(0, Math.ceil(overall.totalPlanned * 0.75) - overall.totalAttended)}</strong>{" "}
  classes
</div>


      {/* 🔥 FIXED: Status text matches color */}
      <div>
        Status:{" "}
        <strong style={{ color: status.color }}>
          {status.text}
        </strong>
      </div>
    </div>
  );
}
