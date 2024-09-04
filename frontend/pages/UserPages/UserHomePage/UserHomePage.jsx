import UserNavBar from "../../../components/NavBar/UserNavBar";
import { Link, useParams } from "react-router-dom";

export default function UserHomePage({ token }) {
  const { userId } = useParams();

  return (
    <>
      <UserNavBar token={token} />
      <h1>What would you like to do today?</h1>
      <div>
      <Link to="/search">
      <img src="../public/images/search-pet-banner.png" alt="A poodle opening the door" />
        <p>Search Pets</p>
      </Link>
      </div>
      <div>
        <Link to={`/favorites/${userId}`}>
          <img
            src="../public/images/user-view-favorites-banner.png"
            alt="Two poodles lying down side by side"
          />
          <p>View Favorites</p>
        </Link>
      </div>
      <div>
        <Link to={`/appointments/${userId}`}>
          <img
            src="../public/images/partner-view-appointments-banner.png"
            alt="A poodle reading a book"
          />
          <p>View Appointments</p>
        </Link>
      </div>
    </>
  );
}
