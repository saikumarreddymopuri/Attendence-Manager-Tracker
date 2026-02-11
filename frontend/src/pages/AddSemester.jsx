import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function AddSemester() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/semesters", form);

      nav(`/semester/${res.data._id}/setup`);
    } catch (err) {
      console.error("Create semester failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-midnight p-6 flex items-center justify-center">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md glass-panel p-10 rounded-[2.5rem] border-white/10">
        <button
          onClick={() => nav(-1)}
          className="mb-8 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-tighter"
        >
          ← Back
        </button>

        <header className="mb-10">
          <h2 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-2 opacity-60">
            Welcome back, {user?.name.split(" ")[0]} 👋
          </h2>

          <h1 className="text-3xl font-black text-white italic tracking-tighter">
            ADD <span className="text-neon-cyan">SEMESTER</span>
          </h1>

          <div className="h-[2px] w-12 bg-neon-cyan mt-2"></div>
        </header>

        <form onSubmit={submit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
              Semester Name
            </label>

            <input
              placeholder="e.g. 3rd Year - 1st Sem"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
              className="w-full px-6 py-4 rounded-2xl bg-midnight/50 border border-white/5 text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                Start Date
              </label>

              <input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    startDate: e.target.value,
                  })
                }
                required
                className="w-full px-6 py-4 rounded-2xl bg-midnight/50 border border-white/5 text-white outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                End Date
              </label>

              <input
                type="date"
                value={form.endDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    endDate: e.target.value,
                  })
                }
                required
                className="w-full px-6 py-4 rounded-2xl bg-midnight/50 border border-white/5 text-white outline-none"
              />
            </div>
          </div>

          <button className="w-full py-5 mt-4 bg-neon-cyan text-midnight font-black text-lg rounded-[2rem] transition-all cursor-pointer">
            CREATE SEMESTER
          </button>
        </form>
      </div>
    </div>
  );
}
