import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NetflixLogo from "/netflix-logo.png";
import "../../styles/home.scss";
import { useAuthStore } from "../../store/userAuthSore";

const AuthPage = () => {
  const { initialValueAuthPage, setInitialValue } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const navigateToSignUpHandler = () => {
    setInitialValue(email, navigate);
  };

  return (
    <>
      <div className="hero-bg wrapper-auth">
        <header className="header">
          <Link to={"/"} className="logo-container">
            <div className="logo-container">
              <img
                src={NetflixLogo}
                alt="netflix-logo"
                className="logo-image"
              />
            </div>
          </Link>
          <div className="header-right-buttons">
            <div className="header-language">English</div>
            <div className="header-signin-button">
              <Link to={"/signup"} className="link-header-right">
                Sign in
              </Link>
            </div>
          </div>
        </header>
        <section className="hero-section">
          <div className="hero-container">
            <h1>Unlimited movies, Tv Shows and more</h1>
            <h6>Watch anywhere , cancel anytime</h6>
            <h6>
              Ready to watch? Enter your email to create or restart your
              membership
            </h6>
            <div className="hero-input-container">
              <input
                type="email"
                placeholder="you@gmail.com"
                className="input-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="input-button" onClick={navigateToSignUpHandler}>
                Get Started
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* seperator */}
      <div className="seperator"></div>

      {/* section2 */}
      <div className="authpage-section-2">
        <div className="container">
          <div className="left">
            <h2>Enjoy on your TV</h2>
            <p>
              Watch on Smart tv's, PlayStation, Xbox, Chrome Cast, Apple Tv,
              Blue ray players and more.
            </p>
          </div>
          <div className="right">
            <img src="/tv.png" alt="tv" />
            <video
              className="video-section-2"
              autoPlay={true}
              muted
              playsInline
              loop
            >
              <source src="hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* seperator  */}
      <div className="seperator"></div>

      {/* section 3 */}
      <div className="authpage-section-3">
        <div className="container">
          <div className="left">
            <img src="stranger-things-lg.png" alt="" className="lg-image" />
            <div className="inner-div">
              <img src="stranger-things-sm.png" alt="" />
              <div>
                <h6>Stranger things</h6>
                <p className="downloading">Downloading...</p>
              </div>
              <img src="download-icon.gif" alt="" />
            </div>
          </div>
          <div className="right">
            <h2>Download your showss to watch offline</h2>
            <p>
              save your favourites easily and always have somethings to watch
            </p>
          </div>
        </div>
      </div>

      {/* seperator  */}
      <div className="seperator"></div>

      {/* section 4 */}
      <div className="authpage-section-4">
        <div className="container">
          <div className="left">
            <h2>Watch everywhere</h2>
            <p>
              Stream unlimited Movies, Tv shows on your laptop, tablet, phone
              and tv.
            </p>
          </div>
          <div className="right">
            <img src="/device-pile.png" alt="tv" />
            <video
              className="video-section-2"
              autoPlay={true}
              muted
              playsInline
              loop
            >
              <source src="video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* seperator  */}
      <div className="seperator"></div>

      {/* section 5 */}
      <div className="authpage-section-5">
        <div className="container">
          <div className="left">
            <img src="kids.png" alt="kids image" className="lg-image" />
          </div>
          <div className="right">
            <h2>Create profiles for kids</h2>
            <p>
              Send kids on adventures with their favourite characters in a space
              made just for them, free from parental controls.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
