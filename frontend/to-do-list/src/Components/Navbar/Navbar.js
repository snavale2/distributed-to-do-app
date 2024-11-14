import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-body-tertiary bg-light navbar-light shadow">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <i className="bi bi-card-checklist"></i>
            <span> Task Tracker</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
