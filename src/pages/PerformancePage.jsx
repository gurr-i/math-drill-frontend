import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import PerformanceChart from "../components/PerformanceChart";
import "bootstrap/dist/css/bootstrap.min.css";

const PerformancePage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const headerSpring = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "translateY(0)" : "translateY(-30px)",
    config: { tension: 120, friction: 14 },
  });

  const chartSpring = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "translateY(0)" : "translateY(20px)",
    config: { tension: 100, friction: 16 },
    delay: 400,
  });

  return (
    <div
      className="min-vh-100 p-4 bg-dark text-white"
      style={{ background: "linear-gradient(to bottom right, #212529, #343a40)" }}
    >
      <animated.div style={headerSpring} className="text-center mb-5">
        <h1 className="display-8 fw-bold text-white">
          📈 Performance Dashboard
        </h1>
        <p className="text">
          Track your attempts and daily average solving times by operation type
        </p>
      </animated.div>

      <animated.div style={chartSpring} className="container">
        <PerformanceChart />
      </animated.div>
    </div>
  );
};

export default PerformancePage;