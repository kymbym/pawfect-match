import { Link } from "react-router-dom";
import { extractPayload } from "../../utils/jwtUtils";

export default function UserNavBar({ token }) {
  const decoded = extractPayload(token);
  const userId = decoded._id;

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
          <Link to="/about" className="navbar-item">
            About
          </Link>
          <Link to="/contact" className="navbar-item">
            Contact
          </Link>
          <Link to="/events" className="navbar-item">
            Events
          </Link>
          {token && (
            <>
              <Link to="/search" className="navbar-item">
                Find Pets
              </Link>
              <Link to={`/home/${userId}`} className="navbar-item">
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
            </>
          )}
        </div>
      </nav>
    </>
  );
}
