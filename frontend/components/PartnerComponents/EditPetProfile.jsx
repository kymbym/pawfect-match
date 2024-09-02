import { uploadFile, uploadFiles } from "../../services/partnerservices";
import { updatePet } from "../../services/partnerservices";
import { useState } from "react";

const EditPetProfile = ({ petId, petData, token, handleSave }) => {
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
          <input
            type="text"
            name="gender"
            value={newPetData.gender}
            onChange={handleChange}
          />
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
          <input
            type="text"
            name="color"
            value={newPetData.color}
            onChange={handleChange}
          />
        </label>
        <label>
          Personality:
          <input
            type="text"
            name="personality"
            value={newPetData.personality}
            onChange={handleChange}
          />
        </label>
        <label>
          Adoption Stage:
          <input
            type="text"
            name="adoptionStage"
            value={newPetData.adoptionStage}
            onChange={handleChange}
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

export default EditPetProfile;
