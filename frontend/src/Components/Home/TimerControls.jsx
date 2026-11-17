import { Pause, Play, RotateCw, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTimer } from '../../Context/TimerContext'


const TimerControls = () => {

    const { isRunning, toggleTimer, resetTimer } = useTimer();

    const toggleControls = () => {
        setIsPaused(!isPaused)
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='flex justify-center items-center gap-3 font-medium'>
                <button
                    type='button'
                    onClick={toggleTimer}
                    title={isRunning ? 'Pause timer' : 'Start timer'}
                    aria-label={isRunning ? 'Pause timer' : 'Start timer'}
                    className='flex justify-center items-center dark:bg-white dark:text-black bg-headings-light text-white h-11 sm:h-13.75 w-26 sm:w-30 rounded-xl sm:rounded-2xl cursor-pointer hover:-translate-y-1.25 shadow-md hover:shadow-lg transition-all duration-300 ease'
                >
                    {isRunning ? <Pause size={22} /> : <Play size={22} className='ml-0.5' />}
                </button>
                <button
                    type="button"
                    onClick={resetTimer}
                    title='Reset Timer'
                    aria-label='Reset Timer'
                    className='cursor-pointer dark:text-white text-font-light hover:text-headings-light dark:hover:text-headings-dark transition-colors p-1'
                >
                    <RotateCw size={24} />
                </button>
                <Link
                    className='cursor-pointer dark:text-white text-font-light hover:text-headings-light dark:hover:text-headings-dark transition-colors p-1'
                    to='/settings'
                    aria-label='Open settings'
                    title='Open settings'
                >
                    <Settings size={24} />
                </Link>
            </div>
        </div>
    )
}

export default TimerControls