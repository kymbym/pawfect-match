import UserNavBar from "../../../components/NavBar/UserNavBar";
import { useEffect, useState } from "react";
import {
  getUserAppointments,
  deleteSpecificAppointment,
} from "../../../services/userService";
import UserAppointmentForm from "../../../components/UserComponents/UserAppointmentForm";
import { format } from "date-fns";
import { extractPayload } from "../../../utils/jwtUtils";
import { useNavigate, Link } from "react-router-dom";
import PetCard from "../../../components/PetCard/PetCard";

export default function UserViewAppointmentPage({ token }) {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  // console.log("token in userview page:", token)
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserAppointments = async () => {
      const data = await getUserAppointments(token);
      setAppointments(data);
      //   console.log("current appointments:", appointments);
    };
    loadUserAppointments();
  }, [token]);

  console.log("current appointments:", appointments);

  const getUpdatedAppointments = async () => {
    try {
      const data = await getUserAppointments(token);
      setAppointments(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      console.log(appointmentId);
      await deleteSpecificAppointment(appointmentId, token);
      await getUpdatedAppointments();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = (appointment) => {
    console.log("appointment in handleEdit", appointment);
    setSelectedAppointment(appointment);
    // setShowAppointmentForm(true);
  };

  useEffect(() => {
    if (selectedAppointment) {
      console.log("selected appointment updated", selectedAppointment);
      setShowAppointmentForm(true);
    }
  }, [selectedAppointment]);

  const handleBack = () => {
    const decoded = extractPayload(token);
    const userId = decoded._id;
    navigate(`/home/${userId}`);
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
      {!showAppointmentForm && <UserNavBar token={token} />}
      {!showAppointmentForm && (
        <h1 className="quattrocento-sans-regular" style={{ margin: "0.3em" }}>
          View all your appointments
        </h1>
      )}
      {appointments.length === 0 ? (
        <h3 className="quattrocento-sans-regular" style={{ margin: "1em" }}>
          Currently no appointments!
        </h3>
      ) : (
        <div className="fixed-grid">
          <div className="grid">
            {!showAppointmentForm &&
              appointments.map((appointment) => {
                const formattedAppointmentDate = appointment.appointmentDate
                  ? format(new Date(appointment.appointmentDate), "d MMMM yyyy")
                  : "N/A";
                return (
                  <div
                    key={appointment._id}
                    className="card"
                    style={{ background: "#fbfbfb" }}
                  >
                    <div className="card-content">
                      <div className="content">
                        <h2 className="quattrocento-sans-regular">
                          {appointment.pet.name}
                        </h2>
                        <h4 className="quattrocento-sans-regular">
                          Scheduled Date: {formattedAppointmentDate}
                        </h4>
                        <h4 className="quattrocento-sans-regular">
                          Scheduled Time: {appointment.appointmentTime}
                        </h4>
                        <h4 className="quattrocento-sans-regular">
                          Inquiries: {appointment.inquiries}
                        </h4>
                        <footer className="card-footer">
                          <button
                            onClick={() => handleEdit(appointment)}
                            className="card-footer-item"
                            style={{ margin: "0.3em", background: "#ff4e4e" }}
                          >
                            <p style={{ color: "#fff4f2" }}>Edit</p>
                          </button>
                          <button
                            onClick={() => handleDelete(appointment._id)}
                            className="card-footer-item"
                            style={{ margin: "0.3em", background: "#ff4e4e" }}
                          >
                            <p style={{ color: "#fff4f2" }}>Delete</p>
                          </button>
                        </footer>
                      </div>
                    </div>
                  </div>
                );
              })}
            {showAppointmentForm && (
              <UserAppointmentForm
                isEditing={true}
                appointmentInfo={selectedAppointment}
                token={token}
              />
            )}
          </div>
        </div>
      )}
      <button
        onClick={handleBack}
        style={{ margin: "0.3em", background: "#ff4e4e" }}
      >
        <p style={{ color: "#fff4f2" }}>Back to Home</p>
      </button>
    </>
  );
}
