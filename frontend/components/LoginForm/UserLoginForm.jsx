import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../NavBar/UserNavBar";

export default function UserLoginForm() {
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
    try {
      console.log(formData);
      navigate("/home/:userId");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const { email, password } = formData;

  const isFormInvalid = () => {
    return !(email && password);
  };

  return (
    <>
      <UserNavBar />
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
        Need an account? <u>Sign up</u> {/*insert link to sign up page here */}
      </p>
      <h3>
        Looking for our Partner portal? <u>Login here</u>
      </h3>
    </>
  );
}
