import { useContext } from "react";
import "./nav&foot.css"
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
const NavBar = () => {
  const { user , logoutUser} = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/home">
          <img className="navbar-logo " src="/logocampus.png"></img>
        </Link>
      </div>
      <div className="navbar-list">
        <ul>
          <Link to="/home">
            <li className="navitem">Home</li>
          </Link>
          <Link to="/events">
            <li className="navitem">Events</li>
          </Link>
          <Link to="/hostspage">
            <li className="navitem">Hosts</li>
          </Link>
          <Link to="/discussion">
            <li className="navitem">Discussion</li>
          </Link>

          {user ? (
            <li className="navitem">
              <span onClick={logoutUser}>Logout</span>
              {user && <span> Hello {user.name} </span>}
            </li>
          ) : (
            <Link to="/login">
              <li className="navitem">login</li>
            </Link>
          )}
        </ul>
      </div>
      <div className="navbar-last">
        <Link to="/profile">
          <img className="navbar-profile" src="/default.jpg" />
        </Link>
      </div>
    </div>
  );
};
export default NavBar;
