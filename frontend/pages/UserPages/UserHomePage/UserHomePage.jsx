import UserNavBar from "../../../components/NavBar/UserNavBar"

export default function UserHomePage() {
    return (
      <>
        <UserNavBar />
        <h1>What would you like to do today?</h1>
        <p>simple card: search pets</p>
        <p>simple card: view favorites</p>
        <p>simple card: view appointments</p>
      </>
    );
}