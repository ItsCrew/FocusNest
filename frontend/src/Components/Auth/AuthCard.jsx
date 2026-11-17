import React from 'react'

const AuthCard = ({ children, className = '' }) => {
  return (
    <div
      className={`w-full max-w-110 px-7 py-8 sm:px-9 sm:py-10 rounded-[28px] border dark:border-[#4c6b54]/60 border-headings-light/30 dark:bg-[#25372c] bg-white shadow-2xl flex flex-col items-center text-center ${className}`}
    >
      {children}
    </div>
  )
}

export default AuthCard
