import UserNavBar from "../../../components/NavBar/UserNavBar";
import PetCard from "../../../components/PetCard/PetCard";
import UserSearchBar from "../../../components/UserSearchBar/UserSearchBar";
import { useState, useEffect } from "react";
import { getAllPets } from "../../../services/partnerservices";

export default function UserSearchPage({ token }) {

  const [displayQuery, setdisplayQuery] = useState("");
  const [pets, setPets] = useState([]);
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
      } catch (error) {
        console.error("error fetching pets", error);
      }
    };

    fetchPets();
  }, [token]);

  return (
    <>
      <UserNavBar />
      <h1>Find your bestie!</h1>
      <UserSearchBar token={token} />
      <p>other search functions</p>
      <div>
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} view={view} /> 
          ))}
        </div>
    </>
  );
};

