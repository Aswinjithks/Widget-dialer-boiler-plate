import React from "react";
import { useState } from "react";
import Draggable from "react-draggable";

import IncomingCallDetail from "./incomingDetails";
import Button from "./button";
import call from "../../../assets/images/call.png";
import decline from "../../../assets/images/decline.png";
import minimise from "../../../assets/images/minimise.png";
import CallAudio from "./callAudio";
import CallControlls from "./callControlls";
import Details from "./details";
import CallFunctions from "./callFunctions";
import AgentSearch from "./agentSearch";
import TicketModal from "../../../components/admin/ticketmodal";

const CallPage = (props) => {
  const {expanded,accepted, setExpanded, setAccepted}  = props
  // const [expanded, setExpanded] = useState(false);
  // const [accepted, setAccepted] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [enter, setEnter] = useState(false);
  const [forward, setForward] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // const onAcceptClick = () => {
  //   setExpanded(!expanded);
  //   setAccepted(!accepted);
  //   // setMinimised(!minimised);
  // };
  const onMinimised = () => {
    setMinimised(!minimised);
    setExpanded(!expanded);
    setEnter(false);
  };
  const onMaximised = () => {
    setMinimised(false);
    setExpanded(true);
  };

  const onMouseEnter = () => {
    setEnter(true);
  };
  const onMouseLeave = () => {
    setEnter(false);
  };
  const onForward = () => {
    setForward(!forward);
    setMinimised(true);
    setExpanded(false);
  };
  const modalToggle = () => {
    setOpenModal(!openModal);
  };

  return (
    // <div className="w-[80vw] relative">
    <>
      <Draggable>
        <div
          style={{
            height: expanded ? "539px" : "130px",
            zIndex: 100000,
          }}
          className={` border-b-4 border-[#242732] absolute bg-[#2F3044] w-[410px] left-[70%] rounded-[20px] ease-in-out transform duration-200  transition-all ${
            expanded && !minimised
              ? "top-[30vh]"
              : minimised && enter && forward
              ? "top-[50vh]"
              : "top-[70vh]"
          }`}
        >
          <div className="flex w-full h-130px border-b-0 bg-[#2F3044] rounded-[20px] ">
            {accepted === false && minimised === false ? (
              <>
                <div className="h-[130px] w-[55%]">
                  <IncomingCallDetail status="Incoming" />
                </div>
                <div className="w-[45%] h-[130px]">
                  <div className="flex w-full  h-full items-center gap-[15px] justify-center">
                    <Button
                      image={call}
                      background="#1E863B"
                      click={props.onAcceptClick}
                    />
                    <Button image={decline} background="#EB5757" click={props.onRejectClick} />
                  </div>
                </div>
              </>
            ) : accepted === true && minimised === false ? (
              <>
                <div className="flex flex-col w-full">
                  <div className="w-full  flex">
                    <div className="h-[130px] w-[55%]">
                      <IncomingCallDetail status="Ongoing" />
                    </div>
                    <div className="w-[45%] h-[130px]">
                      <div className="flex justify-end items-center h-full pr-[30px]">
                        <Button
                          image={minimise}
                          background="#2F3044"
                          click={onMinimised}
                        />
                      </div>
                    </div>
                  </div>
                  <CallAudio />
                  <CallControlls forward={onForward} openModal={modalToggle} click={props.onRejectClick}/>
                </div>
              </>
            ) : (accepted === true && minimised === true) ||
              forward === true ? (
              <>
                <div
                  className="w-full ease-in  transform duration-200 transition-all"
                  style={{
                    height:
                      enter && forward ? "400px" : enter ? "185px" : "130px",
                  }}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  {enter === true && forward === false ? (
                    <>
                      <Details maximise={onMaximised} />
                      <CallFunctions
                        forward={onForward}
                        openModal={modalToggle}
                        click={props.onRejectClick}
                      />
                    </>
                  ) : enter === true && forward === true ? (
                    <>
                      <Details maximise={onMaximised} />
                      {/*search section */}
                      <AgentSearch forward={onForward} />
                      <CallFunctions
                        forward={onForward}
                        openModal={modalToggle}
                        click={props.onRejectClick}
                      />
                    </>
                  ) : (
                    <>
                      <CallFunctions
                        forward={onForward}
                        openModal={modalToggle}
                        click={props.onRejectClick}
                      />
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="h-[130px] w-[55%]">
                  <IncomingCallDetail status="Ongoing" />
                </div>
                <div className="w-[45%] h-[130px]">
                  <div className="flex justify-end items-center h-full pr-[30px]">
                    <Button
                      image={minimise}
                      background="#2F3044"
                      click={onMinimised}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Draggable>
      {openModal && (
        <>
          <TicketModal
            closeModal={modalToggle}
            ticket={props.ticket}
            name={props.name}
            phone={props.phone}
            className="transition ease-in-out duration-200"
          />
        </>
      )}
      {/*  </div> */}
    </>
  );
};

export default CallPage;
