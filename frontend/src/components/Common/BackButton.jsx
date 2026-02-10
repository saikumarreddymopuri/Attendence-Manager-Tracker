import { useNavigate } from "react-router-dom";

export default function BackButton({
  label = "Back",
  to = null,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        marginBottom: 16,
        padding: "6px 12px",
        borderRadius: 6,
        border: "1px solid #ccc",
        background: "#f5f5f5",
        cursor: "pointer",
      }}
    >
      ⬅️ {label}
    </button>
  );
}
