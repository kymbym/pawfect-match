import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPartnerAppointments } from "../../services/partnerservices";
import PartnerNavBar from "../NavBar/PartnerNavBar";
import { format } from "date-fns";

const PartnerAppointments = ({ token }) => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const fetchAppointments = async () => {
      try {
        console.log(
          "fetching apopintments with token in partnerappointments component",
          token
        );
        const data = await getPartnerAppointments(token);
        console.log("fetched appointments", data);
        setAppointments(data);
      } catch (error) {
        console.error("failed to fetch appointments", error);
      }
    };
    fetchAppointments();
  }, [token]);

  return (
    <>
      <h1>Your Appointments</h1>
      <PartnerNavBar />
      {appointments.length === 0 ? (
        <h1>no appointments!</h1>
      ) : (
        <div>
          {appointments.map((appointment) => {
            const formattedAppointmentDate = appointment.appointmentDate
              ? format(new Date(appointment.appointmentDate), "dd-MMMM-yyyy")
              : "N/A";
            return (
              <li key={appointment._id}>
                <p>Pet Name: {appointment.pet?.name}</p>
                <p>Breed: {appointment.pet?.breed}</p>
                <p>Date: {formattedAppointmentDate}</p>
                <p>Time: {appointment.appointmentTime}</p>
                <p>Contact: {appointment.contact}</p>
                <p>Inquiries: {appointment.inquiries}</p>
              </li>
            );
          })}
        </div>
      )}
      <button onClick={() => navigate(`/partner/home`)}>Back to Home</button>
    </>
  );
};

export default PartnerAppointments;
