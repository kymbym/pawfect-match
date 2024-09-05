import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../services/userService";
import { Link } from "react-router-dom";

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
    navigate("/user/login");
  };

  const { userName, email, password, confirmPw } = formData;

  const isFormInvalid = () => {
    return !(userName && email && password && password === confirmPw);
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
        <div className="column is-align-content-center" style={{width: "33em"}}>
          <figure className="image is-16 by 9 ">
            <img
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
          <form onSubmit={handleSubmit}>
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
              disabled={isFormInvalid()}
              style={{ margin: "0.3em", background: "#ff4e4e", color:"#fff4f2" }}
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
          </form>
        </div>
      </div>
    </>
  );
}
