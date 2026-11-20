import React from 'react'
import Page from './Components/About/Page'
import AppShell from './Components/Global/AppShell'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Tasks from './Pages/Tasks'
import Soon from './Pages/Soon'
import Settings from './Pages/Settings'
import Appearance from './Pages/Appearance'
import Welcome from './Pages/Welcome'
import SignIn from './Pages/SignIn'
import { useTheme } from './Context/ThemeContext'
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  const { bgType } = useTheme();
  const isCustomBg = bgType !== 'none';
  return (
    <div className={`min-h-screen w-full font-sans dark:text-font-dark text-font-light ${isCustomBg ? 'bg-transparent' : 'dark:bg-background-dark bg-background-light'}`}>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route element={<AppShell />}>
          <Route path='/home' element={<Home />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/notes' element={<Soon />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/appearance' element={<Appearance />} />
        </Route>
      </Routes>
      <Analytics />
    </div>
  )
}

export default App