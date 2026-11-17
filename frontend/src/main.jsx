import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './Context/ThemeContext.jsx'
import { TimerProvider } from './Context/TimerContext.jsx'
import { TasksProvider } from './Context/TasksContext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <AuthProvider>
            <TimerProvider>
                <TasksProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </TasksProvider>
            </TimerProvider>
        </AuthProvider>
    </ThemeProvider>

)
