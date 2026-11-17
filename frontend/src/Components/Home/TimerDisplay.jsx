import React from 'react'
import { Circle } from 'lucide-react'
import { useTimer } from '../../Context/TimerContext';

const TimerDisplay = () => {
  const { timeLeft, pomodoroCount } = useTimer();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className='dark:text-font-dark text-font-light font-medium text-center'>
      <p className='text-[64px] sm:text-[80px] font-bold tracking-tight leading-tight select-none'>{formattedTime}</p>
      <div className='flex gap-2.5 justify-center mt-1 mb-2.5 min-h-5'>
        <div className='relative gap-2.5 flex justify-center items-center'>
          {[1, 2, 3, 4].map((index) => (
            <Circle
              key={index}
              size={16}
              strokeWidth={2.5}
              fill={pomodoroCount >= index ? "currentColor" : "none"}
              className={`transition-colors duration-200 ${pomodoroCount >= index ? 'dark:text-headings-dark text-headings-light' : 'opacity-40'}`}
              aria-label={`Pomodoro session ${index} of 4${pomodoroCount >= index ? ' (completed)' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TimerDisplay