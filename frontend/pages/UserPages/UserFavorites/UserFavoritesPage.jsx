import { useState } from "react";
import PetCard from "../../../components/PetCard/PetCard";
import UserNavBar from "../../../components/NavBar/UserNavBar";

export default function UserFavoritesPage({ token }) {
  const [pets, setPets] = useState([]);
  const view = "user";

  return (
    <>
      <UserNavBar />
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
    </>
  );
}
