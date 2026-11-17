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
        try {
            const { data } = await axios.post('/api/v1/Tasks', { Task: task, Priority: priority })
            setTasks(prev => [...prev, normalizeTask(data.Tasks)])
        } catch (error) {
            console.error('Error adding task:', error)
        }
    }

    const toggleTask = async (id) => {
        const target = tasks.find((t) => t.id === id)
        if (!target) return

        setTasks((prev) => 
            prev.map((t) => (t.id == id ? { ...t, completed: !t.completed } : t))
        )

        try {
            await axios.patch(`/api/v1/Tasks/${id}`, { Completed: !target.completed })
        } catch (error) {
            console.error('Error toggling task:', error)
        }
    }

    const deleteTask = async (id) => {
        setTasks(prev => prev.filter(t => t.id !== id))
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