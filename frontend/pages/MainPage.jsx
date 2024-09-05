import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <>
      <div className="columns">
        <div className="column is-align-content-center">
          <h1
            className="titan-one-regular"
            style={{ fontSize: "4.5em", margin: "0.3em", color: "#ff4e4e" }}
          >
            Pawfect Match
          </h1>
          <h1 className="quattrocento-sans-regular" style={{ margin: "0.3em" }}>
            Find your furrever friend today.
          </h1>
          <h2 className="quattrocento-sans-regular" style={{ margin: "0.3em" }}>
            Making a difference, one doggo at a time.
          </h2>
          <button style={{ margin: "0.3em", background: "#ff4e4e" }}>
            <Link to="/user/signup" style={{ color: "#fff4f2" }} className="main-button">
              Get Started
            </Link>
          </button>
          {` `}
          <button style={{ margin: "0.3em", background: "#ff4e4e" }}>
            <Link to="/user/login" style={{ color: "#fff4f2" }} className="main-button">
              Log In
            </Link>
          </button>
        </div>
        <div className="column">
          <img src="/images/main-banner.png" alt="A ring of various dogs" />
        </div>
      </div>
      <br />
      <div className="columns">
        <div className="column">
          <img
            src="../images/dog-bone-icon.png"
            alt="A dog bone"
            width="200px"
          />
          <h2 className="quattrocento-sans-regular">
            A unified platform for pet adoption
          </h2>
          <h3 className="quattrocento-sans-regular">
            Find available pets across multiple shelters in one place.
          </h3>
        </div>
        <br />
        <div className="column">
          <img
            src="../images/dog-bone-icon.png"
            alt="A dog bone"
            width="200px"
          />
          <h2 className="quattrocento-sans-regular">
            Stay connected with your favorites
          </h2>
          <h3 className="quattrocento-sans-regular">
            Explore your favorite pets{`'`} unique stories and shelter
            activities.
          </h3>
        </div>
      </div>
    </>
  );
}
