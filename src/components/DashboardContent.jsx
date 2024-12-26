import React from "react";
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
  // Example data for charts
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekly Sales (₹)",
        data: [5000, 7000, 8000, 10000, 12000, 15000, 20000],
        backgroundColor: "#4caf50",
      },
    ],
  };

  const pieData = {
    labels: ["Vegetables", "Fruits", "Dairy", "Grains", "Snacks"],
    datasets: [
      {
        data: [25, 20, 15, 30, 10],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4caf50", "#ab47bc"],
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Monthly Sales (₹)",
        data: [40000, 45000, 60000, 70000, 75000, 80000, 85000],
        borderColor: "#36a2eb",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Dashboard</h1>

      {/* Numeric Insights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-sm text-gray-600">Total Sales</h3>
          <p className="text-xl font-bold text-gray-800">₹2,50,000</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-sm text-gray-600">Orders Today</h3>
          <p className="text-xl font-bold text-gray-800">150</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-sm text-gray-600">Out of Stock Items</h3>
          <p className="text-xl font-bold text-gray-800">12</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-sm text-gray-600">New Customers</h3>
          <p className="text-xl font-bold text-gray-800">45</p>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart */}
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Weekly Sales</h3>
          <Bar data={barData} />
        </div>

        {/* Pie Chart */}
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Sales Analysis */}
      <div className="p-4 bg-white shadow rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Sales Analysis</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default DashboardContent;
