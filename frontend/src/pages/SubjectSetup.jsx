import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function SubjectSetup() {
  const { semesterId } = useParams();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/timetable/${semesterId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const uniqueSubjects = [
        ...new Set(res.data.flatMap((d) => d.subjects)),
      ];

      const prepared = uniqueSubjects.map((name) => ({
        name,
        totalPlannedClasses: "",
        requiredPercentage: 75,
      }));

      setSubjects(prepared);
      setLoading(false);
    };
    fetchSubjects();
  }, [semesterId]);

  const handleChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    for (const s of subjects) {
      if (!s.totalPlannedClasses) {
        alert(`Please enter total classes for ${s.name}, buddy!`);
        return;
      }
    }

    await axios.post(
      `http://localhost:5000/api/subjects/${semesterId}`,
      { subjects },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await axios.patch(
      `http://localhost:5000/api/semesters/${semesterId}/complete-setup`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    navigate(`/semester/${semesterId}/dashboard`);
  };

  if (loading) return (
    <div className="min-h-screen bg-midnight flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-midnight pb-20 p-6 md:p-12">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest cursor-pointer"
        >
          ← Back to Timetable
        </button>

        <header className="mb-12">
          <h2 className="text-4xl font-black text-white italic tracking-tighter">
            SUBJECT <span className="text-neon-purple">DETAILS</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm font-medium leading-relaxed">
            Specify the total classes planned for the semester. 
            We use this to calculate your <span className="text-neon-purple font-bold">Eligibility & Bunk limits.</span>
          </p>
        </header>

        <div className="grid gap-6">
          {subjects.map((subj, idx) => (
            <div
              key={subj.name}
              className="glass-panel p-8 rounded-[2.5rem] border border-white/5 hover:border-neon-purple/30 transition-all duration-300 group"
            >
              <h4 className="text-white font-black text-xl mb-6 tracking-tight flex items-center gap-3">
                <span className="w-2 h-8 bg-neon-purple rounded-full"></span>
                {subj.name}
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    Total Planned Classes
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 45"
                    value={subj.totalPlannedClasses}
                    onChange={(e) => handleChange(idx, "totalPlannedClasses", e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-midnight/50 border border-white/5 text-white outline-none focus:border-neon-purple focus:ring-4 focus:ring-neon-purple/10 transition-all font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    Required Attendance %
                  </label>
                  <input
                    type="number"
                    value={subj.requiredPercentage}
                    onChange={(e) => handleChange(idx, "requiredPercentage", e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-midnight/50 border border-white/5 text-neon-cyan outline-none focus:border-neon-cyan focus:ring-4 focus:ring-neon-cyan/10 transition-all font-bold"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center">
          <button
            onClick={handleSave}
            className="w-full max-w-sm py-5 bg-gradient-to-r from-neon-purple to-indigo-600 rounded-[2rem] text-white font-black text-xl shadow-[0_20px_40px_rgba(139,92,246,0.3)] hover:shadow-neon-purple/50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer uppercase tracking-widest"
          >
            Finish Setup 🎉
          </button>
          <p className="mt-6 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
            Almost there! Finalize to enter your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}