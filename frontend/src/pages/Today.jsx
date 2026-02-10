import TodayAttendance from "../components/Attendance/TodayAttendance";
import MonthlyTimetableCalendar from "../components/Attendance/MonthlyTimetableCalendar";
import BackButton from "../components/Common/BackButton";

export default function Today() {
  return (
    <div style={{ display: "flex", gap: 20, padding: 20 }}>
      {/* LEFT : Attendance */}
      <BackButton />
      <div style={{ flex: 3 }}>
        <TodayAttendance />
      </div>

      {/* RIGHT : Calendar */}
      <div style={{ flex: 4 }}>
        <MonthlyTimetableCalendar />
      </div>
    </div>
  );
}
