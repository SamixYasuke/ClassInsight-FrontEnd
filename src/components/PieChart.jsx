import React from "react";
import { Doughnut } from "react-chartjs-2";

const PieChart = ({ chartData, aspect }) => {
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 8, // Adjust the width of each legend item as needed
          usePointStyle: true, // Use point style for the legend items (optional)
        },
      },
    },
  };

  return (
    <>
      <div>
        <Doughnut data={chartData} options={options} />
        <p style={{ textAlign: "center" }}>{aspect}</p>
      </div>
    </>
  );
};

export default PieChart;

// import React from "react";
// import { Pie, Doughnut, Bubble } from "react-chartjs-2";

// const PieChart = ({ chartData, aspect }) => {
//   const options = {
//     plugins: {
//       legend: {
//         display: false, // Set to true if you want to display the legend
//       },
//     },
//   };

//   return (
//     <>
//       <Doughnut data={chartData} options={options} />
//       <p>{aspect}</p>
//       {/* <Pie data={chartData} options={options} />
//       <p>{aspect}</p> */}
//     </>
//   );
// };

// export default PieChart;
