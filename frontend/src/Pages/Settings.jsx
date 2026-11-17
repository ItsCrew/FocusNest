import React from 'react'
import BoxLayout from '../Components/Global/BoxLayout'
import GeneralSettings from '../Components/Settings/GeneralSettings'
import OtherSettings from '../Components/Settings/OtherSettings'

const Settings = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center py-10 px-2 sm:px-4'>
      <div className='flex flex-col items-center gap-5 w-full'>
        <BoxLayout className="min-h-75! w-[92vw]! sm:w-[85vw]! md:w-[70vw]! lg:w-[45vw]! max-w-2xl" title="General Settings">
          <GeneralSettings />
        </BoxLayout>
        <BoxLayout className="min-h-75! w-[92vw]! sm:w-[85vw]! md:w-[70vw]! lg:w-[45vw]! max-w-2xl">
          <OtherSettings />
        </BoxLayout>
      </div>
    </div>
  )
}

export default Settings