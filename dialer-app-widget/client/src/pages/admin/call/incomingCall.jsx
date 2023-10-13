import React from "react";
import { useState } from "react";
import call from "../../../assets/images/call.png";
import decline from "../../../assets/images/decline.png";
import IncomingCallDetail from "./incomingDetails";
import Button from "./button";

function IncomingCall() {
  const [expanded, setExpanded] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const onAcceptClick = () => {
    setExpanded(!expanded);
    setAccepted(!accepted);
    // setMinimised(!minimised);
  };
  return (
    <>
      <div className="h-[130px] w-[55%]">
        <IncomingCallDetail status="Incoming" />
      </div>
      <div className="w-[45%] h-[130px]">
        <div className="flex w-full  h-full items-center gap-[15px] justify-center">
          <Button image={call} background="#1E863B" click={onAcceptClick} />
          <Button image={decline} background="#EB5757" />
        </div>
      </div>
    </>
  );
}

export default IncomingCall;
