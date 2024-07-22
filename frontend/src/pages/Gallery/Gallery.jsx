import React, { useContext, useEffect, useState } from 'react'
import './Gallery.css'
import axios from 'axios'
import { storeContext } from '../../Context/storeContext'
import { toast } from 'react-toastify'
import GallerySlider from '../../components/GallerySlider/GallerySlider.jsx'
import Musicaly from '../Musicaly/Musicaly.jsx'
import Spinner from '../../components/Spinner/Spinner.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCameraAlt, faCompass, faSatellite, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'

const Gallery = () => {
    const{url, loading, image}=useContext(storeContext);
    // const[image, setImage]=useState([]);

    // const fetchData=async()=>{
    //     try{
    //         setLoading(true);
    //         const response=await axios.get(`${url}/archive/gallery`);
    //         setLoading(false)
    //         if(response.data.success){
    //             // console.log(response.data);
    //             setImage(response.data.data);
    //         }

    //     }catch(err){
    //         toast.error(`${err.message}`);
    //     }
       
    // }

   
    // useEffect(()=>{
    //     fetchData()
    // }, [])

    if(loading){
        return <p>Loading..please wait</p>
    }

  return (
    <>
    <div className="misc-container">
    <div className='gallery'>
        <div className="gallery-header">
            <h2><FontAwesomeIcon icon={faStarHalfStroke}/> Cosmic Gallery: &nbsp; <span>Gallerxy </span> <FontAwesomeIcon icon={faStarHalfStroke}/></h2>
            <p>Immerse yourself in this awe-inspiring photos from the observable corners of the galaxy, nebula, star clusters taken by astrophotographers around the world. </p>
            { loading ? <p>Loading..please wait</p> : ''}
        </div>
        
            {
                image.length && <GallerySlider image={image} />
            }
        
    </div>
    <div className="grid-gallery">
       <div className="grid-items">
        <div className="grid-cards" id='card1'>
            <div className="content-overlay">
                <h5>Milkyway Photography</h5>
                <p>June 17, 2024</p>
            </div>
        </div>
        <div className="grid-cards" id='card2'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
        </div>
        <div className="grid-cards" id='card3'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
        </div>
        <div className="grid-cards" id='card4'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
            
        </div>
        <div className="grid-cards" id='card5'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
            
        </div>
        <div className="grid-cards" id='card6'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
            
        </div>
        <div className="grid-cards" id='card7'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
            
        </div>
        <div className="grid-cards" id='card8'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
        </div>
        <div className="grid-cards" id='card9'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
        </div>
        <div className="grid-cards" id='card10'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
        </div>
        <div className="grid-cards" id='card11'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
        </div>
        <div className="grid-cards" id='card12'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
        </div>
        <div className="grid-cards" id='card13'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
        </div>
        <div className="grid-cards" id='card14'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
        </div>
        <div className="grid-cards" id='card15'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
        </div>
        <div className="grid-cards" id='card16'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
        </div>
        <div className="grid-cards" id='card17'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
        </div>
        <div className="grid-cards" id='card18'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
        </div>
        <div className="grid-cards" id='card19'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
        </div>
        <div className="grid-cards" id='card20'>
            <div className="content-overlay">
                <h5>title</h5>
                <p>Lorem ipsum dolor sit, amet consectetu Numquam dolores accusantium voluptas at.</p>
            </div>
        </div>
        </div>
        {/* <div className="pagination">
            <button className="prev">Previous</button>
            <span className="page-numbers">
                1
            </span>
            <span className="page-numbers">
                2
            </span>
            <span className="page-numbers">
                3
            </span>
            <button className="next">Next</button>
        </div> */}
        
    </div>
    <div className="info">
        <div className="info-header">
            <h5>Curious to know more? Check out this amazing webs for mindblowing info and daily updates.</h5>
            <em>The Internet abounds with information. Its the curiousity and desire to learn thats scarce.</em>
        </div>
        <div className="info-links">
            <a href="https://www.lpi.usra.edu/education/skytellers/constellations/ ">Constellations Cast <FontAwesomeIcon icon={faCompass}/></a>
            <a href="https://www.amnh.org/exhibitions/journey-to-the-stars/educator-resources/stars/olbers-paradox#:~:text=In%201823%2C%20the%20German%20astronomer,beyond%20a%20sufficiently%20great%20distance.">Why is the sky dark at night? <FontAwesomeIcon icon={faSatellite}/></a>
            <a href="https://welcome.astrobin.com">Astrophotographers Astrobin <FontAwesomeIcon icon={faCameraAlt}/></a>
        </div>

    </div>
    </div>
    </>
  )
}

export default Gallery