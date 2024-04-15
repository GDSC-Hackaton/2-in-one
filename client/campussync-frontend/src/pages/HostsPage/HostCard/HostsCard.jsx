import React from "react";
import "./hostcard.css";
import { Link } from "react-router-dom";

function HostsCard({ item }) {
  return (
    <Link to={`/hostdetailpage/${item.id}`}>
      <div
        className="card-container"
        style={{ backgroundImage: `url(${item.account_pic})` }}
      >
        <div></div>
        <div className="overlay">
          <div className="overlay-content">
            <h2 className="card-title">{item.hostname}</h2>
            <p className="card-description">{item.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HostsCard;
