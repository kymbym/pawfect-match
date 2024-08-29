import { Link } from "react-router-dom";

export default function UserNavBar() {
  return (
    <>
      <Link to="/">Pawfect Match</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/events">Events</Link>
      {/* THE BELOW TWO NAVS LINKS SHOULD ONLY APPEAR WHEN USER HAS LOGGED IN. FIGURE OUT LATER */}
      <Link to="/search">Find Pets</Link>
      <Link to="/home/:userId">Home</Link>
    </>
  );
}
