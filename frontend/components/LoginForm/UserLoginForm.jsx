import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logInUser } from "../../services/userService";
import { isValidToken } from "../../utils/jwtUtils";
import { Link } from "react-router-dom";

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
          <figure className="image is-16 by 9 ">
            <iframe
            style={{overflow:"hidden"}}
              width="400"
              height="180"
              src="../../../images/user-login-banner.png" alt="A poodle sniffing coffee"
            />
          </figure>
          <h2 className="quattrocento-sans-regular">Log in to your account</h2>
          <h3 className="quattrocento-sans-regular">
            Enter your details to sign in to your account.
          </h3>
        </div>

        <div className="column is-half">
          <form onSubmit={handleSubmit}>
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
            Need an account? <u onClick={handleSignupClick} style={{ cursor: "pointer" }} className="quattrocento-sans-regular-italic">Sign up</u>
          </h4>
          <h4 className="quattrocento-sans-regular-italic">
        Looking for our Partner portal? <u onClick={handlePartnerLoginClick} style={{ cursor: "pointer" }}>Login here</u> 
      </h4>
      </form>
        </div>
      </div>
</>
  );
}
