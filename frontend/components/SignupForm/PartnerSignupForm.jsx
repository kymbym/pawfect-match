import { useState } from "react";
import { signupPartner } from "../../services/partnerservices";
import { useNavigate } from "react-router-dom";
import { isValidToken } from "../../utils/jwtUtils";

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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="A poodle"
            src="../../../images/sign-up-banner.png"
            className="mx-auto h-10 w-auto"
          />
          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h1>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter your details to create an account.
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="partner/signup" method="POST" className="space-y-6"> 
            <div>
              <label htmlFor="organizationName" className="block text-sm font-medium leading-6 text-gray-900">
                Organization Name:
              </label>
              <div className="mt-2">
                <input
                  id="organizationName"
                  name="organizationName"
                  type="text"
                  value={formData.organizationName}
                  onChange={handleChange}
                  required
                  autoComplete="organizationName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address:
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password:
                </label>
                <div className="text-sm">
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirmPw" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password:
                </label>
                <div className="text-sm">
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPw"
                  name="confirmPw"
                  type="password"
                  value={formData.confirmPw}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <br />

            <div>
              <button
                onClick={handleSignup}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isFormInvalid()}
              >
                Submit
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Have an existing account?{' '}
            <a onClick={handleLoginClick} style={{ cursor: "pointer" }} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

  export default PartnerSignupForm;

//   return (
//     <>
//     <img src="../../../images/sign-up-banner.png" alt="A poodle" />
//       <h1>Create an account</h1>
//       <h2>Enter your details to create an account.</h2>
//       <form onSubmit={handleSignup}>
//         <div>
//           <label>Organization Name:</label>
//           <input
//             type="text"
//             id="organizationName"
//             name="organizationName"
//             value={formData.organizationName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Confirm Password:</label>
//           <input
//             type="password"
//             id="confirmPw"
//             name="confirmPw"
//             value={formData.confirmPw}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isFormInvalid()}>
//           Submit
//         </button>
//       </form>
//       <p>
//         Have an existing account?{" "}
//         <u onClick={handleLoginClick} style={{ cursor: "pointer" }}>
//           Login here
//         </u>
//       </p>
//     </>
//   );
// };

