import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" >
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          🔢 Drill.ai
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/performance">
                Dashboard
              </Link>
            </li>
          </ul>

          <Link className="btn btn-light ms-3" to="/select-operation">
            Drill
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;