import React from 'react'

const FocusNestLogo = ({ className = 'w-11 h-10 text-[#72b093] dark:text-[#72b093]' }) => {
  return (
    <svg
      viewBox='0 0 48 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      {/* Clock Circle */}
      <circle
        cx='24'
        cy='17'
        r='9'
        stroke='currentColor'
        strokeWidth='2.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      {/* Clock Hands (12:10) */}
      <path
        d='M24 12V17L27 18.5'
        stroke='currentColor'
        strokeWidth='2.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      {/* Inner Nest Layer */}
      <path
        d='M13 23C15.5 27 32.5 27 35 23'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      {/* Middle Nest Layer */}
      <path
        d='M9 24.5C12 32.5 36 32.5 39 24.5'
        stroke='currentColor'
        strokeWidth='2.2'
        strokeLinecap='round'
      />
      {/* Outer Nest Base */}
      <path
        d='M11 29C14 36.5 34 36.5 37 29'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  )
}

export default FocusNestLogo
