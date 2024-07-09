import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { storeContext } from '../../Context/storeContext';

const DeleteArchive = () => {
    const {id}=useParams();
    const[loading, setLoading]=useState(false);
    const navigate=useNavigate()

    const {url, token}=useContext(storeContext);

    useEffect(() => {
        setLoading(true);
        axios.delete(`${url}/archive/${id}`, {headers: {token}})
            .then((response) => {
                setLoading(false);
                const result = response.data.archive;
                toast.success(`Deleted ${response.data.archive.title} Archive!`)
                navigate('/')
            })
            .catch((err) => {
                toast.error(`something went wrong! ${err.message} `)
            })
    }, [])

    if(loading){
        return <p>loading...</p>
    }
  return (
    <div>DeleteArchive</div>
  )
}

export default DeleteArchive