import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPetById, deletePet } from "../../services/partnerservices";
import EditPetProfile from "../PartnerComponents/EditPetProfile";

const PetProfile = ({ view, token }) => {
  const { petId } = useParams();
  const [petData, setPetData] = useState("");
  const { name, breed, gender, birthday, color, personality, adoptionStage, medicalHistory, profilePhoto, photos } = petData;
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  
  console.log("token in petprofile partner", token);

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
      navigate("/partner/pets");
    } catch (error) {
      console.error("error occurred while deleting pet", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const { pet } = await getPetById(petId, token);
      setPetData(pet);
    } catch (error) {
      console.error("error occurred while fetching updated pet data", error)
    }
  };

  const handleBack = () => {
    navigate("/partner/pets")
  }

  if (!petData) {
    console.log("no pets");
  }

  return (
    <>
      {isEditing ? (
        <EditPetProfile petId={petId} petData={petData} token={token} handleSave={handleSave}/>
      ) : (
        <>
        <img src={profilePhoto} alt={`photo of ${name}`} />
          <h1>{name}</h1>
          <p>Breed: {breed}</p>
          <p>Gender: {gender}</p>
          <p>Birthday: {birthday}</p>
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

          {photos.map((photoUrl) => (
            <img key={photoUrl} src={photoUrl} alt={`${name}`} />
          ))}

          {view === "partner" && (
            <div>
              <button onClick={handleBack}>Back</button>
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
