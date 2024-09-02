import PartnerNavBar from "../../components/NavBar/PartnerNavBar";
import { useEffect, useState } from "react";
import { getPartnerById } from "../../services/partnerservices";
import { Link } from "react-router-dom";

const PartnerHomePage = ({ token }) => {
  
  const [organizationName, setOrganizationName] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchPartnerDetails = async () => {
      try {
        const data = await getPartnerById(token);
        if (data && data.partner) {
          setOrganizationName(data.partner.organizationName);
        }
      } catch (error) {
        console.error("failed to fetch partner details", error);
      }
    };
    fetchPartnerDetails();
  }, [token]);

  return (
    <>
      <PartnerNavBar />
      <h1>Welcome, {organizationName}!</h1>
      <h3>Your next upcoming appointment:</h3>
      <Link to="/partner/appointments">View Appointments</Link>
      <Link to="/partner/pets">View Current Pet Listings</Link>
    </>
  );
};

export default PartnerHomePage;
