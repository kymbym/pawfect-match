import UserNavBar from "../../../components/NavBar/UserNavBar";
import { Link, useParams } from "react-router-dom";

export default function UserHomePage({ token }) {
  const { userId } = useParams();

  return (
    <>
      <Link to="/" style={{ color: "#ff4e4e" }}>
        <h1
          className="titan-one-regular"
          style={{ fontSize: "4.5em", margin: "0.3em" }}
        >
          Pawfect Match
        </h1>
      </Link>
      <UserNavBar token={token} />
      <h1 className="quattrocento-sans-regular" style={{marginTop: "0.4em"}}>
        What would you like to do today?
      </h1>
      <div className="columns" style={{ marginTop: "1.7em" }}>
        <div className="column is-align-self-flex-end">
          <Link to="/search">
            <img
              src="../public/images/search-pet-banner.png"
              alt="A poodle opening the door"
            />
            <p
              className="quattrocento-sans-regular"
              style={{ fontSize: "1.3em" }}
            >
              Search Pets
            </p>
          </Link>
        </div>
        <div className="column is-align-self-flex-end">
          <Link to={`/favorites/${userId}`}>
            <img
              src="../public/images/user-view-favorites-banner.png"
              alt="Two poodles lying down side by side"
            />
            <p
              className="quattrocento-sans-regular"
              style={{ fontSize: "1.3em" }}
            >
              View Favorites
            </p>
          </Link>
        </div>
        <div className="column is-align-self-flex-end">
          <Link to={`/appointments/${userId}`}>
            <img
              src="../public/images/partner-view-appointments-banner.png"
              alt="A poodle reading a book"
            />
            <p
              className="quattrocento-sans-regular"
              style={{ fontSize: "1.3em" }}
            >
              View Appointments
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
