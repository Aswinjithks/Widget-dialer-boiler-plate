import React from "react";

import Button from "./button";
import decline from "../../../assets/images/decline.png";
import ticket from "../../../assets/images/ticket.png";
import mute from "../../../assets/images/mute.png";
import pause from "../../../assets/images/pause.png";
import forward from "../../../assets/images/forward.png";

function CallFunctions(props) {
  return (
    <>
      <div className="w-full flex p-[30px] items-center gap-[20px] justify-center ease-in transform transition-all h-[130px] duration-200">
        <Button image={decline} background="#EB5757" click={props.click} />
        <button
          className=" flex h-[50px] w-[50px] bg-[#242732] items-center justify-center rounded-[10px] "
          onClick={props.forward}
        >
          <img src={forward} alt="forward"></img>
        </button>
        <button
          className=" flex h-[50px] w-[50px] bg-[#242732] items-center justify-center rounded-[10px] "
          onClick={props.openModal}
        >
          <img src={ticket} alt="forward"></img>
        </button>
        <button className=" flex h-[50px] w-[50px] bg-[#242732] items-center justify-center rounded-[10px] ">
          <img src={mute} alt="forward"></img>
        </button>
        <button className=" flex h-[50px] w-[50px] bg-[#242732] items-center justify-center rounded-[10px] ">
          <img src={pause} alt="forward"></img>
        </button>
      </div>
    </>
  );
}

export default CallFunctions;
