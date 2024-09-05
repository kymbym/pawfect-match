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
      <Link to="/" style={{ color: "#ff4e4e" }}>
        <h1
          className="titan-one-regular"
          style={{ fontSize: "4.5em", margin: "0.3em" }}
        >
          Pawfect Match
        </h1>
      </Link>
      <PartnerNavBar />
      <h1 className="quattrocento-sans-regular">
        Welcome, {organizationName}!
      </h1>
      <h3 className="quattrocento-sans-regular">
        Your next upcoming appointment:
      </h3>
      {upcomingAppointment ? (
        <div>
          <p className="quattrocento-sans-regular">
            Pet Name: {upcomingAppointment.pet?.name}
          </p>
          <p className="quattrocento-sans-regular">
            Breed: {upcomingAppointment.pet?.breed}
          </p>
          <p className="quattrocento-sans-regular">
            Date:{" "}
            {upcomingAppointment.appointmentDate
              ? format(
                  new Date(upcomingAppointment.appointmentDate),
                  "d MMMM yyyy"
                )
              : "N/A"}
          </p>
          <p className="quattrocento-sans-regular">
            Time: {upcomingAppointment.appointmentTime}
          </p>
          <p className="quattrocento-sans-regular">
            Contact: {upcomingAppointment.contact}
          </p>
          <p className="quattrocento-sans-regular">
            Inquiries: {upcomingAppointment.inquiries}
          </p>
        </div>
      ) : (
        <h1 className="quattrocento-sans-regular">No upcoming appointments!</h1>
      )}
      <div className="columns" style={{ marginTop: "1.7em" }}>
        <div className="column is-align-self-flex-end">
          <Link to="/partner/appointments">
            <img
              src="../../../images/partner-view-appointments-banner.png"
              alt="Poodle reading a book"
            />
            <p
              className="quattrocento-sans-regular"
              style={{ fontSize: "1.3em" }}
            >
              View Appointments
            </p>
          </Link>
        </div>
        <div className="column is-align-self-flex-end">
          <Link to="/partner/pets">
            <img
              src="../../../images/partner-view-pets-banner.png"
              alt="Poodles at a party"
            />
            <p
              className="quattrocento-sans-regular"
              style={{ fontSize: "1.3em" }}
            >
              View Current Pet Listings
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PartnerHomePage;
