import React from 'react'
import Navbar from './Navbar'
import Intro from './Intro'
import EverythingYouNeed from './EverythingYouNeed'

const Page = () => {
  return (
    <div className='min-h-screen w-full'>
      <Navbar />
      <Intro />
      <EverythingYouNeed />
    </div>
  )
}

export default Page