import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logInUser } from "../../services/userService";
import { isValidToken } from "../../utils/jwtUtils";

export default function UserLoginForm({ setToken }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    try {
      console.log(formData);
      const json = await logInUser(data);
      const token = json.token;
      console.log(json);
      if (isValidToken(token)) {
        setToken(token);
        navigate(`/home/${json.user._id}`);
        // navigate("/home/:userId");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSignupClick = () => {
    navigate("/user/signup")
  }

  const handlePartnerLoginClick = () => {
    navigate("/partner/login")
  }

  const { email, password } = formData;

  const isFormInvalid = () => {
    return !(email && password);
  };

  return (
    <>
      <img src="../../../images/user-login-banner.png" alt="A poodle sniffing coffee" />
      <h1>Log in to your account</h1>
      <h2>Enter your details to sign in to your account.</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:{" "}
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:{" "}
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <button disabled={isFormInvalid()}>Submit</button>
      </form>
      <p>
        Need an account? <u onClick={handleSignupClick} style={{ cursor: "pointer" }}>Sign up</u> 
      </p>
      <h3>
        Looking for our Partner portal? <u onClick={handlePartnerLoginClick} style={{ cursor: "pointer" }}>Login here</u> 
      </h3>
    </>
  );
}
