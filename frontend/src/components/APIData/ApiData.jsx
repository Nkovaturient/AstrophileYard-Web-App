import React from 'react'
import './ApiData.css'

const ApiData = ({date,copyright, description, media, url, title}) => {
  return (
    <div className='api-data'>
      <div className="api-data-head">
      <em>{date}</em> 
      <b>©{copyright}</b>
      </div>
        <br />
        {
            media === 'video' 
            ? <iframe src={url}></iframe>
            : media === 'image'
            ? <img src={url} alt="apod" loading='lazy' />
            : 'loading..sit back and grab ur coffee!'
        }
        <h4>{title}</h4>
        <p>{description}</p>

    </div>
  )
}

export default ApiData