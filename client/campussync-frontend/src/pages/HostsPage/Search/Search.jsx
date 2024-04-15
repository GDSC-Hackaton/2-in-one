import React, { useState } from "react";
import "./search.css";

function Search({ choicefunction }) {
  const [choice, setChoice] = useState("");
  
  const handleEvent = (e) => {
    e.preventDefault();
    choicefunction(choice);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    setChoice(e.target.value);
  };
  return (
    <>
      <div className="search-container">
        <form id="search-host" onSubmit={handleEvent}>
          <input
            type="text"
            placeholder="Search for Hosts...."
            value={choice}
            // onChange={(e) => {
            //   e.preventDefault();
            //   setChoice(e.target.value);
            // }}
            onChange={handleSubmission}
            required
          ></input>
        </form>
        <button type="submit" form="search-host">
          Search
        </button>
      </div>
    </>
  );
}

export default Search;
