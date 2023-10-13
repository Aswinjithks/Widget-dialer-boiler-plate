import React from "react";
import TelePhone from "../../assets/tele-phone.svg";
import CallIcon from "../../assets/call-icon.svg"
import useDepartment from "./useDepartment";

const Department = () => {
  const tttt = window.location;
  console.log("papapapa", tttt);
  const { departments,department, setDepartment, blur, setBlur, departmentHandler, error,agentName,agentPeerId } = useDepartment()
  console.log('fffffff--',department);

  return (
    <div className="container py-10 px-10 mt-20 mx-0 flex min-w-full flex-col items-center">
      <div className="">
        <img src={TelePhone} alt="Phone-icon" />
      </div>
      <div className="text-center">
        <h1 className="font-medium leading-8 text-3xl">Choose the call</h1>
        <p className="text-indigo-900 font-normal text-base space-y-1 leading-6 tracking-wider">
          Please select any of the options to move forward with your call
        </p>
      </div>
      <div className="flex flex-col mt-12 text-indigo-900">
        <h4 className="font-medium text-base">
          Choose
        </h4>
        {departments?.data?.data?.department?.map(item => (<button key={item.id} type="button" onClick={() => setDepartment(item.name)} className={`item-center space-y-2.5 mt-5 rounded-lg w-[286px] h-[50px] p-3.5 text-left ${item.name === department ? "border bg-[#F3F8FF] border-gray-300  text-[#3372D1]" : "border border-gray-300  text-gray-500"}`}>
          {item.name}
        </button>))
        }
        {/* <button type="button" onClick={() => setDepartment("sale")} className="item-center space-y-2.5 mt-5 rounded-lg w-[286px] h-[50px] p-3.5 border border-gray-300  text-gray-500 text-left">
          Sales
        </button>
        <button type="button" onClick={() => setDepartment("sale")} className="item-center space-y-2.5 mt-5 rounded-lg w-[286px] h-[50px] p-3.5 border border-gray-300  text-gray-500 text-left">
          H R
        </button> */}
        <button type="button" onClick={departmentHandler} class="text-white justify-center bg-[#1da1f2] mt-5 space-y-4 w-[286px] h-[50px] hover:bg-[#1da1f2]/90 focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm p-3.5 inline-flex dark:focus:ring-[#1da1f2]/55">
          <img alt="call-icon" className="w-4 h-4 mr-2 -ml-1" src={CallIcon} />
          Start the Call
        </button>
      </div>
    </div>
  );
};

export default Department;
