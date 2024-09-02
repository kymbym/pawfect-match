import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../NavBar/UserNavBar";
import { signUpUser } from "../../services/userService";

export default function UserSignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
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
      const json = await signUpUser(formData);
      // console.log("userid", json.user._id);
      navigate(`/home/${json.user._id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleLoginClick = () => {
    navigate("/user/login")
  }

  const { userName, email, password, confirmPw } = formData;

  const isFormInvalid = () => {
    return !(userName && email && password && password === confirmPw);
  };

  return (
    <>
      {/* <UserNavBar /> i feel like just need to show the pawfect match button to return to main and not the entire nav bar! */}
      <img src="../../../images/sign-up-banner.png" alt="A poodle" />
      <h1>Create an account</h1>
      <h2>Enter your details to create an account.</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            type="text"
            id="userName"
            value={userName}
            name="userName"
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
        Have an existing account? <u onClick={handleLoginClick} style={{ cursor: "pointer" }}>Login here</u> 
      </p>
    </>
  );
}
