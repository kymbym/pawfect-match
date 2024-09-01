import { useState } from "react";
import { signupPartner } from "../../services/partnerservices";
import { useNavigate } from "react-router-dom";

const PartnerSignupForm = () => {

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
        
        console.log("form data", formData)

        try {
            await signupPartner(formData);
            navigate("/partner/login")
        } catch (error) {
            alert("error")
        }
    };

    const { organizationName, email, password, confirmPw } = formData;

      const isFormInvalid = () => {
        return !(organizationName && email && password && password === confirmPw);
  };


  return (
    <>
      <h1>Create an account</h1>
      <h2>Enter your details to create an account.</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Organization Name:</label>
          <input type="text" id="organizationName" name="organizationName" value={formData.organizationName} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" id="confirmPw" name="confirmPw" value={formData.confirmPw} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={isFormInvalid()}>Submit</button>
      </form>
      <p>
        Have an existing account? <u>Login here</u>{" "}
        {/*insert link to log in page here */}
      </p>

    </>
  );
};

export default PartnerSignupForm;
