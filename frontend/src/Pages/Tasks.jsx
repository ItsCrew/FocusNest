import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BoxLayout from '../Components/Global/BoxLayout'
import TasksBox from '../Components/Tasks/TasksBox'
import AddTaskModal from '../Components/Tasks/AddTaskModal'
import { useTasks } from '../Context/TasksContext'
import { useAuth } from '../Context/AuthContext'
import { Plus } from 'lucide-react'

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { tasks } = useTasks()
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/signin', { replace: true })
    }
  }, [isAuthenticated, loading, navigate])

  const handleOpenModal = () => {
    if (!isAuthenticated) {
      navigate('/signin')
      return
    }
    setIsModalOpen(true)
  }

  if (loading) {
    return null
  }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center py-10 px-2 sm:px-4'>
      <div className='flex flex-col items-center w-full'>
        <BoxLayout
          title="Tasks"
          headerAction={
            tasks.length > 0 && (
              <button
                type="button"
                onClick={handleOpenModal}
                className="w-11 h-11 dark:bg-white dark:text-black bg-headings-light text-white rounded-full flex items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
                title="Add new task"
                aria-label="Add new task"
              >
                <Plus className='hover:rotate-180 transition-all duration-400 ease-in-out' size={28} strokeWidth={2.5} />
              </button>
            )
          }
        >
          <TasksBox onOpenModal={handleOpenModal} />
          {isModalOpen && (
            <AddTaskModal onClose={() => setIsModalOpen(false)} />
          )}
        </BoxLayout>
      </div>
    </div>
  )
}

export default Tasks