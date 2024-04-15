// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Search from "./Search/Search";
// import HostsCard from "./HostCard/HostsCard";
// import "./hostpage.css";

// function HostsPage() {
//   const [hostchoice, setHostChoice] = useState(null);
//   const [userchoice, setUserChoice] = useState(null);

//   const getChoice = (choice) => {
//     setHostChoice(choice.toLowerCase());
//   };

//   useEffect(() => {
//     const fetchdata = async () => {
//       try {
//         const response = await axios.request(
//           "https://natty.pythonanywhere.com/user/hosts/"
//         );
//         setUserChoice(response.data);
//       } catch (error) {
//         console.log("Error fetching data:", error);
//       }
//     };
//     fetchdata();
//   }, []);

//   return (
//     <div className="hostpage-container">
//       <Search choicefunction={getChoice} />
//       <div className="hostspage-hosts">
//         {hostchoice !== null
//           ? userchoice
//               .filter((item) => item.hostname.toLowerCase() === hostchoice)
//               .map((item) => <HostsCard key={item.id} item={item} />)
//           : userchoice &&
//             userchoice.map((item) => <HostsCard key={item.id} item={item} />)}
//       </div>
//     </div>
//   );
// }

// export default HostsPage;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "./Search/Search";
import HostsCard from "./HostCard/HostsCard";
import "./hostpage.css";

function HostsPage() {
  const [hostchoice, setHostChoice] = useState(null);
  const [userchoice, setUserChoice] = useState(null);
  const [filteredHosts, setFilteredHosts] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.request(
          "https://natty.pythonanywhere.com/user/hosts/"
        );
        setUserChoice(response.data);
        setFilteredHosts(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  // Filter hosts based on choice
  useEffect(() => {
    if (hostchoice === null) {
      setFilteredHosts(userchoice);
    } else {
      setFilteredHosts(
        userchoice.filter((item) =>
          item.hostname.toLowerCase().includes(hostchoice.toLowerCase())
        )
      );
    }
  }, [hostchoice, userchoice]);

  // Function to handle choice change
  const handleChoiceChange = (choice) => {
    setHostChoice(choice.toLowerCase());
  };

  return (
    <div className="hostpage-container">
      <Search choicefunction={handleChoiceChange} />
      <div className="hostspage-hosts">
        {filteredHosts &&
          filteredHosts.map((item) => <HostsCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}

export default HostsPage;
