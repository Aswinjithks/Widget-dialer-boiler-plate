import React from "react";
import { useState } from "react";
import maximise from "../../../assets/images/maximise.png";

function Details(props) {
  const [minimised, setMinimised] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // const onMaximised = () =>{
  //     setMinimised(false);
  //     setExpanded(true);
  // }

  return (
    <>
      <div className="w-full h-[50px] flex items-center justify-between p-[30px] ease-in transition-all transform duration-200">
        <div className="flex flex-col pl-[10px] pt-[30px]">
          <h3 className="text-white text-[24px]">+91 8943 51 XXXX</h3>
          <div className="flex justify-between ">
            <h4 className="text-base text-[#E7E7E7]">Ongoing</h4>
            <h4 className="text-base text-[#E7E7E7]">00:25</h4>
          </div>
        </div>
        <button onClick={props.maximise}>
          <img src={maximise} alt="maximise" className="p-[30px]"></img>
        </button>
      </div>
    </>
  );
}

export default Details;
