import React, { useState, useEffect } from "react";
import PerformanceChart from "../components/PerformanceChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (you can remove this if unnecessary)
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">📊 Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Track your progress and improve your performance over time.
      </p>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <p className="text-lg text-white-500">Loading dashboard...</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Performance Overview</h2>
            <PerformanceChart />
          </div>

          {/* Future Expansion: Summary Section */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📌 Quick Stats</h2>
            <p className="text-gray-600 dark:text-gray-300">Coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
