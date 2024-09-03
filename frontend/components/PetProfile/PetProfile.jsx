import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPetById,
  deletePet,
  deletePhoto,
} from "../../services/partnerservices";
import UpdatePetProfile from "../PartnerComponents/UpdatePetProfile";
import { format, differenceInYears } from "date-fns";
import UserNavBar from "../NavBar/UserNavBar";
import { followDog, unfollowDog } from "../../services/userService";

const PetProfile = ({ view, token }) => {
  const { petId } = useParams();
  const [petData, setPetData] = useState("");
  const {
    name,
    breed,
    gender,
    birthday,
    color,
    personality,
    adoptionStage,
    medicalHistory,
    profilePhoto,
    photos = [],
    appointments = [],
  } = petData;
  const [isEditing, setIsEditing] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const navigate = useNavigate();

  // const formattedBirthday = birthday
  //   ? format(new Date(birthday), "yyyy-MM-dd")
  //   : "Unknown";
  // console.log(birthday);
  // console.log(formattedBirthday);

  console.log("token in petprofile partner", token);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await getPetById(petId, token);
        console.log("received data from fetch pet", data);
        setPetData({ ...data.pet, appointments: data.appointments });
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

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const data = await getPetById(petId, token);
      setPetData({...data.pet, appointments: data.appointments});
    } catch (error) {
      console.error("error occurred while fetching updated pet data", error);
    }
  };

  const handleBack = () => {
    if (view === "partner") {
      navigate("/partner/pets");
    } else {
      navigate("/search");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    navigate(`/partner/pets/${petId}`);
    console.log("cancel clicked", petId)
  };

  const handleCreateAppointment = (petId) => {
    console.log("petId", petId);
    navigate(`/appointments/create/${petId}`);
  };

  const handleDeletePhoto = async (photoUrl) => {
    try {
      const updatedPet = await deletePhoto(photoUrl, petId, token);
      setPetData({ ...petData, photos: updatedPet.photos });
      alert("pet photo successfully deleted");
      navigate("/partner/pets");
    } catch (error) {
      console.error("error occurred while deleting photo", error);
    }
  };

  if (!petData) {
    console.log("no pets");
  }

  const formattedDate = new Date(petData.createdAt).toLocaleDateString();

  const handleFollow = async () => {
    try {
      if (isFollowed) {
        await unfollowDog(petId, token);
        setIsFollowed(false);
      } else {
        await followDog(petId, token);
        setIsFollowed(true);
      }
    } catch (error) {
      console.error("error", error.message)
    }
  };

  const petAge = differenceInYears(new Date(), new Date(birthday))

  return (
    <>
      {isEditing ? (
        <UpdatePetProfile
          petId={petId}
          petData={petData}
          token={token}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      ) : (
        <>
          {view === "user" && (
            <>
              <UserNavBar />
              <br />
            </>
          )}

          <img src={profilePhoto} alt={`photo of ${name}`} />
          <p>Uploaded on: {formattedDate}</p>
          <h1>{name}</h1>
          <p>Breed: {breed}</p>
          <p>Gender: {gender}</p>
          <p>
            Birthday:{" "}
            {birthday ? format(new Date(birthday), "d MMMM yyyy") : "Unknown"}
            {" "}(Age: {petAge})
          </p>
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
          <div>
            {photos.map((photoUrl) => (
              <div key={photoUrl}>
                <img src={photoUrl} alt={`${name}`} />
                
                {view === "partner" && (
                  <button onClick={() => handleDeletePhoto(photoUrl)}>
                    🗑️
                  </button>
                )}

              </div>
            ))}
          </div>

          {view === "partner" && (
            <div>
              <h2>Appointments for {name}</h2>
              {appointments.length === 0 ? (
                <h1>no appointments yet!!</h1>
              ) : (
                <div>
                  {appointments.map((appointment) => {
                    const formattedAppointmentDate = appointment.appointmentDate
                      ? format(
                          new Date(appointment.appointmentDate),
                          "d MMMM yyyy"
                        )
                      : "N/A";
                    return (
                      <li key={appointment._id}>
                        <p>Adopter: {appointment.adopter.userName}</p>
                        <p>Date: {formattedAppointmentDate}</p>
                        <p>Time: {appointment.appointmentTime}</p>
                        <p>Contact: {appointment.contact}</p>
                        <p>Inquiries: {appointment.inquiries}</p>
                      </li>
                    );
                  })}
                </div>
              )}
              <button onClick={handleBack}>Back</button>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}

          {view === "user" && (
            <div>
              <button onClick={handleBack}>Back</button>
              <button onClick={() => handleCreateAppointment(petId)}>
                Book Appointment
              </button>
              <button onClick={handleFollow}>{isFollowed ? "Unfollow" : "Follow"}</button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PetProfile;
