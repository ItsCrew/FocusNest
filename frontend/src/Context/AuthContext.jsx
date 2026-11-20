import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const isAuthenticated = (Boolean(user))
    const [loading, setLoading] = useState(true)

    const login = (customReturnTo) => {
        const isCustomString = typeof customReturnTo === 'string' && customReturnTo.trim() !== '';
        let returnPath = isCustomString ? customReturnTo : window.location.pathname;
        if (returnPath === '/signin' || returnPath === '/login') {
            returnPath = '/tasks';
        } else if (returnPath === '/welcome') {
            returnPath = '/home';
        }
        window.location.href = `/auth/google?returnTo=${encodeURIComponent(returnPath)}`;
    }

    const logout = (customReturnTo) => {
        const isCustomString = typeof customReturnTo === 'string' && customReturnTo.trim() !== '';
        let returnPath = isCustomString ? customReturnTo : window.location.pathname;
        if (returnPath === '/tasks') {
            returnPath = '/home';
        }
        window.location.href = `/auth/logout?returnTo=${encodeURIComponent(returnPath)}`;
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

        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    setUser(null)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axios.interceptors.response.eject(interceptor)
        }
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