const STATUS_COLORS = {
  SAFE: "#4caf50",
  BORDER: "#ff9800",
  DANGER: "#f44336",
};

export default function OverallCard({ overall }) {
  if (!overall) return null;

  const percentage = Math.round(
    (overall.totalAttended / overall.totalPlanned) * 100
  );

  const status = overall.status; // 🔥 USE BACKEND STATUS
  const color = STATUS_COLORS[status];

  const needToAttend = Math.max(
    0,
    Math.ceil(overall.totalPlanned * 0.75) -
      overall.totalAttended
  );

  return (
    <div
      style={{
        border: `2px solid ${color}`,
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
          color,
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
        <div
          style={{
            width: `${percentage}%`,
            background: color,
            height: "100%",
            borderRadius: 8,
          }}
        />

        {/* 75% Marker */}
        <div
          style={{
            position: "absolute",
            left: "75%",
            top: -26,
            transform: "translateX(-50%)",
            fontSize: 11,
            color: "#555",
          }}
        >
          75%
        </div>

        <div
          style={{
            position: "absolute",
            left: "75%",
            top: 0,
            height: "100%",
            width: 2,
            background: "#555",
          }}
        />
      </div>

      {/* Numbers */}
      <div style={{ marginBottom: 6 }}>
        <strong>{overall.totalAttended}</strong> /{" "}
        <strong>{overall.totalPlanned}</strong>{" "}
        classes attended
      </div>

      <div style={{ marginBottom: 6 }}>
        <strong>Need to Attend:</strong>{" "}
        <strong>{needToAttend}</strong> classes
      </div>

      {/* Status */}
      <div>
        Status:{" "}
        <strong style={{ color }}>
          {status}
        </strong>
      </div>
    </div>
  );
}
