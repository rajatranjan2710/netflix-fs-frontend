import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.scss";
import NetflixLogo from "/netflix-logo.png";
import { useValidate } from "../utils/useValidate";
import { useAuthStore } from "../store/userAuthSore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { validateSignIn } = useValidate();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const signInHandler = (e) => {
    console.log("Inside  sign in handler");
    const validated = validateSignIn({ email, password });
    if (validated) {
      console.log("Validated");
      login({ email, password }, navigate);
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
          <h1>Sign In</h1>
          <form onSubmit={signInHandler}>
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
            <div className="button-auth" onClick={signInHandler}>
              Sign In
            </div>
          </form>
          <div className="auth-footer">
            New to netflix?{" "}
            <Link to={"/signup"} className="auth-link">
              Sign up now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
