import React, { useState } from "react";
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
import { 
  FiSun, 
  FiMoon, 
  FiTrendingUp, 
  FiShoppingCart, 
  FiAlertCircle, 
  FiUsers,
  FiMapPin,
  FiPieChart,
  FiDollarSign,
  FiClock,
  FiPackage
} from "react-icons/fi";

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
  
  // Chart data
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekly Sales (₹)",
        data: [5000, 7000, 8000, 10000, 12000, 15000, 20000],
        backgroundColor: darkMode ? "rgba(74, 222, 128, 0.7)" : "rgba(16, 185, 129, 0.7)",
        borderColor: darkMode ? "rgba(74, 222, 128, 1)" : "rgba(16, 185, 129, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const pieData = {
    labels: ["Vegetables", "Fruits", "Dairy", "Grains", "Snacks"],
    datasets: [
      {
        data: [25, 20, 15, 30, 10],
        backgroundColor: [
          darkMode ? "rgba(239, 68, 68, 0.7)" : "rgba(239, 68, 68, 0.7)",
          darkMode ? "rgba(59, 130, 246, 0.7)" : "rgba(59, 130, 246, 0.7)",
          darkMode ? "rgba(234, 179, 8, 0.7)" : "rgba(234, 179, 8, 0.7)",
          darkMode ? "rgba(16, 185, 129, 0.7)" : "rgba(16, 185, 129, 0.7)",
          darkMode ? "rgba(168, 85, 247, 0.7)" : "rgba(168, 85, 247, 0.7)",
        ],
        borderColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Monthly Revenue (₹)",
        data: [40000, 45000, 60000, 70000, 75000, 80000, 85000],
        borderColor: darkMode ? "rgba(99, 102, 241, 0.8)" : "rgba(99, 102, 241, 0.8)",
        backgroundColor: "transparent",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: darkMode ? "rgba(99, 102, 241, 1)" : "rgba(99, 102, 241, 1)",
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2,
      },
    ],
  };

  // Top locations data
  const topLocations = [
    { name: "Downtown Area", orders: 320, growth: "+12%" },
    { name: "Westside Colony", orders: 280, growth: "+8%" },
    { name: "University Zone", orders: 240, growth: "+15%" },
    { name: "Business District", orders: 210, growth: "+5%" },
    { name: "Riverside", orders: 180, growth: "+3%" },
  ];

  // Busiest times data
  const busiestTimes = [
    { time: "8-10 AM", percentage: "35%" },
    { time: "12-2 PM", percentage: "45%" },
    { time: "5-7 PM", percentage: "55%" },
    { time: "7-9 PM", percentage: "30%" },
  ];

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-none text-gray-800"}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-light">Store Dashboard</h1>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Overview of your store performance
          </p>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"} shadow-sm`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FiSun className="text-yellow-300" /> : <FiMoon className="text-gray-600" />}
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard 
          title="Total Revenue" 
          value="₹2,50,000" 
          change="+12% from last month"
          icon={<FiDollarSign className={darkMode ? "text-green-400" : "text-green-600"} />}
          darkMode={darkMode}
        />
        <MetricCard 
          title="Daily Orders" 
          value="150" 
          change="+8% from yesterday"
          icon={<FiShoppingCart className={darkMode ? "text-blue-400" : "text-blue-600"} />}
          darkMode={darkMode}
        />
        <MetricCard 
          title="Out of Stock" 
          value="12 Items" 
          change="3 critical"
          icon={<FiAlertCircle className={darkMode ? "text-red-400" : "text-red-600"} />}
          darkMode={darkMode}
        />
        <MetricCard 
          title="New Customers" 
          value="45" 
          change="+20% from last week"
          icon={<FiUsers className={darkMode ? "text-purple-400" : "text-purple-600"} />}
          darkMode={darkMode}
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 pb-8">
        <ChartCard 
          title="Revenue Trends" 
          darkMode={darkMode}
          icon={<FiTrendingUp />}
        >
          <Line
            data={lineData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: darkMode ? "rgba(31, 41, 55, 0.9)" : "rgba(255, 255, 255, 0.97)",
                  bodyColor: darkMode ? "#F3F4F6" : "#1F2937",
                  titleColor: darkMode ? "#F3F4F6" : "#1F2937",
                  borderColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                  borderWidth: 1,
                  padding: 12,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }
              },
              scales: {
                x: {
                  grid: {
                    color: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                    drawBorder: false,
                  },
                  ticks: {
                    color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
                  }
                },
                y: {
                  grid: {
                    color: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                    drawBorder: false,
                  },
                  ticks: {
                    color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
                  }
                }
              }
            }}
          />
        </ChartCard>

        <ChartCard 
          title="Category Performance" 
          darkMode={darkMode}
          icon={<FiPieChart />}
        >
          <Pie
            data={pieData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "right",
                  labels: {
                    color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
                    padding: 16,
                    usePointStyle: true,
                    pointStyle: "circle",
                    font: {
                      size: 12
                    }
                  }
                },
                tooltip: {
                  backgroundColor: darkMode ? "rgba(31, 41, 55, 0.9)" : "rgba(255, 255, 255, 0.97)",
                  bodyColor: darkMode ? "#F3F4F6" : "#1F2937",
                  titleColor: darkMode ? "#F3F4F6" : "#1F2937",
                  borderColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                  borderWidth: 1,
                  padding: 12,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }
              }
            }}
          />
        </ChartCard>
      </div>

      {/* Secondary Data Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <DataListCard 
          title="Top Selling Products" 
          icon={<FiPackage />}
          items={[
            { name: "Organic Apples", value: "500 Units", change: "+15%" },
            { name: "Free Range Eggs", value: "450 Units", change: "+8%" },
            { name: "Whole Grain Bread", value: "400 Units", change: "+22%" },
            { name: "Almond Milk", value: "350 Units", change: "+5%" },
            { name: "Greek Yogurt", value: "300 Units", change: "+12%" },
          ]}
          darkMode={darkMode}
          showChange={true}
        />
        
        <DataListCard 
          title="Top Serving Locations" 
          icon={<FiMapPin />}
          items={topLocations.map(loc => ({
            name: loc.name,
            value: `${loc.orders} Orders`,
            change: loc.growth
          }))}
          darkMode={darkMode}
          showChange={true}
        />
        
        <DataListCard 
          title="Busiest Times" 
          icon={<FiClock />}
          items={busiestTimes.map(time => ({
            name: time.time,
            value: time.percentage,
            change: ""
          }))}
          darkMode={darkMode}
          showChange={false}
        />
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="Weekly Sales Breakdown" 
          darkMode={darkMode}
        >
          <Bar
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: darkMode ? "rgba(31, 41, 55, 0.9)" : "rgba(255, 255, 255, 0.97)",
                  bodyColor: darkMode ? "#F3F4F6" : "#1F2937",
                  titleColor: darkMode ? "#F3F4F6" : "#1F2937",
                  borderColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                  borderWidth: 1,
                  padding: 12,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }
              },
              scales: {
                x: {
                  grid: {
                    color: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                    drawBorder: false,
                  },
                  ticks: {
                    color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
                  }
                },
                y: {
                  grid: {
                    color: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                    drawBorder: false,
                  },
                  ticks: {
                    color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
                  }
                }
              }
            }}
          />
        </ChartCard>

        <DataListCard 
          title="Inventory Alerts" 
          icon={<FiAlertCircle />}
          items={[
            { name: "Organic Avocados", value: "5 Units", change: "Critical" },
            { name: "Cold Pressed Juice", value: "10 Units", change: "Low" },
            { name: "Gluten-Free Pasta", value: "8 Units", change: "Critical" },
            { name: "Plant-Based Cheese", value: "15 Units", change: "Low" },
            { name: "Protein Bars", value: "20 Units", change: "Warning" },
          ]}
          darkMode={darkMode}
          showChange={true}
          highlightColor={darkMode ? "text-red-400" : "text-red-600"}
        />
      </div>
    </div>
  );
};

// Reusable Metric Card Component
const MetricCard = ({ title, value, change, icon, darkMode }) => (
  <div className={`p-5 rounded-xl transition-all ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"} shadow-sm hover:shadow-md border ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
    <div className="flex justify-between items-start">
      <div>
        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{title}</p>
        <p className="text-2xl font-light mt-1">{value}</p>
        <p className={`text-xs mt-1 ${change.includes('+') ? 'text-green-500' : change.includes('critical') ? 'text-red-500' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {change}
        </p>
      </div>
      <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
        {icon}
      </div>
    </div>
  </div>
);

// Reusable Chart Card Component
const ChartCard = ({ title, children, darkMode, icon }) => (
  <div className={`p-5 rounded-xl h-fit ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
    <div className="flex items-center mb-4">
      {icon && <div className={`mr-3 p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>{icon}</div>}
      <h3 className={`text-lg font-light ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{title}</h3>
    </div>
    <div className="h-80">
      {children}
    </div>
  </div>
);

// Reusable Data List Component
const DataListCard = ({ title, items, darkMode, highlightColor = "text-green-500", showChange, icon }) => (
  <div className={`p-5 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
    <div className="flex items-center mb-4">
      {icon && <div className={`mr-3 p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>{icon}</div>}
      <h3 className={`text-lg font-light ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
          <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>{item.name}</span>
          <div className="flex items-center">
            <span className={`font-medium mr-2 ${item.change?.includes('+') ? 'text-green-500' : item.change?.toLowerCase().includes('critical') ? 'text-red-500' : highlightColor}`}>
              {item.value}
            </span>
            {showChange && item.change && (
              <span className={`text-xs px-2 py-1 rounded ${item.change.includes('+') ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : item.change.toLowerCase().includes('critical') ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>
                {item.change}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default DashboardContent;