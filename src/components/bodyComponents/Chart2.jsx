import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CustomChart2 = ({ labels, data, backgroundColors, borderColors, charttype }) => {
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
      type: charttype, // Pie chart type
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
        plugins: {
          legend: {
            display: true, // Enable the legend
            position: "right", // Position the legend on the right
            labels: {
              usePointStyle: true, // Use point style for legend icons
              boxWidth: 20, // Set the box width
              boxHeight: 20, // Set the box height
              padding: 20, // Add padding between legend items
              generateLabels: (chart) => {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const dataset = data.datasets[0];
                    const value = dataset.data[i];
                    const total = dataset.data.reduce((sum, val) => sum + val, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    return {
                      text: `${label} (${percentage}%)`,
                      fillStyle: dataset.backgroundColor[i],
                      strokeStyle: dataset.borderColor[i],
                      lineWidth: 1,
                    };
                  });
                }
                return [];
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const dataset = tooltipItem.dataset;
                const value = dataset.data[tooltipItem.dataIndex];
                const total = dataset.data.reduce((sum, val) => sum + val, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${tooltipItem.label}: ${value} (${percentage}%)`;
              },
            },
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
  }, [labels, data, backgroundColors, borderColors]); // Dependency array

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        height: "420px",
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CustomChart2;
