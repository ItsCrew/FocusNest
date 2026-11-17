import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import Theme from '../Components/Global/Theme'
import AuthCard from '../Components/Auth/AuthCard'
import AuthHeader from '../Components/Auth/AuthHeader'
import GoogleButton from '../Components/Auth/GoogleButton'
import AuthDivider from '../Components/Auth/AuthDivider'
import AuthFeatures from '../Components/Auth/AuthFeatures'
import { User, ArrowLeft } from 'lucide-react'

const Welcome = () => {
  const { isAuthenticated, loading, login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/home', { replace: true })
    }
  }, [isAuthenticated, loading, navigate])

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center p-4 relative dark:bg-[#1e2d24] bg-background-light'>
      <Theme />

      {/* Top Left Back Navigation */}
      <button
        type='button'
        onClick={handleGoBack}
        className='absolute top-6 left-6 flex items-center gap-2 text-sm font-medium dark:text-[#9bb8a2] text-neutral-600 hover:dark:text-white hover:text-black transition-colors cursor-pointer'
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      <AuthCard>
        <AuthHeader
          title="Welcome to FocusNest"
          subtitle="Your productivity companion for focused work"
        />

        <GoogleButton onClick={login} />

        <AuthDivider />

        <Link
          to='/home'
          className='w-full h-12 rounded-xl border dark:border-[#4c6b54] border-black/20 dark:hover:bg-[#4c6b54]/20 hover:bg-black/5 dark:text-[#c7dfcd] text-font-light font-medium text-[15px] flex items-center justify-center gap-1 transition-all'
        >
          <User size={18} className='dark:text-[#9bb8a2] text-neutral-600' />
          <span>Continue as Guest</span>
        </Link>

        <AuthFeatures />
      </AuthCard>
    </div>
  )
}

export default Welcome
