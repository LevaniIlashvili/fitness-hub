import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ values }) => {
  const percentages = values.map(
    (value) => (value / values.reduce((a, b) => a + b, 0)) * 100
  );

  const data = {
    labels: ["Carb", "Protein", "Fat"],
    datasets: [
      {
        data: percentages,
        backgroundColor: [
          "#e2b133",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = data.labels[context.dataIndex];
            const value = data.datasets[0].data[context.dataIndex];
            return `${label}: ${value.toFixed(2)}%`;
          },
          title: () => "",
        },
        displayColors: false,
      },
    },
  };

  return (
    <Wrapper>
      <Pie data={data} options={options} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 30rem;
  height: 30rem;
`;

export default PieChart;
