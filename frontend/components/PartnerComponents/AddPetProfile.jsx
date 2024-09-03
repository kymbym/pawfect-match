import { useState } from "react";
import { addPet } from "../../services/partnerservices";
import { useNavigate } from "react-router-dom";
import { uploadFile, uploadFiles } from "../../services/partnerservices";

const AddPetProfile = ({ token }) => {
  const [newPetData, setNewPetData] = useState({
    name: "",
    breed: "",
    gender: "",
    birthday: "",
    color: "",
    personality: "",
    photos: [],
    profilePhoto: "",
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
      navigate("/partner/pets");
    } catch (error) {
      console.error("error occurred while adding pet", error);
      alert("failed to add pet");
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    try {
      alert("uploading file...");
      const uploadedImageUrl = await uploadFiles(files);
      setNewPetData({ ...newPetData, photos: uploadedImageUrl });
      console.log("uploaded image url", uploadedImageUrl);
    } catch (error) {
      console.error("error uploading file", error);
    }
  };

  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      alert("uploading profile photo...");
      const uploadedImageUrl = await uploadFile(file);
      setNewPetData({ ...newPetData, profilePhoto: uploadedImageUrl });
      console.log("uploaded profile photo url", uploadedImageUrl);
    } catch (error) {
      console.error("error uploading file", error);
    }
  };

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
          <select
            value={newPetData.gender}
            onChange={(event) =>
              setNewPetData({ ...newPetData, gender: event.target.value })
            }
            required
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Birthday:
          <input
            type="date"
            name="birthday"
            value={newPetData.birthday}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Color:
          <select
            value={newPetData.color}
            onChange={(event) =>
              setNewPetData({ ...newPetData, color: event.target.value })
            }
            required
          >
            <option value=""></option>
            <option value="black">Black</option>
            <option value="blue merle">Blue Merle</option>
            <option value="brindle">Brindle</option>
            <option value="brown">Brown</option>
            <option value="cream">Cream</option>
            <option value="gray">Gray</option>
            <option value="tan">Tan</option>
            <option value="white">White</option>
          </select>
        </label>
        <label>
          Personality:
          <select
            value={newPetData.personality}
            onChange={(event) =>
              setNewPetData({ ...newPetData, personality: event.target.value })
            }
            required
          >
            <option value=""></option>
            <option value="affectionate">Affectionate</option>
            <option value="calm">Calm</option>
            <option value="curious">Curious</option>
            <option value="energetic">Energetic</option>
            <option value="friendly">Friendly</option>
            <option value="gentle">Gentle</option>
            <option value="loyal">Loyal</option>
            <option value="playful">Playful</option>
          </select>
        </label>
        <label>
          Adoption Stage:
          <select
            value={newPetData.adoptionStage}
            onChange={(event) =>
              setNewPetData({
                ...newPetData,
                adoptionStage: event.target.value,
              })
            }
            required
          >
            <option value="available">Available</option>
            <option value="under review">Under Review</option>
            <option value="adopted">Adopted</option>
          </select>
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
        </label>
        <label>
          Profile Picture:
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleProfilePhotoChange}
          />
        </label>
        <label>
          Other Photos:
          <input
            type="file"
            name="photos"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
        <button type="submit">Add Pet</button>
        <button type="button" onClick={() => navigate("/partner/pets")}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default AddPetProfile;
