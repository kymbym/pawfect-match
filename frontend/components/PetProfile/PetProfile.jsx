import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPetById, deletePet } from "../../services/partnerservices";
import EditPetProfile from "../PartnerComponents/EditPetProfile";

const PetProfile = ({ view, token }) => {
  const { petId } = useParams();
  const [petData, setPetData] = useState("");
  const { name, breed, gender, age, color, personality, adoptionStage, medicalHistory } = petData;
  const [isEditing, setIsEditing] = useState(false);
  console.log("token in petprofile", token);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const { pet } = await getPetById(petId, token);
        console.log("received data from fetch pet", pet);
        setPetData(pet);
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchPet();
  }, [petId, token]);

  const handleDelete = async () => {
    try {
      await deletePet(petId, token);
      alert("pet successfully deleted");
      // redirect to all pets?
    } catch (error) {
      console.error("error occurred while deleting pet", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // const handleSave = async () => {
  //   setIsEditing(false);
  //   try {
  //     const { pet } = await getPetById(petId, token);
  //     setPetData(pet);
  //   } catch (error) {
  //     console.error("error occurred while fetching updated pet data", error)
  //   }
  // }

  if (!petData) {
    console.log("no pets");
  }

  return (
    <>
      {isEditing ? (
        <EditPetProfile petId={petId} petData={petData} token={token}/>
      ) : (
        <>
          <h1>{name}</h1>
          <p>Breed: {breed}</p>
          <p>Gender: {gender}</p>
          <p>Age: {age}</p>
          <p>Color: {color}</p>
          <p>Personality: {personality}</p>
          <p>Adoption Stage: {adoptionStage}</p>
          <p>Medical History:</p>
          <ul>
            <li>
              {medicalHistory?.sterilized ? "Sterilized" : "Not Sterilized"}
            </li>
            <li>
              {medicalHistory?.vaccinated ? "Vaccinated" : "Not Vaccinated"}
            </li>
          </ul>

          {view === "partner" && (
            <div>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}

          {view === "user" && (
            <div>
              <button>Book Appointment</button>
              <button>Follow</button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PetProfile;
