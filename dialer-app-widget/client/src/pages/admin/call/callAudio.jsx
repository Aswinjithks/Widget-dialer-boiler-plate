import React from "react";
import audioSignal from "../../../assets/images/audiosignal.png";

function CallAudio() {
  return (
    <div className="flex-col">
      <img
        src={audioSignal}
        alt="soundsignal"
        className="w-full h-[100px]"
      ></img>
      <h4 className="text-[#E0E8EF] p-[30px] text-base">00:24</h4>
    </div>
  );
}

export default CallAudio;
