import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import UserNavBar from "../NavBar/UserNavBar";
import {
  editSpecificAppointment,
  createAppointment,
} from "../../services/userService";
import { extractPayload } from "../../utils/jwtUtils";

export default function UserAppointmentForm({
  isEditing = false,
  appointmentInfo,
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

  console.log("appointment form token", token);

  useEffect(() => {
    if (isEditing && appointmentInfo) {
      setFormData({
        pet: appointmentInfo.pet._id || "",
        contact: appointmentInfo.contact || "",
        appointmentDate: appointmentInfo.appointmentDate || "",
        appointmentTime: appointmentInfo.appointmentTime || "",
        inquiries: appointmentInfo.inquiries || "",
      });
    }
  }, [isEditing, appointmentInfo]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      if (isEditing) {
        console.log("appointment info in editing", appointmentInfo);
        // const appointmentInfo = formData;
        await editSpecificAppointment(appointmentInfo._id, formData, token);
        console.log("edit specific appt form data:", formData);
        const decoded = extractPayload(token);
        const userId = decoded._id;
        navigate(`/home/${userId}`);
      } else {
        createAppointment(formData, token);
        const decoded = extractPayload(token);
        const userId = decoded._id;
        navigate(`/home/${userId}`);
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
      <Link to="/" style={{ color: "#ff4e4e" }}>
        <h1
          className="titan-one-regular"
          style={{ fontSize: "4.5em", margin: "0.3em" }}
        >
          Pawfect Match
        </h1>
      </Link>
      <UserNavBar token={token} />
      <h1 className="titan-one-regular">
        {isEditing ? "Edit appointment" : "Book an appointment"}
      </h1>
      <h3 className="quattrocento-sans-regular">
        {isEditing
          ? "Update your appointment details"
          : "Enter your details and we'll see you real soon!"}
      </h3>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">PetId: </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="pet"
                value={formData.pet || ""}
                disabled="disabled"
                style={{ textAlign: "center" }}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Contact: </label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="contact"
                placeholder="Contact"
                value={formData.contact || ""}
                name="contact"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Date: </label>
            <div className="control">
              <input
                className="input"
                type="date"
                id="date"
                value={formData.appointmentDate || ""}
                name="appointmentDate"
                onChange={handleChange}
                style={{ width: "10em" }}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Time: </label>
            <div className="control">
              <input
                className="input"
                type="time"
                id="time"
                value={formData.appointmentTime || ""}
                name="appointmentTime"
                onChange={handleChange}
                style={{ width: "8em" }}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Inquiries (if any): </label>
            <div className="control">
              <textarea
                className="textarea"
                type="text"
                id="inquiries"
                placeholder="Inquiries"
                value={formData.inquiries || ""}
                name="inquiries"
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            disabled={isFormInvalid()}
            style={{ margin: "0.3em", background: "#ff4e4e" }}
          >
            <p style={{ color: "#fff4f2" }}>
              {isEditing ? "Update Appointment" : "Submit"}
            </p>
          </button>
        </form>
      </div>
    </>
  );
}
