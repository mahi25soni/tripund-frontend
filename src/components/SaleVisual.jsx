import React from 'react';
import { BiBox, BiRupee } from 'react-icons/bi';
import { FaBox, FaFirstOrder } from 'react-icons/fa';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 2000, profit: 9800 },
  { name: 'Apr', revenue: 2780, profit: 3908 },
  { name: 'May', revenue: 1890, profit: 4800 },
  { name: 'Jun', revenue: 2390, profit: 3800 },
  { name: 'Jul', revenue: 3490, profit: 4300 },
];

const pieData = [
  { name: 'Last Month', value: 400 },
  { name: 'Current Month', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F'];

const SaleVisual = () => {
  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-6">Reports</h1>

        {/* Order Insights */}
        <section id="order-insights" className="mb-8 bg-white p-6 rounded-md  hover:shadow-xl transition-all duration-300">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">Order Insights</h2>
  
  <div className='flex gap-4'>
  <div className="mb-8 flex justify-start items-center gap-4 bg-slate-100 p-4 rounded-md">
  <div className="flex items-center justify-center bg-blue-100 text-blue-600 rounded-full w-16 h-16">
    <BiBox size={30} />
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-700">Total Orders</h3>
      <p className="text-2xl font-bold text-blue-600">1,200 </p>
    </div>
    
  </div>

  <div className="mb-8 flex justify-between gap-4 items-center p-4 bg-slate-100 rounded-md">
  <div className="flex items-center justify-center bg-green-100 text-green-600 rounded-full w-16 h-16">
    <BiRupee size={30} />
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-700">Average Order Value (AOV)</h3>
      <p className="text-2xl font-bold text-green-500">₹45.50</p>
    </div>
    
  </div>
  <div className="mb-8 flex justify-start gap-4 items-center p-4 bg-slate-100 rounded-md">
  <div className="flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full w-16 h-16">
    <BiRupee size={30} />
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-700">Peak Order Time</h3>
      <p className="text-2xl font-bold text-yellow-500">07PM - 10PM</p>
    </div>
    
  </div>
  </div>


  {/* Order Status Breakdown */}
  <div className="mb-8">
    <h3 className="text-lg font-medium text-gray-700 mb-4">Order Status Breakdown</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={[
            { name: 'Completed', value: 850 },
            { name: 'Pending', value: 150 },
            { name: 'Shipped', value: 200 },
            { name: 'Canceled', value: 50 },
          ]}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {[
            { name: 'Completed', value: 850, fill: '#0088FE' },
            { name: 'Pending', value: 150, fill: '#00C49F' },
            { name: 'Shipped', value: 200, fill: '#FFBB28' },
            { name: 'Canceled', value: 50, fill: '#FF8042' },
          ].map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Orders Trend */}
  <div className="mb-8">
    <h3 className="text-lg font-medium text-gray-700 mb-4">Orders Trend (Monthly)</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Order Value Comparison */}
  <div className="mb-8">
    <h3 className="text-lg font-medium text-gray-700 mb-4">Order Value Comparison</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</section>



        {/* Sales Insights */}
        <section id="sales-insights" className="mb-6 bg-white p-4 rounded-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Sales Insights</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* User Insights */}
        <section id="user-insights" className="mb-6 bg-white p-4 rounded-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">User Insights</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="profit" stroke="#1366D9" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </section>

        {/* Offer Insights */}
        <section id="offer-insights" className="mb-6 bg-white p-4 rounded-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Offer Insights</h2>
          <div className="p-4 bg-white shadow rounded-lg">
            <p>No offers currently running. Stay tuned!</p>
          </div>
        </section>

        {/* Trends Analysis */}
        <section id="trends-analysis" className="mb-6 bg-white p-4 rounded-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Trends Analysis</h2>
          <div className="p-4 bg-white shadow rounded-lg">
            <p>Trend data coming soon...</p>
          </div>
        </section>

        {/* Total Sales Comparison */}
        <section id="total-sales-comparison" className="mb-6 bg-white p-4 rounded-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Total Sales Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </section>

        {/* Sales Overview */}
        <section id="sales-overview" className="mb-6 bg-white p-4 rounded-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
              <Line type="monotone" dataKey="profit" stroke="#1366D9" />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>

      {/* Right Sidebar for Navigation */}
      <div className="w-64 bg-gray-100 p-4 shadow-lg sticky top-16 right-0 max-h-screen overflow-y-auto">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Navigation</h3>
        <nav>
          <ul className="space-y-4">
            <li>
              <a
                href="#order-insights"
                className="text-blue-600 hover:underline"
              >
                Order Insights
              </a>
            </li>
            <li>
              <a
                href="#sales-insights"
                className="text-blue-600 hover:underline"
              >
                Sales Insights
              </a>
            </li>
            <li>
              <a
                href="#user-insights"
                className="text-blue-600 hover:underline"
              >
                User Insights
              </a>
            </li>
            <li>
              <a
                href="#offer-insights"
                className="text-blue-600 hover:underline"
              >
                Offer Insights
              </a>
            </li>
            <li>
              <a
                href="#trends-analysis"
                className="text-blue-600 hover:underline"
              >
                Trends Analysis
              </a>
            </li>
            <li>
              <a
                href="#total-sales-comparison"
                className="text-blue-600 hover:underline"
              >
                Total Sales Comparison
              </a>
            </li>
            <li>
              <a
                href="#sales-overview"
                className="text-blue-600 hover:underline"
              >
                Sales Overview
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SaleVisual;
