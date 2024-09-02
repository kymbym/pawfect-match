import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPetsByName } from "../../services/userService";

export default function UserSearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const results = searchPetsByName(query);
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
