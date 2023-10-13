import React, { useRef } from "react";
import CopyTextarea from "./copyTextArea";
import useWidget from "./useWidget";

const Widget = () => {
  const { code, user } = useWidget();
  console.log(user, "userDetails");
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl">Widget Details</h1>
      </div>
      <div className="h-56 grid grid-cols-2 gap-4 content-stretch">
        <div className="mb-4 p-4">
          <div className="p-2">
            <label
              className="block text-[#404385] text-sm font-bold mb-2"
              for="widgetName"
            >
              Widget Name
            </label>
            <input
              className="shadow appearance-none border border-[#CFDEF4] rounded-[10px] w-full py-2 px-3  text-blak-400 leading-tight focus:outline-none focus:shadow-outline"
              id="widgetName"
              type="text"
              placeholder="Enter your widget name"
              value={user?.username}
            />
          </div>
          <div className="p-2">
            <label
              className="block text-[#404385] text-sm font-bold mb-2"
              for="widgetStatus"
            >
              Widget Status
            </label>
            <label
              for="autoSaver"
              className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center"
            >
              <input
                type="checkbox"
                name="autoSaver"
                id="autoSaver"
                className="sr-only"
              />
              <span className="slider mr-3 flex h-[26px] w-[50px] items-center rounded-full bg-[#CCCCCE] p-1 duration-200">
                <span className="dot h-[18px] w-[18px] rounded-full bg-white duration-200"></span>
              </span>
              <span className="label flex items-center text-sm font-medium text-black">
                <span className="on hidden pl-1"> Active </span>
                <span className="off pl-1"> Inactive </span>
              </span>
            </label>
          </div>
          <div className="p-2">
            <label
              className="block text-[#404385] text-sm font-bold mb-2"
              for="widgetId"
            >
              Widget ID
            </label>
            <input
              className="shadow appearance-none border border-[#CFDEF4] rounded-[10px] rounded w-full py-2 px-3  text-black-400 leading-tight focus:outline-none focus:shadow-outline"
              id="widgetId"
              type="text"
              placeholder="Enter your widget number"
              value={user?.peerId}
            />
          </div>
          <div className="p-2">
            <label
              className="block text-[#404385] text-sm font-bold mb-2"
              for="forwardingMail"
            >
              Ticket Forwarding Mail
            </label>
            <input
              className="shadow appearance-none border border-[#CFDEF4] rounded-[10px] w-full py-2 px-3 text-black-400 leading-tight focus:outline-none focus:shadow-outline"
              id="forwardingMail"
              type="email"
              placeholder="Enter your email"
              value={user?.email}
            />
          </div>
        </div>
        <div>
          <div className="p-2">
            <label
              className="block text-[#404385] text-sm font-bold mb-2"
              for="widgetName"
            >
              Widget Script (copy paste this code to your websites footer section)
            </label>
            <CopyTextarea code={code} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Widget;
