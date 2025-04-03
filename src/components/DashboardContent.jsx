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
  FiPackage,
  FiRefreshCw,
  FiCalendar
} from "react-icons/fi";
import axios from "../../axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const DashboardContent = ({ storeId }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
      metrics: null,
      charts: null,
      topProducts: null,
      inventoryAlerts: null
    });
    const [refreshing, setRefreshing] = useState(false);
  
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setRefreshing(true);
        
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
  
        const response = await axios.get(`store/analytics`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
        if (error.response && error.response.status === 401) {
          toast.error("Session expired. Please login again.");
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
  
    useEffect(() => {
      fetchDashboardData();
    }, [storeId]);

  const formatWeeklySalesData = () => {
    if (!dashboardData.charts?.weeklySales || dashboardData.charts.weeklySales.length === 0) {
      return {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
          label: "Weekly Sales (₹)",
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: darkMode ? "rgba(74, 222, 128, 0.7)" : "rgba(16, 185, 129, 0.7)",
          borderColor: darkMode ? "rgba(74, 222, 128, 1)" : "rgba(16, 185, 129, 1)",
          borderWidth: 1,
          borderRadius: 4,
        }]
      };
    }

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const salesData = Array(7).fill(0);
    
    dashboardData.charts.weeklySales.forEach(day => {
      const dayIndex = days.indexOf(day.day);
      if (dayIndex !== -1) {
        salesData[dayIndex] = day.sales;
      }
    });

    return {
      labels: days,
      datasets: [{
        label: "Weekly Sales (₹)",
        data: salesData,
        backgroundColor: darkMode ? "rgba(74, 222, 128, 0.7)" : "rgba(16, 185, 129, 0.7)",
        borderColor: darkMode ? "rgba(74, 222, 128, 1)" : "rgba(16, 185, 129, 1)",
        borderWidth: 1,
        borderRadius: 4,
      }]
    };
  };

  const formatCategoryData = () => {
    if (!dashboardData.charts?.categoryDistribution) {
      return {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
          borderColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.5)",
          borderWidth: 1,
        }]
      };
    }

    const colors = [
      darkMode ? "rgba(239, 68, 68, 0.7)" : "rgba(239, 68, 68, 0.7)",
      darkMode ? "rgba(59, 130, 246, 0.7)" : "rgba(59, 130, 246, 0.7)",
      darkMode ? "rgba(234, 179, 8, 0.7)" : "rgba(234, 179, 8, 0.7)",
      darkMode ? "rgba(16, 185, 129, 0.7)" : "rgba(16, 185, 129, 0.7)",
      darkMode ? "rgba(168, 85, 247, 0.7)" : "rgba(168, 85, 247, 0.7)",
    ];

    return {
      labels: dashboardData.charts.categoryDistribution.map(cat => cat._id),
      datasets: [{
        data: dashboardData.charts.categoryDistribution.map(cat => cat.totalSales),
        backgroundColor: dashboardData.charts.categoryDistribution.map((_, index) => 
          colors[index % colors.length]
        ),
        borderColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.5)",
        borderWidth: 1,
      }]
    };
  };

  const formatRevenueTrendData = () => {
    return {
      labels: ["Today", "This Week", "This Month"],
      datasets: [{
        label: "Revenue (₹)",
        data: [
          dashboardData.metrics?.todayRevenue || 0,
          dashboardData.metrics?.todayRevenue * 7 || 0,
          dashboardData.metrics?.monthlyRevenue || 0
        ],
        borderColor: darkMode ? "rgba(99, 102, 241, 0.8)" : "rgba(99, 102, 241, 0.8)",
        backgroundColor: "transparent",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: darkMode ? "rgba(99, 102, 241, 1)" : "rgba(99, 102, 241, 1)",
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2,
      }]
    };
  };

  const barData = formatWeeklySalesData();
  const pieData = formatCategoryData();
  const lineData = formatRevenueTrendData();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const topLocations = [
    { name: "Primary Location", orders: dashboardData.metrics?.dailyOrders || 0, growth: dashboardData.metrics?.revenueChange || "0%" },
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
      <div className="flex items-center space-x-2">
        <button
          onClick={fetchDashboardData}
          className={`p-2 rounded-full transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"} shadow-sm`}
          aria-label="Refresh data"
          disabled={refreshing}
        >
          <FiRefreshCw className={`${refreshing ? "animate-spin" : ""} ${darkMode ? "text-gray-300" : "text-gray-600"}`} />
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"} shadow-sm`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FiSun className="text-yellow-300" /> : <FiMoon className="text-gray-600" />}
        </button>
      </div>
    </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <MetricCard 
              title="Today's Revenue" 
              value={formatCurrency(dashboardData.metrics?.todayRevenue || 0)} 
              change={dashboardData.metrics?.revenueChange || "0%"}
              icon={<FiDollarSign className={darkMode ? "text-green-400" : "text-green-600"} />}
              darkMode={darkMode}
            />
            <MetricCard 
              title="Daily Orders" 
              value={dashboardData.metrics?.dailyOrders || "0"} 
              change={`${dashboardData.metrics?.weeklyOrders || "0"} this week`}
              icon={<FiShoppingCart className={darkMode ? "text-blue-400" : "text-blue-600"} />}
              darkMode={darkMode}
            />
            <MetricCard 
              title="Monthly Revenue" 
              value={formatCurrency(dashboardData.metrics?.monthlyRevenue || 0)} 
              change={`${dashboardData.metrics?.monthlyOrders || "0"} orders`}
              icon={<FiCalendar className={darkMode ? "text-purple-400" : "text-purple-600"} />}
              darkMode={darkMode}
            />
            <MetricCard 
              title="Inventory Alerts" 
              value={dashboardData.inventoryAlerts ? `${dashboardData.inventoryAlerts.length} Items` : "0 Items"} 
              change={dashboardData.inventoryAlerts ? 
                `${dashboardData.inventoryAlerts.filter(item => item.status === 'Low').length} low` : 
                "0 critical"}
              icon={<FiAlertCircle className={darkMode ? "text-red-400" : "text-red-600"} />}
              darkMode={darkMode}
            />
          </div>

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
                      callbacks: {
                        label: function(context) {
                          const category = dashboardData.charts?.categoryDistribution?.[context.dataIndex];
                          if (!category) return '';
                          
                          const label = context.label || '';
                          const value = context.formattedValue || '';
                          const count = category.count || 0;
                          
                          return `${label}: ₹${value} (${count} orders)`;
                        }
                      },
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <DataListCard 
              title="Top Selling Products" 
              icon={<FiPackage />}
              items={dashboardData.topProducts ? 
                dashboardData.topProducts.map(product => ({
                  name: product._id,
                  value: `${product.totalQuantity} Units`,
                  change: `₹${product.totalSales}`,
                  image: product.image?.[0]
                })) : 
                []
              }
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
              items={dashboardData.charts?.busiestTimes ? 
                dashboardData.charts.busiestTimes.map(time => ({
                  name: time.timeSlot,
                  value: time.percentage,
                  change: time.totalSales ? `₹${time.totalSales}` : ""
                })) : 
                []
              }
              darkMode={darkMode}
              showChange={false}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard 
              title="Weekly Sales Breakdown" 
              darkMode={darkMode}
              icon={<FiCalendar />}
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
              items={dashboardData.inventoryAlerts ? 
                dashboardData.inventoryAlerts.map(item => ({
                  name: item.name,
                  value: `${item.currentStock} Units`,
                  change: item.status,
                  image: item.image
                })) : 
                []
              }
              darkMode={darkMode}
              showChange={true}
              highlightColor={darkMode ? "text-red-400" : "text-red-600"}
            />
          </div>
        </>
      )}
    </div>
  );
};

const MetricCard = ({ title, value, change, icon, darkMode }) => (
  <div className={`p-5 rounded-xl transition-all ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"} shadow-sm hover:shadow-md border ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
    <div className="flex justify-between items-start">
      <div>
        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{title}</p>
        <p className="text-2xl font-light mt-1">{value}</p>
        <p className={`text-xs mt-1 ${change?.includes('+') ? 'text-green-500' : change?.toLowerCase().includes('critical') ? 'text-red-500' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {change}
        </p>
      </div>
      <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
        {icon}
      </div>
    </div>
  </div>
);

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

const DataListCard = ({ title, items, darkMode, highlightColor = "text-green-500", showChange, icon }) => (
  <div className={`p-5 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
    <div className="flex items-center mb-4">
      {icon && <div className={`mr-3 p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>{icon}</div>}
      <h3 className={`text-lg font-light ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
          <div className="flex items-center">
            {item.image && (
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-8 h-8 rounded-full object-cover mr-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/32";
                }}
              />
            )}
            <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>{item.name}</span>
          </div>
          <div className="flex items-center">
            <span className={`font-medium mr-2 ${item.change?.includes('Critical') ? 'text-red-500' : item.change?.toLowerCase().includes('low') ? 'text-yellow-500' : highlightColor}`}>
              {item.value}
            </span>
            {showChange && item.change && (
              <span className={`text-xs px-2 py-1 rounded ${item.change.includes('+') ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : item.change.toLowerCase().includes('critical') ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : item.change.toLowerCase().includes('low') ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>
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