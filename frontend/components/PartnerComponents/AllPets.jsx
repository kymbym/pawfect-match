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
          <h2>{pet.name}</h2>
          <p>Breed: {pet.breed}</p>
          <p>Gender: {pet.gender}</p>
          <p>Age: {pet.age}</p>
          <p>Color: {pet.color}</p>
          <p>Personality: {pet.personality}</p>
          <p>Adoption Stage: {pet.adoptionStage}</p>
          <p>Medical History:
            <li>{pet.medicalHistory.sterilized ? "Sterilized" : "Not Sterilized"}</li>
            <li>{pet.medicalHistory.vaccinated ? "Vaccinated" : "Not Vaccinated"}</li>
          </p>
    </li>
    ))
    )}
    </>
  )
};

export default AllPets;