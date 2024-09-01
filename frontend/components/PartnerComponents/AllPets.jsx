import { useEffect, useState } from "react";
import { getAllPets } from "../../services/partnerservices";
import PartnerNavBar from "../NavBar/PartnerNavBar";
import { useNavigate } from "react-router-dom";
import PetCard from "../PetCard/PetCard";

const AllPets = ({ token }) => {

  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const view = "partner";

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

  const handleAddPet = () => {
    navigate("/partner/pets/add")
  }
  
  return (
    <>
      <h1>All Pets</h1>
      <PartnerNavBar />
      <button onClick={handleAddPet}>Upload Pet</button>
      {pets.length === 0 ? (
        <h1>no pets found!</h1>
      ) : (
        <div>
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} view={view} /> 
          ))}
        </div>
      )}
    </>
  )
};

export default AllPets;

{/* <>
      <h1>All Pets</h1>
      <button onClick={handleAddPet}>Upload Pet</button>
      {pets.length === 0 ? (
        <h1>no pets found!</h1>
      ) : (
        pets.map((pet) => (
        <li key={pet._id}>
          <Link to={`/partner/pets/${pet._id}`}>{pet.name}</Link>

          <p>Breed: {pet.breed}</p>
          <p>Gender: {pet.gender}</p>
          <p>Age: {pet.age}</p>
          <p>Color: {pet.color}</p>
          <p>Personality: {pet.personality}</p>
          <p>Adoption Stage: {pet.adoptionStage}</p>
          <p>Medical History:</p>
          <ul>
            <li>{pet.medicalHistory.sterilized ? "Sterilized" : "Not Sterilized"}</li>
            <li>{pet.medicalHistory.vaccinated ? "Vaccinated" : "Not Vaccinated"}</li>
          </ul>
    </li>
    ))
    )}
    </> */}