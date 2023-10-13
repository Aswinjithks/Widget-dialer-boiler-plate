import React, { useState } from "react";
import Modal from "react-modal";

import WidgetType from "./widgetType";
import BasicDetails from "./basicDetails";
import Close from "../../../../assets/images/close.png";
import { useEditWidget } from "./useEditWidget";
import Design from "./design";
import Voicemail from "./voicemail";
import Routing from "./routing";
export default function CustomModal({ isOpen, closeModal, children }) {
  const [width, setWidth] = useState(14.28);
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, prev, next } =
    useEditWidget([
    <WidgetType />,
    <BasicDetails />,
    <Design />,
    <h1>Four</h1>,
    <Voicemail />,
    <Routing />
  ]);
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "80%",
      maxHeight: "80%",
      padding: "20px",
      border: "none",
      borderRadius: "20px",
      width: "35%",
      height: "95%",
    },
  };
  const increaseWidth = () => {
    setWidth(width + 14.28)
  }

  const decreaseWidth = () => {
    setWidth(width - 14.28);
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Custom Modal"
      >
        <div className="flex justify-between">
          <h2 className="text-2xl text-gray-800 font-medium leading-relaxed">
            Generate Widget
          </h2>
          <button onClick={closeModal}>
            <img src={Close} alt="Close" />
          </button>
        </div>
        <hr></hr>
        <div className="w-full h-[5px] bg-gray-400 mt-[20px] rounded-[20px]">
          <div className={`h-full  bg-[#3F8CFF] rounded-[20px] transition-all ease`} style={{width: `${width}%`}}></div>
        </div>
        <div className="min-h-[70%]">{step}</div>
        <br></br>
        <hr></hr>
        <div className="flex justify-between h-[10%] items-center pt-[15px]">
          {!isFirstStep ? (
            <button
              onClick={()=>{prev(); decreaseWidth()}}
              className="bg-white border-[#3F8CFF] border-2 text-[#3F8CFF] w-[140px] h-[45px]  rounded-[10px] cursor-pointer hover:bg-blue-500 hover:text-white transition-all delay-[0.1s] ease flex justify-center items-center"
            >
              Previous
            </button>
          ):<div/>}
          {!isLastStep && (
            <button
              onClick={()=>{next(); increaseWidth()}}
              className="bg-[#3F8CFF] w-[140px] h-[45px] rounded-[10px] text-white cursor-pointer hover:bg-blue-500 transition-all delay-[0.1s] ease flex justify-center items-center  justify-self-end"
            >
              Next
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
}
