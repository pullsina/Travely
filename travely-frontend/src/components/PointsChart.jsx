import { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";
// Import the chart components used to display the points data visually.
import { Bar, Doughnut } from "react-chartjs-2";

// Need to register the chart elements and plugins with ChartJS before using them in the chart components.
// This is necessary for ChartJS to recognize and render the chart types correctly.
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

// Define continent labels for chart display
const continentLabels = {
  0: "Europe",
  1: "Asia",
  2: "Africa",
  3: "North America",
  4: "South America",
  5: "Oceania",
  Europe: "Europe",
  Asia: "Asia",
  Africa: "Africa",
  NorthAmerica: "North America",
  SouthAmerica: "South America",
  Oceania: "Oceania",
};

// PointsChart component to display user's points by continent in either a doughnut or bar chart format
// It doesn't handle fetching the pointsSummary data; it expects to receive it as a prop from its parent component - navbar.jsx.
// This separation of concerns allows for better reusability and maintainability of the component,
// as it focuses solely on rendering the chart based on the provided data.
function PointsChart({ pointsSummary }) {
  // State to manage the selected chart type (doughnut or bar)
  const [chartType, setChartType] = useState("doughnut");
  // Extracting continents and points data from the pointsSummary prop,
  // with default values to handle cases where the data might be undefined or null
  const continents = pointsSummary?.continents || [];
  const totalPoints = pointsSummary?.totalPoints ?? 0;

  // future max points and remaining points calculations to be used in the chart data
  const maxPoints = pointsSummary?.maxPoints;
  // Calculate remaining points if maxPoints is defined, otherwise set to null
  const remainingPoints =
    typeof maxPoints === "number" ? Math.max(maxPoints - totalPoints, 0) : null;

  // here we prepare the data and options for the doughnut and bar charts based on the pointsSummary data.
  const chartLabels = continents.map(
    (continent) => continentLabels[continent.continent] || continent.continent,
  );
  const chartPoints = continents.map((continent) => continent.points);

  // Prepare the data and options for the doughnut chart
  const doughnutData = {
    labels:
      remainingPoints === null
        ? chartLabels
        : [...chartLabels, "Remaining points"],
    datasets: [
      {
        label: "Points",
        data:
          remainingPoints === null
            ? chartPoints
            : [...chartPoints, remainingPoints],
        backgroundColor: [
          "#9ae626",
          "#ffe04a",
          "#3fd5ff",
          "#ff7a59",
          "#b98cff",
          "#ff5c9a",
          "rgba(214, 222, 250, 0.18)",
        ],
        borderColor: "#06164a",
        borderWidth: 2,
      },
    ],
  };

  // Prepare the options for the doughnut chart, including legend and tooltip configurations
  const doughnutOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          color: "#d6defa",
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        callbacks: {
          label(context) {
            return `${context.label}: ${context.raw} p`;
          },
        },
      },
    },
  };

  // Prepare the data and options for the bar chart
  const barData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Points",
        data: chartPoints,
        backgroundColor: "#9ae626",
        borderColor: "#ffe04a",
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label(context) {
            return `${context.raw} p`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#d6defa",
          maxRotation: 90,
          minRotation: 90,
        },
        grid: {
          color: "rgba(214, 222, 250, 0.12)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#d6defa",
          precision: 0,
        },
        grid: {
          color: "rgba(214, 222, 250, 0.12)",
        },
      },
    },
  };

  return (
    <section className="points-chart">
      <h2 className="points-chart__title">Your points by continent</h2>

      {continents.length === 0 ? (
        <p className="points-chart__empty">No points yet.</p>
      ) : (
        <>
          <p className="points-chart__total">
            {maxPoints ? `${totalPoints} / ${maxPoints} p` : `${totalPoints} p`}
          </p>
          {/* Switch between the doughnut and bar chart views. */}
          <div className="points-chart__switch" aria-label="Choose chart type">
            <button
              type="button"
              onClick={() => setChartType("doughnut")}
              aria-pressed={chartType === "doughnut"}
            >
              Doughnut
            </button>
            <button
              type="button"
              onClick={() => setChartType("bar")}
              aria-pressed={chartType === "bar"}
            >
              Bar
            </button>
          </div>
          <div className="points-chart__canvas">
            {chartType === "doughnut" ? (
              <Doughnut data={doughnutData} options={doughnutOptions} />
            ) : (
              <Bar data={barData} options={barOptions} />
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default PointsChart;
