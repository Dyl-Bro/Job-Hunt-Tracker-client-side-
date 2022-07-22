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
  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: function (context) {
            let width = context.chart.width;
            let fontsize = Math.round(width / 32);
            return {
              size: fontsize,
            };
          },
        },
      },
      x: {
        ticks: {
          font: function (context) {
            let width = context.chart.width;
            let fontsize = Math.round(width / 32);
            return {
              size: fontsize,
            };
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: function (context) {
            let width = context.chart.width;
            let fontsize = Math.round(width / 32);
            return {
              size: fontsize,
            };
          },
        },
      },
    },
  };
  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default SkillsBarChart;
