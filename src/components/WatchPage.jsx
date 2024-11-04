import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/watchpage.scss";
import { useContentStore } from "../store/contentStore";
import axios from "axios";
import { SERVER } from "../utils/constants";
import ReactPlayer from "react-player";
import { formatDate, isAdult } from "../utils/dateConverter";

//icons
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { AiOutlineFire } from "react-icons/ai";
import SimilarContentList from "./SimilarContentList";
import Loader from "./Loader";

const WatchPage = () => {
  const { id } = useParams();
  //   console.log("Id is :", id);

  const { contentType } = useContentStore();
  const [trailers, setTrailers] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});

  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);

  const [Trailerloading, setTrailerLoading] = useState(true);
  const [Similarloading, setSimilarLoading] = useState(true);
  const [Detailsloading, setDetailsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const FetchTrailers = async () => {
      setTrailerLoading(true);
      try {
        const res = await axios.get(SERVER + `/${contentType}/trailers/${id}`, {
          withCredentials: true,
        });
        setTrailers(res.data.trailers.results);
        console.log(res.data.trailers.results);
      } catch (error) {
        if (error.response.status === 404) {
          console.log("No trailers found");
          setTrailers([]);
        }
        console.error("Error fetching trailers: ", error.message);
      } finally {
        setTrailerLoading(false);
      }
    };

    FetchTrailers();
  }, [id, contentType]);

  useEffect(() => {
    const FetchSimilarMovies = async () => {
      setSimilarLoading(true);
      try {
        const res = await axios.get(SERVER + `/${contentType}/similar/${id}`, {
          withCredentials: true,
        });
        setSimilarMovies(res.data.similar.results);
        console.log("Similar movies are :", res.data.similar.results);
      } catch (error) {
        if (error.response.status === 404) {
          console.log("No similar movies found");
          setSimilarMovies([]);
        }
        console.error("Error fetching similar movies: ", error.message);
      } finally {
        setSimilarLoading(false);
      }
    };

    FetchSimilarMovies();
  }, [id, contentType]);

  useEffect(() => {
    const FetchMovieDetails = async () => {
      setDetailsLoading(true);
      try {
        const res = await axios.get(SERVER + `/${contentType}/details/${id}`, {
          withCredentials: true,
        });
        setMovieDetails(res.data.details);
        console.log("Here are movie details :", res.data.details);
      } catch (error) {
        if (error.response.status === 404) {
          console.log("details not found");
          setMovieDetails({});
        }
        console.error("Error fetching movie details: ", error.message);
      } finally {
        setDetailsLoading(false);
      }
    };

    FetchMovieDetails();
  }, [id, contentType]);

  const handleNextTrailer = () => {
    setCurrentTrailerIndex((prevIndex) =>
      prevIndex === trailers.length - 1 ? trailers.length - 1 : prevIndex + 1
    );
  };
  const handlePrevTrailer = () => {
    setCurrentTrailerIndex((prevIndex) =>
      prevIndex === 0 ? 0 : prevIndex - 1
    );
  };

  const posterImage = `https://image.tmdb.org/t/p/original`;

  return (
    <div className="watchpage">
      <Navbar />
      <div className="watch-page-container">
        <div className="left-right-container">
          <button
            className={`left-navigator ${currentTrailerIndex} === ${0} ? "disabled" : ""`}
            onClick={handlePrevTrailer}
            disabled={currentTrailerIndex === 0}
          >
            <MdKeyboardArrowLeft className="svg" size={24} />
          </button>
          <button
            className={`right-navigator ${currentTrailerIndex} === ${
              trailers.length - 1
            } ? "disabled" : ""`}
            onClick={handleNextTrailer}
            disabled={currentTrailerIndex === trailers.length - 1}
          >
            <MdKeyboardArrowRight className="svg" size={24} />
          </button>
        </div>
        {Trailerloading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <div className="player">
            {trailers.length === 0 ? (
              <div className="no-trailer">No trailer found</div>
            ) : (
              <ReactPlayer
                controls={true}
                width={"100%"}
                className="react-player"
                url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex]?.key}`}
              />
            )}
          </div>
        )}

        <div className="go-to-details">
          <a href="#detail">Movie details</a>
        </div>
      </div>

      {/* //content details section  */}
      <div className="content-details" id="detail">
        <div className="left-side">
          <h1>{movieDetails.title || movieDetails.name}</h1>
          <div className="sub-title">
            <h6>
              {formatDate(movieDetails.release_date) ||
                formatDate(movieDetails.first_air_date)}{" "}
              |{" "}
            </h6>{" "}
            <h6> {isAdult(movieDetails.adult)} | </h6>
          </div>
          <div className="stats">
            <div className="rating">
              <FaStar />
              Rating - {movieDetails.vote_average}
            </div>
            <div className="popularity">
              <AiOutlineFire />
              Popularity - {movieDetails.popularity}
            </div>
          </div>
          <div className="overview">{movieDetails?.overview}</div>
        </div>
        <div className="right-side">
          {imageLoading && (
            <div className="image-loader">
              <Loader />
            </div>
          )}
          <div className="movie-img-container">
            <img
              src={posterImage + movieDetails.poster_path}
              alt="movie poster"
              onLoad={() => setImageLoading(false)}
              style={{ display: imageLoading ? "none" : "block" }}
            />
          </div>
        </div>
      </div>

      {/* similar movies section  */}
      <div className="similar-movies-section">
        <SimilarContentList similarMovies={similarMovies} />
      </div>
    </div>
  );
};

export default WatchPage;

// https://image.tmdb.org/t/p/original/hUzeosd33nzE5MCNsZxCGEKTXaQ.png
