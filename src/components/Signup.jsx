import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.scss";
import NetflixLogo from "/netflix-logo.png";
import { useValidate } from "../utils/useValidate";
import { useAuthStore } from "../store/userAuthSore";

const Signup = () => {
  //states to hold emails password  and username

  const { isSigningIn, signup, initialValueAuthPage } = useAuthStore();
  const [email, setEmail] = useState(initialValueAuthPage);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { validateSignUp } = useValidate();

  const navigate = useNavigate();

  const signUpHandler = (e) => {
    console.log("inside signup handle");
    // e.prevent.default();
    console.log({ email, password, username });
    //validation
    const isValid = validateSignUp({ email, password, username });
    console.log("Is valid ", isValid);
    if (isValid) {
      //send data to server
      signup({ email, password, username }, navigate);
    }
  };

  return (
    <div className="hero-bg-auth signup-window ">
      s
      <header className="header">
        <Link to={"/"} className="logo-container">
          <div className="logo-container">
            <img src={NetflixLogo} alt="netflix-logo" className="logo-image" />
          </div>
        </Link>
      </header>
      <section className="signup-section">
        <div className="signup-container">
          <h1>Sign Up</h1>
          <form>
            <div className="input-container">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input-field"
                required
                placeholder="rajat@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="username" className="input-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="input-field"
                required
                placeholder="rajat ranjan"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="input-label">
                password
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="button-auth" onClick={signUpHandler}>
              Sign Up
            </div>
          </form>
          <div className="auth-footer">
            Already a member?{" "}
            <Link to={"/login"} className="auth-link">
              Sign In now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
