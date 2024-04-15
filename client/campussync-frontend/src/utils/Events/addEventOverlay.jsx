import React from "react";
import "./overlay.css";

const AddEventOverlay = ({ showOverlay, setshowOverlay }) => {
  const handleChange = (e) => {
    const poster_overlay = document.querySelector(".overlay-poster");
    poster_overlay.style.backgroundImage = `url(${URL.createObjectURL(
      e.target.files[0]
    )})`;
  };
  document.body.style.overflow = "hidden"; // stop  backgroud scrolling when modal open
  return (
    <>
      <div className="overlay-container">
        <div className="overlay-box">
          <i
            onClick={() => {
              document.body.style.overflowY = "scroll";
              setshowOverlay(!showOverlay);
            }}
            class="fa-solid fa-x"
          ></i>
          <form className="event-form" encType="multipart/form-data">
            <div className="overlay-poster">
              <div className="upload-icon">
                <label htmlFor="poster">
                  <i className="fa-solid fa-upload"></i>
                  <p style={{ color: "black", fontSize: "1.5rem" }}>
                    Event Poster
                  </p>
                </label>
              </div>

              <input
                onChange={(e) => handleChange(e)}
                type="file"
                id="poster"
                name="image"
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>
            <div className="event-inputs">
              <i className="fa fa-pen"></i>
              <input
                type="text"
                className="event-input"
                name="name"
                placeholder="your event ..."
              />
            </div>

            <div className="event-inputs">
              <i class="fa-solid fa-calendar-days"></i>

              <input
                type="date"
                className="event-input"
                name="event_date"
                placeholder="event date ..."
              />
            </div>
            <div className="event-inputs">
              <i class="fa-solid fa-location-dot"></i>

              <input
                type="text"
                className="event-input"
                placeholder="location ..."
              />
            </div>
            <div className="event-inputs">
              <textarea
                type="text"
                className="event-desc"
                name="description"
                placeholder="description ..."
              ></textarea>
            </div>
            <button className="create-event-btn">Create Event</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEventOverlay;
