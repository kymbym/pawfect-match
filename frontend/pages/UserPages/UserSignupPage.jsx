import UserNavBar from "../../components/NavBar/UserNavBar";
import UserSignupForm from "../../components/SignupForm/UserSignupForm";

export default function UserSignupPage() {
  return (
    <>
      <UserNavBar />
      <h1>Create an account</h1>
      <h3>Enter your details to create an account.</h3>
      <UserSignupForm />
      <h2>
        Have an existing account? <u>Login here</u> {/*insert link to log in page here */}
      </h2>
    </>
  );
}
