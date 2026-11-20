import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import Theme from '../Components/Global/Theme'
import AuthCard from '../Components/Auth/AuthCard'
import AuthHeader from '../Components/Auth/AuthHeader'
import GoogleButton from '../Components/Auth/GoogleButton'
import AuthFeatures from '../Components/Auth/AuthFeatures'
import { ArrowLeft } from 'lucide-react'

const SignIn = () => {
  const { isAuthenticated, loading, login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/tasks', { replace: true })
    }
  }, [isAuthenticated, loading, navigate])

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1)
    } else {
      navigate('/home')
    }
  }

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center p-4 relative dark:bg-[#1e2d24] bg-background-light'>
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
          title="Sign in required"
          subtitle="Sign in to save, organize, and sync your tasks across devices"
        />

        <GoogleButton onClick={login} />

        <AuthFeatures />
      </AuthCard>
    </div>
  )
}

export default SignIn
