// import React, { useEffect, useState } from "react";
// import "./CurrentEvents.css";
// import AddEventOverlay from "./addEventOverlay";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Endpoint from "../../api";

// const timeFormater = (isoDateString) => {
//   const date = new Date(isoDateString);
//   const formattedDate = date.toLocaleString('en-US', {
//     month: 'long',
//     day: 'numeric',
//     year: 'numeric',
//   });
//   return formattedDate;
// }

// const CurrentEvents = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showOverlay, setshowOverlay] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [loading, setloading] = useState(true);
//   const [filteredEvents, setFilteredEvents] = useState([]);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearch = () => {
//     console.log("Searching for:", searchTerm);
//     // Filter events based on the search term
//     const searchedEvents = events.filter(event =>
//       (event.name && event.name.toLowerCase().includes(searchTerm.toLowerCase()))
//       (event.host && event.host.toLowerCase().includes(searchTerm.toLowerCase()))
//       (event.address && event.address.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//     // Update the filteredEvents state with the search results
//     setFilteredEvents(searchedEvents);
//   };

//   const handleFilter = (filter) => {
//     console.log("Filtering by:", filter);
//     // Implement filter functionality
//     let sortedEvents = [];
//     switch (filter) {
//       case "recent":
//         sortedEvents = [...events].sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));
//         break;
//       case "old":
//         sortedEvents = [...events].sort((a, b) => new Date(a.date_posted) - new Date(b.date_posted));
//         break;
//       case "upvote":
//         sortedEvents = [...events].sort((a, b) => b.upvotes - a.upvotes);
//         break;
//       case "downvote":
//         sortedEvents = [...events].sort((a, b) => b.downvotes - a.downvotes);
//         break;
//       default:
//         sortedEvents = [...events];
//     }
//     setFilteredEvents(sortedEvents);
//   };

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get(`${Endpoint()}event/events`);
//       console.log(response.data);
//       setEvents(response.data);
//       setFilteredEvents(response.data);
//       setloading(false);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   return (
//     <>
//       {showOverlay && (
//         <AddEventOverlay
//           fetchEvents={fetchEvents}
//           showOverlay={showOverlay}
//           setshowOverlay={setshowOverlay}
//         />
//       )}
//       <div className="current-events">
//         <div className="search-section">
//           <input
//             type="text"
//             placeholder="Search for events..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//           <button onClick={handleSearch}>Search</button>
//         </div>
//         <div className="filters">
//           <button onClick={() => handleFilter("recent")}>Recent</button>
//           <button onClick={() => handleFilter("old")}>Old</button>
//           <button onClick={() => handleFilter("upvote")}>Upvote</button>
//           <button onClick={() => handleFilter("downvote")}>Downvote</button>
//         </div>
//         <button
//           onClick={() => setshowOverlay(!showOverlay)}
//           className="add-event-btn"
//         >
//           <i className="fa fa-plus"></i>
//         </button>
//         Nahom, [4/10/2024 3:34 PM]
//         {loading ? (
//           <img src="loading.gif" alt="Loading..." />
//         ) : filteredEvents.length > 0 ? (
//           filteredEvents.map((event, index) => (
//             <div key={event.id} className="event_card">
//               <img
//                 src={event.poster}
//                 style={{ width: "400px", height: "100%" }}
//                 alt={event.title}
//               />
//               <div className="event_detail">
//                 <Link to={`/eventdetailpage/${event.id}`}>
//                   <h3>{event.name}</h3>
//                   <p>Place: {event.address}</p>
//                   <p>Time: {timeFormater(event.date_posted)}</p>
//                   <p>Hosted by: {event.host}</p>
//                 </Link>
//               </div>
//               <div className="voting">
//                 <button>
//                   <i className="fa-solid fa-thumbs-up"></i> {event.upvotes}
//                 </button>
//                 <button>
//                   <i className="fa-solid fa-thumbs-down"></i> {event.downvotes}
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="event_detail">
//             <h3>No Events Found</h3>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CurrentEvents;

import React, { useEffect, useState, useContext } from "react";
import "./CurrentEvents.css";
import AddEventOverlay from "./addEventOverlay";
import { Link } from "react-router-dom";
import axios from "axios";
import Endpoint from "../../api";
import AuthContext from "../../context/AuthContext";

const timeFormater = (isoDateString) => {
  const date = new Date(isoDateString);
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
};

const CurrentEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showOverlay, setshowOverlay] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setloading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { user, AuthUser } = useContext(AuthContext);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    const searchedEvents = events.filter((event) =>
      (
        event.name &&
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      )(
        event.host &&
          event.host.toLowerCase().includes(searchTerm.toLowerCase())
      )(
        event.address &&
          event.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredEvents(searchedEvents);
  };

  const handleFilter = (filter) => {
    console.log("Filtering by:", filter);
    let sortedEvents = [];
    switch (filter) {
      case "recent":
        sortedEvents = [...events].sort(
          (a, b) => new Date(b.date_posted) - new Date(a.date_posted)
        );
        break;
      case "old":
        sortedEvents = [...events].sort(
          (a, b) => new Date(a.date_posted) - new Date(b.date_posted)
        );
        break;
      case "upvote":
        sortedEvents = [...events].sort((a, b) => b.upvotes - a.upvotes);
        break;
      case "downvote":
        sortedEvents = [...events].sort((a, b) => b.downvotes - a.downvotes);
        break;
      default:
        sortedEvents = [...events];
    }
    setFilteredEvents(sortedEvents);
  };

  const handleUpvote = async (eventId, userId) => {
    try {
      let form_data = new FormData();
      form_data.append("user_id", [userId]);
      await axios.post(
        `https://natty.pythonanywhere.com/event/${eventId}/upvote/`,
        form_data
      );
      fetchEvents();
    } catch (error) {
      console.error("Error upvoting the event:", error);
    }
  };

  const handleDownvote = async (eventId, userId) => {
    try {
      let form_data = new FormData();
      form_data.append("user_id", [userId]);
      await axios.post(
        `https://natty.pythonanywhere.com/event/${eventId}/downvote/`,
        form_data
      );
      fetchEvents();
    } catch (error) {
      console.error("Error downvoting the event:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${Endpoint()}event/events`);
      // console.log(response.data);
      setEvents(response.data);
      setFilteredEvents(response.data);
      setloading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  // console.log(filteredEvents);
  return (
    <>
      {showOverlay && (
        <AddEventOverlay
          fetchEvents={fetchEvents}
          showOverlay={showOverlay}
          setshowOverlay={setshowOverlay}
        />
      )}
      <div className="current-events">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search for events..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="filters">
          <button onClick={() => handleFilter("recent")}>Recent</button>
          <button onClick={() => handleFilter("old")}>Old</button>
          <button onClick={() => handleFilter("upvote")}>Upvote</button>
          <button onClick={() => handleFilter("downvote")}>Downvote</button>
        </div>
        <button
          onClick={() => setshowOverlay(!showOverlay)}
          className="add-event-btn"
        >
          <i className="fa fa-plus"></i>
        </button>

        {loading ? (
          <img src="loading.gif" alt="Loading..." />
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div key={event.id} className="event_card">
              <img
                src={event.poster}
                style={{ width: "400px", height: "100%" }}
                alt={event.title}
              />
              <div className="event_detail">
                <Link to={`/eventdetailpage/${event.id}/`}>
                  <h3>{event.name}</h3>
                  <p>Place: {event.address}</p>
                  <p>Time: {timeFormater(event.date_posted)}</p>
                  <p>Hosted by:</p>
                  {/* ******************************************************************************************** */}
                  {event.host ? (
                    <h3>Hosted By: {event.host.hostname}</h3>
                  ) : (
                    <h3>Hosted By:</h3>
                  )}
                  {/* ******************************************************************************************** */}
                </Link>
              </div>
              <div className="voting">
                <button onClick={() => handleUpvote(event.id, user.user_id)}>
                  <i className="fa-solid fa-thumbs-up"></i> {event.upvotes}
                </button>
                <button onClick={() => handleDownvote(event.id, user.user_id)}>
                  <i className="fa-solid fa-thumbs-down"></i> {event.downvotes}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="event_detail">
            <h3>No Events Found</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default CurrentEvents;
