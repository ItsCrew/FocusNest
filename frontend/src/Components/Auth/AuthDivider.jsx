import React from 'react'

const AuthDivider = ({ text = 'or' }) => {
  return (
    <div className='relative w-full my-6 flex items-center justify-center'>
      <div className='absolute inset-0 flex items-center'>
        <div className='w-full border-t dark:border-[#3e5645] border-black/10' />
      </div>
      <span className='relative px-3 dark:bg-[#25372c] bg-white text-xs dark:text-[#82a088] text-neutral-500 font-normal'>
        {text}
      </span>
    </div>
  )
}

export default AuthDivider
