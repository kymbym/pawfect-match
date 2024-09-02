import PartnerNavBar from "../../components/NavBar/PartnerNavBar";
import { useEffect, useState } from "react";
import { getPartnerById } from "../../services/partnerservices";
import { Link } from "react-router-dom";
import { getPartnerAppointments } from "../../services/partnerservices";
import { format } from "date-fns";

const PartnerHomePage = ({ token }) => {
  const [organizationName, setOrganizationName] = useState("");
  const [upcomingAppointment, setUpcomingAppointment] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchPartnerDetails = async () => {
      try {
        const data = await getPartnerById(token);
        if (data && data.partner) {
          setOrganizationName(data.partner.organizationName);
        }
      } catch (error) {
        console.error("failed to fetch partner details", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        console.log(
          "fetching appointment with token in partner home page component",
          token
        );
        const data = await getPartnerAppointments(token);
        console.log("fetched appointment", data[0]);
        setUpcomingAppointment(data[0]);
      } catch (error) {
        console.error("failed to fetch appointment", error);
      }
    };
    fetchPartnerDetails();
    fetchAppointments();
  }, [token]);

  return (
    <>
      <PartnerNavBar />
      <h1>Welcome, {organizationName}!</h1>
      <h3>Your next upcoming appointment:</h3>
      {upcomingAppointment ? (
        <div>
          <p>Pet Name: {upcomingAppointment.pet?.name}</p>
          <p>Breed: {upcomingAppointment.pet?.breed}</p>
          <p>
            Date:
            {upcomingAppointment.appointmentDate
              ? format(
                  new Date(upcomingAppointment.appointmentDate),
                  "dd-MMMM-yyyy"
                )
              : "N/A"}
          </p>
          <p>Time: {upcomingAppointment.appointmentTime}</p>
          <p>Contact: {upcomingAppointment.contact}</p>
          <p>Inquiries: {upcomingAppointment.inquiries}</p>
        </div>
      ) : (
        <h1>No upcoming appointments!</h1>
      )}
      <img src="../../../images/partner-view-appointments-banner.png" alt="Poodle reading a book" />
      <Link to="/partner/appointments">View Appointments</Link>
      <img src="../../../images/partner-view-pets-banner.png" alt="Poodles at a party" />
      <Link to="/partner/pets">View Current Pet Listings</Link>
    </>
  );
};

export default PartnerHomePage;
