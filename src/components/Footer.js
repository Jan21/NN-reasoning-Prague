import * as React from "react";
import { Link } from "gatsby";

import logo from "../img/logo.svg";
import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";
import linkedin from "../img/social/vimeo.svg"; // Using vimeo as LinkedIn for now

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer has-background-black has-text-white-ter">
      <div className="content has-text-centered">
        <img
          src={logo}
          alt="Conference Logo"
          style={{ width: "14em", height: "10em" }}
        />
      </div>
      <div className="content has-text-centered has-background-black has-text-white-ter">
        <div className="container has-background-black has-text-white-ter">
          <div style={{ maxWidth: "100vw" }} className="columns">
            <div className="column is-4">
              <section className="menu">
                <h3 className="has-text-weight-bold is-size-5">Navigation</h3>
                <ul className="menu-list">
                  <li>
                    <Link to="/" className="navbar-item">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to="/about">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to="/speakers">
                      Speakers
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to="/schedule">
                      Schedule
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to="/venue">
                      Venue
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
            <div className="column is-4">
              <section>
                <h3 className="has-text-weight-bold is-size-5">Conference Info</h3>
                <ul className="menu-list">
                  <li>
                    <Link className="navbar-item" to="/call-for-papers">
                      Call for Papers
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to="/registration">
                      Registration
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to="/blog">
                      News & Updates
                    </Link>
                  </li>
                  <li>
                    <a
                      className="navbar-item"
                      href="mailto:contact@conferencewebsite.com"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="navbar-item"
                      href="/admin/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Admin
                    </a>
                  </li>
                </ul>
              </section>
            </div>
            <div className="column is-4 social">
              <h3 className="has-text-weight-bold is-size-5">Follow Us</h3>
              <a title="twitter" href="https://twitter.com" className="social-icon mr-3">
                <img
                  className="fas fa-lg"
                  src={twitter}
                  alt="Twitter"
                  style={{ width: "1.5em", height: "1.5em" }}
                />
              </a>
              <a title="facebook" href="https://facebook.com" className="social-icon mr-3">
                <img
                  src={facebook}
                  alt="Facebook"
                  style={{ width: "1.5em", height: "1.5em" }}
                />
              </a>
              <a title="instagram" href="https://instagram.com" className="social-icon mr-3">
                <img
                  src={instagram}
                  alt="Instagram"
                  style={{ width: "1.5em", height: "1.5em" }}
                />
              </a>
              <a title="linkedin" href="https://linkedin.com" className="social-icon">
                <img
                  src={linkedin}
                  alt="LinkedIn"
                  style={{ width: "1.5em", height: "1.5em" }}
                />
              </a>
              <div className="mt-5">
                <p>© {currentYear} Conference Name.</p>
                <p className="is-size-7">All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
