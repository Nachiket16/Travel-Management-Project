import React from 'react'
import '../styles/home.css'
import Cards from './Cards'
const Home = () => {
  return (
    <>
      <div className='home-container'>
        <video src='/videos/video-1.mp4' autoPlay loop muted />
        <h1>Start Your Journey</h1>
        <p>What are you waiting for ?</p>
      </div>
      <div className='cards'>
        <Cards />
      </div>
    </>
  )
}

export default Home
