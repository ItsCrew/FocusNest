import React, { useState } from 'react'
import EmptyState from '../Tasks/EmptyState'
import { useTasks } from '../../Context/TasksContext'
import TaskItem from './TaskItem'
import ClearConfirmationModal from './ClearConfirmationModal'

const TasksBox = ({ onOpenModal }) => {
  const [isClearModalOpen, setIsClearModalOpen] = useState(false)
  const { tasks, clearTasks } = useTasks()

  return (
    <div className="flex flex-1 flex-col space-y-2">
      {tasks.length === 0 ? (
        <EmptyState onAddClick={onOpenModal} />
      ) : (
        <div className="flex flex-1 flex-col gap-3">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
          <div className='flex justify-center mt-2'>
            <button
              type="button"
              onClick={() => {
                setIsClearModalOpen(true)
              }}
              title="Clear all tasks"
              aria-label="Clear all tasks"
              className='h-11.25 w-25 rounded-[10px] text-white font-medium text-base dark:bg-headings-dark bg-headings-light hover:bg-[#34523b] dark:hover:bg-[#5e7f64] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_6px_rgba(0,0,0,0.1)]'>
              Clear
            </button>
          </div>
        </div>
      )}
      {isClearModalOpen && (
        <ClearConfirmationModal
          onClose={() => setIsClearModalOpen(false)}
          onConfirm={() => {
            setIsClearModalOpen(false);
            clearTasks()
          }}
        />
      )}
    </div>

  )
}

export default TasksBox