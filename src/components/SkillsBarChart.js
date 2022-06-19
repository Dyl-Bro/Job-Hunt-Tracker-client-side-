import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function SkillsBarChart({ info }) {
  const [chartData, setChartData] = useState({
    labels: ["Behavioral", "Coding", "System Design"],
    datasets: [
      {
        label: "Interview Skills Score",
        data: [info.behaviorScore, info.codingScore, info.sysDesignScore],
        backgroundColor: ["#98fb98"],
      },
    ],
  });
  useEffect(() => {
    setChartData({
      labels: ["Behavioral", "Coding", "System Design"],
      datasets: [
        {
          label: "Interview Skills Score Percentages",
          data: [info.behaviorScore, info.codingScore, info.sysDesignScore],
          backgroundColor: ["#98fb98"],
        },
      ],
    });
  }, [info]);

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
}

export default SkillsBarChart;
