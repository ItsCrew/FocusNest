import React from 'react'
import { Link } from 'react-router-dom'
import FocusNestLogo from './FocusNestLogo'

const AuthHeader = ({ title, subtitle }) => {
  return (
    <>
      {/* Top Logo & FocusNest Brand */}
      <Link to='/' className='flex flex-col items-center gap-1 group cursor-pointer'>
        <FocusNestLogo className='w-12 h-11 text-[#72b093] group-hover:scale-105 transition-transform' />
        <span className='font-semibold text-[17px] tracking-wide dark:text-white text-font-light'>
          FocusNest
        </span>
      </Link>

      {/* Headings */}
      <h1 className='text-2xl sm:text-[27px] font-bold dark:text-white text-font-light tracking-tight mt-6 mb-2'>
        {title}
      </h1>
      <p className='text-sm sm:text-[15px] dark:text-[#9bb8a2] text-neutral-600 font-normal mb-7 max-w-xs'>
        {subtitle}
      </p>
    </>
  )
}

export default AuthHeader
