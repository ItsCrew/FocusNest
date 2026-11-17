import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '../../Context/AuthContext'
import PreviewImage from '../../assets/preview.png'

const Intro = () => {
    const { isAuthenticated } = useAuth()
    const targetUrl = isAuthenticated ? '/home' : '/welcome'

    return (
        <section className='pt-12 sm:pt-20 pb-16 px-4 flex flex-col items-center text-center overflow-hidden'>
            {/* Main Hero Header */}
            <div className='max-w-4xl mx-auto flex flex-col items-center gap-6'>
                <div className='flex flex-col items-center gap-3'>
                    <blockquote className='text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight dark:text-font-dark text-font-light leading-[1.15] text-center'>
                        “You don’t rise to the level of your goals. You fall to the level of your systems.”
                    </blockquote>
                    <p className='text-sm sm:text-base font-semibold dark:text-font-version-dark text-headings-light tracking-wide uppercase'>
                        — James Clear, <span className='normal-case italic opacity-85'>Atomic Habits</span>
                    </p>
                </div>

                <p className='text-base sm:text-xl dark:text-neutral-300 text-neutral-600 max-w-2xl leading-relaxed text-center mt-1'>
                    <span className='font-semibold dark:text-font-dark text-font-light'>FocusNest is a simple system for your daily work.</span> Timed 25-minute focus blocks, clear task priorities, and automatic breaks designed to build consistency without burnout.
                </p>

                {/* Pill Button Group */}
                <div className='flex flex-wrap items-center justify-center gap-3 mt-3'>
                    <Link
                        to={targetUrl}
                        className='h-11 sm:h-12 px-6 sm:px-7 rounded-full text-sm sm:text-base font-semibold dark:bg-headings-dark bg-headings-light hover:bg-[#34523b] dark:hover:bg-[#5e7f64] text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2'
                    >
                        <span>Start Focusing</span>
                        <ArrowRight size={17} />
                    </Link>
                    <a
                        href='#features'
                        className='h-11 sm:h-12 px-6 sm:px-7 rounded-full text-sm sm:text-base font-semibold border dark:border-white/15 border-black/15 dark:text-font-dark text-font-light hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 flex items-center justify-center'
                    >
                        Explore features
                    </a>
                </div>
            </div>

            {/* Real App Screenshot Preview */}
            <div id='preview' className='w-full max-w-5xl mt-14 sm:mt-20 px-2 sm:px-6'>
                <div className='rounded-2xl sm:rounded-3xl border-2 dark:border-headings-dark/40 border-headings-light/30 shadow-2xl overflow-hidden'>
                    <img
                        src={PreviewImage}
                        alt="FocusNest Interface Preview"
                        className='w-full h-auto block object-cover'
                    />
                </div>
            </div>
        </section>
    )
}

export default Intro