import React from "react";

const IncomingDetails = (props) => {
  return (
    <div className="flex flex-col w-[100%]  justify-center items-center h-[100%]">
      <h3 className="text-white text-[24px] pl-[30px]">+91 8943 51 XXXX</h3>
      <h4 className="text-[#E7E7E7] text-[14px] pr-[90px]">{props.status}</h4>
    </div>
  );
};

export default IncomingDetails;
