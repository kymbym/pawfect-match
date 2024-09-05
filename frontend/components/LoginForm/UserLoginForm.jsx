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
    <div className="columns">
        <div className="column is-align-content-center">
          <h1
            className="titan-one-regular"
            style={{ fontSize: "4.5em", margin: "0.1em" }}
          >
            Pawfect Match
          </h1>
        </div>
      </div>
 

      <div className="columns">
        <div className="column is-align-content-center">
          <figure className="image is-16 by 9 ">
            <iframe
              width="350"
              height="180"
              src="../../../images/sign-up-banner.png"
              alt="A poodle"
            />
          </figure>
          <h2 className="quattrocento-sans-regular">Login to your account</h2>
          <h3 className="quattrocento-sans-regular">
            Enter your details to sign in your account.
          </h3>
        </div>

        <div className="column is-half">
          <div className="field">
            <label className="label quattrocento-sans-bold">Name</label>
            <div className="control">
              <input
                className="input is-normal quattrocento-sans-regular"
                type="text"
                placeholder="e.g Jane Doe"
                value={userName}
                name="userName"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label quattrocento-sans-bold">Email</label>
            <div className="control">
              <input
                className="input is-normal quattrocento-sans-regular"
                type="email"
                placeholder="e.g. janedoe@mail.com"
                value={email}
                name="email"
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label quattrocento-sans-bold">Confirm Password</label>
            <div className="control">
              <input
                className="input is-normal"
                type="password"
                value={confirmPw}
                name="confirmPw"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="control">
            <button
              type="submit"
              className="button is-primary quattrocento-sans-bold"
              onClick={handleSubmit}
              disabled={isFormInvalid()}
              style={{ margin: "0.3em", background: "#fff4f2", color:"#ff4e4e" }}
            >
              Submit
            </button>
          </div>

          <h4 style={{ paddingTop: "8px" }} className="quattrocento-sans-regular">
            Have an existing account?{" "}
            <u onClick={handleLoginClick} style={{ cursor: "pointer" }} className="quattrocento-sans-regular-italic">
              Login here
            </u>{" "}
          </h4>
        </div>
      </div>




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
