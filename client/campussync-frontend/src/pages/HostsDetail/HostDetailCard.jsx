// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import "./HostDetail.css";

// const HostDetailCard = ({ item2, name, host }) => {
//   console.log(host);
//   const url1 = "https://natty.pythonanywhere.com/user/follow_host/";
//   const [state, setState] = useState(host);
//   const handleEvents = (url, name, state) => {
//     const requestBody = {
//       user_id: name,
//       host_id: item2.id,
//     };
//     const isAttending = state.some((attendee) => attendee.id === name);
//     if (isAttending) {
//       // User is already attending
//       //  setShowAlreadyRegistered(true);
//       console.log("fuck you");
//     } else {
//       // User is not attending, so perform RSVP action
//       axios
//         .post(url, requestBody)
//         .then((res) => {
//           console.log(res.data);
//           setState(res.data.followers);
//           console.log(state);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };
//   // useEffect(() => {
//   //   // const fetchdata = async () => {
//   //   //   try {
//   //   //     const response = await axios.get(
//   //   //       `https://natty.pythonanywhere.com/user/hosts/${id1}/`
//   //   //     );
//   //   //     console.log(response.data);
//   //   //     setChoic(response.data);
//   //   //   } catch (error) {
//   //   //     console.log("Error fetching data:", error);
//   //   //   }
//   //   // };
//   //   // fetchdata();

//   //   const requestBody = {
//   //     user_id: name,
//   //     host_id: item2.id,
//   //   };

//   //   const fetchEventData = async () => {
//   //     try {
//   //       const response = await axios.post(url1, requestBody);
//   //       console.log("Response:", response.data);
//   //     } catch (error) {
//   //       console.error("Error:", error);
//   //     }
//   //   };

//   //   fetchEventData();
//   // }, [state]);

//   return (
//     <div className="host-detail-card">
//       <div className="host-detail-image">
//         {/* <img src="/cod.jpg" alt="Host Profile" /> */}
//         <img src={item2.account_pic} alt="Host Profile" />
//       </div>
//       <div className="host-detail-info">
//         {/* <h2>ALX Ethiopia</h2> */}
//         <h2>{item2.hostname}</h2>
//         <p>
//           {item2.description}
//           {/* Host Description Lorem ipsum dolor sit amet, consectetur adipiscing
//           elit. */}
//         </p>
//         <button
//           className="follow-button"
//           onClick={() => {
//             handleEvents(url1, name, state, host);
//           }}
//         >
//           Follow
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HostDetailCard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HostDetail.css";

const HostDetailCard = ({ item2, name, host }) => {
  const url = "https://natty.pythonanywhere.com/user/follow_host/";
  const [isFollowing, setIsFollowing] = useState(false);

  // Check if the user is following the host
  useEffect(() => {
    setIsFollowing(host.some((follower) => follower.id === name));
  }, [host, name]);

  const handleFollow = () => {
    const requestBody = {
      user_id: name,
      host_id: item2.id,
    };

    axios
      .post(url, requestBody)
      .then((res) => {
        console.log(res.data);
        // Update isFollowing state based on the response
        setIsFollowing(!isFollowing);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="host-detail-card">
      <div className="host-detail-image">
        <img src={item2.account_pic} alt="Host Profile" />
      </div>
      <div className="host-detail-info">
        <h2>{item2.hostname}</h2>
        <p>{item2.description}</p>
        {isFollowing ? (
          <button className="follow-button" onClick={handleFollow}>
            Following
          </button>
        ) : (
          <button className="follow-button" onClick={handleFollow}>
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default HostDetailCard;
