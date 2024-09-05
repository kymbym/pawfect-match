import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPetsByName } from "../../services/userService";

export default function UserSearchBar({token}) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("event inside handle submit", query);
    // console.log("token inside handlesubmit: ", token)
    const results = await searchPetsByName(query, token);
    console.log(results);
    navigate(`/search?name=${query.toLowerCase()}`, {state: {results}})
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="search-bar" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
      <div className="wrapper" style={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="search-bar">
          <input
          className="quattrocento-sans-regular-italic"
            type="text"
            id="search-bar"
            placeholder="Search pet by name"
            value={query}
            onChange={handleChange}
            style={{ padding: "10px", width: "200px", border: "1px solid #ffffff", borderRadius: "5px" }}
          />
        </label>
      </div>
    </form>
    </>
  );
}
