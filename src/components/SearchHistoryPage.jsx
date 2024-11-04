// import React, { useEffect, useState } from "react";
// // import "../styles/history.css";
// import "../styles/search-history.scss";
// import Navbar from "./Navbar";
// import axios from "axios";
// import { SERVER } from "../utils/constants";
// import { formatDateV2 } from "../utils/dateConverter";
// import { MdDelete } from "react-icons/md";

// const SearchHistoryPage = () => {
//   const [searchHistory, setSearchHistory] = useState([]);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const response = await axios.get(SERVER + "search/history", {
//           withCredentials: true,
//         });
//         setSearchHistory(response.data.History);
//         console.log("fetched history : ", response.data.History);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchHistory();
//   }, []);

// const smallImage = `https://image.tmdb.org/t/p/w500`;

//   return (
//     <div className="search-history-page">
//       <Navbar />
//       <div className="container">
//         <div className="title">Search History</div>
//         {searchHistory?.length === 0 ? (
//           <div className="no-results">No Search History</div>
//         ) : (
//           <div className="serach-grid">
//             {searchHistory?.map((item) => (
//               <div className="search-history-item" key={item.createdAt}>
//                 <div className="img-cont">
//                   <img
//                     src={smallImage + item.image}
//                     alt="image"
//                     className="search-image"
//                   />
//                 </div>

//                 <div className="search-details">
//                   <div className="history-name">{item.name}</div>
//                   <div className="created-at">
//                     {formatDateV2(item.createdAt)}
//                   </div>
//                 </div>
//                 <div className="type">
//                   <div className="subtype">{item.type}</div>
//                   <button>
//                     <MdDelete size={22} color="white" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchHistoryPage;

import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import { SMALL_IMG_BASE_URL } from "../utils/constants";
// import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import "../styles/history.css";
import { SERVER } from "../utils/constants";

function formatDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}
const smallImage = `https://image.tmdb.org/t/p/w500`;

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(SERVER + `search/history`, {
          withCredentials: true,
        });
        setSearchHistory(res.data.History);
        console.log(res.data.History);
      } catch (error) {
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []);

  const handleDelete = async (entry) => {
    try {
      await axios.delete(SERVER + `search/history/${entry.id}`, {
        withCredentials: true,
      });
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
    } catch (error) {
      toast.error("Failed to delete search item");
    }
  };

  if (searchHistory?.length === 0) {
    return (
      <div className="search-history-page">
        <Navbar />
        <div className="container">
          <h1 className="title">Search History</h1>
          <div className="no-results">No search history found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-history-page">
      <Navbar />
      <div className="container">
        <h1 className="title">Search History</h1>
        <div className="search-grid">
          {searchHistory?.map((entry) => {
            if (entry.image === null) {
              return null;
            }
            return (
              <div key={entry.createdAt} className="search-history-item">
                <img
                  src={smallImage + entry.image}
                  alt="History image"
                  className="search-image"
                />
                <div className="search-details">
                  <span className="history-name">
                    {entry.title || entry.name}
                  </span>
                  <span className="created-at">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
                <div className="right-most-container">
                  <span className={`type ${entry.searchType}`}>
                    {entry.searchType[0].toUpperCase() +
                      entry.searchType.slice(1)}
                  </span>
                  <MdDelete
                    className="delete-icon"
                    onClick={() => handleDelete(entry)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;
