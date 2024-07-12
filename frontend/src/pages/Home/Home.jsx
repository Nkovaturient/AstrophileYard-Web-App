import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import ArchiveList from '../../components/ArchiveList/ArchiveList'

const Home = () => {
  return (
    <>
    <div className='home'>
    <Navbar />
    <Header />
    <ArchiveList />
      </div>
      
    </>
  )
}

export default Home