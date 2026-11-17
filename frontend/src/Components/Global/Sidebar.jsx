import React from 'react'
import { Link, Links } from 'react-router-dom'
import { Menu, LogOut } from 'lucide-react'
import { useAuth } from '../../Context/AuthContext'
import GoogleLogo from '../../assets/google.svg'


const Sidebar = ({ isOpen, onToggle }) => {
    const { user, isAuthenticated, loading, login, logout } = useAuth()

    const navButtonClass = 'dark:bg-navigation-buttons-dark bg-navigation-buttons-light text-font-light dark:text-black cursor-pointer w-50 h-9.5 rounded-full flex items-center justify-center dark:hover:bg-navigation-hover-dark hover:bg-navigation-hover-light transition-all duration-300 ease dark:hover:text-font-dark hover:text-font-light hover:-translate-y-1.25 font-semibold'

    const handleNavClick = () => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            onToggle()
        }
    }

    return (
        <>
            {isOpen && (
                <div
                    onClick={onToggle}
                    className='fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs transition-opacity cursor-pointer'
                />
            )}
            <div className='fixed top-0 left-0 z-50 flex py-4 px-4 items-start pointer-events-none'>
                <div className={`flex flex-col gap-6 h-[95vh] items-center text-lg dark:bg-navbg-dark bg-white rounded-2xl transition-all duration-300 ease-in-out overflow-hidden shadow-2xl pointer-events-auto

                    ${isOpen
                        ? 'w-64 px-8 py-6 border-2 dark:border-headings-dark border-headings-light/40 opacity-100 visible'
                        : 'w-0 px-0 py-6 border-0 opacity-0 pointer-events-none invisible'
                    }`}
                >
                    <div className='h-full justify-between w-48 flex flex-col items-center gap-6'>
                        <div>
                            <div className='flex flex-col justify-center items-center font-semibold gap-0.5'>
                                <Link onClick={handleNavClick} title="Focusnest" className='cursor-pointer dark:text-white text-font-light hover:text-headings-light dark:hover:text-headings-dark transition-colors' to='/'>Focusnest</Link>
                                <p className='text-xs dark:bg-background-version-dark bg-navigation-buttons-light px-2.5 py-1 rounded-full dark:text-font-version-dark text-font-light border dark:border-border-version-dark border-headings-light/30'>v2.2.1</p>
                                <hr className='w-26 mt-2 dark:border-white/20 border-neutral-200' />
                            </div>
                            <div className='flex flex-col gap-7 justify-center items-center py-2 text-base font-semibold'>
                                <Link onClick={handleNavClick} title="Home" className={navButtonClass} to='/home'>Home</Link>
                                <Link onClick={handleNavClick} title="Tasks" className={navButtonClass} to='/tasks'>Tasks</Link>
                                <Link onClick={handleNavClick} title="Notes" className={navButtonClass} to='/notes'>Notes</Link>
                                <Link onClick={handleNavClick} title="Appearance" className={navButtonClass} to='/appearance'>Appearance</Link>
                                <Link onClick={handleNavClick} title="Settings" className={navButtonClass} to='/settings'>Settings</Link>
                            </div>
                        </div>
                    <div className='flex flex-col justify-center items-center py-2 text-base font-semibold'>
                        {isAuthenticated ? (
                            <div className='flex flex-col items-center w-50 gap-2.5'>
                                <div className='flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl dark:bg-background-version-dark bg-item-bg-light border dark:border-border-version-dark/50 border-headings-light/30 shadow-2xs'>
                                    {user?.profilePicture ? (
                                        <img
                                            src={user.profilePicture}
                                            alt={user.displayName || 'Avatar'}
                                            className='w-9 h-9 rounded-full border dark:border-headings-dark border-headings-light shrink-0 object-cover'
                                            referrerPolicy='no-referrer'
                                        />
                                    ) : (
                                        <div className='w-9 h-9 rounded-full dark:bg-headings-dark bg-headings-light text-white flex items-center justify-center font-bold text-sm shrink-0'>
                                            {user?.displayName ? user.displayName[0].toUpperCase() : 'U'}
                                        </div>
                                    )}
                                    <div className='flex flex-col min-w-0 flex-1 leading-tight text-left'>
                                        <p className='text-sm font-semibold dark:text-font-dark text-font-light truncate'>{user?.displayName || 'User'}</p>
                                        <p className='text-xs dark:text-font-version-dark text-font-muted-light truncate'>{user?.email || ''}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={logout}
                                    title='Log out'
                                    aria-label='Log out of your account'
                                    className='cursor-pointer w-full h-9 rounded-full flex items-center justify-center gap-2 text-sm font-semibold border dark:border-red-400/40 border-red-500/40 text-red-600 dark:text-red-300 hover:bg-red-500/15 hover:border-red-500 dark:hover:border-red-400 transition-all duration-300 ease hover:-translate-y-0.5'
                                >
                                    <LogOut size={15} />
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={login}
                                title='Sign in with Google'
                                aria-label='Sign in with Google'
                                className={`bg-white text-black border border-neutral-200 dark:border-transparent shadow-sm cursor-pointer w-50 h-9.5 gap-1 rounded-full flex items-center justify-center transition-all hover:bg-gray-100 duration-300 ease hover:-translate-y-1.25`}>
                                <img src={GoogleLogo} alt="Logo" width={30} height={30} />
                                Sign in with Google
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <button
                type='button'
                onClick={onToggle}
                aria-label='Toggle navigation menu'
                title='Toggle navigation menu'
                className='m-2 cursor-pointer shrink-0 dark:text-white text-font-light hover:text-headings-light dark:hover:text-headings-dark transition-colors pointer-events-auto'
            >
                <Menu size={32} />
            </button>
        </div>
        </>
    )
}

export default Sidebar