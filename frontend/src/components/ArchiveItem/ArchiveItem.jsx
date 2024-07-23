import React, { useContext, useEffect, useState } from 'react'
import './ArchiveItem.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import Archive from '../../pages/Archive/Archive';
import { storeContext } from '../../Context/storeContext';

const ArchiveItem = ({id, title, image, caption, description, facts}) => {

    const {url}=useContext(storeContext);
   

  return (
    <>
    <div className="archive-item" id='archive-item'>
    <Link to={`/archive/${id}`} >
          <div className="col">
            <div className="card card-index" style={{"width": "20rem" }}>
              <img src={`${image.url}`} loading="lazy" className="card-img-top" alt={`${image.filename}`} style={{"height": "20rem"}} />
              <div className="card-body card-img-overlay">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{caption}</p>
              </div>
            </div>
          </div>
        </Link>
        </div>
    </>
  )
}

export default ArchiveItem