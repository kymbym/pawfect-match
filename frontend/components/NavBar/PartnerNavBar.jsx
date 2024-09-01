import { Link } from "react-router-dom";

const PartnerNavBar = () => {
  return (
    <>
      <Link to="/">Pawfect Match</Link>
      <Link to="/home/:partnerId">Home</Link>
      <Link to="/appointments">View Appointments</Link>
      <Link to="/pets">View Current Pet Listings</Link>
    </>
  );
}

export default PartnerNavBar;