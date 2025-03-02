import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Drill.css";
import { useParams } from "react-router-dom";

const operationRanges = {
  multiplication: {
    "1by1": [1, 9],
    "1by2": [10, 99],
    "1by3": [100, 999],
    "2by2": [10, 99],
    "2by3": [100, 999],
  },
  division: {
    "1by1": [1, 9], // Dividend range
    "1by2": [10, 99],
    "1by3": [100, 999],
    "2by2": [10, 99],
    "2by3": [100, 999],
  },
};

function Drill() {
  const { operationCategory, operationType } = useParams();
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [userAnswer, setUserAnswer] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [message, setMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const answerInputRef = useRef(null);
  const timerRef = useRef(null);

  const containerSpring = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "translateY(0)" : "translateY(20px)",
    config: { tension: 120, friction: 14 },
    delay: 400,
  });

  const questionSpring = useSpring({
    opacity: isMounted ? 1 : 0,
    scale: isMounted ? 1 : 0.95,
    config: { tension: 150, friction: 12 },
    delay: 200,
  });

  const messageSpring = useSpring({
    opacity: message ? 1 : 0,
    transform: message ? "scale(1)" : "scale(0.8)",
    config: { tension: 200, friction: 10 },
  });

  useEffect(() => {
    generateQuestion();
    setIsMounted(true);
    return () => clearInterval(timerRef.current);
  }, [operationCategory, operationType]);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setElapsedTime(0);
    setStartTime(Date.now());
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 10);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const generateQuestion = () => {
    const ranges =
      operationRanges[operationCategory] || operationRanges.multiplication;
    const [min, max] = ranges[operationType] || [1, 9];

    if (operationCategory === "division") {
      const divisor = Math.floor(Math.random() * (max - min + 1)) + min;
      const quotient = Math.floor(Math.random() * 9) + 1; // Ensure manageable quotient
      const dividend = divisor * quotient;
      setNum1(dividend);
      setNum2(divisor);
    } else {
      setNum1(Math.floor(Math.random() * (max - min + 1)) + min);
      setNum2(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    setUserAnswer("");
    setMessage("");
    startTimer();
    setTimeout(() => answerInputRef.current?.focus(), 100);
  };

  const checkAnswer = async (input) => {
    const correctAnswer =
      operationCategory === "division" ? Math.floor(num1 / num2) : num1 * num2;
    const parsedInput =
      operationCategory === "division" ? parseInt(input) : parseInt(input);

    if (!isNaN(parsedInput) && parsedInput === correctAnswer) {
      stopTimer();
      const totalTime = Date.now() - startTime;
      setMessage("✅ Correct!");
      await savePerformance(totalTime);
      setTimeout(generateQuestion, 1000);
    } else if (input.length >= correctAnswer.toString().length) {
      setMessage("❌ Wrong! Try again.");
      setUserAnswer("");
    }
  };

  const savePerformance = async (timeTaken) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/save-performance`,
        {
          date: new Date().toISOString(),
          operationCategory,
          operationType,
          timeTaken,
        },
        { headers: { Authorization: "Bearer your_token" } }
      );
    } catch (err) {
      console.error("Error saving performance:", err);
    }
  };

  return (
    <animated.div
      style={containerSpring}
      className="container drill-container text-center mt-5 h-100"
    >
      <h2 className="display-6 text-primary mb-4">
        {operationCategory === "division" ? "Division" : "Multiplication"} Drill
        - {operationType}
      </h2>

      <animated.h3 style={questionSpring} className="display-6 my-4">
        {operationCategory === "division"
          ? `${num1} ÷ ${num2} = ?`
          : `${num1} × ${num2} = ?`}
      </animated.h3>

      <input
        type="number"
        className="form-control d-inline w-25 mb-3"
        value={userAnswer}
        onChange={(e) => {
          setUserAnswer(e.target.value);
          checkAnswer(e.target.value);
        }}
        inputMode="numeric"
        pattern="[0-9]*"
        ref={answerInputRef}
        autoFocus
      />

      {message && (
        <animated.p style={messageSpring} className="fs-5 fw-bold message">
          {message}
        </animated.p>
      )}

      <div className="stats mt-4">
        <p className="fs-5">
          ⏳ Time:{" "}
          <span className="text fw-bold">
            {(elapsedTime / 1000).toFixed(2)}s
          </span>
        </p>
      </div>
    </animated.div>
  );
}

export default Drill;
