import { Route, Routes } from "react-router-dom";

/* User Pages */
import UserSignupPage from "../pages/UserPages/UserSignupPage";

function App() {
  return (
    <>
      <h1>Pawfect Match</h1>

      <Routes>
        <Route path="/" />
        <Route path="/partner/login" />
        <Route path="/partner/signup" />
        <Route path="/partner/pets" />
        <Route path="/partner/pets/add" />
        <Route path="/partner/pets/edit/:petId" />
        <Route path="/partner/appointments" />

        <Route path="/user/login" />
        <Route path="/user/signup" element={<UserSignupPage />} />
        <Route path="/home/:userId" />
        <Route path="/search" />
        <Route path="/pets/:petId" />
        <Route path="/favorites/:userId" />
        <Route path="/appointments/create" />
        <Route path="/appointments/:userId" />
      </Routes>
    </>
  );
}

export default App;
