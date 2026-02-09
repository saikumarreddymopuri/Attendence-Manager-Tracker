import { NavLink, useNavigate, useLocation } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  marginRight: 16,
  textDecoration: "none",
  fontWeight: isActive ? "bold" : "normal",
});

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  if (!token) return null;

  // 🔑 Detect if user is inside a semester route
  const match = location.pathname.match(/\/semester\/([^/]+)/);
  const semesterId = match ? match[1] : null;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: 16,
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Show only when inside a semester */}
      {semesterId && (
        <>
          <NavLink
            to={`/semester/${semesterId}/dashboard`}
            style={linkStyle}
          >
            Dashboard
          </NavLink>

          <NavLink
            to={`/semester/${semesterId}/today`}
            style={linkStyle}
          >
            Today
          </NavLink>

          <NavLink
            to={`/semester/${semesterId}/absent`}
            style={linkStyle}
          >
            Absent History
          </NavLink>
        </>
      )}

      <button
        onClick={logout}
        style={{
          marginLeft: "auto",
          background: "red",
          color: "white",
          border: "none",
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}
