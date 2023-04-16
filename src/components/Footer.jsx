import React from 'react';
import '../css/footer.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { FaFacebook, FaTwitter, FaGooglePlus, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <h4>About Market First</h4>
                        <p>We are an online marketplace that connects buyers and sellers of various products. Our mission is to provide a platform that is easy to use, reliable, and secure for everyone.</p>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <h4>Contact Us</h4>
                        <ul className="contact">
                            <li><i className="fa fa-map-marker"></i>123 Market St, San Francisco, CA</li>
                            <li><i className="fa fa-phone"></i>+1 123-456-7890</li>
                            <li><i className="fa fa-envelope"></i>info@marketfirst.com</li>
                        </ul>
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <h4>Stay Connected</h4>
                        <ul className="social">
                            <li><a href="#"><FaFacebook /></a></li>
                            <li><a href="#"><FaTwitter /></a></li>
                            <li><a href="#"><FaGooglePlus /></a></li>
                            <li><a href="#"><FaLinkedin /></a></li>
                            <li><a href="#"><FaInstagram /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
