import { Link } from "react-router-dom";

const PartnerNavBar = () => {
  return (
    <>
      <Link to="/">Pawfect Match</Link>
      <Link to="/partner/home">Home</Link>
      <Link to="/partner/appointments">View Appointments</Link>
      <Link to="/partner/pets">View Current Pet Listings</Link>
    </>
  );
}

export default PartnerNavBar;