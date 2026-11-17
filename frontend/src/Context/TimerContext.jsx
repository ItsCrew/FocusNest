import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

const TimerContext = createContext()

export const TimerProvider = ({ children }) => {

    const CompletionSound = useRef(new Audio('/sounds/Completed3.mp3'));
    const endTimeRef = useRef(null);

    const [pomodoroMinutes, setPomodoroMinutes] = useState(() => {
      return Number(localStorage.getItem('PomodoroDuration')) || 25;
    });

    const [shortBreakMinutes, setShortBreakMinutes] = useState(() => {
      return Number(localStorage.getItem('ShortBreakDuration')) || 5;
    });

    const [longBreakMinutes, setLongBreakMinutes] = useState(() => {
      return Number(localStorage.getItem('LongBreakDuration')) || 10;
    });

    const [notificationsEnabled, setnotificationsEnabled] = useState(() =>{
        const saved = localStorage.getItem('BrowserNotifications')
        return saved !== null ? saved == 'true' : false
    })

    const [autoStart, setAutoStart] = useState(() =>{
        const saved = localStorage.getItem('AutoStart')
        return saved !== null ? saved == 'true' : true
    })

    const [isPomodoroMode, setisPomodoroMode] = useState(() =>{
        const saved = localStorage.getItem('PomodoroMode')
        return saved !== null ? saved == 'true' : true
    })

    const [mode, setMode] = useState('pomodoro')
    const [timeLeft, settimeLeft] = useState(() => {
      return (Number(localStorage.getItem('PomodoroDuration')) || 25) * 60;
    });
    const [isRunning, setisRunning] = useState(false)
    const [pomodoroCount, setpomodoroCount] = useState(0)

    const getDurations = (currentmode) => {
        if(currentmode == 'shortBreak') return shortBreakMinutes * 60
        if(currentmode == 'longBreak') return longBreakMinutes * 60
        return pomodoroMinutes * 60
        // return 10
    }

    const toggleTimer = () => {
        setisRunning((prev) => {
            const nextRunning = !prev;
            if (nextRunning) {
                endTimeRef.current = Date.now() + timeLeft * 1000;
            } else {
                endTimeRef.current = null;
            }
            return nextRunning;
        });
    }

    const resetTimer = () => {
        endTimeRef.current = null;
        setisRunning(false);
        settimeLeft(getDurations(mode));
        setpomodoroCount(0);
    }

    const changeMode = (newMode) => {
        endTimeRef.current = null;
        setisRunning(false);
        setMode(newMode);
        settimeLeft(getDurations(newMode));
    }

    const NotificationsData = {
            pomodoro: {
                title: "Break Time! ☕",
                body: `Awesome work! Time to step back and take a break`,
            },
            shortBreak: {
                title: "Break Over! ⏱️",
                body: `Hope you're refreshed. Ready to focus again?`,
            },
            longBreak: {
                title: "Long Break Done! 🚀",
                body: `Hope you feel refreshed! Ready to start a new cycle?`,
            }
        };

    useEffect(() => {
        localStorage.setItem('PomodoroDuration', String(pomodoroMinutes))
        localStorage.setItem('ShortBreakDuration', String(shortBreakMinutes))
        localStorage.setItem('LongBreakDuration', String(longBreakMinutes))
        localStorage.setItem('PomodoroMode', String(isPomodoroMode));
        localStorage.setItem('AutoStart', String(autoStart));
        localStorage.setItem('BrowserNotifications', String(notificationsEnabled));
    }, [pomodoroMinutes, shortBreakMinutes, longBreakMinutes, isPomodoroMode, autoStart, notificationsEnabled])

    const sendNotification = (completedMode) => {
        if (document.hasFocus() && !document.hidden) {
            return;
        }

        if (!notificationsEnabled || !('Notification' in window) || Notification.permission !== 'granted') {
            return;
        }

        const message = NotificationsData[completedMode]
        if (message) {
            new Notification(message.title, {
                body: message.body,
                silent: true,
            })
        }
    }

    const handleTimeCompletetion = () => {
        if (CompletionSound.current) {
            CompletionSound.current.currentTime = 0; 
            CompletionSound.current.play().catch((err) => {
                console.log('Audio playback prevented by browser:', err);
            });
        }

        sendNotification(mode);

        let nextMode = mode;
        let nextDuration = 0;
        let shouldAutoRun = true;

        if (mode === 'pomodoro') {
            const nextCount = pomodoroCount + 1;
            if (nextCount >= 4) {
                setpomodoroCount(4);
                nextMode = 'longBreak';
                nextDuration = getDurations('longBreak');
            } else {
                setpomodoroCount(nextCount);
                nextMode = 'shortBreak';
                nextDuration = getDurations('shortBreak');
            }
            shouldAutoRun = true;
        } else if (mode === 'shortBreak') {
            nextMode = 'pomodoro';
            nextDuration = getDurations('pomodoro');
            shouldAutoRun = true;
        } else if (mode === 'longBreak') {
            setpomodoroCount(0);
            nextMode = 'pomodoro';
            nextDuration = getDurations('pomodoro');
            shouldAutoRun = autoStart;
        }

        setMode(nextMode);
        settimeLeft(nextDuration);

        if (shouldAutoRun) {
            endTimeRef.current = Date.now() + nextDuration * 1000;
            setisRunning(true);
        } else {
            endTimeRef.current = null;
            setisRunning(false);
        }
    }

    useEffect(() => {
        if (!isRunning) return;

        const checkAndUpdateTimer = () => {
            if (!endTimeRef.current) return;
            const remaining = Math.round((endTimeRef.current - Date.now()) / 1000);
            if (remaining <= 0) {
                handleTimeCompletetion();
            } else {
                settimeLeft(remaining);
            }
        };

        const timer = setInterval(checkAndUpdateTimer, 1000);

        const handleVisibilityChange = () => {
            if (!document.hidden) {
                checkAndUpdateTimer();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(timer);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isRunning, mode, pomodoroCount, autoStart]);

    useEffect(() => {
      if (!isRunning) {
        settimeLeft(getDurations(mode));
      }
    }, [pomodoroMinutes, shortBreakMinutes, longBreakMinutes]);

    return (
        <TimerContext.Provider value={{pomodoroMinutes, setPomodoroMinutes, shortBreakMinutes, setShortBreakMinutes, longBreakMinutes, setLongBreakMinutes,  mode, timeLeft, isRunning, pomodoroCount, toggleTimer, resetTimer, changeMode, isPomodoroMode, setisPomodoroMode, autoStart, setAutoStart, notificationsEnabled, setnotificationsEnabled}}>
            {children}
        </TimerContext.Provider>
    )
    
}

export const useTimer = () => {
    const context = useContext(TimerContext)
    if (!context) {
        throw new Error('useTimer must be used within a timeprovider')
    }
    return context
}