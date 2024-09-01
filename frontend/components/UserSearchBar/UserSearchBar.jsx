import { useState } from "react";

export default function UserSearchBar() {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
