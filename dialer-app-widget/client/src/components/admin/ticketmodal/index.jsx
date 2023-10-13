import React from "react";
import { useState } from "react";
import closeIcon from "../../../assets/images/closeicon.svg";
import Dropdown from "./dropdown";
import Prioritybuttons from "./prioritybuttons";
import AdminService from "../../../services/admin.service";
import {toast} from "react-toastify"
const TicketModal = (props) => {
  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const [priority, setPriority] = useState(null);
  
  const createTicket = async ()=>{
    console.log("I got clicked");
    const payload = {
      ticketNumber : props.ticket ,
      phone : props.phone ,
      subject : subject ,
      message : message , 
      assignee : assignee ,
      ticketPriority : priority,
      ticketStatus: "Active",
      ticketOwners : props.name,
      agentId : [],

    }
    const ticket = await AdminService.createTicket(payload);
   let msg = ticket?.stack?.split(`\n`)[0];
    if (ticket?.statusCode === 200) {
      msg = ticket?.message;
    }
    toast(`${msg}`, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }); 
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 w-[50%]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">{`Ticket Id : ${props.ticket}`}</h3>
              <button>
                <button onClick={props.closeModal}>
                  <img src={closeIcon} alt="" />
                </button>
              </button>
            </div>
            <div className="relative p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-[#404385]">Name</span>
                <input
                  className=" border border-primary-light shadow-md rounded-md box-border flex p-4 gap-4  w-full h-12 left-6 top-36"
                  type="text"
                  placeholder="Enter your name"
                  value={props.name}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[#404385]">Phone Number</span>
                <input
                  className="border border-primary-light shadow-md rounded-md box-border flex p-4 gap-4  w-full h-12 left-6 top-36"
                  type="text"
                  placeholder="Enter your phone number"
                  value={props.phone}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[#404385]">Subject</span>
                <input
                  className=" border border-primary-light shadow-md rounded-md box-border flex p-4 gap-4  w-full h-12 left-6 top-36"
                  type="text"
                  placeholder="Enter the subject"
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[#404385]">Message</span>
                <textarea
                  className=" border border-primary-light shadow-md rounded-md box-border flex p-4 gap-4  w-full h-[150px] left-6 placeholder-gray-500 placeholder-py-4"
                  type="text"
                  placeholder="Enter the subject"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-3 justify-between">
                <div className="relative flex-1 flex flex-col ">
                  <span className="text-[#404385]">Assignee</span>
                  <select  onChange={(e)=>{setAssignee(e.target.value)}} className=" content-end justify-self-end border border-primary-light shadow-md rounded-md box-border p-4 placeholder-grey-500 placeholder-py-4 h-12 w-[65%]" placeholder="Select Assignee">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  {/* <Dropdown setAssignee={setAssignee}/> */}
                </div>
                <div className="flex-1">
                  <span className="text-[#404385]">Priority</span>
                  {/* <Prioritybuttons setPriority={setPriority} /> */}
                  <div className="flex space-x-4">
        <button className="border border-red-600 shadow-md rounded-md box-border flex p-4  w-full h-12 left-6 top-36 items-center">
          <input
            type="radio"
            name="priority"
            value="High"
            onChange={(e)=>{setPriority(e.target.value)}}
            style={{
              border: '1px solid #000',
              width:"10px",
              height:"10px"
            }}
            className="bg-red-500 w-2 h-2 rounded-full mr-2"
          ></input>
          High
        </button>
        <button className="border border-yellow-400 shadow-md rounded-md box-border flex p-4  w-full h-12 left-6 top-36 items-center">
          <input
            type="radio"
            name="priority"
            value="Medium"
            onChange={(e)=>{setPriority(e.target.value)}}
            style={{
              
              border: '1px solid #000',
              width:"10px",
              height:"10px"
            }}
            className="bg-green-500 w-2 h-2 rounded-full mr-2"
          ></input>
          Medium
        </button>
        <button className="border border-green-500 shadow-md rounded-md box-border flex p-4  w-full h-12 left-6 top-36 items-center">
          <input
            type="radio"
            name="priority"
            value="Low"
            onChange={(e)=>{setPriority(e.target.value)}}
            style={{
              
              border: '1px solid #000',
              width:"10px",
              height:"10px"
            }}
            className="bg-blue-500 w-2 h-2 rounded-full mr-2"
          ></input>
          Least
        </button>
      </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                type="button"
                onClick={props.closeModal}
                class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-[#3F8CFF] focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={()=>{
                  props.closeModal()
                  createTicket()
                }}
                type="button"
                class="text-white bg-[#3F8CFF] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default TicketModal;
