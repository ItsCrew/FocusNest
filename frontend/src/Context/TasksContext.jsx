import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

const TasksContext = createContext()

const normalizeTask = (doc) => ({
        id: doc._id,
        task: doc.Task,
        priority: doc.Priority,
        completed: doc.Completed,
        isActive: doc.IsActive,
        color: doc.Color || ''
    })

export const TasksProvider = ({ children }) => {

    const [tasks, setTasks] = useState([])
    const { isAuthenticated } = useAuth()

    const addTasks = async (task, priority) => {
        const tempId = `temp-${Date.now()}`
        const optimisticTask = {
            id: tempId,
            task,
            priority,
            completed: false,
            isActive: false,
            color: ''
        }

        setTasks(prev => [...prev, optimisticTask])

        try {
            const { data } = await axios.post('/api/v1/Tasks', { Task: task, Priority: priority })
            const realTask = normalizeTask(data.Tasks)
            setTasks(prev => prev.map(t => {
                if (t.id === tempId) {
                    return {
                        ...realTask,
                        completed: t.completed,
                        isActive: t.isActive,
                        task: t.task,
                        color: t.color
                    }
                }
                return t
            }))
        } catch (error) {
            console.error('Error adding task:', error)
            setTasks(prev => prev.filter(t => t.id !== tempId))
        }
    }

    const toggleTask = async (id) => {
        const target = tasks.find((t) => t.id === id)
        if (!target) return

        setTasks((prev) => 
            prev.map((t) => (t.id == id ? { ...t, completed: !t.completed } : t))
        )

        if (String(id).startsWith('temp-')) return

        try {
            await axios.patch(`/api/v1/Tasks/${id}`, { Completed: !target.completed })
        } catch (error) {
            console.error('Error toggling task:', error)
        }
    }

    const deleteTask = async (id) => {
        setTasks(prev => prev.filter(t => t.id !== id))

        if (String(id).startsWith('temp-')) return

        try {
            await axios.delete(`/api/v1/Tasks/${id}`)
        } catch (error) {
            console.error('Error deleting task:', error)
        }
    }

    const clearTasks = async () => {
        setTasks([])
        try {
            await axios.delete('/api/v1/Tasks')
        } catch (error) {
            console.error('Error clearing tasks:', error)
        }
    }

    const toggleActiveTask = async (id) => {
        const target = tasks.find((t) => t.id === id)
        if (!target) return

        setTasks((prev) => 
            prev.map((t) => (t.id == id ? { ...t, isActive: !t.isActive } : { ...t, isActive: false }))
        )

        if (String(id).startsWith('temp-')) return

        try {
            await axios.patch(`/api/v1/Tasks/${id}`, { IsActive: !target.isActive })
        } catch (error) {
            console.error('Error toggling active task:', error)
        }
    }

    const editTask = async (id, updatedText) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, task: updatedText } : t))
        )

        if (String(id).startsWith('temp-')) return

        try {
            await axios.patch(`/api/v1/Tasks/${id}`, { Task: updatedText })
        } catch (error) {
            console.error('Error editing task:', error)
        }
    }

    const setTaskColor = async (id, color) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, color } : t))
        )

        if (String(id).startsWith('temp-')) return

        try {
            await axios.patch(`/api/v1/Tasks/${id}`, { Color: color })
        } catch (error) {
            console.error('Error setting task color:', error)
        }
    }

    const activeTask = tasks.find((t) => t.isActive) || null

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get('/api/v1/Tasks')
            const loaded = (data.Tasks || []).map(normalizeTask)
            setTasks(loaded)
        } catch (error) {
            console.error('Error fetching tasks:', error)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchTasks()
        } else {
            setTasks([])
        }
    }, [isAuthenticated])


    return (
        <TasksContext.Provider value={{tasks, setTasks, addTasks, clearTasks, toggleTask, deleteTask, toggleActiveTask, editTask, setTaskColor, activeTask}}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => {
    const context = useContext(TasksContext)
    if (!context) {
        throw new Error('useTasks must be used within a tasksprovider!')
    }
    return context
}