import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserNavBar from "../NavBar/UserNavBar";

export default function UserAppointmentForm() {
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
      navigate("/home/:userId");
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
      <h1>Book an appointment</h1>
      <h2>Enter your details and we'll see you real soon!</h2>
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
            type="date"
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
            type="time"
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
        <button disabled={isFormInvalid()}>Submit</button>
      </form>
    </>
  );
}
