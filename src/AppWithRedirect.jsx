import React, { useEffect } from "react"; // Import useEffect from react
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

// Wrapper to handle redirect from 404
function AppWithRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const redirectPath = sessionStorage.getItem("redirectPath");
    if (redirectPath && redirectPath !== window.location.pathname) {
      navigate(redirectPath);
      sessionStorage.removeItem("redirectPath");
    }
  }, [navigate]);
  return <App />;
}

export default AppWithRedirect;