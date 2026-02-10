import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});


// 🔐 Automatically attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export const getEligibility = (semesterId) =>
  api.get(`/eligibility?semesterId=${semesterId}`);


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

export const getAbsentHistory = (semesterId) =>
  api.get(`/attendance/absent/${semesterId}`);



export const registerUser = (data) =>
  api.post("/auth/register", data);

export const loginUser = (data) =>
  api.post("/auth/login", data);




export default api;
