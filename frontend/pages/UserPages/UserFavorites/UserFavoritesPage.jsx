import { useState } from "react";
import PetCard from "../../../components/PetCard/PetCard";

export default function UserFavoritesPage({token}) {
    const [pets, setPets] = useState([]);
    const view = "user";
    
    return (
      <>
        <h1>Your Favourites</h1>
        <div>
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} view={view} />
          ))}
        </div>
      </>
    );
}
