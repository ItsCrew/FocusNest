import React from 'react'
import { Clock, ListChecks, Palette } from 'lucide-react'

const AuthFeatures = () => {
  return (
    <>
      {/* Bottom Horizontal Line */}
      <div className='w-full border-t dark:border-[#3e5645] border-black/10 my-6' />

      {/* Bottom 3 Feature Highlights */}
      <div className='grid grid-cols-3 gap-3 w-full text-center'>
        <div className='flex flex-col items-center'>
          <Clock size={20} className='dark:text-[#9bb8a2] text-headings-light' />
          <span className='text-[11px] sm:text-xs dark:text-[#9bb8a2] text-neutral-600 leading-tight mt-1.5'>
            Pomodoro Timer
          </span>
        </div>
        <div className='flex flex-col items-center'>
          <ListChecks size={20} className='dark:text-[#9bb8a2] text-headings-light' />
          <span className='text-[11px] sm:text-xs dark:text-[#9bb8a2] text-neutral-600 leading-tight mt-1.5'>
            Task Management
          </span>
        </div>
        <div className='flex flex-col items-center'>
          <Palette size={20} className='dark:text-[#9bb8a2] text-headings-light' />
          <span className='text-[11px] sm:text-xs dark:text-[#9bb8a2] text-neutral-600 leading-tight mt-1.5'>
            Custom Themes
          </span>
        </div>
      </div>
    </>
  )
}

export default AuthFeatures
