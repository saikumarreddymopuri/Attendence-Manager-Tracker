import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getEligibility = () => api.get("/eligibility");

export const getTimetableByDay = (day) =>
  api.get(`/timetable/${day}`);

export const markAttendance = (data) =>
  api.post("/attendance", data);

export const getAttendanceByMonth = (month) =>
  api.get(`/attendance?month=${month}`);

// get today's attendance (lock UI)
export const getTodayAttendance = (date) =>
  api.get(`/attendance/today?date=${date}`);

// get weekly timetable (all days)
export const getFullTimetable = () =>
  api.get("/timetable");

export const getAbsentHistory = () =>
  api.get("/attendance/absent");


export const registerUser = (data) =>
  api.post("/auth/register", data);

export const loginUser = (data) =>
  api.post("/auth/login", data);




export default api;
