import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import MainPage from "../pages/MainPage";
import PartnerSignupForm from "../components/SignupForm/PartnerSignupForm";
import PartnerLoginForm from "../components/LoginForm/PartnerLoginForm";
import PetProfile from "../components/PetProfile/PetProfile";
import AllPets from "../components/PartnerComponents/AllPets";

/* User Pages */
import UserSignupForm from "../components/SignupForm/UserSignupForm";
import UserLoginForm from "../components/LoginForm/UserLoginForm";
import UserAppointmentForm from "../components/UserComponents/UserAppointmentForm";
import UserHomePage from "../pages/UserPages/UserHomePage/UserHomePage";
import UserSearchPage from "../pages/UserPages/UserSearchPage/UserSearchPage";
import UserViewAppointmentPage from "../pages/UserPages/UserViewAppointmentPage/UserViewAppointmentPage";

function App() {
  const [token, setToken] = useState("");

  console.log("token in app jsx", token);

  return (
    <>
      <h1>Pawfect Match</h1>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/partner/login"
          element={<PartnerLoginForm setToken={setToken} />}
        />
        <Route path="/partner/signup" element={<PartnerSignupForm />} />
        <Route path="/partner/home" />
        <Route path="/partner/pets" element={<AllPets token={token} />} />
        <Route path="/partner/pets/add" />
        <Route
          path="/partner/pets/:petId"
          element={<PetProfile view="partner" />}
        />
        <Route path="/partner/appointments" />

        <Route
          path="/user/login"
          element={<UserLoginForm setToken={setToken} />}
        />
        <Route path="/user/signup" element={<UserSignupForm />} />
        <Route path="/home/:userId" element={<UserHomePage />} />
        <Route path="/search" element={<UserSearchPage />} />
        <Route path="/pets/:petId" />
        <Route path="/favorites/:userId" />
        <Route
          path="/appointments/create/:petId"
          element={<UserAppointmentForm token={token} />}
        />
        <Route
          path="/appointments/:userId"
          element={<UserViewAppointmentPage token={token} />}
        />
      </Routes>
    </>
  );
}

export default App;
