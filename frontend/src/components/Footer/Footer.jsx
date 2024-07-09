import React from 'react'
import './Footer.css';
import { assets } from '../../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCat, faSpaceShuttle, faStarOfLife, faX, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo_3} className='logo' alt="logo" />
                <p>To the mind that is still, the whole universe surrenders!<FontAwesomeIcon icon={faStarOfLife}/></p>
                <div className="footer-social-icons">
                    <span className="github"><FontAwesomeIcon icon={faCat}/> </span>
                    <img src={assets.linkedIn_icon} alt="linked" />
                    <img src={assets.twitter_icon} alt="twitter" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Astrophile Yard</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Sci-Quotes</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li><a href="https://github.com/Nkovaturient"></a>Github</li>
                    <li>misc4nk@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 &copy; Nk711 - All Rights Reserved.</p>

    </div>
  )
}

export default Footer