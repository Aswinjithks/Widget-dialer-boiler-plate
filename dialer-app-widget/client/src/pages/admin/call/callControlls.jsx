import React from "react";

import Button from "./button";
import mute from "../../../assets/images/mute.png";
import pause from "../../../assets/images/pause.png";
import forward from "../../../assets/images/forward.png";
import ticket from "../../../assets/images/ticket.png";
import decline from "../../../assets/images/decline.png";

function CallControlls(props) {
  return (
    <div className="flex w-full h-[225px] flex-col gap-[20px]">
      <div className="w-full flex justify-end pl-[30px] pr-[30px]">
        <button className="flex justify-center items-center bg-[#242732] w-[50px] h-[50px] rounded-[10px]">
          <img src={mute} alt="mute"></img>
        </button>
      </div>
      <div className="flex justify-between pl-[30px] pr-[30px]">
        <button
          className="flex  bg-[#242732] w-[153px] h-[50px] justify-around items-center rounded-[10px]"
          onClick={props.forward}
        >
          <img src={forward} alt="forward"></img>
          <h4 className="text-base text-[#E0E8EF]">Forward call</h4>
        </button>
        <button className="flex justify-center items-center bg-[#242732] w-[50px] h-[50px] rounded-[10px]">
          <img src={pause} alt="pause"></img>
        </button>
      </div>
      <div className="flex justify-between pl-[30px] pr-[30px]">
        <button
          className="flex  bg-[#242732] w-[167.25px] h-[50px] justify-around items-center rounded-[10px]"
          onClick={props.openModal}
        >
          <img src={ticket} alt="ticket"></img>
          <h4 className="text-base text-[#E0E8EF]">create a ticket</h4>
        </button>
        <Button image={decline} background="#EB5757" click={props.click}/>
      </div>
    </div>
  );
}

export default CallControlls;
