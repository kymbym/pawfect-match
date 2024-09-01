import { useState } from "react";
import { addPet } from "../../services/partnerservices";
import { useNavigate } from "react-router-dom";

const AddPetProfile = ({ token }) => {

  const [newPetData, setNewPetData] = useState({
    name: "",
    // imageUrl: "",
    breed: "",
    gender: "",
    age: "",
    color: "",
    personality: "",
    adoptionStage: "",
    medicalHistory: {
      sterilized: false,
      vaccinated: false,
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setNewPetData({
        ...newPetData,
        medicalHistory: {
          ...newPetData.medicalHistory,
          [e.target.name]: e.target.checked,
        },
      });
    } else {
      setNewPetData({ ...newPetData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPet(newPetData, token);
      alert("pet successfully added");
      navigate('/partner/pets'); 
    } catch (error) {
      console.error("error occurred while adding pet", error);
      alert("failed to add pet");
    }
  };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//         alert("uploading file...")
//         const uploadedImageUrl = await uploadFile(file);
//         console.log("uploaded image url", uploadedImageUrl)
//     } catch (error) {
//         console.error("error uploading file", error)
//     }
//   };

  return (
    <>
      <h1>Add New Pet</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newPetData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Breed:
          <input
            type="text"
            name="breed"
            value={newPetData.breed}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={newPetData.gender}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            name="age"
            value={newPetData.age}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={newPetData.color}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Personality:
          <input
            type="text"
            name="personality"
            value={newPetData.personality}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Adoption Stage:
          <input
            type="text"
            name="adoptionStage"
            value={newPetData.adoptionStage}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Sterilized:
          <input
            type="checkbox"
            name="sterilized"
            checked={newPetData.medicalHistory.sterilized}
            onChange={handleChange}
          />
        </label>
        <label>
          Vaccinated:
          <input
            type="checkbox"
            name="vaccinated"
            checked={newPetData.medicalHistory.vaccinated}
            onChange={handleChange}
          />
          {/* <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
      /> */}
        </label>
        <button type="submit">Add Pet</button>
        <button type="button" onClick={() => navigate('/partner/pets')}>Cancel</button>
      </form>
    </>
  );
};

export default AddPetProfile;
