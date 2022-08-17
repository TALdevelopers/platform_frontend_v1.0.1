import React from 'react'
import Banner from '../components/banner/Banner'
import VideoPlayer from '../components/videoPlayer/VideoPlayer'
import PopWindow from '../components/popWindow/PopWindow'


const Home = () => {
  return (
    <>
      <Banner/>
      <VideoPlayer />   
      <PopWindow />
    </>
  )
}

export default Home