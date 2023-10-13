import React from "react";
import { useState } from "react";

const Prioritybuttons = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleRadioChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <div class="flex space-x-4">
        <button className="border border-primary-light shadow-md rounded-md box-border flex p-4  w-full h-12 left-6 top-36 items-center">
          <input
            type="radio"
            name="priority"
            onChange={handleRadioChange}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              border: '1px solid #000',
              // backgroundColor: isChecked ? "red" : "transparent",
              width:"10px",
              height:"10px"
            }}
            className="bg-red-500 w-2 h-2 rounded-full mr-2"
          ></input>
          High
        </button>
        <button className="border border-primary-light shadow-md rounded-md box-border flex p-4  w-full h-12 left-6 top-36 items-center">
          <input
            type="radio"
            name="priority"
            onChange={handleRadioChange}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              border: '1px solid #000',
              // backgroundColor: isChecked ? "yellow" : "transparent",
              width:"10px",
              height:"10px"
            }}
            className="bg-green-500 w-2 h-2 rounded-full mr-2"
          ></input>
          Medium
        </button>
        <button className="border border-primary-light shadow-md rounded-md box-border flex p-4  w-full h-12 left-6 top-36 items-center">
          <input
            type="radio"
            name="priority"
            onChange={handleRadioChange}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              border: '1px solid #000',
              // backgroundColor: isChecked ? "green" : "transparent",
              width:"10px",
              height:"10px"
            }}
            className="bg-blue-500 w-2 h-2 rounded-full mr-2"
          ></input>
          Least
        </button>
      </div>
    </div>
  );
};

export default Prioritybuttons;
