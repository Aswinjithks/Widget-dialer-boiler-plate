import React from "react";
import search from "../../../assets/images/search.png";
import forward from "../../../assets/images/forward2.png";

function AgentSearch(props) {
  return (
    <>
      <div className="w-full p-[30px] flex flex-col gap-[30px] pt-[50px]">
        <div className="flex bg-[#242732] h-[50px] px-[15px] py-[14px] rounded-[10px]">
          <img src={search} alt="searchicon"></img>
          <input
            type="search"
            placeholder="search for agent"
            className="bg-[transparent] h-full px-[15px] py-[14px] w-full border-0 text-[#F3F8FF]"
          ></input>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-[#2F3044] text-white pl-[10px]"
            onClick={props.forward}
          >
            Cancel
          </button>
          <button
            className="bg-[#2F80ED] w-[153px] h-[50px] rounded-[10px] text-white flex items-center p-[15px] gap-[10px] opacity-50"
            disabled="true"
          >
            <img src={forward} alt="forward"></img>
            Forward Call
          </button>
        </div>
      </div>
    </>
  );
}

export default AgentSearch;
