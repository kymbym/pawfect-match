import UserNavBar from "../../../components/NavBar/UserNavBar";
import { useEffect, useState } from "react";
import { getUserAppointments } from "../../../services/userService";

export default function UserViewAppointmentPage({ token }) {
  const [appointments, setAppointments] = useState([]);
  // console.log("token in userview page:", token)
  const loadUserAppointments = async () => {
    const data = await getUserAppointments(token);
    setAppointments(data);
    console.log("current appointments:", appointments);
  };

  useEffect(() => {
    loadUserAppointments();
  }, [token]);
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
              <h3>Provider: {appointment.provider}</h3>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
