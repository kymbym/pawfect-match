import PartnerNavBar from "../../components/NavBar/PartnerNavBar";
import { useState } from "react";

const PartnerHomePage = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        console.log("searching")
}

return (
      <>
        <PartnerNavBar />
        <h1>Summary Report</h1>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
        <button onClick={handleSearch}>Search</button>
      </>
    );

};

export default PartnerHomePage;