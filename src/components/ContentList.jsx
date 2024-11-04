import React, { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/contentStore";
import axios from "axios";
import "../styles/contentlist.scss";
import { Link } from "react-router-dom";

// Icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ContentList = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const sliderRef = useRef(null); // Create a ref for the slider
  const [showArrow, setShowArrow] = useState(false);

  const Image = `https://image.tmdb.org/t/p/w500/`;

  useEffect(() => {
    const getContent = async () => {
      try {
        const response = await axios(
          `http://localhost:5000/api/v1/${contentType}/${category}`,
          { withCredentials: true }
        );
        // console.log(category, " : ", response.data.content);
        setContent(response.data.content);
      } catch (error) {
        console.log(error.message);
      }
    };

    getContent();
  }, [contentType, category]);

  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);

  const formattedContentType = contentType === "movie" ? "Movies" : "Tv Show";

  const scrollLeft = () => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.firstChild.offsetWidth; // Get the width of the first child
      const gap = parseInt(getComputedStyle(sliderRef.current).gap) || 0; // Get the gap value
      const scrollAmount = itemWidth + gap; // Total amount to scroll

      console.log("Scrolling left by:", scrollAmount); // Debugging statement
      sliderRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.firstChild.offsetWidth; // Get the width of the first child
      const gap = parseInt(getComputedStyle(sliderRef.current).gap) || 0; // Get the gap value
      const scrollAmount = itemWidth + gap; // Total amount to scroll

      console.log("Scrolling right by:", scrollAmount); // Debugging statement
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="content-list"
      onMouseEnter={() => setShowArrow(true)}
      onMouseLeave={() => setShowArrow(false)}
    >
      <h2>{formattedCategoryName + " " + formattedContentType}</h2>
      <div
        className="slider"
        ref={sliderRef} // Attach the ref to the slider
      >
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            key={item.id}
            className="content-list-link"
          >
            <div className="content-list-poster-container">
              <img
                src={Image + item.backdrop_path}
                className="content-list-poster"
              />
            </div>
            <div className="content-name">{item.name || item.title}</div>
          </Link>
        ))}
        {showArrow && (
          <>
            <button className="left-icon" onClick={scrollLeft}>
              <FaChevronLeft size={24} color="white" className="left-arrow" />
            </button>
            <button className="right-icon" onClick={scrollRight}>
              <FaChevronRight size={24} color="white" className="right-arrow" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentList;
