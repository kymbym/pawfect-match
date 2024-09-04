import { useState, useEffect } from "react";
import PetCard from "../../../components/PetCard/PetCard";
import UserNavBar from "../../../components/NavBar/UserNavBar";
import { getUserFavorites } from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import { extractPayload } from "../../../utils/jwtUtils";

export default function UserFavoritesPage({ token }) {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const view = "user";

  useEffect(() => {
    if (!token) return;

    const fetchPets = async () => {
      try {
        console.log("fetch fav pets token", token);
        const data = await getUserFavorites(token);
        console.log("got user", data);
        console.log("fav pets data", data.user.dogsFollowed);
        if (data.user.dogsFollowed) {
          setPets(data.user.dogsFollowed);
        } else {
          console.error("No favorites!");
        }
      } catch (error) {
        console.error("error fetching pets", error);
      }
    };

    fetchPets();
  }, [token]);

  const handleBack = () => {
    const decoded = extractPayload(token);
    const userId = decoded._id;
    navigate(`/home/${userId}`);
  };

  return (
    <>
      <UserNavBar token={token} />
      <h1>Your Favourites</h1>
      {pets.length === 0 ? (
        <p>Start following some pets!</p>
      ) : (
        <div>
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} view={view} />
          ))}
        </div>
      )}
      <button onClick={handleBack}>Back to Home</button>
    </>
  );
}
