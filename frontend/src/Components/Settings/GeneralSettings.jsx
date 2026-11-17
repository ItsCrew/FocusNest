import { Info } from 'lucide-react'
import React from 'react'
import ToggleSwitch from '../Global/ToggleSwitch'
import { useTimer } from '../../Context/TimerContext'

const GeneralSettings = () => {

  const {pomodoroMinutes, setPomodoroMinutes, shortBreakMinutes, setShortBreakMinutes, longBreakMinutes, setLongBreakMinutes, isPomodoroMode, setisPomodoroMode} = useTimer();

  return (
    <div className='flex flex-col gap-2 dark:text-font-dark text-font-light'>
      <h2 className='text-2xl font-bold dark:text-font-dark text-font-light'>Custom Timer</h2>
      <hr className='my-1 dark:border-border-version-dark/30 border-neutral-200' />
      <div className='flex flex-col gap-3 py-2'>
        <div className='flex justify-between items-center'>
          <p className='font-medium dark:text-font-dark text-font-light'>Pomodoro</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              disabled={isPomodoroMode}
              min="1"
              max="360"
              title="Pomodoro duration in minutes"
              aria-label="Pomodoro duration in minutes"
              value={pomodoroMinutes || ''}
              onChange={(e) => setPomodoroMinutes(e.target.value === '' ? '' : Number(e.target.value))}
              onBlur={() => {
                const val = Number(pomodoroMinutes);
                if (val > 360) setPomodoroMinutes(360);
                else if (val < 1) setPomodoroMinutes(1);
              }}
              className='h-10 w-20 dark:bg-input-bg bg-input-bg-light border dark:border-headings-dark border-headings-light/40 dark:text-font-dark text-font-light rounded-[10px] text-center no-spinner disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-headings-light dark:focus:border-headings-dark'
            />
            <span className="text-sm dark:text-neutral-400 text-neutral-500 w-12">Minutes</span>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <p className='font-medium dark:text-font-dark text-font-light'>Short Break</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              disabled={isPomodoroMode}
              min="1"
              max="60"
              title="Short break duration in minutes"
              aria-label="Short break duration in minutes"
              value={shortBreakMinutes || ''}
              onChange={(e) => setShortBreakMinutes(e.target.value === '' ? '' : Number(e.target.value))}
              onBlur={() => {
                const val = Number(shortBreakMinutes);
                if (val > 60) setShortBreakMinutes(60);
                else if (val < 1) setShortBreakMinutes(1);
              }}
              className='h-10 w-20 dark:bg-input-bg bg-input-bg-light border dark:border-headings-dark border-headings-light/40 dark:text-font-dark text-font-light rounded-[10px] text-center no-spinner disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-headings-light dark:focus:border-headings-dark'
            />
            <span className="text-sm dark:text-neutral-400 text-neutral-500 w-12">Minutes</span>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <p className='font-medium dark:text-font-dark text-font-light'>Long Break</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              disabled={isPomodoroMode}
              min="1"
              max="60"
              title="Long break duration in minutes"
              aria-label="Long break duration in minutes"
              value={longBreakMinutes || ''}
              onChange={(e) => setLongBreakMinutes(e.target.value === '' ? '' : Number(e.target.value))}
              onBlur={() => {
                const val = Number(longBreakMinutes);
                if (val > 60) setLongBreakMinutes(60);
                else if (val < 1) setLongBreakMinutes(1);
              }}
              className='h-10 w-20 dark:bg-input-bg bg-input-bg-light border dark:border-headings-dark border-headings-light/40 dark:text-font-dark text-font-light rounded-[10px] text-center no-spinner disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-headings-light dark:focus:border-headings-dark'
            />
            <span className="text-sm dark:text-neutral-400 text-neutral-500 w-12">Minutes</span>
          </div>
        </div>

        <div className='flex justify-between items-center mt-2'>
          <div className="flex items-center gap-2">
            <p className='font-medium dark:text-font-dark text-font-light'>Pomodoro Mode</p>
            <div className="group relative flex items-center">
              <Info size={18} className="text-neutral-400 hover:text-headings-light dark:hover:text-white transition-colors cursor-pointer" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 hidden w-64 p-3 dark:bg-neutral-800 bg-white text-xs dark:text-neutral-200 text-font-light rounded-lg shadow-2xl group-hover:block z-10 text-center pointer-events-none border dark:border-neutral-700 border-headings-light/30">
                Deep Work for 25 minutes, followed by a Short Break. Repeated 4 times, then one Long Break. Dots under the timer indicate completed Pomodoros.
                <div className="absolute left-1/2 -translate-x-1/2 top-full border-[6px] border-transparent border-t-white dark:border-t-neutral-800" />
              </div>
            </div>
          </div>
          <ToggleSwitch
            checked={isPomodoroMode}
            onChange={(val) => {
              setisPomodoroMode(val);

              if (val === true) {
                setPomodoroMinutes(25);
                setShortBreakMinutes(5);
                setLongBreakMinutes(10);
              }
            }}
          />
        </div>

      </div>
    </div>
  )
}

export default GeneralSettings