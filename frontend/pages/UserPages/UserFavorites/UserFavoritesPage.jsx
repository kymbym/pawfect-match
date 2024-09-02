import { useState, useEffect } from "react";
import PetCard from "../../../components/PetCard/PetCard";
import UserNavBar from "../../../components/NavBar/UserNavBar";
import { getUserFavorites } from "../../../services/userService";

export default function UserFavoritesPage({ token }) {
  const [pets, setPets] = useState([]);
  const view = "user";

    useEffect(() => {
      if (!token) return;

      const fetchPets = async () => {
        try {
          console.log("fetch fav pets token", token);
          const data = await getUserFavorites(token);
          console.log("got user", data);
          console.log("fav pets id", data.user.dogsFollowed)
        //   if (data && data.pets) {
        //     setPets(data.pets);
        //   } else {
        //     console.error("no pets data found!");
        //   }
        //   if (location.state) {
        //     console.log("location state result:", location.state.results.pets);
        //     const findPetByNameResult = location.state.results.pets;
        //     setPets(findPetByNameResult);
        //   }
        } catch (error) {
          console.error("error fetching pets", error);
        }
      };

      fetchPets();
    }, [token, location.state]);

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
