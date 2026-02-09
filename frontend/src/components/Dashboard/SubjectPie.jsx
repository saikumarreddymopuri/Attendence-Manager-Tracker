import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip);

export default function SubjectPie({ attended, needToAttend }) {
  const data = {
    labels: ["Attended", "Need to Attend"],
    datasets: [
      {
        data: [attended, needToAttend],
        backgroundColor: ["#4caf50", "#ff9800"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: 100, height: 100 }}>
      <Pie data={data} options={options} />
    </div>
  );
}
