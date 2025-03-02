import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Navbar";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const PerformancePage = lazy(() => import("./pages/PerformancePage"));
const Drill = lazy(() => import("./components/Drill"));
const OperationSelection = lazy(() => import("./pages/OperationSelection"));

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Header />
        <div className="">
          <Suspense fallback={<p className="text-center">Loading...</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/select-operation" element={<OperationSelection />} />
              <Route path="/drill/:operationCategory/:operationType" element={<Drill />} />
              <Route path="/performance" element={<PerformancePage />} />
              <Route path="*" element={<h2 className="text-center text-red-500 mt-6">404 - Page Not Found</h2>} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default App;