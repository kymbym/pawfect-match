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
      <form onSubmit={handleSubmit} id="search-bar">
        <div className="wrapper">
          <label htmlFor="search-bar">
            <input
              type="text"
              placeholder="Search pet by name"
              value={query}
              onChange={handleChange}
            />
          </label>
        </div>
      </form>
    </>
  );
}
