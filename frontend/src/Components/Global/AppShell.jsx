import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Theme from './Theme'

const SIDEBAR_WIDTH = '18rem'

const AppShell = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem('Sidebar')
    if (savedState !== null) return savedState === 'true'
    return typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  })

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const nextState = !prev
      localStorage.setItem('Sidebar', String(nextState))
      return nextState
    })
  }

  return (
    <div className='relative min-h-screen w-full overflow-x-hidden'>
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <Theme />
      <main
        className={`min-h-screen transition-all duration-300 w-full ${
          isSidebarOpen ? 'md:ml-72 md:w-[calc(100%-18rem)]' : 'ml-0 w-full'
        }`}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default AppShell 
