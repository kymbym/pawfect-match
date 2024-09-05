import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPartnerAppointments } from "../../services/partnerservices";
import PartnerNavBar from "../NavBar/PartnerNavBar";
import { format } from "date-fns";
import { Link } from "react-router-dom";

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
    <Link to="/" style={{ color: "#ff4e4e" }}>
        <h1
          className="titan-one-regular"
          style={{ fontSize: "4.5em", margin: "0.1em" }}
        >
          Pawfect Match
        </h1>
      </Link>
      <PartnerNavBar />
      <h1 className="titan-one-regular" style={{paddingTop: "20px", paddingBottom:"20px"}}>
                Your Appointments!
              </h1>
              {appointments.length === 0 ? (
                <h2 className="quattrocento-sans-bold">No appointments yet!</h2>
              ) : (
                <div className="table-container">
                  <table className="table" style={{ margin: "0 auto" }}>
                    <thead>
                      <tr>
                        <th className="quattrocento-sans-bold">Pet Name</th>
                         <th className="quattrocento-sans-bold">Breed</th>
                        <th className="quattrocento-sans-bold">Date</th>
                        <th className="quattrocento-sans-bold">Time</th>
                        <th className="quattrocento-sans-bold">Contact</th>
                        <th className="quattrocento-sans-bold">Inquiries</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => {
                        const formattedAppointmentDate =
                          appointment.appointmentDate
                            ? format(
                                new Date(appointment.appointmentDate),
                                "d MMMM yyyy"
                              )
                            : "N/A";

                        return (
                          <tr key={appointment._id}>
                            <td className="quattrocento-sans-regular">
                              {appointment.pet?.name}
                            </td>
                            <td className="quattrocento-sans-regular">
                              {appointment.pet?.breed}
                            </td>
                            <td className="quattrocento-sans-regular">
                              {formattedAppointmentDate}
                            </td>
                            <td className="quattrocento-sans-regular">
                              {appointment.appointmentTime}
                            </td>
                            <td className="quattrocento-sans-regular">
                              {appointment.contact}
                            </td>
                            <td className="quattrocento-sans-regular">
                              {appointment.inquiries}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
      <button onClick={() => navigate(`/partner/home`)} style={{ background: "#ff4e4e", color: "#fff4f2" }}>Back to Home</button>
    </>
  );
};

export default PartnerAppointments;
