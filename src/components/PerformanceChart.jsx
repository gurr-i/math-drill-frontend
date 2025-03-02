import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const PerformanceChart = () => {
  const [entryData, setEntryData] = useState({});
  const [dailyData, setDailyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/performance-data?limit=1000");
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();

        // Process data for entries vs timeTaken
        const entriesByOp = result.reduce((acc, item, index) => {
          const key = `${item.operationCategory}-${item.operationType}`;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push({
            entry: index + 1,
            timeTaken: parseFloat((item.timeTaken / 1000).toFixed(2)),
          });
          return acc;
        }, {});

        // Process data for daily averages vs date
        const dailyAverages = result.reduce((acc, item) => {
          const date = item.date.split("T")[0];
          const key = `${item.operationCategory}-${item.operationType}`;

          if (!acc[key]) {
            acc[key] = {};
          }
          if (!acc[key][date]) {
            acc[key][date] = { totalTime: 0, count: 0 };
          }

          acc[key][date].totalTime += item.timeTaken / 1000;
          acc[key][date].count += 1;
          return acc;
        }, {});

        const formattedDailyData = {};
        Object.keys(dailyAverages).forEach((key) => {
          formattedDailyData[key] = Object.entries(dailyAverages[key])
            .map(([date, { totalTime, count }]) => ({
              date,
              avgTime: parseFloat((totalTime / count).toFixed(2)),
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        });

        setEntryData(entriesByOp);
        setDailyData(formattedDailyData);
      } catch (err) {
        console.error("Error fetching performance data:", err);
        setError("Failed to load chart data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
    setIsMounted(true);
  }, []);

  const containerSpring = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "translateY(0)" : "translateY(20px)",
    config: { tension: 120, friction: 14 },
    delay: 400,
  });

  const chartSpring = useSpring({
    opacity: isMounted ? 1 : 0,
    scale: isMounted ? 1 : 0.95,
    config: { tension: 150, friction: 12 },
    delay: 200,
  });

  // Helper function to calculate Y-axis domain with padding
  const getYAxisDomain = (data, key) => {
    if (!data || data.length === 0) return [0, 10]; // Default range if no data
    const values = data.map((item) => parseFloat(item[key]));
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const padding = (maxValue - minValue) * 0.1 || 1; // 10% padding or 1s if range is small
    return [Math.max(0, minValue - padding), maxValue + padding];
  };

  return (
    <animated.div style={containerSpring} className="card bg-dark text-white shadow-lg rounded-3 p-4">
      {loading && (
        <p className="text-center text-primary mb-0">Loading charts...</p>
      )}
      {error && (
        <p className="text-center text-danger mb-0">{error}</p>
      )}
      {!loading && !error && Object.keys(entryData).length === 0 && Object.keys(dailyData).length === 0 && (
        <p className="text-center text-muted mb-0">
          No performance data available yet.
        </p>
      )}

      {!loading && !error && (
        <animated.div style={chartSpring}>
          <h2 className="h5 fw-bold text-white mb-4">📊 Attempts vs Time Taken</h2>
          {Object.entries(entryData).map(([key, data]) => (
            <div key={`entry-${key}`} className="mb-5">
              <h3 className="h6 fw-semibold text-white mb-3">
                {key.replace("multiplication", "Multiplication").replace("division", "Division").toUpperCase()} - Time per Attempt
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid stroke="#495057" strokeDasharray="3 3" opacity={0.5} />
                  <XAxis
                    dataKey="entry"
                    tick={{ fill: "#adb5bd", fontSize: 12 }}
                    label={{ value: "Attempt Number", position: "insideBottom", offset: -20, fill: "#adb5bd", fontSize: 14 }}
                  />
                  <YAxis
                    domain={getYAxisDomain(data, "timeTaken")}
                    tick={{ fill: "#adb5bd", fontSize: 12 }}
                    label={{ value: "Time (seconds)", angle: -90, position: "insideLeft", offset: 10, fill: "#adb5bd", fontSize: 14 }}
                    tickFormatter={(value) => value.toFixed(1)}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#343a40", border: "none", borderRadius: "5px", color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                    formatter={(value) => [`${value} s`, "Time Taken"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="timeTaken"
                    stroke="#0d6efd"
                    strokeWidth={1}
                    dot={{ r: 2, fill: "#0d6efd" }}
                    activeDot={{ r: 4, fill: "#0d6efd", stroke: "#fff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}

          <h2 className="h5 fw-bold text-white mb-4 mt-5">📈 Daily Average Performance</h2>
          {Object.entries(dailyData).map(([key, data]) => (
            <div key={`daily-${key}`} className="mb-5">
              <h3 className="h6 fw-semibold text-white mb-3">
                {key.replace("multiplication", "Multiplication").replace("division", "Division").toUpperCase()} - Daily Average Time
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid stroke="#495057" strokeDasharray="3 3" opacity={0.5} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#adb5bd", fontSize: 12 }}
                    label={{ value: "Date", position: "insideBottom", offset: -20, fill: "#adb5bd", fontSize: 14 }}
                  />
                  <YAxis
                    domain={getYAxisDomain(data, "avgTime")}
                    tick={{ fill: "#adb5bd", fontSize: 12 }}
                    label={{ value: "Avg Time (seconds)", angle: -90, position: "insideLeft", offset: 10, fill: "#adb5bd", fontSize: 14 }}
                    tickFormatter={(value) => value.toFixed(1)}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#343a40", border: "none", borderRadius: "5px", color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                    formatter={(value) => [`${value} s`, "Average Time"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgTime"
                    stroke="#198754"
                    strokeWidth={1}
                    dot={{ r: 2, fill: "#198754" }}
                    activeDot={{ r: 4, fill: "#198754", stroke: "#fff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </animated.div>
      )}
    </animated.div>
  );
};

export default PerformanceChart;