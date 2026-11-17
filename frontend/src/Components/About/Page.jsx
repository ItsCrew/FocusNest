import React from 'react'
import Navbar from './Navbar'
import Intro from './Intro'
import EverythingYouNeed from './EverythingYouNeed'
import Theme from '../Global/Theme'

const Page = () => {
  return (
    <div className='min-h-screen w-full'>
      <Theme />
      <Navbar />
      <Intro />
      <EverythingYouNeed />
    </div>
  )
}

export default Page