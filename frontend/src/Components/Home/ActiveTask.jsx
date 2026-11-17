import React from 'react'
import { useTasks } from '../../Context/TasksContext';

const ActiveTask = () => {
  const { activeTask } = useTasks();
  return (
    <div className='flex flex-col items-center rounded-2xl border dark:border-activetask-border-dark border-headings-light/30 dark:bg-activetask-bg-dark bg-white shadow-sm backdrop-blur-sm max-w-[min(480px,92vw)] mt-2 mb-5.5 mx-4 pt-3.5 pb-4 px-5.5 w-full'>
        <p className='uppercase text-[10px] font-bold tracking-[0.14px] dark:text-font-version-dark text-headings-light pb-2'>Active Task</p>
        <p className='text-[clamp(15px,2.1vw,17px)] font-semibold leading-[1.4] max-w-full line-clamp-2 wrap-break-words dark:text-font-dark text-font-light'>{activeTask ? activeTask.task : 'No Task Selected'}</p>
    </div>
  )
}

export default ActiveTask