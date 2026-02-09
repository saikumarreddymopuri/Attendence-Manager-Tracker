import TodayAttendance from "../components/Attendance/TodayAttendance";
import MonthlyTimetableCalendar from "../components/Attendance/MonthlyTimetableCalendar";

export default function Today() {
  return (
    <div style={{ display: "flex", gap: 20, padding: 20 }}>
      {/* LEFT */}
      <div style={{ flex: 3 }}>
        <TodayAttendance />
      </div>

      {/* RIGHT */}
      <div style={{ flex: 4 }}>
        <MonthlyTimetableCalendar />
      </div>
    </div>
  );
}
