import React from "react";
import "./individual.css";
import { TbDirectionSignFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

function IndividualEvents({ userid, item, name }) {
 const humanReadable = "https://natty.pythonanywhere.com/media/" + item.poster;
  const timestamp = item.date_posted;
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const humanReadableTime = `${formattedHours}:${formattedMinutes}`;

  return (
    <>
      <div className="individual-container">
        <div className="individual-container-pic">
          {" "}
          {/* <img src={logo} alt="" /> */}
          <img src={humanReadable} alt="" />
        </div>
        <div className="individual-details-container">
          {/* <h1>ALX Campus Event</h1> */}
          <h1>{item.name}</h1>
          <div className="individual-details">
            <div className="individual-content">
              {/* <p>Place: Virtual</p> */}
              <p>Place: {item.address}</p>
              <p>Time: {humanReadableTime}</p>
              <p>Hosted By: {name}</p>
            </div>
            <Link to={`/eventdetailpage/${userid}`}>
              <div>
                <TbDirectionSignFilled size="3rem" className="custom-icon" />
              </div>
            </Link>
          </div>
          <div className="individual-like">
            {/* <BiSolidLike size="2rem" className="custom-icon" />
            <BiSolidDislike size="2rem" className="custom-icon" /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default IndividualEvents;
