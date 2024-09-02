import UserNavBar from "../../../components/NavBar/UserNavBar";
import UserSearchBar from "../../../components/UserSearchBar/UserSearchBar";
import { useState, useEffect } from "react";

export default function UserSearchPage() {
  const [results, setResults] = useState([]);
  const [displayQuery, setdisplayQuery] = useState("");

  return (
    <>
      <UserNavBar />
      <h1>Find your bestie!</h1>
      <UserSearchBar />
      <p>other search functions</p>
    </>
  );
}
