import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  // Ensure animation only runs once on mount
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Container animation
  const containerSpring = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "translateY(0px)" : "translateY(50px)",
    config: { tension: 120, friction: 14 },
  });

  // Button hover animation
  const [isHovered, setIsHovered] = useState(false);
  const buttonSpring = useSpring({
    scale: isHovered ? 1.05 : 1,
    boxShadow: isHovered 
      ? "0 10px 20px rgba(0, 0, 255, 0.2)"
      : "0 5px 10px rgba(0, 0, 0, 0.1)",
    config: { tension: 300, friction: 10 },
  });

  // Title animation
  const titleSpring = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "scale(1)" : "scale(0.9)",
    config: { tension: 150, friction: 12 },
    delay: 200,
  });

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center" 
      style={{ background: 'linear-gradient(to bottom right, #111827, #1e3a8a)' }}
    >
      <animated.div
        style={containerSpring}
        className="container-fluid text-center bg-light bg-opacity-10 rounded-3 p-5"
      >
        {/* Animated Title */}
        <animated.h1
          style={titleSpring}
          className="display-4 fw-bold text-white mb-4"
        >
          Math<span className="text-primary">Drill</span> .ai
        </animated.h1>

        {/* Updated Description */}
        <p className="lead text-light mb-4">
          Master multiplication and division with interactive drills and track your progress in real-time.
        </p>

        {/* Animated Button */}
        <Link to="/select-operation">
          <animated.button
            style={buttonSpring}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="btn btn-outline-light px-4 py-2"
          >
            Start Practicing
          </animated.button>
        </Link>

        {/* Updated Features List */}
        <animated.div
          style={{
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? "translateY(0px)" : "translateY(50px)",
            delay: 400,
          }}
          className="mt-4 text-light"
        >
          <p>✓ Multiplication & Division Challenges</p>
          <p>✓ Real-Time Progress Tracking</p>
          <p>✓ Customizable Operation Types</p>
        </animated.div>
      </animated.div>
    </div>
  );
}

export default Home;