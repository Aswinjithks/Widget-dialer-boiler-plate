import React from "react";

import Audio from "../../../../assets/images/audiocall.png";
import Video from "../../../../assets/images/videocall.png";
import Chat from "../../../../assets/images/chat.png";
import Tick from "../../../../assets/images/tick.png";

export default function WidgetType() {
  return (
    <>
      <div className="h-[65px] flex items-center w-[100%]">
        <h1 className="text-indigo-900 text-2xl font-semibold leading-7">
          Choose Widget Type
        </h1>
      </div>
      <div className="">
        <div className="bg-[#F3F8FF] h-[50px] rounded-[10px] flex justify-between p-4 items-center">
          <div className="flex p2 gap-3">
            <img src={Audio} className="w-[24px] h-[24px]" alt="Audio"></img>
            <h3 className="text-[#3372D1] text-base font-normal ">
              Audio Call Widget
            </h3>
          </div>
          <img src={Tick} className="[w-20] h-[20px]" alt="Tick"></img>
        </div>
        <div className="hover:bg-[#F3F8FF] h-[50px] rounded-[10px] flex justify-between p-4 items-center">
          <div className="flex p2 gap-3">
            <img src={Video} className="w-[24px] h-[24px]" alt="Audio"></img>
            <h3 className="text-[#8F8F8F] text-base font-normal ">
              Video Call Widget
            </h3>
          </div>
          {/* <img src={Tick} className="[w-20] h-[20px]" alt="Tick"></img> */}
        </div>
        <div className="hover:bg-[#F3F8FF] h-[50px] rounded-[10px] flex justify-between p-4 items-center">
          <div className="flex p2 gap-3">
            <img src={Chat} className="w-[24px] h-[24px]" alt="Audio"></img>
            <h3 className="text-[#8F8F8F] text-base font-normal ">
              Chat Widget
            </h3>
          </div>
          {/* <img src={Tick} className="[w-20] h-[20px]" alt="Tick"></img> */}
        </div>
      </div>
    </>
  );
}
