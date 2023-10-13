import React from 'react'

import Pencil from "../../../../assets/images/pencil.svg"
import Enabled from "../../../../assets/images/enabled.png"

export default function BasicDetails() {
  return (
    <>
     <div className="h-[65px] flex items-center w-[100%]">
        <h1 className="text-indigo-900 text-2xl font-semibold leading-7">
          Basic Details
        </h1>
      </div>
      <div className=" ">
        <div className="flex flex-col gap-[10px]">
            <h3 className="text-indigo-900 text-base font-medium">Widget Name</h3>
            <div className="flex border-2 p-3 rounded-[10px]">
                <input type="text" className="w-[80%] h-[100%]  outline-none" placeholder='Enter widget name' ></input>
                    <div className='w-[20%] flex justify-end'>
                    <img src={Pencil} className="w-[20px] h-[20px]" alt="edit"/>
                    </div>
            </div>
            <div className="flex justify-between">
                <h3 className="text-indigo-900 text-base font-medium">Screen Sharing</h3>
                <img src={Enabled} alt="screen-sharing status"></img>
            </div>
            <p className='self-end  text-[#8F8F8F]'>Enabling widget screen sharing provides you with the choice to share screens containing widgets.</p>
            <h3 className="text-indigo-900 text-base font-medium">Call Timeout</h3>
            <div className="flex border-2 p-3 rounded-[10px]">
                <input type="text" className="w-[100%] h-[100%]  outline-none" placeholder='200' ></input>
            </div>
        </div>
      </div>
    </>
  )
}
