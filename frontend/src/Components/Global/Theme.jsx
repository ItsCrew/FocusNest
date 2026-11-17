import React, { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../Context/ThemeContext'

const Theme = () => {

    const { theme, setTheme } = useTheme();

    const isDark = 
    theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    
  const toggleTheme = () => {

    setTheme(isDark ? 'light' : 'dark')
  }

    const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className='fixed top-4 right-4 sm:top-5 sm:right-5 cursor-pointer select-none z-30 bg-white rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-300'
    >
      {isDark ? (
        <Sun color="#0f172a" size={36} className="sm:w-10 sm:h-10 hover:rotate-180 transition-all duration-300 ease"/>
      ) : (
        <Moon color="#0f172a" size={36} className="sm:w-10 sm:h-10 hover:scale-110 transition-all duration-200"/>
      )}
    </button>
  )
}

export default Theme