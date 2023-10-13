import React, { useRef } from "react";
// import CopyIcon from "../../../../assets/images/copyIcon.svg";
import CopyIcon from "../../../../assets/images/copyIcon.svg";
const CopyTextarea = ({ code }) => {
  const textareaRef = useRef(null);

  const copyCode = () => {
    textareaRef.current.select();
    textareaRef.current.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    alert("Code copied to clipboard!");
  };

  return (
    <div style={{ position: "relative" }}>
      <textarea
        ref={textareaRef}
        className="shadow appearance-none border border-[#CFDEF4]  rounded-[10px] w-[598px] h-[331px] pt-12 pb-10 pr-10 pl-10 text-gray-600 leading-tight focus:outline-none focus:shadow-outline overflow-hidden"
        readOnly
        value={code.trim()}
      />

      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          padding: "13px",
        }}
        className="flex   justify-end mr-3"
      >
        <div
          className="border rounded-[10px] border-[#CFDEF4] w-[132px] h-[50px] flex justify-center items-center cursor-pointer"
          onClick={copyCode}
        >
          <img className="h-6 w-6 mr-1" src={CopyIcon} alt="" />
          <p className="text-blue-500">Copy</p>
        </div>
      </div>
    </div>
  );
};

export default CopyTextarea;
