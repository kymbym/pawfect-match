import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPetById,
  deletePet,
} from "../../services/partnerservices";
import UpdatePetProfile from "../PartnerComponents/UpdatePetProfile";
import { format, differenceInYears } from "date-fns";
import UserNavBar from "../NavBar/UserNavBar";
import PartnerNavBar from "../NavBar/PartnerNavBar";
import { followDog, unfollowDog } from "../../services/userService";
import { Link } from "react-router-dom";

const PetProfile = ({ view, token, followedPets, handleToggleFollow }) => {
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
        setIsFollowed(followedPets.includes(petId));
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchPet();
  }, [petId, token, followedPets]);

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
      setPetData({ ...data.pet, appointments: data.appointments });
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
    console.log("cancel clicked", petId);
  };

  const handleCreateAppointment = (petId) => {
    console.log("petId", petId);
    navigate(`/appointments/create/${petId}`);
  };

  // const handleDeletePhoto = async (photoUrl) => {
  //   try {
  //     const updatedPet = await deletePhoto(photoUrl, petId, token);
  //     setPetData({ ...petData, photos: updatedPet.photos });
  //     alert("pet photo successfully deleted");
  //     navigate("/partner/pets");
  //   } catch (error) {
  //     console.error("error occurred while deleting photo", error);
  //   }
  // };

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
      handleToggleFollow(petId);
    } catch (error) {
      console.error("error", error.message);
    }
  };

  const petAge = differenceInYears(new Date(), new Date(birthday));

  return (
    <>
    <div style={{ position: "sticky" }}>
        <Link to="/" style={{ color: "#ff4e4e" }}>
          <h1 className="titan-one-regular" style={{ fontSize: "4.5em", margin: "0.3em" }}>
            Pawfect Match
          </h1>
        </Link>
        {view === "user" && <UserNavBar token={token}/>}
        {view === "partner" && <PartnerNavBar token={token} />}
      </div>
      
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
          <div className="columns">
            <div className="column" style={{paddingTop: "40px"}}>
              
              <figure className="image is-256x256" style={{ width: "24em" }}>
                <img
                  className="is-rounded"
                  src={profilePhoto}
                  alt={`photo of ${name}`}
                />
                <p className="quattrocento-sans-regular-italic" style={{paddingTop:"3px"}}>
                  Uploaded on: {formattedDate}
                </p>
              </figure>
            </div>

            <div className="column" style={{ alignContent: "center" }}>
              <h1 className="titan-one-regular">{name}</h1>
              <br />
              <div
                className="row"
                style={{
                  textAlign: "left",
                  display: "inline-block",
                  margin: "auto",
                }}
              >
                <h3 className="quattrocento-sans-regular">
                  <span className="quattrocento-sans-bold">Breed:</span> {breed}
                </h3>
                <h3 className="quattrocento-sans-regular">
                  <span className="quattrocento-sans-bold">Gender:</span>{" "}
                  {gender}
                </h3>
                <h3 className="quattrocento-sans-regular">
                  <span className="quattrocento-sans-bold">Birthday:</span>{" "}
                  {birthday
                    ? format(new Date(birthday), "d MMMM yyyy")
                    : "Unknown"}{" "}
                  ({petAge} Years Old)
                </h3>
                <h3 className="quattrocento-sans-regular">
                  <span className="quattrocento-sans-bold">Color:</span> {color}
                </h3>
                <h3 className="quattrocento-sans-regular">
                  <span className="quattrocento-sans-bold">Personality:</span>{" "}
                  {personality}
                </h3>
                <h3 className="quattrocento-sans-regular">
                  <span className="quattrocento-sans-bold">
                    Adoption Stage:
                  </span>{" "}
                  {adoptionStage}
                </h3>
                <h3>
                  <span className="quattrocento-sans-bold">
                    Medical History:
                  </span>
                </h3>
                <ul>
                  <h3 className="quattrocento-sans-regular">
                    <span
                      className={`icon ${medicalHistory?.sterilized ? "has-text-success" : "has-text-danger"}`}
                    >
                      <i
                        className={`fa-solid ${medicalHistory?.sterilized ? "fa-check-square" : "fa-times-square"}`}
                      ></i>
                    </span>
                    {medicalHistory?.sterilized
                      ? " Sterilized"
                      : " Not Sterilized"}
                  </h3>
                  <h3 className="quattrocento-sans-regular">
                    <span
                      className={`icon ${medicalHistory?.vaccinated ? "has-text-success" : "has-text-danger"}`}
                    >
                      <i
                        className={`fa-solid ${medicalHistory?.vaccinated ? "fa-check-square" : "fa-times-square"}`}
                      ></i>
                    </span>
                    {medicalHistory?.vaccinated
                      ? " Vaccinated"
                      : " Not Vaccinated"}
                  </h3>
                </ul>
              </div>
            </div>
          </div>
      
          <div className="grid is-col-min-12">
            {photos.map((photoUrl) => (
              <div key={photoUrl}>
                <img src={photoUrl} alt={`${name}`} />
              </div>
            ))}
          </div>

          {view === "partner" && (
            <div>
              <h2 className="quattrocento-sans-bold" style={{paddingBottom:"10px"}}>
                Appointments for {name}
              </h2>
              {appointments.length === 0 ? (
                <h2 className="quattrocento-sans-bold">No appointments yet!</h2>
              ) : (
                <div className="table-container">
                  <table className="table" style={{ margin: "0 auto" }}>
                    <thead>
                      <tr>
                        <th className="quattrocento-sans-bold">Adopter</th>
                        <th className="quattrocento-sans-bold">Date</th>
                        <th className="quattrocento-sans-bold">Time</th>
                        <th className="quattrocento-sans-bold">Contact</th>
                        <th className="quattrocento-sans-bold">Inquiries</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => {
                        const formattedAppointmentDate =
                          appointment.appointmentDate
                            ? format(
                                new Date(appointment.appointmentDate),
                                "d MMMM yyyy"
                              )
                            : "N/A";

                        return (
                          <tr key={appointment._id}>
                            <td className="quattrocento-sans-regular">
                              {appointment.adopter.userName}
                            </td>
                            <td className="quattrocento-sans-regular">
                              {formattedAppointmentDate}
                            </td>
                            <td className="quattrocento-sans-regular">
                              {appointment.appointmentTime}
                            </td>
                            <td className="quattrocento-sans-regular">
                              {appointment.contact}
                            </td>
                            <td className="quattrocento-sans-regular">
                              {appointment.inquiries}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              <button
                onClick={handleBack}
                style={{ background: "#ff4e4e", color: "#fff4f2", margin:"4px" }}
              >
                Back to Home
              </button>
              <button
                onClick={handleUpdate}
                style={{ background: "#ff4e4e", color: "#fff4f2", margin:"4px" }}
              >
                Update Details
              </button>
              <button
                onClick={handleDelete}
                style={{ background: "#ff4e4e", color: "#fff4f2", margin:"4px" }}
              >
                Remove Listing
              </button>
            </div>
          )}

          {view === "user" && (
            <div>
              <button
                onClick={handleBack}
                style={{ background: "#ff4e4e", color: "#fff4f2" }}
              >
                Back to Home
              </button>
              <button
                onClick={() => handleCreateAppointment(petId)}
                style={{ background: "#ff4e4e", color: "#fff4f2", margin:"4px" }}
              >
                Book Appointment
              </button>
              <button
                onClick={handleFollow}
                style={{ background: "#ff4e4e", color: "#fff4f2", margin:"4px" }}
              >
                {isFollowed ? "Unfollow" : "Follow"}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PetProfile;
