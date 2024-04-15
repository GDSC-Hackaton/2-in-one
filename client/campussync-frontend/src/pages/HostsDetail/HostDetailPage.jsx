import React, { useState, useEffect, useContext } from "react";
import HostDetailCard from "./HostDetailCard";
import axios from "axios";
import "./HostDetail.css";
import IndividualEvents from "./IndividualEvents";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const HostDetailPage = () => {
  const { id1 } = useParams();
  const [choic, setChoic] = useState(null);
  const [events, setEvents] = useState([]);
  const[follower,setFollower]=useState([]);
  const url = "https://natty.pythonanywhere.com/user/events_by_host/";
  const { user, AuthUser } = useContext(AuthContext);
  // console.log(user);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `https://natty.pythonanywhere.com/user/hosts/${id1}/`
        );
        console.log(response.data);
        setChoic(response.data);
        setFollower(response.data.followers);
        console.log(follower);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchdata();

    const requestBody = {
      host_id: id1,
    };

    const fetchEventData = async () => {
      try {
        const response = await axios.post(url, requestBody);
        console.log("Response:", response.data);
        setEvents(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEventData();
  }, [id1]);

  // useEffect(() => {
  //   const fetchdata1 = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://natty.pythonanywhere.com/user/events_by_host/?host_id=${id1}`
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log("Error fetching data:", error);
  //     }
  //   };
  //   fetchdata1();
  // }, [id1]);
  // axios
  //   .post(url, requestBody)
  //   .then((response) => {
  //     console.log("Response:", response.data);
  //     setEvents(response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

  // useEffect(() => {
  //   const fetchEventData = async () => {
  //     try {
  //       const response = await axios.post(url, requestBody);
  //       console.log("Response:", response.data);
  //       setEvents(response.data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchEventData();
  // }, [id1]);

  return (
    <div className="host-detail-page">
      <div className="host-detail-content">
        {choic ? (
          <HostDetailCard item2={choic} name={user.user_id} host={follower}/>
        ) : (
          <p>Loading...</p>
        )}
        {events.map((item) => (
          <IndividualEvents userid={id1} item={item} name={choic.hostname} />
        ))}
      </div>
    </div>
  );
};

export default HostDetailPage;
