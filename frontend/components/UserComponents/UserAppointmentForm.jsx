import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserNavBar from "../NavBar/UserNavBar";
import { editSpecificAppointment } from "../../services/userService";

export default function UserAppointmentForm({
  isEditing = false,
  appointmentInfo = {},
  token,
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contact: "",
    date: "",
    time: "",
    inquiries: "",
  });
  const { petId } = useParams();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      if (isEditing) {
        const appointmentInfo = formData;
        await editSpecificAppointment(
          appointmentInfo._id,
          appointmentInfo,
          token
        );
        // navigate(`/appointments/${userId}`)
      } else {
        navigate("/home/:userId");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const { contact, date, time, inquiries } = formData;

  const isFormInvalid = () => {
    return !(contact && date && time && inquiries);
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
          <input type="hidden" name="petId" value={petId} />
        </label>
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
            type="text"
            id="date"
            value={date}
            name="date"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Time:{" "}
          <input
            type="text"
            id="time"
            value={time}
            name="time"
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
