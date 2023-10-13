import React, { useState } from "react";
import Pencil from "../../../../assets/images/pencil.svg";

export default function Design() {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [desktopText, setDesktopText] = useState("Text");
  const [mobileText, setMobileText] = useState("Text");
  return (
    <>
      <div className="h-[65px] flex items-center w-[100%]">
        <h1 className="text-indigo-900 text-2xl font-semibold leading-7">
          Design
        </h1>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-[50%]">
            <h3 className="text-indigo-900  font-medium">Desktop Text</h3>
            <div className="flex gap-2">
              <div className="w-[100%] flex border-2 p-3 rounded-[10px]">
                <input
                  type="text"
                  placeholder="Enter text in desktop view"
                  className="w-[80%] outline-none text-base"
                  onChange={(e) => setDesktopText(e.target.value)}
                ></input>
                <div className="w-[20%] flex justify-end">
                  <img src={Pencil} className="w-[20px] h-[20px]" alt="edit" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-[50%]">
            <h3 className="text-indigo-900  font-medium">Mobile Text</h3>
            <div className="flex gap-3">
              <div className="w-[100%] flex border-2 p-3 rounded-[10px]">
                <input
                  type="text"
                  placeholder="Enter text in mobile view"
                  className="w-[80%] outline-none text-base"
                  onChange={(e) => setMobileText(e.target.value)}
                ></input>
                <div className="w-[20%] flex justify-end">
                  <img src={Pencil} className="w-[20px] h-[20px]" alt="edit" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-[50%]">
            <h3 className="text-indigo-900  font-medium">Background color</h3>
            <div className="flex gap-2">
              <div className="w-[100%] flex border-2 p-2 rounded-[10px]">
                <input
                  type="text"
                  placeholder="#FFFFFF"
                  className="w-[80%] outline-none text-base"
                  value={bgColor}
                  disabled
                ></input>

                <input
                  type="color"
                  className="w-[40px] h-[40px]  rounded-[10px] cursor-pointer text-gray-100 outline-none"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-[50%]">
            <h3 className="text-indigo-900  font-medium">Text color</h3>
            <div className="flex gap-2">
              <div className="w-[100%] flex border-2 p-2 rounded-[10px]">
                <input
                  type="text"
                  placeholder="#FFFFFF"
                  className="w-[80%] outline-none text-base"
                  value={textColor}
                  disabled
                ></input>

                <input
                  type="color"
                  className="w-[40px] h-[40px] text-gray-100 rounded-[10px] cursor-pointer outline-none"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[266px] border-[1px] border-[#CFDEF4] bg-[#F8FBFF] w-[100%] rounded-[10px] flex gap-2">
          <div className="w-[49%] h-[100%] flex flex-col items-center">
            <div className="flex-grow flex flex-col justify-center">
              <div
                className="p-4 rounded-[24px]"
                style={{ backgroundColor: `${bgColor}` }}
              >
                <p className="" style={{ color: `${textColor}` }}>
                  {desktopText}
                </p>
              </div>
            </div>
            <div className="flex justify-center pb-2">
              {" "}
              
              <h3 className="text-indigo-900 font-medium">Desktop Text</h3>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <hr className="w-[1px] h-[80%] bg-[#CFDEF4] m-0"></hr>
          </div>
          <div className="w-[49%] h-[100%] flex flex-col items-center">
            <div className="flex-grow flex flex-col justify-center">
              <div
                className="p-4 rounded-[24px]"
                style={{ backgroundColor: `${bgColor}` }}
              >
                <p className="" style={{ color: `${textColor}` }}>
                  {mobileText}
                </p>
              </div>
            </div>
            <div className="flex justify-center pb-2">
              {" "}
              
              <h3 className="text-indigo-900 font-medium">Mobile Text</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
