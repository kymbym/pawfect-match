import { Link } from "react-router-dom";

const PartnerNavBar = () => {
  return (
    <>
      <nav
        className="navbar is-justify-content-center"
        role="navigation"
        aria-label="main navigation"
        style={{
          marginLeft: "17em",
          marginRight: "17em",
          background: "#f6f3e9",
        }}
      >
        <div className="navbar-brand" style={{ fontSize: "1.3em" }}>
          <Link to="/partner/home" className="navbar-item">
            About
          </Link>
          <Link to="/partner/home" className="navbar-item">
            Contact
          </Link>
          <Link to="/partner/home" className="navbar-item">
            Events
          </Link>
          <Link to="/partner/home" className="navbar-item">
            Home
          </Link>
          <a
            href="/"
            className="navbar-item"
            onClick={() => {
              window.location.reload();
            }}
          >
            Sign Out
          </a>
        </div>
      </nav>
    </>
  );
};

export default PartnerNavBar;
