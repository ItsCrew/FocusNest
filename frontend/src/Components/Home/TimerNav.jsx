import React from 'react'
import { useState } from 'react'
import { useTimer } from '../../Context/TimerContext';

const Timer = ({activeButton, handleMode}) => {

    const {mode, changeMode} = useTimer();

  const getBtnClass = (targetMode) => {
    const isActive = mode === targetMode
    const base = 'h-11 sm:h-13.75 px-3 sm:w-30 rounded-xl sm:rounded-2xl text-xs sm:text-base cursor-pointer hover:-translate-y-1.25 transition-all duration-300 ease font-medium'
    if (isActive) {
      return `${base} dark:bg-buttonsfocus-bg dark:text-black bg-headings-light text-white shadow-md font-semibold`
    }
    return `${base} dark:bg-white dark:text-black bg-white text-font-light border border-headings-light/30 dark:border-transparent shadow-xs hover:bg-neutral-50 dark:hover:bg-gray-100`
  }

  return (
    <div className='flex justify-center items-center w-full px-2'>
      <div className='flex justify-center items-center gap-1.5 sm:gap-3'>
        <button
          type='button'
          onClick={() => changeMode('pomodoro')}
          title='Switch to Deep Work timer (25 min)'
          aria-label='Switch to Deep Work timer'
          className={getBtnClass('pomodoro')}
        >
          Deep Work
        </button>
        <button
          type='button'
          onClick={() => changeMode('shortBreak')}
          title='Switch to Short Break timer (5 min)'
          aria-label='Switch to Short Break timer'
          className={getBtnClass('shortBreak')}
        >
          Short Break
        </button>
        <button
          type='button'
          onClick={() => changeMode('longBreak')}
          title='Switch to Long Break timer (10 min)'
          aria-label='Switch to Long Break timer'
          className={getBtnClass('longBreak')}
        >
          Long Break
        </button>
      </div>
    </div>
  )
}

export default Timer