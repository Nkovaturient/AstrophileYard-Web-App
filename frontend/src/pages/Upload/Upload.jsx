import React, { useContext, useEffect, useState } from 'react'
import './Upload.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faSpaceShuttle } from '@fortawesome/free-solid-svg-icons'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { storeContext } from '../../Context/storeContext'

const Upload = () => {

  const {url, token}=useContext(storeContext);

  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    title: '',
    caption: '',
    description: '',
    image: '',
    facts: '',
  })
  const navigate=useNavigate();
 

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }


  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('caption', data.caption)
      formData.append('description', data.description)
      formData.append('facts', data.facts)
      formData.append("image", image)

      const response = await axios.post(`${url}/archive`, {headers: {token}}, formData)
      // console.log(response.data.archive);
      toast.success('Uploaded your Archive successfully!', {
        autoClose: 5000,
        theme: "colored",
      })
      navigate('/');


    } catch (err) {
      toast.error(`Couldnt upload your archive. Try to Login or register first! save this details in notepad as it might reload!`, {
        autoClose: 8000,
        theme: "dark",
      });
    }
  }

  // console.log(formData);
  // console.log(image);

  

  return (
    <div className='add'>
      <h3>Upload your Archive in your Astrophile Yard <FontAwesomeIcon icon={faImages}/></h3>
      <p>All Fields are mandatory.(*)</p> <br />
      <form className='flex-col' onSubmit={handleOnSubmit} encType="multipart/form-data" >
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="img" name='image' />
          </label>
          <input onChange={(e) => 
            setImage(e.target.files[0]) }
            type="file" id='image' hidden required />
        </div>

        <div className="add-product-name flex-col">
          <p>Title</p>
          <input onChange={handleOnChange} value={data.title}
            type="text" name='title' placeholder='enter here' required/>
        </div>

        <div className="add-product-name flex-col">
          <p>Caption</p>
          <input onChange={handleOnChange} value={data.caption}
            type="text" name='caption' placeholder='enter a catchy caption ' required />
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

        {/* <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Product Category</p>
                <select onChange={handleOnChange}
                    name="category" required>
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>Product Price</p>
                <input onChange={handleOnChange} value={data.price}
                    type="Number" name='price' placeholder='💲20' />

            </div>
        </div> */}

        <button className='add-btn' type='submit'>Upload <FontAwesomeIcon icon={faSpaceShuttle} /></button>
      </form>

    </div>
  )
}

export default Upload