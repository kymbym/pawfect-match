import UserNavBar from "../../../components/NavBar/UserNavBar";
import { useEffect, useState } from "react";
import {
  getUserAppointments,
  deleteSpecificAppointment,
} from "../../../services/userService";

export default function UserViewAppointmentPage({ token }) {
  const [appointments, setAppointments] = useState([]);
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
    try{
        const data = await getUserAppointments(token);
    setAppointments(data);
    } catch (error) {
        console.error(error.message);
    }
  }

  const handleDelete = async (appointmentId) => {
    try {
    console.log(appointmentId);
    await deleteSpecificAppointment(appointmentId, token);
    await getUpdatedAppointments();
    } catch (error) {
        console.error(error.message)
    }
  };

  return (
    <>
      <UserNavBar />
      <h1>view all your appointments</h1>
      {appointments.length === 0 ? (
        <p>Currently no appointments!</p>
      ) : (
        <div>
          {appointments.map((appointment) => (
            <div key={appointment._id}>
              <h2>Pet Name: {appointment.pet.name}</h2>
              <h3>Date: {appointment.appointmentDate}</h3>
              <h3>Time: {appointment.appointmentTime}</h3>
              <button>Edit</button>
              <button onClick={() => handleDelete(appointment._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
