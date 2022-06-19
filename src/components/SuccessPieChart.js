import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

//lable_1=no, lable_2=yes
function SuccessPieChart({
  chart_title,
  lable_1,
  lable_2,
  value_1,
  value_2,
  success_rate,
}) {
  console.log(chart_title);
  const total = value_1 + value_2;
  const [chartData, setChartData] = useState({
    labels: [lable_1, lable_2],
    datasets: [
      {
        label: chart_title,
        data: [value_1, value_2],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "#98fb98"],
        borderColor: ["#f00", " #008000"],
        hoverOffset: 4,
      },
    ],
  });
  useEffect(() => {
    setChartData({
      labels: [lable_1, lable_2],
      datasets: [
        {
          label: chart_title,
          data: [value_1, value_2],
          backgroundColor: ["rgba(255, 99, 132, 0.7)", "#98fb98"],
          borderColor: ["#f00", " #008000"],
          hoverOffset: 4,
        },
      ],
    });
  }, [chart_title, lable_1, lable_2, value_1, value_2]);
  return (
    <div className="">
      <h1 className="mt-4 text-white text-left">
        {chart_title}: <span className="text-green-500"> {success_rate}% </span>
      </h1>
      <Pie data={chartData} />
    </div>
  );
}

export default SuccessPieChart;
