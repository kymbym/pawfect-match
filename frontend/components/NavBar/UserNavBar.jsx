import { Link } from "react-router-dom";
import { extractPayload } from "../../utils/jwtUtils";

export default function UserNavBar({ token }) {
  const decoded = extractPayload(token);
  const userId = decoded._id;

  return (
    <>
      <Link to="/">Pawfect Match</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/events">Events</Link>
      {/* THE BELOW TWO NAVS LINKS SHOULD ONLY APPEAR WHEN USER HAS LOGGED IN. FIGURE OUT LATER */}
      <Link to="/search">Find Pets</Link>
      <Link to={`/home/${userId}`}>Home</Link>
    </>
  );
}
