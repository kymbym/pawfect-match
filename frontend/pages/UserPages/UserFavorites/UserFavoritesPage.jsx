import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      <Link to="/" style={{ color: "#ff4e4e" }}>
        <h1
          className="titan-one-regular"
          style={{ fontSize: "4.5em", margin: "0.3em" }}
        >
          Pawfect Match
        </h1>
      </Link>
      <UserNavBar token={token} />
      <h1 className="titan-one-regular">Your Favorites</h1>
      {pets.length === 0 ? (
        <p>Start following some pets!</p>
      ) : (
        <div className="grid is-col-min-12">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} view={view} />
          ))}
        </div>
      )}
      <button
        onClick={handleBack}
        style={{ margin: "0.3em", background: "#ff4e4e" }}
      >
        <p style={{ color: "#fff4f2" }}>Back to Home</p>
      </button>
    </>
  );
}
