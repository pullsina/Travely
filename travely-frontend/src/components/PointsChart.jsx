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
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

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

function PointsChart({ pointsSummary }) {
  const [chartType, setChartType] = useState("doughnut");
  const continents = pointsSummary?.continents || [];
  const totalPoints = pointsSummary?.totalPoints ?? 0;
  const maxPoints = pointsSummary?.maxPoints;
  const remainingPoints =
    typeof maxPoints === "number" ? Math.max(maxPoints - totalPoints, 0) : null;

  const chartLabels = continents.map(
    (continent) => continentLabels[continent.continent] || continent.continent,
  );
  const chartPoints = continents.map((continent) => continent.points);

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
