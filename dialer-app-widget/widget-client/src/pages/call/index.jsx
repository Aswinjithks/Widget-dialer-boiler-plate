import React from "react";
import CallingIcon from "../../assets/calling-icon.svg";
import disconnect from "../../assets/disconnect.svg";
import Mute from "../../assets/mute.svg";
import Pause from "../../assets/pause.svg";
import Speaker from "../../assets/speaker.svg";
import { useLocation } from "react-router-dom";
import useCall from "./useCall";

const Call = () => {
  const location = useLocation();
  console.log("najmu", location);
  const {
    callInitialHandler,
    callDeclineHandler,
    status,
    setStatus,
    statusList,
    agentPeerId,
    agentName,
  } = useCall();

  return (
    <div className="container flex min-w-full flex-col items-center p-8">
      <div className="border-b-2 w-72 p-6">
        <h1 className="font-medium leading-8 text-xl">
          {agentPeerId !== "undefined"
            ? `Calling to ${location.state?.department}(${agentName})`
            : "Calling"}
        </h1>
        <span className="text-gray-500">{status}</span>
      </div>
      <div className="mt-14">
        <img src={CallingIcon} alt="Phone-icon" />
        <div className="flex justify-between mt-6">
          {/* <div className="" onClick={() => status.handler}>
              <img src={status.icon} alt="Disconnect-icon" />
            </div> */}

          <div className="cursor-pointer" onClick={() => callDeclineHandler()}>
            <img src={disconnect} alt="Disconnect-icon" />
          </div>

          <div className="flex justify-between gap-3">
            <div>
              <img src={Speaker} alt="Speaker-icon" />
            </div>
            <div>
              <img src={Mute} alt="Mute-icon" />
            </div>
            <div>
              <img src={Pause} alt="Pause-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Call;
