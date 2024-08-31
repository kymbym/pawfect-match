import { useEffect, useState } from "react";
import { getAllPets } from "../../services/partnerservices";

const AllPets = ({ token }) => {

  const [pets, setPets] = useState([]);

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
      <h1>All Pets</h1>
      {pets.length === 0 ? (
        <h1>no pets found!</h1>
      ) : (
        pets.map((pet) => (
        <li key={pet._id}>
          {pet.name}
    </li>
    ))
    )}
    </>
  )
};

export default AllPets;