import { useState } from "react";
import { loginPartner } from "../../services/partnerservices";
import { isValidToken } from "../../utils/jwtUtils";
import { useNavigate } from "react-router-dom";

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
      <img src="../../public/images/partner-login-banner.png" alt="A poodle lying on the floor" />
      <h1>Log in to your account</h1>
      <h2>Enter your details to sign in to your account.</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isFormInvalid()}>
          Submit
        </button>
      </form>
      <p>
        Want to be a partner?{" "}
        <u onClick={handleSignupClick} style={{ cursor: "pointer" }}>
          Sign up
        </u>
      </p>
    </>
  );
};

export default PartnerLoginForm;
