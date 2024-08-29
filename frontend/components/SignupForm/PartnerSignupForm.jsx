import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserSignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    password: "",
    confirmPw: "",
  });

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      navigate("/home/userId");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const { organizationName, email, password, confirmPw } = formData;

  const isFormInvalid = () => {
    return !(organizationName && email && password && password === confirmPw);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            type="text"
            id="name"
            value={organizationName}
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
    </>
  );
}