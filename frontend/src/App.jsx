import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import MainPage from "../pages/MainPage";
import PartnerSignupForm from "../components/SignupForm/PartnerSignupForm";
import PartnerLoginForm from "../components/LoginForm/PartnerLoginForm";
import PetProfile from "../components/PetProfile/PetProfile";
import AllPets from "../components/PartnerComponents/AllPets";
import AddPetProfile from "../components/PartnerComponents/AddPetProfile";
import PartnerHomePage from "../pages/PartnerPages/PartnerHomePage";
import PartnerAppointments from "../components/PartnerComponents/PartnerAppointments";

/* User Pages */
import UserSignupForm from "../components/SignupForm/UserSignupForm";
import UserLoginForm from "../components/LoginForm/UserLoginForm";
import UserAppointmentForm from "../components/UserComponents/UserAppointmentForm";
import UserHomePage from "../pages/UserPages/UserHomePage/UserHomePage";
import UserSearchPage from "../pages/UserPages/UserSearchPage/UserSearchPage";
import UserViewAppointmentPage from "../pages/UserPages/UserViewAppointmentPage/UserViewAppointmentPage";
import UserFavoritesPage from "../pages/UserPages/UserFavorites/UserFavoritesPage";

function App() {
  const [token, setToken] = useState("");
  const [followedPets, setFollowedPets] = useState([]);

  const handleToggleFollow = (petId) => {
    if (followedPets.includes(petId)) {
      setFollowedPets(followedPets.filter((id) => id !== petId)); 
    } else {
      setFollowedPets([...followedPets, petId]); 
    }
  };

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
        <Route
          path="/partner/signup"
          element={<PartnerSignupForm setToken={setToken} />}
        />
        <Route
          path="/partner/home"
          element={<PartnerHomePage token={token} />}
        />
        <Route path="/partner/pets" element={<AllPets token={token} />} />
        <Route
          path="/partner/pets/add"
          element={<AddPetProfile token={token} />}
        />
        <Route
          path="/partner/pets/:petId"
          element={<PetProfile view="partner" token={token} />}
        />
        <Route
          path="/partner/appointments"
          element={<PartnerAppointments token={token} />}
        />

        <Route
          path="/user/login"
          element={<UserLoginForm setToken={setToken} />}
        />
        <Route
          path="/user/signup"
          element={<UserSignupForm setToken={token} />}
        />
        <Route path="/home/:userId" element={<UserHomePage token={token} />} />
        <Route path="/search" element={<UserSearchPage token={token} />} />
        <Route path="/pets/:petId" element={<PetProfile view="user" token={token} followedPets={followedPets} setFollowedPets={setFollowedPets} handleToggleFollow={handleToggleFollow}/>}/>
        <Route path="/favorites/:userId" element={<UserFavoritesPage token={token} />} />
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
