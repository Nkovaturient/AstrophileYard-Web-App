import React, { useState } from 'react'
import './GallerySlider.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight, faCopyright } from '@fortawesome/free-solid-svg-icons';

const GallerySlider = ({image}) => {
    let[currSlide, setCurrSlide]=useState(0);

    const handlePrevSlide=()=>{
        setCurrSlide( currSlide=== 0 ? image.length - 1 : currSlide - 1 )
    }
    const handleNextSlide=()=>{
        setCurrSlide( currSlide=== image.length - 1 ? 0 : currSlide + 1 )
    }
  return (
    <>
    <div className="gallery-slider-container">
    <p style={{textAlign: 'right', }}><span><FontAwesomeIcon  icon={faCopyright}/></span> Jeffbax</p>
    <div className='gallery-slider' >
       <FontAwesomeIcon icon={faChevronCircleLeft} onClick={handlePrevSlide} className='arrow arrow-left' />
       {
        image.map((item, index)=>{
          return (<>
            <img src={item.url_hd} alt={item.title} key={item.id}  
            className={ currSlide === index ? 'current-image' : 'current-image hide'} />
            {/* <div className="card-overlay">
            <p className='title'>{item.title}</p>
            </div> */}
            </>
          ) 
        })
       }
       <FontAwesomeIcon icon={faChevronCircleRight} onClick={handleNextSlide} className='arrow arrow-right' />
    </div>
    </div>
    </>
  )
}

export default GallerySlider