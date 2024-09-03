import { uploadFile, uploadFiles } from "../../services/partnerservices";
import { updatePet } from "../../services/partnerservices";
import { useState } from "react";

const UpdatePetProfile = ({ petId, petData, token, handleSave }) => {
  const [newPetData, setNewPetData] = useState({
    ...petData,
    medicalHistory: {
      sterilized: petData.medicalHistory?.sterilized,
      vaccinated: petData.medicalHistory?.vaccinated,
    },
  });

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

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    try {
      alert("uploading file...");
      const uploadedImageUrl = await uploadFiles(files);
      setNewPetData({ ...newPetData, photos: [...newPetData.photos, ...uploadedImageUrl] });
      console.log("uploaded image url", uploadedImageUrl);
    } catch (error) {
      console.error("error uploading file", error);
    }
  };

  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      alert("uploading profile photo...")
      const uploadedImageUrl = await uploadFile(file);
      setNewPetData({...newPetData, profilePhoto: uploadedImageUrl});
      console.log("uploaded profile photo url", uploadedImageUrl);
    } catch (error) {
      console.error("error uploading file", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPet = await updatePet(petId, newPetData, token);
      console.log("pet is succesfully updated", updatedPet);
      alert("pet successfully updated");
      handleSave();
    } catch (error) {
      console.error("error occurred while updating pet", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newPetData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Breed:
          <input
            type="text"
            name="breed"
            value={newPetData.breed}
            onChange={handleChange}
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
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </form>
    </>
  );
};

export default UpdatePetProfile;
