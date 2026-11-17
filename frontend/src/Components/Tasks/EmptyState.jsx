import React from 'react'

const EmptyState = ({ onAddClick }) => {
  return (
    <div className='flex flex-1 flex-col items-center justify-center space-y-4'>
      <p className='dark:text-white text-font-light text-xl sm:text-[23px] font-bold tracking-wide text-center px-4'>
        Nothing here. Add a task
      </p>
      <button 
        type="button"
        onClick={onAddClick} 
        title="Add your first task"
        aria-label="Add your first task"
        className='h-11.25 w-25 dark:bg-headings-dark bg-headings-light hover:bg-[#34523b] dark:hover:bg-[#5e7f64] active:scale-95 hover:scale-105 text-white font-medium rounded-[10px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200 cursor-pointer flex items-center justify-center text-base'
      >
        Add
      </button>
    </div>
  )
}

export default EmptyState