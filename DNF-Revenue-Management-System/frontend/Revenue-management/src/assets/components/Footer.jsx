import React from 'react';
import "./Footer.css"


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              sed diam eget risus varius blandit sit amet non magna.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-inline social-icons">
              <li>
                <a href="#" className="social-icon">Facebook
                <i class="bi bi-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" className="social-icon">Twitter
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" className="social-icon">Instagram
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" className="social-icon">Linkedin
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="copyright">
              © {new Date().getFullYear()} My Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;