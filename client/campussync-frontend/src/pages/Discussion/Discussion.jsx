import "./discussion.css";
const Discussion = () => {
  return (
    <div className="discussion-container">
      <div className="discussion-grid">
        <div className="grid-column" style={{ position: "sticky", top: 0 }}>
          <span>Start a discussion </span>
          <button className="add-question">
            <i className="fa fa-plus"></i>
          </button>
        </div>
        <div className="grid-column">
          <input
            type="text"
            className="search-input"
            placeholder="search for questions ..."
          />
          <button className="search-btn">Search</button>
          <div className="question-card">
            <div className="q-head">
              <img src="/cod.jpg" className="q-creator" />
              <span >
                John Cena <small style={{ color: "gray" }}>asked</small>
              </span>
            </div>

            <div className="q-content">
              <span style={{marginLeft:"20px"}}>
                What is the ALX EVENT ABOUT ?
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Discussion;
