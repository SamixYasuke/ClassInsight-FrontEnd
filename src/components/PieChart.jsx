import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ chartData, aspect }) => {
  const options = {
    plugins: {
      legend: {
        display: false, // Set to true if you want to display the legend
      },
    },
  };

  return (
    <>
      <Pie data={chartData} options={options} />
      <p>{aspect}</p>
    </>
  );
};

export default PieChart;
