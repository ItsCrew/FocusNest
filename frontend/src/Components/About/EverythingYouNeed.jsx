import React from 'react'
import { Link } from 'react-router-dom'
import { Timer, CheckCircle2, Palette, ArrowRight, Sparkles } from 'lucide-react'
import { useAuth } from '../../Context/AuthContext'

const EverythingYouNeed = () => {
    const { isAuthenticated } = useAuth()
    const targetUrl = isAuthenticated ? '/home' : '/welcome'

    return (
        <section id='features' className='py-20 px-4 max-w-6xl mx-auto'>
            {/* Section Header */}
            <div className='text-center max-w-2xl mx-auto mb-14 flex flex-col gap-3'>
                <span className='text-xs font-bold uppercase tracking-wider dark:text-font-version-dark text-headings-light'>
                    Built For Deep Work
                </span>
                <h2 className='text-3xl sm:text-5xl font-bold tracking-tight dark:text-font-dark text-font-light'>
                    Everything you need. Nothing you don't.
                </h2>
                <p className='text-base sm:text-lg dark:text-neutral-300 text-neutral-600 leading-relaxed'>
                    A clutter-free productivity cockpit engineered to minimize distractions and keep you immersed in your craft.
                </p>
            </div>

            {/* 4-Column Feature Cards Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {/* Feature 1 */}
                <div className='flex flex-col p-6 sm:p-7 rounded-2xl border dark:border-headings-dark/30 border-headings-light/30 dark:bg-tasksbox-bg bg-white shadow-sm hover:shadow-md transition-shadow'>
                    <div className='w-12 h-12 rounded-xl dark:bg-background-version-dark bg-navigation-buttons-light text-headings-light dark:text-headings-dark flex items-center justify-center mb-5'>
                        <Timer size={24} />
                    </div>
                    <h3 className='text-lg sm:text-xl font-bold dark:text-font-dark text-font-light mb-2'>
                        Smart Pomodoro Timer
                    </h3>
                    <p className='text-sm dark:text-neutral-300 text-neutral-600 leading-relaxed'>
                        Switch between Deep Work, Short Break, and Long Break intervals. Auto-advance sessions, track 4-cycle pomodoros, and enjoy gentle completion chimes.
                    </p>
                </div>

                {/* Feature 2 */}
                <div id='why-pomodoro' className='flex flex-col p-6 sm:p-7 rounded-2xl border dark:border-headings-dark/30 border-headings-light/30 dark:bg-tasksbox-bg bg-white shadow-sm hover:shadow-md transition-shadow'>
                    <div className='w-12 h-12 rounded-xl dark:bg-background-version-dark bg-navigation-buttons-light text-headings-light dark:text-headings-dark flex items-center justify-center mb-5'>
                        <CheckCircle2 size={24} />
                    </div>
                    <h3 className='text-lg sm:text-xl font-bold dark:text-font-dark text-font-light mb-2'>
                        Priority Task Queue
                    </h3>
                    <p className='text-sm dark:text-neutral-300 text-neutral-600 leading-relaxed'>
                        Tag items with P0, P1, and P2 priority tags. Pin an active task directly to your timer display so you always know your next single objective.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className='flex flex-col p-6 sm:p-7 rounded-2xl border dark:border-headings-dark/30 border-headings-light/30 dark:bg-tasksbox-bg bg-white shadow-sm hover:shadow-md transition-shadow'>
                    <div className='w-12 h-12 rounded-xl dark:bg-background-version-dark bg-navigation-buttons-light text-headings-light dark:text-headings-dark flex items-center justify-center mb-5'>
                        <Palette size={24} />
                    </div>
                    <h3 className='text-lg sm:text-xl font-bold dark:text-font-dark text-font-light mb-2'>
                        Ambient Customization
                    </h3>
                    <p className='text-sm dark:text-neutral-300 text-neutral-600 leading-relaxed'>
                        Distraction-free dark mode, crisp light mode, solid background colors, and custom multi-angle gradient overlays tailored to your vibe.
                    </p>
                </div>

                {/* Feature 4: Coming Soon */}
                <div className='flex flex-col p-6 sm:p-7 rounded-2xl border border-dashed dark:border-headings-dark/50 border-headings-light/50 dark:bg-tasksbox-bg/70 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden'>
                    <div className='w-12 h-12 rounded-xl dark:bg-background-version-dark bg-navigation-buttons-light text-headings-light dark:text-headings-dark flex items-center justify-center mb-5'>
                        <Sparkles size={24} />
                    </div>
                    <div className='flex items-center gap-2 mb-2'>
                        <h3 className='text-lg sm:text-xl font-bold dark:text-font-dark text-font-light'>
                            More Coming Soon
                        </h3>
                    </div>
                    <p className='text-sm dark:text-neutral-300 text-neutral-600 leading-relaxed'>
                        Integrated scratchpad notes, ambient background soundscapes, customizable UI density (Compact vs. Comfy), and much more!
                    </p>
                </div>
            </div>

            {/* Bottom Call to Action Banner */}
            <div className='mt-20 sm:mt-28 p-8 sm:p-14 rounded-3xl border-2 dark:border-headings-dark/40 border-headings-light/30 dark:bg-tasksbox-bg bg-white text-center flex flex-col items-center gap-6 shadow-xl'>
                <span className='w-10 h-10 rounded-full dark:bg-background-version-dark bg-navigation-buttons-light text-headings-light dark:text-headings-dark flex items-center justify-center'>
                    <Sparkles size={20} />
                </span>
                <h3 className='text-2xl sm:text-4xl font-bold tracking-tight dark:text-font-dark text-font-light'>
                    Ready to reclaim your focus?
                </h3>
                <p className='text-base sm:text-lg dark:text-neutral-300 text-neutral-600 max-w-xl leading-relaxed'>
                    No subscriptions, no complex setup. Just open your browser, start your timer, and step into effortless flow.
                </p>
                <Link
                    to={targetUrl}
                    className='h-12 px-8 rounded-full text-base font-semibold dark:bg-headings-dark bg-headings-light hover:bg-[#34523b] dark:hover:bg-[#5e7f64] text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2'
                >
                    <span>Launch Focusnest</span>
                    <ArrowRight size={18} />
                </Link>
            </div>

            {/* Clean Minimal Footer */}
            <footer className='mt-20 pt-8 border-t dark:border-white/10 border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs dark:text-neutral-400 text-neutral-500'>
                <p>© {new Date().getFullYear()} Focusnest</p>
                <div className='flex items-center gap-6'>
                    <a href='#preview' className='hover:text-headings-dark transition-colors'>Preview</a>
                    <a href='#features' className='hover:text-headings-dark transition-colors'>Features</a>
                    <a href='https://github.com/ItsCrew/focusnest' target='_blank' rel='noopener noreferrer' className='hover:text-headings-dark transition-colors'>GitHub</a>
                    <Link to='/home' className='hover:text-headings-dark transition-colors'>App</Link>
                </div>
            </footer>
        </section>
    )
}

export default EverythingYouNeed