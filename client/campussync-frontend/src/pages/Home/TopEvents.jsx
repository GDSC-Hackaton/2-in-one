import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopEvents.css";
import EventCard from "./EventCard";

const timeFormater = (isoDateString) => {
  const date = new Date(isoDateString);
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  console.log(formattedDate); // Example: "April 9, 2024"
  return formattedDate;
};

const TopEvents = () => {
  const [eventsData, setEventsData] = useState([]); // Initialize state to store events data

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.request(
          "https://natty.pythonanywhere.com/event/events/"
        );
        console.log(response.data);
        setEventsData(response.data); // Update the state with the fetched data
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  console.log(eventsData);
  return (
    <div className="event-container">
      <h2>Top Events Now</h2> <hr />
      <div className="events-grid">
        {eventsData.map((event, index) => (
          <EventCard
            id={event.id}
            imageSrc={event.poster}
            title={event.name}
            time={timeFormater(event.date_posted)}
            description={event.description}
          />
        ))}
      </div>
      <button className="view-more">View More</button>
    </div>
  );
};

export default TopEvents;
