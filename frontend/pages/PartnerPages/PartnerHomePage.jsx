import PartnerNavBar from "../../components/NavBar/PartnerNavBar";
import { useEffect, useState } from "react";
import { getPartnerById } from "../../services/partnerservices";

const PartnerHomePage = ({ token }) => {
  
  const [organizationName, setOrganizationName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = () => {
    console.log("searching");
  };

  return (
    <>
      <PartnerNavBar />
      <h1>Welcome, {organizationName}!</h1>
      <h2>Summary Report</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </>
  );
};

export default PartnerHomePage;
