import React, { useState } from 'react';
import DownArrow from '../../../../assets/images/downarrow.png';
import Search from "../../../../assets/images/Search 2.png";
export default function Routing() {
  const [selectedValue, setSelectedValue] = useState('');
  const [isMenuOpen1, setIsMenuOpen1] = useState(false);
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const [isMenuOpen3, setIsMenuOpen3] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const options = [
    { label: 'Department 1', value: 'dept1', type: 'Department' },
    { label: 'Department 2', value: 'dept2', type: 'Department' },
    { label: 'Department 3', value: 'dept3', type: 'Department' },
    { label: 'Agent 1', value: 'agent1', type: 'Agent' },
    { label: 'Agent 2', value: 'agent2', type: 'Agent' },
    { label: 'Agent 3', value: 'agent3', type: 'Agent' },
  ];

  const toggleMenu1 = () => {
    setIsMenuOpen1(!isMenuOpen1);
  };

  const toggleMenu2 = () => {
    setIsMenuOpen2(!isMenuOpen2);
  };

  const toggleMenu3 = () => {
    setIsMenuOpen3(!isMenuOpen3);
  };
  const handleOptionClick = (value) => {
    setSelectedValue(value);
    
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <div className="h-[65px] flex items-center w-[100%]">
        <h1 className="text-indigo-900 text-2xl font-semibold leading-7">
          Routing
        </h1>
      </div>
      <h3 className="text-indigo-900 text-base font-medium">International Calls</h3>


      <div className="flex border-2 p-3 rounded-[10px] border-[#CFDEF4] relative">
        <div
          className="w-[100%] outline-none cursor-pointer"
          onClick={toggleMenu1}
        >
          <input
            type="text"
            className={`w-[100%] outline-none ${
              isMenuOpen1 ? 'border-b-0 rounded-t-[10px]' : 'rounded-[10px]'
            }`}
            placeholder="Choose Department/Agent"
            value={selectedValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div
          className="w-[20%] flex justify-end cursor-pointer"
          onClick={toggleMenu1}
        >
          <img src={DownArrow} className="w-[20px] h-[20px]" alt="downArrow" />
        </div>
        {isMenuOpen1 && (
          <div className="absolute left-0 top-[60px] z-10 w-[100%] h-[351px] border-[2px] border-[#CFDEF4] rounded-[10px] bg-white p-2 overflow-y-scroll">
            <div className="flex p-1 items-center justify-center border-[1px] border-[#CFDEF4] rounded-[10px]">
            <div className="w-[20%] flex items-center justify-center">
                <img src={Search} alt="search" />
            </div>
            <div className="w-[80%]">
            <input
              type="text"
              className="w-[100%] outline-none p-2 rounded-t-[10px]"
              placeholder="Search for departments or agents"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            </div>
            </div>
            <div className="">
              <div className="text-base text-[#8F8F8F]">Department</div>
              {filteredOptions
                .filter((option) => option.type === 'Department')
                .map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleOptionClick(option.value)}
                    className="hover:bg-[#F3F8FF] h-[50px] rounded-[10px] flex justify-between p-4 items-center"
                  >
                    {option.label}
                  </div>
                ))}
              <div className="text-base text-[#8F8F8F]">Agent</div>
              {filteredOptions
                .filter((option) => option.type === 'Agent')
                .map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleOptionClick(option.value)}
                    className="hover:bg-[#F3F8FF] h-[50px] rounded-[10px] flex justify-between p-4 items-center"
                  >
                    {option.label}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
<br />
      <h3 className="text-indigo-900 text-base font-medium">Other Destination Calls</h3>

      <div className="flex border-2 p-3 rounded-[10px] border-[#CFDEF4] relative">
        <div
          className="w-[100%] outline-none cursor-pointer"
          onClick={toggleMenu2}
        >
          <input
            type="text"
            className={`w-[100%] outline-none ${
              isMenuOpen3 ? 'border-b-0 rounded-t-[10px]' : 'rounded-[10px]'
            }`}
            placeholder="Choose Department/Agent"
            value={selectedValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div
          className="w-[20%] flex justify-end cursor-pointer"
          onClick={toggleMenu2}
        >
          <img src={DownArrow} className="w-[20px] h-[20px]" alt="downArrow" />
        </div>
        {isMenuOpen2 && (
          <div className="absolute left-0 top-[60px] z-10 w-[100%] h-[351px] border-[2px] border-[#CFDEF4] rounded-[10px] bg-white p-2 overflow-y-scroll">
            <div className="flex p-1 items-center justify-center border-[1px] border-[#CFDEF4] rounded-[10px]">
            <div className="w-[20%] flex items-center justify-center">
                <img src={Search} alt="search" />
            </div>
            <div className="w-[80%]">
            <input
              type="text"
              className="w-[100%] outline-none p-2 rounded-t-[10px]"
              placeholder="Search for departments or agents"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            </div>
            </div>
            <div className="">
              <div className="text-base text-[#8F8F8F]">Department</div>
              {filteredOptions
                .filter((option) => option.type === 'Department')
                .map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleOptionClick(option.value)}
                    className="hover:bg-[#F3F8FF] h-[50px] rounded-[10px] flex justify-between p-4 items-center"
                  >
                    {option.label}
                  </div>
                ))}
              <div className="text-base text-[#8F8F8F]">Agent</div>
              {filteredOptions
                .filter((option) => option.type === 'Agent')
                .map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleOptionClick(option.value)}
                    className="hover:bg-[#F3F8FF] h-[50px] rounded-[10px] flex justify-between p-4 items-center"
                  >
                    {option.label}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
<br />
      <h3 className="text-indigo-900 text-base font-medium">Undetected Calls</h3>

<div className="flex border-2 p-3 rounded-[10px] border-[#CFDEF4] relative">
  <div
    className="w-[100%] outline-none cursor-pointer"
    onClick={toggleMenu3}
  >
    <input
      type="text"
      className={`w-[100%] outline-none ${
        isMenuOpen3 ? 'border-b-0 rounded-t-[10px]' : 'rounded-[10px]'
      }`}
      placeholder="Choose Department/Agent"
      value={selectedValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
  </div>
  <div
    className="w-[20%] flex justify-end cursor-pointer"
    onClick={toggleMenu3}
  >
    <img src={DownArrow} className="w-[20px] h-[20px]" alt="downArrow" />
  </div>
  {isMenuOpen3 && (
    <div className="absolute left-0 top-[60px] z-10 w-[100%] h-[351px] border-[2px] border-[#CFDEF4] rounded-[10px] bg-white p-2 overflow-y-scroll">
      <div className="flex p-1 items-center justify-center border-[1px] border-[#CFDEF4] rounded-[10px]">
      <div className="w-[20%] flex items-center justify-center">
          <img src={Search} alt="search" />
      </div>
      <div className="w-[80%]">
      <input
        type="text"
        className="w-[100%] outline-none p-2 rounded-t-[10px]"
        placeholder="Search for departments or agents"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      </div>
      </div>
      <div className="">
        <div className="text-base text-[#8F8F8F]">Department</div>
        {filteredOptions
          .filter((option) => option.type === 'Department')
          .map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="hover:bg-[#F3F8FF] h-[50px] rounded-[10px] flex justify-between p-4 items-center"
            >
              {option.label}
            </div>
          ))}
        <div className="text-base text-[#8F8F8F]">Agent</div>
        {filteredOptions
          .filter((option) => option.type === 'Agent')
          .map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="hover:bg-[#F3F8FF] h-[50px] rounded-[10px] flex justify-between p-4 items-center"
            >
              {option.label}
            </div>
          ))}
      </div>
    </div>
  )}
</div>

    </>
  );
}
