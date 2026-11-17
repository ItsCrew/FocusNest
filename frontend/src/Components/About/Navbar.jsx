import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '../../Context/AuthContext'

const GithubIcon = ({ size = 20, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
)

const Navbar = () => {
    const { isAuthenticated } = useAuth()
    const targetUrl = isAuthenticated ? '/home' : '/welcome'

    return (
        <header className='sticky top-0 z-40 backdrop-blur-md dark:bg-background-dark/85 bg-background-light/85 border-b dark:border-white/10 border-black/5 transition-colors'>
            <div className='max-w-6xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between'>
                {/* Brand & Left Links */}
                <div className='flex items-center gap-6 sm:gap-10'>
                    <Link to='/' className='flex items-center gap-2 cursor-pointer font-bold text-xl sm:text-2xl tracking-tight dark:text-font-dark text-font-light'>
                        <span>Focusnest</span>
                        <span className='text-[11px] font-semibold px-2 py-0.5 rounded-full dark:bg-background-version-dark bg-navigation-buttons-light dark:text-font-version-dark text-font-light border dark:border-border-version-dark border-headings-light/30'>
                            v2.2
                        </span>
                    </Link>
                    <nav className='hidden md:flex items-center gap-6 text-sm font-medium dark:text-neutral-300 text-neutral-600'>
                        <a href='#features' className='hover:text-headings-dark transition-colors'>Features</a>
                        <a href='#why-pomodoro' className='hover:text-headings-dark transition-colors'>Why Focusnest</a>
                        <a href='#preview' className='hover:text-headings-dark transition-colors'>Preview</a>
                    </nav>
                </div>

                {/* Right Links & CTA */}
                <div className='flex items-center gap-3 sm:gap-4'>
                    <a
                        href='https://github.com/ItsCrew/focusnest'
                        target='_blank'
                        rel='noopener noreferrer'
                        title='GitHub Repository'
                        aria-label='GitHub Repository'
                        className='p-2 rounded-full dark:text-neutral-300 text-neutral-600 hover:text-headings-dark transition-colors'
                    >
                        <GithubIcon size={20} />
                    </a>
                    <Link
                        to={targetUrl}
                        className='flex items-center gap-1.5 h-9.5 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-semibold dark:bg-headings-dark bg-headings-light hover:bg-[#34523b] dark:hover:bg-[#5e7f64] text-white shadow-sm hover:scale-105 active:scale-95 transition-all duration-200'
                    >
                        <span>Launch App</span>
                        <ArrowRight size={15} />
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar