import UserNavBar from "../../../components/NavBar/UserNavBar";
import PetCard from "../../../components/PetCard/PetCard";
import UserSearchBar from "../../../components/UserSearchBar/UserSearchBar";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllPets } from "../../../services/partnerservices";
import { getFilteredPets } from "../../../services/userService";
import { extractPayload } from "../../../utils/jwtUtils";
import { Link } from "react-router-dom";

export default function UserSearchPage({ token }) {
  const [pets, setPets] = useState([]);
  const [searchOption, setSearchOption] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const view = "user";

  useEffect(() => {
    if (!token) return;

    const fetchPets = async () => {
      try {
        console.log("fetching pets with token in allpets component", token);
        const data = await getAllPets(token);
        console.log("pets data", data);
        if (data && data.pets) {
          setPets(data.pets);
        } else {
          console.error("no pets data found!");
        }
        if (location.state) {
          console.log("location state result:", location.state.results.pets);
          const findPetByNameResult = location.state.results.pets;
          setPets(findPetByNameResult);
        }
      } catch (error) {
        console.error("error fetching pets", error);
      }
    };

    fetchPets();
  }, [token, location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form); //FormData is part of some web api
    const formJson = Object.fromEntries(formData.entries());
    console.log("formJson:", formJson);
    const filteredPets = await getFilteredPets(formJson, token);
    console.log("filtered pets", filteredPets);
    setPets(filteredPets);
  };

  const handleBack = () => {
    const decoded = extractPayload(token)
    const userId = decoded._id
    navigate(`/home/${userId}`)
  }

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
    <UserNavBar token={token} />
    <img
      src="../public/images/find-new-bestie-banner.png"
      alt="A person hugging a poodle"
      style={{ display: "block", margin: "0 auto", height: "250px" }}
    />
    <h1
      className="titan-one-regular"
      style={{ fontSize: "45px", textAlign: "center", paddingBottom:"0.5em"}}
    >
      Find your bestie!
    </h1>
    <div
      style={{
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      <UserSearchBar token={token} />
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          margin: "20px auto",
          maxWidth: "1000px",
        }}
      >
        <label className="quattrocento-sans-bold" style={{ display: "flex", flexDirection: "column" }}>
          Gender:
          <select
            value={searchOption.gender}
            name="gender"
            onChange={(event) =>
              setSearchOption({ ...searchOption, gender: event.target.value })
            }
            style={{ padding: "5px", width: "120px" }}
          >
            <option value=""></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label className="quattrocento-sans-bold" style={{ display: "flex", flexDirection: "column" }}>
          Color:
          <select
            value={searchOption.color}
            name="color"
            onChange={(event) =>
              setSearchOption({ ...searchOption, color: event.target.value })
            }
            style={{ padding: "5px", width: "120px" }}
          >
            <option value=""></option>
            <option value="Black">Black</option>
            <option value="Blue Merle">Blue Merle</option>
            <option value="Brindle">Brindle</option>
            <option value="Brown">Brown</option>
            <option value="Cream">Cream</option>
            <option value="Gray">Gray</option>
            <option value="Tan">Tan</option>
            <option value="White">White</option>
          </select>
        </label>
        <label className="quattrocento-sans-bold" style={{ display: "flex", flexDirection: "column" }}>
          Personality:
          <select
            value={searchOption.personality}
            name="personality"
            onChange={(event) =>
              setSearchOption({
                ...searchOption,
                personality: event.target.value,
              })
            }
            style={{ padding: "5px", width: "120px" }}
          >
            <option value=""></option>
            <option value="Affectionate">Affectionate</option>
            <option value="Calm">Calm</option>
            <option value="Curious">Curious</option>
            <option value="Energetic">Energetic</option>
            <option value="Friendly">Friendly</option>
            <option value="Gentle">Gentle</option>
            <option value="Loyal">Loyal</option>
            <option value="Playful">Playful</option>
          </select>
        </label>
        <button
          type="submit"
          style={{
            background: "#ff4e4e",
            color: "#fff4f2",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "20px",
            height: "35px", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          Search
        </button>
      </form>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet} view={view} />
        ))}
      </div>
      <button
        onClick={handleBack}
        style={{
          background: "#ff4e4e",
          color: "#fff4f2",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "20px",
        }}
      >
        Back to Home
      </button>
    </div>
  </>
)
};
