import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const isAuthenticated = (Boolean(user))
    const [loading, setLoading] = useState(true)

    const login = () => {
        window.location.href = '/auth/google'
    }

    const logout = () => {
        window.location.href = '/auth/logout'
    }

    const checkAuthStatus = async () => {
        try {
            setLoading(true)
            const res = await fetch('/auth/status')
            const data = await res.json()
            if (data.authenticated) {
                setUser(data.user)
            } else {
                setUser(null)
            }
        } catch (error) {
        console.error('Auth check failed:', error)
        setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkAuthStatus()
    }, [])

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a Auth provider!')
    }
    return context
}