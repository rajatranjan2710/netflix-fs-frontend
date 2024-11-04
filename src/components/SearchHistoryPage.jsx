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
        const res = await axios.get(SERVER + `/search/history`, {
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
      await axios.delete(SERVER + `/search/history/${entry.id}`, {
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
