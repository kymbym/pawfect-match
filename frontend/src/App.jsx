import { Route, Routes } from "react-router-dom";

function App() {

  return (
  <>
  <h1>Pawfect Match</h1>

  <Routes>
    <Route path="/" />
    <Route path="/partner/login"/>
    <Route path="/partner/signup"/>
    <Route path="/partner/pets"/>
    <Route path="/partner/pets/add"/>
    <Route path="/partner/pets/edit/:petId"/>
    <Route path="/partner/appointments"/>

    <Route path="/user/login"/>
    <Route path="/user/signup"/>
  </Routes>
    
  </>

  )
}

export default App;
