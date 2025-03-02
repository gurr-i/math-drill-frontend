import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function OperationSelection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerSpring = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "translateY(0)" : "translateY(20px)",
    config: { tension: 120, friction: 14 },
  });

  const titleSpring = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "scale(1)" : "scale(0.9)",
    config: { tension: 150, friction: 12 },
    delay: 200,
  });

  const cardSpring = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "translateY(0)" : "translateY(20px)",
    config: { tension: 100, friction: 16 },
    delay: 400,
  });

  const operationTypes = [
    { category: "multiplication", type: "1by1", label: "1 × 1 Digit", range: "1-9" },
    { category: "multiplication", type: "1by2", label: "1 × 2 Digits", range: "10-99" },
    { category: "multiplication", type: "1by3", label: "1 × 3 Digits", range: "100-999" },
    { category: "multiplication", type: "2by2", label: "2 × 2 Digits", range: "10-99" },
    { category: "multiplication", type: "2by3", label: "2 × 3 Digits", range: "100-999" },
    { category: "division", type: "1by1", label: "1 ÷ 1 Digit", range: "1-9" },
    { category: "division", type: "1by2", label: "1 ÷ 2 Digits", range: "10-99" },
    { category: "division", type: "1by3", label: "1 ÷ 3 Digits", range: "100-999" },
    { category: "division", type: "2by2", label: "2 ÷ 2 Digits", range: "10-99" },
    { category: "division", type: "2by3", label: "2 ÷ 3 Digits", range: "100-999" },
  ];

  return (
    <div className="min-vh-100 p-4 bg-gray-100 dark:bg-gray-900">
      <animated.div style={containerSpring} className="container text-center">
        <animated.h1 style={titleSpring} className="display-5 fw-bold text-primary mb-5">
          Select Operation Type
        </animated.h1>

        <animated.div style={cardSpring} className="row justify-content-center g-4">
          {operationTypes.map((op) => (
            <div key={`${op.category}-${op.type}`} className="col-md-4 col-sm-6">
              <Link to={`/drill/${op.category}/${op.type}`} className="text-decoration-none">
                <div className="card bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <h3 className="h5 fw-semibold text-dark dark:text-white">{op.label}</h3>
                  <p className="text-muted">Range: {op.range}</p>
                </div>
              </Link>
            </div>
          ))}
        </animated.div>
      </animated.div>
    </div>
  );
}

export default OperationSelection;