import React, { useContext, useEffect, useState } from 'react'
import './Gallery.css'
import axios from 'axios'
import { storeContext } from '../../Context/storeContext'
import { toast } from 'react-toastify'
import GallerySlider from '../../components/GallerySlider/GallerySlider.jsx'
import Musicaly from '../Musicaly/Musicaly.jsx'
import Spinner from '../../components/Spinner/Spinner.jsx'

const Gallery = () => {
    const{url, loading, setLoading}=useContext(storeContext);
    const[image, setImage]=useState([]);

    const fetchData=async()=>{
        try{
            setLoading(true);
            const response=await axios.get(`${url}/archive/gallery`);
            setLoading(false)
            if(response.data.success){
                // console.log(response.data);
                setImage(response.data.data);
            }

        }catch(err){
            toast.error(`${err.message}`);
        }
       
    }

   
    useEffect(()=>{
        fetchData()
    }, [])

    if(loading){
        return <p>Loading..please wait</p>
    }

  return (
    <>
    <div className="misc-container">
    <div className='gallery'>
        <div className="gallery-header">
            <h2>Cosmic Gallery: <span>Gallerxy</span></h2>
            <p>Immerse yourself in this awe-inspiring photos from the observable corners of the galaxy, nebula, star clusters taken by astrophotographers around the world. </p>
            { loading ? <p>Loading..please wait</p> : ''}
        </div>
        
            {
                image.length && <GallerySlider image={image} />
            }
        
    </div>
    <div className="music-container">
        <Musicaly />

    </div>
    </div>
    </>
  )
}

export default Gallery