import React, { useState, useEffect } from 'react'
import { X, ChevronDown } from 'lucide-react';
import { useTasks } from '../../Context/TasksContext';

const AddTaskModal = ({ onClose }) => {
    const [priority, setPriority] = useState('P0')
    const [priorityOpen, setPriorityOpen] = useState(false)
    const [taskText, setTaskText] = useState('')

    const { addTasks } = useTasks();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && onClose) onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const priorityStyles = {
        P0: 'dark:bg-red-500/20 dark:border-red-400 dark:text-red-400 bg-red-50 border-red-500 text-red-600',
        P1: 'dark:bg-amber-500/20 dark:border-amber-400 dark:text-amber-400 bg-amber-50 border-amber-500 text-amber-700',
        P2: 'dark:bg-gray-500/20 dark:border-gray-400 dark:text-gray-400 bg-slate-50 border-slate-400 text-slate-700',
    }

    const handleSubmit = () => {
        if (!taskText.trim()) return;
        addTasks(taskText.trim(), priority);
        setTaskText('');
        onClose();
    }

    return (
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget && onClose) onClose();
            }}
            className='fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs'
        >
            <div className='w-full max-w-md border dark:border-modal-border border-headings-light/40 rounded-2xl shadow-2xl relative dark:bg-modal-bg bg-white overflow-hidden'>
                <div className='p-4 sm:p-6 border-b dark:border-modal-border/30 border-neutral-200 flex items-center justify-between'>
                    <h2 className='text-xl sm:text-2xl font-bold dark:text-font-dark text-font-light'>Add a Task</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        title="Close modal"
                        aria-label="Close modal"
                        className='cursor-pointer p-1 text-neutral-400 hover:text-font-light dark:hover:text-font-dark transition-colors'
                    >
                        <X size={22} />
                    </button>
                </div>
                <div className='p-4 sm:p-6 border-b dark:border-modal-border/30 border-neutral-200 flex justify-center items-center'>
                    <div className='flex items-center gap-2 sm:gap-2.5 w-full'>
                        <input className='px-3 h-11 sm:h-12 flex-1 min-w-0 rounded-xl sm:rounded-[15px] border-2 dark:border-modal-border border-neutral-300 dark:bg-[#1e1e1e] bg-input-bg-light dark:text-font-dark text-font-light focus:outline-none focus:border-headings-light dark:focus:border-headings-dark text-sm sm:text-base' 
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSubmit();
                        }}
                        type="text" 
                        name="InputBox" 
                        id="InputBox" 
                        autoFocus
                        placeholder='Add a new task!' />
                        <div className='relative shrink-0'>
                            <div
                                onClick={() => setPriorityOpen(!priorityOpen)}
                                title={`Priority: ${priority} (click to change)`}
                                role="button"
                                tabIndex={0}
                                className={`flex items-center justify-between gap-1.5 sm:gap-2 h-11 sm:h-12 min-w-16 sm:min-w-20 px-2.5 sm:px-3.5 rounded-xl sm:rounded-[15px] border-2 cursor-pointer select-none font-semibold text-xs sm:text-sm transition-all ${priorityStyles[priority]}`}
                            >
                                <span>{priority}</span>
                                <ChevronDown size={14} className={`transition-transform duration-200 ${priorityOpen ? 'rotate-180' : ''}`} />
                            </div>
                            {priorityOpen && (
                                <div className='absolute top-full right-0 mt-1.5 w-full dark:bg-navbg-dark bg-white border dark:border-headings-dark border-headings-light/40 rounded-xl overflow-hidden shadow-xl z-20'>
                                    <div onClick={() => { setPriority('P0'); setPriorityOpen(false); }} className='px-3 py-2 text-center font-semibold text-sm text-red-500 dark:hover:bg-white/10 hover:bg-neutral-100 cursor-pointer'>P0</div>
                                    <div onClick={() => { setPriority('P1'); setPriorityOpen(false); }} className='px-3 py-2 text-center font-semibold text-sm text-amber-500 dark:hover:bg-white/10 hover:bg-neutral-100 cursor-pointer'>P1</div>
                                    <div onClick={() => { setPriority('P2'); setPriorityOpen(false); }} className='px-3 py-2 text-center font-semibold text-sm text-neutral-500 dark:hover:bg-white/10 hover:bg-neutral-100 cursor-pointer'>P2</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='p-4 sm:p-6 flex justify-center'>
                    <button
                        onClick={handleSubmit}
                        type='button'
                        title="Add task"
                        aria-label="Add task"
                        className='h-11 w-24 sm:w-25 dark:bg-headings-dark bg-headings-light hover:bg-[#34523b] dark:hover:bg-[#5e7f64] active:scale-95 hover:scale-105 text-white font-medium rounded-[10px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200 cursor-pointer flex items-center justify-center text-sm sm:text-base'>
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddTaskModal