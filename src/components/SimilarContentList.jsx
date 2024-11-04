import React, { useRef, useState } from "react";
import "../styles/contentlist.scss";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SimilarContentList = ({ similarMovies }) => {
  const [showArrow, setShowArrow] = useState(false);
  const sliderRef = useRef(null);

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

  const smallImage = `https://image.tmdb.org/t/p/w500`;

  return (
    <div
      className="content-list"
      onMouseEnter={() => setShowArrow(true)}
      onMouseLeave={() => setShowArrow(false)}
    >
      <h2>Similar Movies</h2>
      {similarMovies?.length === 0 ? (
        <div className="no-content">No similar movies found.</div>
      ) : (
        <div
          className="slider"
          ref={sliderRef} // Attach the ref to the slider
        >
          {similarMovies.map((item) => {
            if (item.backdrop_path === null) return null;

            return (
              <Link
                to={`/watch/${item.id}`}
                key={item.id}
                className="content-list-link"
              >
                <div className="content-list-poster-container">
                  <img
                    src={smallImage + item.backdrop_path}
                    className="content-list-poster"
                  />
                </div>
                <div className="content-name">{item.name || item.title}</div>
              </Link>
            );
          })}
          {showArrow && (
            <>
              <button className="left-icon" onClick={scrollLeft}>
                <FaChevronLeft size={24} color="white" className="left-arrow" />
              </button>
              <button className="right-icon" onClick={scrollRight}>
                <FaChevronRight
                  size={24}
                  color="white"
                  className="right-arrow"
                />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SimilarContentList;
