import UserNavBar from "../../../components/NavBar/UserNavBar"
import {Link} from "react-router-dom";

export default function UserHomePage() {
    return (
      <>
        <UserNavBar />
        <h1>What would you like to do today?</h1>
        <Link to="/search"><p>search pets</p></Link>
        <p>view favorites</p>
        <p>view appointments</p>
      </>
    );
}