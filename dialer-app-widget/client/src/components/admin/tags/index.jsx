import React from "react";
import closingIcon from "../../../assets/images/closingIcon.svg";

const Tags = ({ name, id, onCloseClicked }) => {
  return (
    <div class="flex justify-start h-12 ">
      <div class="flex h-full mr-2.5  items-center justify-center border-solid border border-[#CFDEF4] rounded-lg  shadow-md">
        <p className="p-0 m-0   text-center">{name}</p>
        <button
          onClick={() => onCloseClicked(id)}
          className=" bg-red-100  rounded-r-lg  w-8 h-full flex items-center justify-center"
        >
          <img
            src={closingIcon}
            className=" p-0"
            alt=""
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default Tags;
