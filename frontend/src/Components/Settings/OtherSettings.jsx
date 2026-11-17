import React from 'react'
import ToggleSwitch from '../Global/ToggleSwitch'
import { useTimer } from '../../Context/TimerContext'

const OtherSettings = () => {

  const {autoStart, setAutoStart, notificationsEnabled, setnotificationsEnabled} = useTimer();


const handleNotificationToggle = (val) => {
  if (val) {
    if (!('Notification' in window)) {
      alert('Your browser does not support desktop notifications.');
      return;
    }

    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setnotificationsEnabled(true);
        } else {
          setnotificationsEnabled(false);
          alert('Notification permission was not granted. Please enable notifications in your browser settings.');
        }
      });
      return;
    }
  }

  setnotificationsEnabled(val);
};
  

  return (
    <div className='flex flex-col gap-6 py-2'>
      <div className='flex justify-between items-center dark:text-white text-font-light font-medium'>
        <p>Browser Notifications</p>
        <ToggleSwitch checked={notificationsEnabled} onChange={handleNotificationToggle} />
      </div>

      <div className='flex justify-between items-center dark:text-white text-font-light font-medium'>
        <p>Auto-Start Next Session</p>
        <ToggleSwitch checked={autoStart} onChange={setAutoStart}/>
      </div>

      <div className='flex justify-between items-center dark:text-white text-font-light font-medium'>
        <p>Sounds</p>
        <p className='dark:text-neutral-400 text-neutral-500 text-sm'>Coming Soon!</p>
      </div>
    </div>
  )
}

export default OtherSettings