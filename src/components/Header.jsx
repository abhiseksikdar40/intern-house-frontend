import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid py-1">
        <NavLink className="navbar-brand text-light fw-bold" to="/joblistings">
          INTERN HOUSE
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav fw-medium">
            <NavLink
              to="/joblistings"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'text-warning' : 'text-light'}`
              }
            >
              Job Listings
            </NavLink>
            <NavLink
              to="/postjob"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'text-warning' : 'text-light'}`
              }>Post a Job</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
