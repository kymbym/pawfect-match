import { loginPartner } from "../../services/partnerservices";
import { isValidToken } from "../../utils/jwtUtils";
// import { useNavigate } from "react-router-dom";

const PartnerLoginForm = ({ setToken }) => {

    // const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const token = await loginPartner(data);
            console.log("received token partner login", token)
            if (isValidToken(token)) {
                setToken(token);
            } else {
                alert("invalid login!")
            }
        } catch (error) {
            console.error("login error", error.message)
        }
    }

  return (
    <>
      <h1>Partner Sign In</h1>

      <form onSubmit={handleLogin}>
         <fieldset>
        <legend>Login</legend>
        <label>
          Organization Name: <input type="text" name="organizationName" />
        </label>
        <label>
          Password: <input type="password" name="password" />
        </label>
        <button type="submit">Submit</button>
      </fieldset>
      </form>

    </>
  );
};

export default PartnerLoginForm;
