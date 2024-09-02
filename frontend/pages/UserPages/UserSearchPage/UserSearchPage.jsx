import UserNavBar from "../../../components/NavBar/UserNavBar";
import UserSearchBar from "../../../components/UserSearchBar/UserSearchBar";
import { useState, useEffect } from "react";
import PetProfile from "../../../components/PetProfile/PetProfile";
import PetCard from "../../../components/PetCard/PetCard";

export default function UserSearchPage({ view, token }) {
  const [results, setResults] = useState([]);
  const [displayQuery, setdisplayQuery] = useState("");

  return (
    <>
      <UserNavBar />
      <h1>Find your bestie!</h1>
      <UserSearchBar />
      <p>other search functions</p>
      {/* <PetProfile view="user" token={token}/> */}
      <PetCard view="user" token={token} />
    </>
  );
}
