import React, { useContext, useEffect, useState } from 'react'
import './ArchiveList.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import ArchiveItem from '../ArchiveItem/ArchiveItem.jsx'
import ApiData from '../APIData/ApiData.jsx';
import { Link } from 'react-router-dom';
import { storeContext } from '../../Context/storeContext.jsx';
import Spinner from '../Spinner/Spinner.jsx';


const ArchiveList = () => {

  const {url, token, result, apiData, loading, setLoading}=useContext(storeContext);

  // const [result, setResult] = useState([]);
  // const [apiData, setApiData] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${url}/archive`);
  //     if (response.data.success) {
  //       setResult(response.data.archives)
  //       console.log(response.data.archives);
  //       toast.success('Welcome to Astrophile Yard!');
  //     }
  //     else{
  //       toast.warning(`${err.message}`);
  //     }
  //     if(response.data.APIData){
  //       setApiData(response.data.APIData)
  //     } 

  //   } catch (err) {
  //     toast.error(`${err.message}`);
  //   }
  // }

  // useEffect(()=>{
  //   fetchData()
  // }, [])


  return (
    <>
    <div className="apod" id='apod'>
      <h2>APOD!</h2>
      {
        apiData && <ApiData copyright={apiData.copyright} date={apiData.date} description={apiData.explanation} title={apiData.title} media={apiData.media_type} url={apiData.url} />
      }
    </div>
    { loading ? <Spinner/> : ''}
    <br />
    <hr />
    <div className='archive-display' id='archive-display'>
      <h2>All Archives</h2>
      <div className="archive-display-list">
      {
          result.length && result.map((archive, index ) => {
            return(
              <ArchiveItem key={index} id={archive._id} title={archive.title} facts={archive.facts} description={archive.description} image={archive.image} caption={archive.caption}  />
            ) 
            
          })
        }
      </div>
    </div>
    </>
  )
}

export default ArchiveList