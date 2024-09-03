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
            <option value="Male">Male</option>
            <option value="Female">Female</option>
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
