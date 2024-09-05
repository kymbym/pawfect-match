import { useEffect, useState } from "react";
import { getAllPets } from "../../services/partnerservices";
import PartnerNavBar from "../NavBar/PartnerNavBar";
import { useNavigate } from "react-router-dom";
import PetCard from "../PetCard/PetCard";
import { Link } from "react-router-dom";

const AllPets = ({ token }) => {
  const [pets, setPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedPets, setSearchedPets] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const view = "partner";

  useEffect(() => {
    if (!token) return;

    const fetchPets = async () => {
      try {
        console.log(
          "fetching pets with token in allpets component and sortby",
          token,
          sortBy
        );
        const data = await getAllPets(token, sortBy, searchQuery);
        console.log("pets data", data);
        if (data && data.pets) {
          setPets(data.pets);
          setSearchedPets(data.pets);
        } else {
          console.error("no pets data found!");
        }
      } catch (error) {
        console.error("error fetching pets", error);
      }
    };

    fetchPets();
  }, [token, sortBy, searchQuery]);

  const handleAddPet = () => {
    navigate("/partner/pets/add");
  };

  const handleSortBy = (order) => {
    setSortBy(order);
  };

  return (
    <>
      <Link to="/" style={{ color: "#ff4e4e" }}>
        <h1
          className="titan-one-regular"
          style={{ fontSize: "4.5em", margin: "0.3em" }}
        >
          Pawfect Match
        </h1>
      </Link>
      <PartnerNavBar />
      <div
        style={{ textAlign: "center", alignItems: "center", paddingTop: "5px" }}
      >
        <button
          onClick={handleAddPet}
          style={{
            background: "#ff4e4e",
            color: "#fff4f2",
            margin: "0 2px 0 2px",
          }}
        >
          Upload Pet
        </button>
        <input
          className="input"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "180px", margin: "0 2px 0 2px" }}
        />
        <button
          onClick={() => handleSortBy("latest")}
          style={{
            background: "#ff4e4e",
            color: "#fff4f2",
            margin: "0 2px 0 2px",
          }}
        >
          Sort By Latest
        </button>
        <button
          onClick={() => handleSortBy("earliest")}
          style={{
            background: "#ff4e4e",
            color: "#fff4f2",
            margin: "0 2px 0 2px",
          }}
        >
          Sort By Earliest
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px", marginTop:"15px" }}>
        {searchedPets.length === 0 ? (
          <h1 className="quattrocento-sans-bold" style={{ paddingTop: "50px" }}>
            No pets found!
          </h1>
        ) : (
          <div
            className="grid is-col-min-12"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {searchedPets.map((pet) => (
              <PetCard key={pet._id} pet={pet} view={view} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllPets;
