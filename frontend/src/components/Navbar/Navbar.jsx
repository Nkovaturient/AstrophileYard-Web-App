import React, { useContext, useState } from 'react'
import './Navbar.css';
import { Link, NavLink, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond, faMusic, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

  const [menu, setMenu]= useState("home");

  const navigate=useNavigate();
  
  return (
    <div className='navbar text-3xl text-blue-600'>  

    <ul className="navbar-menu">  {/**now smooth scroll in index.css in root css */}
      <Link to='/' onClick={ ()=> setMenu("home")} className={menu === "home" ? "active" : ""}  >Home</Link>
      <a href='#archive-display' onClick={ ()=> setMenu("archiveDisplay")} className={menu === "archiveDisplay" ? "active" : ""}>All Archives</a>
      <a href='#apod' onClick={ ()=> setMenu("apod")} className={menu === "apod" ? "active" : ""}>Astronomy Picture of the Day</a>
      <a href='#footer' onClick={ ()=> setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
    </ul>

    <div className="navbar-right">
    <button onClick={()=> navigate('/archive/musicaly')} ><FontAwesomeIcon icon={faMusic}/><p>Music</p></button>
        <div className="navbar-profile">
        <span><FontAwesomeIcon icon={faUserAstronaut}/></span>
          <ul className="nav-profile-dropdown">
         
             <li><FontAwesomeIcon icon={faDiamond}/><p>My AstroYard</p></li>   {/*onClick={()=> navigate('/archive/dashboard')} */}
            <hr />
            <li><small>Dashboard</small></li>
          </ul>
        </div>
      
      
    </div>
    </div>
  )
}

export default Navbar