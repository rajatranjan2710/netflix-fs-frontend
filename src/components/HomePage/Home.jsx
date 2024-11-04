import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

//icons
import { FaPlay } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import useGetRandomContent from "../../hooks/useGetRandomContent";
import { useContentStore } from "../../store/contentStore";
import ContentList from "../ContentList";
import { MOVIE_CATEGORIES, TV_CATEGORIES } from "../../utils/constants";
import Footer from "../footer";

const Home = () => {
  //api call
  const { content } = useGetRandomContent();
  const { contentType } = useContentStore();
  const [loading, setLoading] = React.useState(true);

  const image = `https://image.tmdb.org/t/p/original/${content?.backdrop_path}`;
  const smallImage = `https://image.tmdb.org/t/p/w500/${content?.poster_path}`;

  const isMobile = window.innerWidth <= 768;
  return (
    <>
      <div className="home-page-section">
        <Navbar />

        {/* Shimmer Effect */}
        {loading && <div className="shimmer" />}
        <img
          src={isMobile ? smallImage : image}
          alt="poster"
          className="poster"
          onLoad={() => setLoading(false)}
        />
        <div className="poster-overlay" />
        <div className="content-container">
          <div className="gradient-overlay" />
          <div className="content-hero">
            <h1 className="hero-title">{content?.title || content?.name}</h1>
            <p className="release-date">
              {content?.release_date
                ? content.release_date.split("-")[0]
                : "N/A"}{" "}
              || {content.adult ? "18+" : "PG-13"}
            </p>
            <p className="content-desc">
              {content?.overview?.slice(0, 250)}...
            </p>
            <div className="button">
              <div className="watch">
                <Link to={`/watch/${content.id}`} className="link">
                  <FaPlay />
                  <h3>Watch</h3>
                </Link>
              </div>
              <div className="details">
                <Link to={"/"} className="link-details">
                  <MdInfoOutline />
                  <h3>Info</h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section-2">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <ContentList key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <ContentList key={category} category={category} />
            ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;

// https://image.tmdb.org/t/p/A1dZ6faTjg0e6HYftBmEKujuXGQ.jpg
