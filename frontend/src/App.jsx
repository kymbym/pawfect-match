import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import PartnerSignupForm from "../components/SignupForm/PartnerSignupForm";
import PartnerLoginForm from "../components/LoginForm/PartnerLoginForm";

/* User Pages */
import UserSignupForm from "../components/SignupForm/UserSignupForm";
import UserLoginForm from "../components/LoginForm/UserLoginForm";
import UserAppointmentForm from "../components/UserComponents/UserAppointmentForm";
import UserHomePage from "../pages/UserPages/UserHomePage/UserHomePage";

function App() {

  const [token, setToken] = useState("")

  return (
    <>
      <h1>Pawfect Match</h1>

  <Routes>
    <Route path="/" />
    <Route path="/partner/login" element={<PartnerLoginForm setToken={setToken}/>}/>
    <Route path="/partner/signup" element={<PartnerSignupForm />}/>
    <Route path="/partner/pets"/>
    <Route path="/partner/pets/add"/>
    <Route path="/partner/pets/edit/:petId"/>
    <Route path="/partner/appointments"/>

        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/user/signup" element={<UserSignupForm />} />
        <Route path="/home/:userId" element={<UserHomePage />} />
        <Route path="/search" />
        <Route path="/pets/:petId" />
        <Route path="/favorites/:userId" />
        <Route path="/appointments/create/:petId" element={<UserAppointmentForm />} />
        <Route path="/appointments/:userId" />
      </Routes>
    </>
  );
}

export default App;
