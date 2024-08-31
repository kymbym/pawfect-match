import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../NavBar/UserNavBar";
import { signUpUser } from "../../services/userService";

export default function UserSignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPw: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      await signUpUser(formData);
      navigate("/home/:userId");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const { name, email, password, confirmPw } = formData;

  const isFormInvalid = () => {
    return !(name && email && password && password === confirmPw);
  };

  return (
    <>
      <UserNavBar />
      <h1>Create an account</h1>
      <h2>Enter your details to create an account.</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            type="text"
            id="name"
            value={name}
            name="name"
            onChange={handleChange}
          />
        </label>
        <br />
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
        <label>
          Confirm Password:{" "}
          <input
            type="password"
            id="confirmPw"
            value={confirmPw}
            name="confirmPw"
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <button disabled={isFormInvalid()}>Submit</button>
      </form>
      <p>
        Have an existing account? <u>Login here</u>{" "}
        {/*insert link to log in page here */}
      </p>
    </>
  );
}
