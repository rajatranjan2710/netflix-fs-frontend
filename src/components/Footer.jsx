import React from "react";
import "../styles/footer.scss";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import me from "../assets/me.jpg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="righs">
        <div className="image-profile">
          <img src={me} alt="me" />
        </div>
        <strong>Made with love💗 by Rajat Ranjan</strong>
      </div>

      <aside>
        <h3>Follow or Contact me</h3>
        <div className="socials">
          <a href="https://github.com/rajatranjan2710" target="blank">
            <FaGithub size={25} />
          </a>
          <a
            href="https://www.linkedin.com/in/rajatranjan2710/"
            target="blank"
            className="btns-footer"
          >
            <FaLinkedin size={25} />
          </a>
          <a href="https://www.instagram.com/rjt2710/" target="blank">
            <FaInstagram size={25} />
          </a>
        </div>
      </aside>
    </div>
  );
};

export default Footer;

// return (
//     <footer>

//     </footer>
