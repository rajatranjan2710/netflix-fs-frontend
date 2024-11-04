import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/userAuthSore";
import NetflixLogo from "/netflix-logo.png";
import "../styles/navbar.scss";

//icons
import { RiSearchLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContentStore } from "../store/contentStore";
import useGetRandomContent from "../hooks/useGetRandomContent";

const Navbar = () => {
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const dropdownRef = useRef(null);

  const logoutHandler = () => {
    logout(navigate);
  };

  const toggleHamburger = () => {
    setHamburgerOpen(!isHamburgerOpen);
    console.log(isHamburgerOpen);
  };

  const { contentType, setContentType } = useContentStore();
  const handleContentType = (type) => {
    setContentType(type);
    // console.log(contentType);
  };

  let maxHeight = "0"; // Default height when closed
  if (isHamburgerOpen && dropdownRef.current) {
    maxHeight = `${dropdownRef.current.scrollHeight}px`; // Set to the scrollHeight when open
  }

  return (
    <>
      <div className="navbar">
        <div className="left">
          <Link to={"/"} className="logo-container-navbar">
            <div className="logo-container-navbar">
              <img
                src={NetflixLogo}
                alt={"Logo"}
                className="logo-image-navbar"
              />
            </div>
          </Link>

          <div className="navbar-options">
            <div className="option">
              <Link
                to={"/"}
                className="link"
                onClick={() => handleContentType("movie")}
              >
                Movies
              </Link>
            </div>
            <div className="option" onClick={() => handleContentType("tv")}>
              <Link to={"/"} className="link">
                Tv Shows
              </Link>
            </div>
            <div className="option">
              <Link to={"/history"} className="link">
                Search
              </Link>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="search">
            <Link to={"/search"}>
              <RiSearchLine color="white" size={20} />
            </Link>
          </div>
          <div className="profile">
            <img src="/avatar2.jpg" alt="avatar" />
          </div>
          <div className="logout">
            <MdLogout color="white" size={20} onClick={logoutHandler} />
          </div>
          <div className="hamburger" onClick={toggleHamburger}>
            <GiHamburgerMenu size={20} color="white" />
          </div>
        </div>
      </div>

      {/* only visible to phone screens */}
      <div
        className={`drop-downs ${isHamburgerOpen ? "show" : ""}`}
        ref={dropdownRef}
        style={{
          maxHeight: maxHeight,
          opacity: isHamburgerOpen ? 1 : 0,
          transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
        }}
      >
        <div className="navbar-options">
          <div className="option" onClick={() => handleContentType("movie")}>
            <Link to={"/"} className="link">
              Movies
            </Link>
          </div>
          <div className="option" onClick={() => handleContentType("tv")}>
            <Link to={"/"} className="link">
              Tv Shows
            </Link>
          </div>
          <div className="option">
            <Link to={"/history"} className="link">
              Search
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
