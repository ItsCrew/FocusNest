import React from 'react'
import BoxLayout from '../Components/Global/BoxLayout'
import AppearanceBox from '../Components/Appearance/AppearanceBox'

const Appearance = () => {
      return (
        <div className='min-h-screen flex flex-col justify-center items-center py-10 px-2 sm:px-4'>
          <div className='flex flex-col items-center w-full'>
            <BoxLayout title="Appearance Settings">
               <AppearanceBox/>
            </BoxLayout>
          </div>
        </div>
      )
    }

export default Appearance