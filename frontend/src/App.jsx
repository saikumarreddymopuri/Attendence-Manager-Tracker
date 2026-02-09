import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Layout/Navbar";

import Dashboard from "./pages/Dashboard";
import Today from "./pages/Today";
import AbsentHistory from "./pages/AbsentHistory";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

import SemesterGuard from "./pages/SemesterGuard";
import SemesterSelection from "./pages/SemesterSelection";
import AddSemester from "./pages/AddSemester";
import SetupLanding from "./pages/SetupLanding";
import TimetableSetup from "./pages/TimetableSetup";

import SemesterSetupGuard from "./components/SemesterSetupGuard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ padding: 20 }}>
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ================= ENTRY AFTER LOGIN ================= */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SemesterGuard />
              </ProtectedRoute>
            }
          />

          {/* ================= SEMESTER SELECTION ================= */}
          <Route
            path="/select-semester"
            element={
              <ProtectedRoute>
                <SemesterSelection />
              </ProtectedRoute>
            }
          />

          {/* ================= ADD SEMESTER ================= */}
          <Route
            path="/add-semester"
            element={
              <ProtectedRoute>
                <AddSemester />
              </ProtectedRoute>
            }
          />

          {/* ================= SETUP LANDING (NO SETUP GUARD) ================= */}
          <Route
            path="/semester/:semesterId/setup"
            element={
              <ProtectedRoute>
                <SetupLanding />
              </ProtectedRoute>
            }
          />
          {/* ================= TIMETABLE SETUP (GUARDED) ================= */}
          <Route
            path="/semester/:semesterId/setup/timetable"
            element={
              <ProtectedRoute>
                <TimetableSetup />
              </ProtectedRoute>
            }
          />

          {/* ================= NORMAL SEMESTER PAGES (GUARDED) ================= */}
          <Route
            path="/semester/:semesterId/dashboard"
            element={
              <ProtectedRoute>
                <SemesterSetupGuard>
                  <Dashboard />
                </SemesterSetupGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/semester/:semesterId/today"
            element={
              <ProtectedRoute>
                <SemesterSetupGuard>
                  <Today />
                </SemesterSetupGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/semester/:semesterId/absent"
            element={
              <ProtectedRoute>
                <SemesterSetupGuard>
                  <AbsentHistory />
                </SemesterSetupGuard>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
