import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faImagePortrait, faSpaceShuttle } from '@fortawesome/free-solid-svg-icons'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { storeContext } from '../../Context/storeContext'
import Spinner from '../../components/Spinner/Spinner.jsx'

const EditArchive = () => {

    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        title: '',
        caption: '',
        description: '',
        image: '',
        facts: '',
    })

    

    const {url, token, loading, setLoading}=useContext(storeContext);
    const { id } = useParams();
    const navigate=useNavigate();

    const handleOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    useEffect(() => {
        setLoading(true);
        axios.get(`${url}/archive/${id}/edit`)
            .then((response) => {
                setLoading(false);
                const result = response.data.archive;

                setData({
                    title: result.title,
                    caption: result.caption,
                    description: result.description,
                    image: result.image,
                    facts: result.facts,
                })

            })
            .catch((err) => {
                toast.error(`something went wrong! ${err.message} `)
            })
    }, [])

   

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('caption', data.caption);
        formData.append('description', data.description);
        formData.append('facts', data.facts);
        if (image) {
            formData.append('image', image);
        } else {
            formData.append('image', data.image);
        }
        try {
           setLoading(true)
            const response = await axios.put(`${url}/archive/${id}`, formData, {   
                headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        setLoading(false)
            // console.log(response.data.archive);
            if(response.data.success){
                toast.success('Updated your Archive successfully!', {
                    autoClose: 5000,
                    theme: "colored",
                })
                navigate(`/archive/${id}`);

            }
        } catch (err) {
            toast.error(`${err.message}`, {
                autoClose: 5000,
                theme: "dark",
            });
        }
    }

    // console.log(data);


    return (
        <div className='add'>
            { loading ? <Spinner/> : ''}
            <form className='flex-col' onSubmit={handleOnSubmit} typeof='' >
                <div className="add-image-upload flex-col">
                    <p>Upload a New Image</p>
                    <label htmlFor="image">
                        {/* <img src={data.image} alt="defaultImage" style={{ width: '250px', height: '150px'}} /> */}
                        <img name='image'  src={image ? URL.createObjectURL(image) : data.image} alt="img" />
                    </label>
                    <input onChange={(e) => {  setImage(e.target.files[0])}}
                        type="file" id='image' hidden />
                        {/* <p>OR</p> */}
                        {/* <input type="text" placeholder='enter a URL/link' name='image' defaultValue={data.image}  /> */}
                </div>

                <div className="add-product-name flex-col">
                    <p>Title</p>
                    <input onChange={handleOnChange} value={data.title}
                        type="text" name='title' placeholder='enter here' />
                </div>

                <div className="add-product-name flex-col">
                    <p>Caption</p>
                    <input onChange={handleOnChange} value={data.caption}
                        type="text" name='caption' placeholder='enter a catchy caption ' />
                </div>

                <div className="add-product-description flex-col">
                    <p>Description</p>
                    <textarea onChange={handleOnChange} value={data.description}
                        name="description" rows='6' placeholder='describe your archive..' required></textarea>
                </div>


                <div className="add-product-description flex-col">
                    <p>Facts</p>
                    <textarea onChange={handleOnChange} value={data.facts}
                        name="facts" rows='6' placeholder='mention an astonishing fact about your archive..' required></textarea>
                </div>

                <button className='add-btn' type='submit'>Edit <FontAwesomeIcon icon={faEdit} /></button>
            </form>

        </div>
    )
}

export default EditArchive