import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserNavBar from "../NavBar/UserNavBar";
import {
  editSpecificAppointment,
  createAppointment,
} from "../../services/userService";

export default function UserAppointmentForm({
  isEditing = false,
  appointmentInfo = {},
  token,
}) {
  const navigate = useNavigate();
  const { petId } = useParams();
  const [formData, setFormData] = useState({
    pet: petId,
    contact: "",
    appointmentDate: "",
    appointmentTime: "",
    inquiries: "",
  });
  // ?/appointments?petId=xxx&appointmentId=xxx -> search params?
  console.log("appointment form token", token);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      if (isEditing) {
        const appointmentInfo = formData;
        console.log("appointment info:", formData);
        await editSpecificAppointment(appointmentInfo, token);
        // navigate(`/appointments/${userId}`)
      } else {
        createAppointment(formData, token);
        // navigate(`/home/${userId}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const { contact, appointmentDate, appointmentTime, inquiries } = formData;

  const isFormInvalid = () => {
    return !(contact && appointmentDate && appointmentTime);
  };

  return (
    <>
      <UserNavBar />
      <h1>{isEditing ? "Edit appointment" : "Book an appointment"}</h1>
      <h2>
        {isEditing
          ? "Update your appointment details"
          : "Enter your details and we'll see you real soon!"}
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          PetId:{" "}
          <input type="text" name="pet" value={petId} disabled="disabled" />
        </label>
        <br />
        <label>
          Contact:{" "}
          <input
            type="text"
            id="contact"
            value={contact}
            name="contact"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Date:{" "}
          <input
            type="date"
            id="date"
            value={appointmentDate}
            name="appointmentDate"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Time:{" "}
          <input
            type="time"
            id="time"
            value={appointmentTime}
            name="appointmentTime"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Inquiries (if any):{" "}
          <input
            type="text"
            id="inquiries"
            value={inquiries}
            name="inquiries"
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <button disabled={isFormInvalid()}>
          {isEditing ? "Update Appointment" : "Submit"}
        </button>
      </form>
    </>
  );
}
