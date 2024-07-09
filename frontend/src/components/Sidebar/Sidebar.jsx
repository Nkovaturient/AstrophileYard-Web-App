import React, { useContext } from 'react'
import './Sidebar.css'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faHome, faImagePortrait, faSignature, faSignOut, faUpload, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { storeContext } from '../../Context/storeContext'
import { assets } from '../../assets/assets'
import Login from '../Login/Login'

const Sidebar = ({ setLoginPopup }) => {
  const { url, token } = useContext(storeContext);
  return (

    <div className='sidebar' id='sidebar'>
      <div className="sidebar-handle">
        <Link to='/'><img src={assets.logo_3} alt="hero-img" className="logo" /></Link>
        {/* <button><FontAwesomeIcon icon={faClose}/></button> */}
      </div>

      <div className="sidebar-options">
        <NavLink to='/' className="sidebar-option">
          <span><FontAwesomeIcon icon={faHome} /></span>
          <p>Home</p>
        </NavLink>
        <NavLink to={'/archive/new' } className="sidebar-option">
          <span><FontAwesomeIcon icon={faUpload} /></span>
          <p>Upload your Archive</p>
        </NavLink>
        <NavLink to='/archive/gallery' className="sidebar-option">
          <span><FontAwesomeIcon icon={faImagePortrait} /></span>
          <p>Gallery</p>
        </NavLink>
        {
          token
            ? <NavLink to={'/logout'} className="sidebar-option">
              <span><FontAwesomeIcon icon={faSignOut} /></span>
              <p>LogOut</p>
            </NavLink>
            : <NavLink onClick={() => setLoginPopup(true)} className="sidebar-option">
              <span><FontAwesomeIcon icon={faUserAstronaut} /></span>
              <p>Sign Up</p>
            </NavLink>
        }

      </div>
    </div>
  )
}

export default Sidebar