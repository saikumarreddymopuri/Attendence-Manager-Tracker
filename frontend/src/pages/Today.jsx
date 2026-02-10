import TodayAttendance from "../components/Attendance/TodayAttendance";
import MonthlyTimetableCalendar from "../components/Attendance/MonthlyTimetableCalendar";

export default function Today() {
  return (
    <div className="min-h-screen bg-midnight pb-32 p-4 md:p-8">
      {/* Background Glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* LEFT : Attendance Marking Section */}
        <div className="flex-1 lg:max-w-md">
          <TodayAttendance />
        </div>

        {/* RIGHT : Calendar View Section */}
        <div className="flex-[1.5]">
          <MonthlyTimetableCalendar />
        </div>
      </div>
    </div>
  );
}