import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CustomChart = ({ labels, data, backgroundColors, borderColors, charttype }) => {
  const canvasRef = useRef(null); // Ref for canvas element
  const chartInstance = useRef(null); // Ref to hold the Chart.js instance

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // Destroy the existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1, // Set border width
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis:'x',
        plugins: {
          legend: {
            display: false, // Disable the legend
          },
        },

        scales: {
          y: {
            beginAtZero: true, // Start x-axis from 0
          },
      },
      },
    });

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [labels, data, backgroundColors, borderColors, charttype]); // Dependency array

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center",    // Center vertically
        height: "390px",  
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CustomChart;
