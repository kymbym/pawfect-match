import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPetById, updatePet, deletePet } from "../../services/partnerservices";

const PetProfile = ({ view }) => {

  const { petId } = useParams();
  const [petData, setPetData] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await getPetById(petId);
        console.log("received data from fetch pet", data)
        setPetData(data.pet);
      } catch (error) {
        console.error("error", error);
      }
    }

    fetchPet()
  }, [petId]);

  const handleEdit = async () => {
    const updatedPetData = []

    try {
      const updatedPet = await updatePet(petId, updatedPetData);
      setPetData(updatedPet.pet);
      alert("pet successfully updated")
    } catch (error) {
      console.error("error occurred while updating pet", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePet(petId);
      alert("pet successfully deleted")
    } catch (error) {
      console.error("error occurred while deleting pet", error);
    }
  };

  if (!petData) {
    console.log("no pets")
  }

  return (
    <>
    {petData ? (
      <>
        <h1>Pet</h1>

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
    ) : (
      <h1>No pets!</h1>
    )}
    </>
  );
};

export default PetProfile;
