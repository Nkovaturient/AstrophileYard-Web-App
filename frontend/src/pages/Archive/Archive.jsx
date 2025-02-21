import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Archive.css'
import { storeContext } from '../../Context/storeContext';


const Archive = () => {

  const{url, token, loading, setLoading}=useContext(storeContext);
    const[res, setRes]=useState([]);
    
    
    let {id}= useParams();
    const navigate=useNavigate()

    const showData = async () => {
      
        try {
          setLoading(true);
          const response = await axios.get(`${url}/archive/${id}`);
          if (response.data.success) {
            console.log(response.data.archive)
            setRes(response.data.archive)
            setLoading(false);
            toast.info(`Showcasing ${response.data.archive.title}`, {
              autoClose: 5000,
              theme: "colored",
            });
          }
        } catch (err) {
          toast.error(`No Archive details was found`, {
            autoClose: 5000,
            theme: "colored",
          });
          navigate('/')
        }
      }

      // setImgUrl(res.image);
      // console.log(res.image);

      useEffect(()=>{
       showData()
       
      }, [])

  return (
    <>
    <div className="archive-item" id='archive-item'>
    <div className="card-operations">
          <div className="edit">
            <Link to={`/archive/${res._id}/edit`}  className='btn'>Edit</Link> 
          </div>
          <div className="delete">
          {/* <Link to={`/archive/${res._id}/delete`} className='btn'>Delete</Link>  */}
          </div>
        </div>

      <h2>{res.title}</h2>
          <div className="col-content">
            <div className="archive-card">
            {
              res.image && res.image.url && <img src={ `${res.image.url}`} loading="lazy" className="archive-card-image" alt={`${res.image.filename}`} />
            } 
              <div className="archive-card-body">
                <p className="archive-card-text caption">{res.caption}</p>
                <p className="archive-card-text description">{res.description}</p>
                <p className="archive-card-text facts">{res.facts}</p>
              </div>
            </div>
          </div>

        </div>

        
            </>
  )
}

export default Archive