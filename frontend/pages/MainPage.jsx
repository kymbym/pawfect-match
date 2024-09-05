import { Link } from "react-router-dom";

export default function MainPage () {
  return (
    <>
      <h1>Find your furrever friend today.</h1>
      <h2>Making a difference, one doggo at a time.</h2>
      <img src="/images/main-banner.png" alt="A ring of various dogs" />
      <br />
      <button className="button is-danger" style={{background: "black"}}>
        <Link to="/user/signup">Get Started</Link>
      </button>
      {` `}
      <button>
        <Link to="/user/login">Log In</Link>
      </button>
      <h2>A unified platform for pet adoption</h2>
      <h3>Find available pets across multiple shelters in one place.</h3>
      <br />
      <h2>Stay connected with your favorites</h2>
      <h3>
        Explore your favorite pets{`'`} unique stories and shelter activities.
      </h3>
    </>
  );
};
