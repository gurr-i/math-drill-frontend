import React, { useEffect } from "react"; // Import useEffect from react
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

function AppWithRedirect() {
  return <App />;

}

export default AppWithRedirect;