import React, { useRef } from "react";
import Upload from "../../../../assets/images/upload.png";

export default function Voicemail() {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    // Trigger a click on the hidden file input when the image is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    // Handle the selected file here (e.g., upload it or store it in state)
    const selectedFile = event.target.files[0];
    console.log("Selected File:", selectedFile);
  };

  return (
    <>
      <div className="h-[65px] flex items-center w-[100%]">
        <h1 className="text-indigo-900 text-2xl font-semibold leading-7">
          Voicemail
        </h1>
      </div>
      <div className="flex border-2 p-3 rounded-[10px]">
        <div className="w-[80%]">
          <input
            type="file"
            accept="audio/*"
            className="hidden" // Hide the file input
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <input
            type="text"
            className="w-full h-[100%] outline-none"
            placeholder="Upload the voicemail"
          ></input>
        </div>
        <div
          className="w-[20%] flex items-center justify-end cursor-pointer"
          onClick={handleImageClick} // Trigger file input when the image is clicked
        >
          <img src={Upload} className="w-[20px] h-[20px]" alt="upload" />
        </div>
      </div>
    </>
  );
}
