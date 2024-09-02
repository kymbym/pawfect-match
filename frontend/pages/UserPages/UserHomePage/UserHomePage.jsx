import UserNavBar from "../../../components/NavBar/UserNavBar";
import { Link, useParams } from "react-router-dom";

export default function UserHomePage() {
  const { userId } = useParams();

  return (
    <>
      <UserNavBar />
      <h1>What would you like to do today?</h1>
      <Link to="/search">
        <p>search pets</p>
      </Link>
      <p>view favorites</p>
      <Link to={`/appointments/${userId}`}>
        <p>view appointments</p>
      </Link>
    </>
  );
}
