import { useLocation } from "react-router-dom";

export default function useShouldShowNavbar() {
  const location = useLocation();

  // Hide navbar on setup & auth pages
  if (
    location.pathname.includes("/setup") ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/select-semester" ||
    location.pathname === "/add-semester"
  ) {
    return false;
  }

  return true;
}
