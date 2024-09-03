import UserNavBar from "../../../components/NavBar/UserNavBar";
import PetCard from "../../../components/PetCard/PetCard";
import UserSearchBar from "../../../components/UserSearchBar/UserSearchBar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllPets } from "../../../services/partnerservices";
import { getFilteredPets } from "../../../services/userService";

export default function UserSearchPage({ token }) {
  const [pets, setPets] = useState([]);
  const [searchOption, setSearchOption] = useState("");
  const location = useLocation();
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
    console.log(formJson);
    await getFilteredPets(formJson, token)
  };

  return (
    <>
      <UserNavBar />
      <h1>Find your bestie!</h1>
      <UserSearchBar token={token} />
      <form onSubmit={handleSubmit}>
        <label>
          Gender:
          <select
            value={searchOption.gender}
            name="gender"
            onChange={(event) =>
              setSearchOption({ ...searchOption, gender: event.target.value })
            }
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Color:
          <select
            value={searchOption.color}
            name="color"
            onChange={(event) =>
              setSearchOption({ ...searchOption, color: event.target.value })
            }
          >
            <option value=""></option>
            <option value="black">Black</option>
            <option value="blue merle">Blue Merle</option>
            <option value="brindle">Brindle</option>
            <option value="brown">Brown</option>
            <option value="cream">Cream</option>
            <option value="gray">Gray</option>
            <option value="tan">Tan</option>
            <option value="white">White</option>
          </select>
        </label>
        <label>
          Personality:
          <select
            value={searchOption.personality}
            name="personality"
            onChange={(event) =>
              setSearchOption({ ...searchOption, personality: event.target.value })
            }
          >
            <option value=""></option>
            <option value="affectionate">Affectionate</option>
            <option value="calm">Calm</option>
            <option value="curious">Curious</option>
            <option value="energetic">Energetic</option>
            <option value="friendly">Friendly</option>
            <option value="gentle">Gentle</option>
            <option value="loyal">Loyal</option>
            <option value="playful">Playful</option>
          </select>
        </label>
        <button type="submit">Search</button>
      </form>
      <div>
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet} view={view} />
        ))}
      </div>
    </>
  );
}
