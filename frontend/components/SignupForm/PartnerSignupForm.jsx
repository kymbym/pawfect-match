import { useState } from "react";
import { signupPartner } from "../../services/partnerservices";
import { useNavigate } from "react-router-dom";
import { isValidToken } from "../../utils/jwtUtils";
import { Link } from "react-router-dom";

const PartnerSignupForm = ({ setToken }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    password: "",
    confirmPw: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPw) {
      alert("passwords do not match");
      return;
    }

    console.log("form data", formData);

    try {
      const token = await signupPartner(formData);
      console.log("received token partner signup", token);
      if (isValidToken(token)) {
        setToken(token);
        navigate("/partner/home");
      } else {
        alert("invalid signup!");
      }
    } catch (error) {
      console.error("signup error", error.message);
      alert("invalid login credentials!");
    }
  };

  const handleLoginClick = () => {
    navigate("/partner/login");
  };

  const { organizationName, email, password, confirmPw } = formData;

  const isFormInvalid = () => {
    return !(organizationName && email && password && password === confirmPw);
  };

  return (

    <>
      <div className="columns is-justify-content-center" style={{marginBottom:"15px"}}>
        <div className="column is-align-content-center">
          <Link to="/" style={{ color: "#ff4e4e" }}>
          <h1
            className="titan-one-regular has-text-centered"
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
              width="400"
              height="180"
              src="../../../images/sign-up-banner.png"
              alt="A poodle"
            />
          </figure>
          <h2 className="quattrocento-sans-regular">Create an account</h2>
          <h3 className="quattrocento-sans-regular">
            Enter your details to create an account.
          </h3>
        </div>

        <div className="column is-half">
          <div className="field">
            <label className="label quattrocento-sans-bold">Organization Name</label>
            <div className="control">
              <input
                className="input is-normal quattrocento-sans-regular"
                type="text"
                placeholder="e.g SPCA"
                value={formData.organizationName}
                name="organizationName"
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
                placeholder="e.g. spca@mail.com"
                value={formData.email}
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
                value={formData.password}
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
                value={formData.confirmPw}
                name="confirmPw"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="control">
            <button
              type="submit"
              className="button is-primary quattrocento-sans-bold"
              onClick={handleSignup}
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
    </>
  )
};

export default PartnerSignupForm;