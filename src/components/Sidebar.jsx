import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      <ul>
        <li className="mb-2">
          <Link to="/" className="hover:text-gray-300">Dashboard</Link>
        </li>
        <li className="mb-2">
          <Link to="/performance" className="hover:text-gray-300">Performance</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
