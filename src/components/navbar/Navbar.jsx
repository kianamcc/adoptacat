import React from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-4">
        <h1>AdoptACat</h1>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active mr-4">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <span className="sr-only"></span>
            </li>
            {/* <li className="nav-item active mr-4 ">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li> */}
            <li className="nav-item active mr-4">
              <Link className="nav-link" to="/resources">
                Resources
              </Link>
            </li>
          </ul>
        </div>
        <li className="favorites navbar-nav nav-item active mr-4 float-end center">
          <Link className="nav-link" to="/favorites">
            Favorites
          </Link>
        </li>
      </nav>
    </>
  );
};

export default Navbar;
