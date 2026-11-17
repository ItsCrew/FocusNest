import React, { useState } from 'react'
import Timer from '../Components/Home/TimerNav'
import TimerDisplay from '../Components/Home/TimerDisplay'
import ActiveTask from '../Components/Home/ActiveTask'
import TimerControls from '../Components/Home/TimerControls'

const Home = () => {


  return (
    <div className='min-h-screen flex flex-col justify-center items-center py-10 px-4'>
      <div className='flex flex-col items-center w-full max-w-md'>
        <Timer/>
        <TimerDisplay/>
        <ActiveTask/>
        <TimerControls/>
      </div>
    </div>
  )
}

export default Home