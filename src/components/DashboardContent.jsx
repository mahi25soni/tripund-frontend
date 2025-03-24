import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { FiSun, FiMoon } from "react-icons/fi"; // Icons for dark mode toggle

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  LineElement,
  PointElement
);

const DashboardContent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [barData, setBarData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekly Sales (₹)",
        data: [5000, 7000, 8000, 10000, 12000, 15000, 20000],
        backgroundColor: "#4caf50",
        hoverBackgroundColor: "#81c784",
      },
    ],
  });

  const [pieData, setPieData] = useState({
    labels: ["Vegetables", "Fruits", "Dairy", "Grains", "Snacks"],
    datasets: [
      {
        data: [25, 20, 15, 30, 10],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4caf50", "#ab47bc"],
        hoverBackgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4caf50", "#ab47bc"],
      },
    ],
  });

  const [lineData, setLineData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Monthly Sales (₹)",
        data: [40000, 45000, 60000, 70000, 75000, 80000, 85000],
        borderColor: "#36a2eb",
        fill: false,
        tension: 0.1,
        pointBackgroundColor: "#36a2eb",
        pointHoverRadius: 5,
      },
    ],
  });

  // Simulate dynamic data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBarData((prev) => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: prev.datasets[0].data.map((value) => value + Math.floor(Math.random() * 1000)),
          },
        ],
      }));

      setLineData((prev) => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: prev.datasets[0].data.map((value) => value + Math.floor(Math.random() * 1000)),
          },
        ],
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
      {/* Dark Mode Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-md transition-all"
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>

      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      {/* Numeric Insights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h3 className="text-sm text-gray-400">Total Sales</h3>
          <p className="text-xl font-bold">₹2,50,000</p>
        </div>
        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h3 className="text-sm text-gray-400">Orders Today</h3>
          <p className="text-xl font-bold">150</p>
        </div>
        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h3 className="text-sm text-gray-400">Out of Stock Items</h3>
          <p className="text-xl font-bold">12</p>
        </div>
        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h3 className="text-sm text-gray-400">New Customers</h3>
          <p className="text-xl font-bold">45</p>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart */}
        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h3 className="text-lg font-semibold mb-4">Weekly Sales</h3>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>

        {/* Pie Chart */}
        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>

      {/* Sales Analysis */}
      <div className={`p-4 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h3 className="text-lg font-semibold mb-4">Monthly Sales Analysis</h3>
        <Line
          data={lineData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DashboardContent;