import React from "react";
import Navbar from "./Navbar";
import "../styles/searchpage.scss";
import { useContentStore } from "../store/contentStore";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { SERVER } from "../utils/constants";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [activeTab, setActiveTab] = React.useState("movie");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const { contentType, setContentType } = useContentStore();

  const handleActiveTab = (tab) => {
    console.log("Tab clicked:", tab);
    setActiveTab(tab);
    setContentType(tab === "movie" ? "movie" : "tv");
    setSearchResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    try {
      const response = await axios.get(
        SERVER + `search/${activeTab}/${searchTerm}`,
        { withCredentials: true }
      );
      setSearchResults(response.data.content);
      toast.success("Search results loaded");
      //   console.log("seacrh results :", response.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("No results found");
        setSearchResults([]);
      } else {
        toast.error("Something went wrong");
        setSearchResults([]);
      }
    }
  };

  const smallImage = `https://image.tmdb.org/t/p/w500`;

  return (
    <div className="search-page">
      <Navbar />
      <div className="search-tabs">
        <div
          onClick={() => handleActiveTab("movie")}
          className={`tab ${activeTab === "movie" ? "active" : ""}`}
        >
          Movie
        </div>
        <div
          className={`tab ${activeTab === "tv" ? "active" : ""}`}
          onClick={() => handleActiveTab("tv")}
        >
          Tv Show
        </div>
        <div
          className={`tab ${activeTab === "person" ? "active" : ""}`}
          onClick={() => handleActiveTab("person")}
        >
          Person
        </div>
      </div>
      <form className="form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder={"Search your favourite " + activeTab}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">
          <IoSearch size={22} color="white" />
        </button>
      </form>

      {searchResults.length === 0 ? (
        <div className="no-results">No results found</div>
      ) : (
        <div className="search-item-container">
          {searchResults.map((item) => {
            if (item.poster_path === null || item.profile_path === null) {
              return null;
            }
            if (activeTab === "movie" || activeTab === "tv") {
              return (
                <div className="search-item" key={item.id}>
                  <Link to={`/watch/${item.id}`}>
                    <div className="poster-container">
                      <img src={smallImage + item.poster_path} alt="poster" />
                    </div>
                  </Link>
                  <div className="title">{item.title || item.name}</div>
                </div>
              );
            } else if (activeTab === "person") {
              // You can customize this part to show information for a person
              return (
                <div className="search-item" key={item.id}>
                  <div className="poster-container">
                    <img src={smallImage + item.profile_path} alt="person" />
                  </div>
                  <div className="title">{item.name}</div>
                </div>
              );
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
