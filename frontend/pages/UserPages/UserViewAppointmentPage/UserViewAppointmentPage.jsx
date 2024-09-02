import UserNavBar from "../../../components/NavBar/UserNavBar";
import { useEffect, useState } from "react";
import {
  getUserAppointments,
  deleteSpecificAppointment,
} from "../../../services/userService";
import UserAppointmentForm from "../../../components/UserComponents/UserAppointmentForm";
import { format } from "date-fns";

export default function UserViewAppointmentPage({ token }) {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  // console.log("token in userview page:", token)

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

  return (
    <>
      <UserNavBar />
      <h1>view all your appointments</h1>
      {appointments.length === 0 ? (
        <p>Currently no appointments!</p>
      ) : (
        <div>
          {appointments.map((appointment) => {
            const formattedAppointmentDate = appointment.appointmentDate
              ? format(new Date(appointment.appointmentDate), "dd-MMMM-yyyy")
              : "N/A";
            return (
              <div key={appointment._id}>
                <h2>Pet Name: {appointment.pet.name}</h2>
                <h3>Date: {formattedAppointmentDate}</h3>
                <h3>Time: {appointment.appointmentTime}</h3>
                <button onClick={() => handleEdit(appointment)}>Edit</button>
                <button onClick={() => handleDelete(appointment._id)}>
                  Delete
                </button>
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
      )}
    </>
  );
}
