import React, { useState } from "react";
import dropDownArrow from "../../../assets/images/dropdownarrow.svg";

const Dropdown = (props) => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="border border-primary-light shadow-md rounded-md box-border flex p-4  w-full h-12 left-6 top-36 items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-500">
          {selectedOption ? selectedOption.label : "Select an option"}
        </span>
        <img src={dropDownArrow} alt="" />
      </div>
      {isOpen && (
        <div className="absolute top-full right-0 w-56 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          {options.map((option) => (
            <div
              key={option.value}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              onClick={ (e) => {
                handleOptionClick(option)
                
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
