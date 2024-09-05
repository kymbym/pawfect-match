import { useState } from "react";
import { loginPartner } from "../../services/partnerservices";
import { isValidToken } from "../../utils/jwtUtils";
import { useNavigate, Link } from "react-router-dom";

const PartnerLoginForm = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const token = await loginPartner(data);
      console.log("received token partner login", token);
      if (isValidToken(token)) {
        setToken(token);
        navigate(`/partner/home/`);
      } else {
        alert("invalid login!");
      }
    } catch (error) {
      console.error("login error", error.message);
      alert("invalid login credentials!");
    }
  };

  const handleSignupClick = () => {
    navigate("/partner/signup");
  };

  const isFormInvalid = () => {
    return !(email && password);
  };

  return (
    <>
<div className="columns is-justify-content-center" style={{marginBottom:"15px"}}>
        <div className="column is-align-content-center">
          <Link to="/" style={{ color: "#ff4e4e" }}>
          <h1
            className="titan-one-regular"
            style={{ fontSize: "4.5em", margin: "0.1em" }}
          >
            Pawfect Match
          </h1>
          </Link>
        </div>
      </div>
 

       <div className="columns is-justify-content-center">
        <div className="column is-align-content-center">
          <figure >
            <iframe
              style={{overflow:"hidden"}}
              width="390"
              height="180"
              src="../../../images/partner-signup-banner-small.png" alt="A poodle lying on the floor"
            />
          </figure>
          <h2 className="quattrocento-sans-regular">Log in to your account</h2>
          <h3 className="quattrocento-sans-regular">
            Enter your details to sign in to your account.
          </h3>
        </div>

        <div className="column is-half">
          <form onSubmit={handleLogin}>
          <div className="field">
            <label className="label quattrocento-sans-bold">Email</label>
            <div className="control">
              <input
                className="input is-normal quattrocento-sans-regular"
                type="email"
                placeholder="e.g. janedoe@mail.com"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label quattrocento-sans-bold">Password</label>
            <div className="control">
              <input
                className="input is-normal"
                type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="control">
            <button
              type="submit"
              className="button is-primary quattrocento-sans-bold"
              disabled={isFormInvalid()}
              style={{ margin: "0.3em", background: "#ff4e4e", color:"#fff4f2" }}
            >
              Submit
            </button>
          </div>

          <h4 style={{ paddingTop: "8px" }} className="quattrocento-sans-regular">
            Want to be a partner? <u onClick={handleSignupClick} style={{ cursor: "pointer" }} className="quattrocento-sans-regular-italic">Sign up</u>
          </h4>
          </form>
        </div>
      </div>
    </>
  );
};

export default PartnerLoginForm;
