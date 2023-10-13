import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TelePhone from "../../assets/tele-phone.svg";
import SearchIcon from "../../assets/search-icon.svg";
import useWelcome from "./useWelcome";
import { AUTH } from "../../routes/routes";

const Welcome = () => {
  const { name, setName, blur, setBlur } = useWelcome()
  const navigate = useNavigate()
  return (
    <div className="container py-10 px-10 mt-20 mx-0 flex min-w-full flex-col items-center">
      <div className="">
        <img src={TelePhone} alt="Phone-icon" />
      </div>
      <div className="text-center">
        <h1 className="font-medium leading-8 text-2xl">
          Welcome to <span className="text-sky-600">CallerCloud</span>
        </h1>
        <p className="text-indigo-900 font-normal text-base space-y-1 leading-6 tracking-wider">
          Search our knowledge base or call us directly for any enquiry
          {/* {process?.env?.REACT_APP_API_BASE_URL} */}
        </p>
      </div>
      <div className="mt-12 text-indigo-900">
        <h4 className="font-medium text-base">Name</h4>
        <div className="relative">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setBlur(true)}
            className="item-center rounded-lg w-[286px] h-[50px] p-3.5  border border-blue-300"
            type="text"
            placeholder="Enter your Name"
          />
          {blur && name === "" && <p className="text-[red]">Name is required</p>}
        </div>
      </div>
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        {/* <span className="flex-shrink mx-4 text-gray-400">OR</span> */}
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      {/* <Link to="/auth/mobile"> */}
      <button className="w-[286px] h-[50px] rounded-lg bg-sky-600 text-gray-50" type="button" disabled={name === "" ? true : false} onClick={() => {
        navigate(`${AUTH.BASE_PATH}/${AUTH.PAGES.MOBILE}`, { state: { name } })
      }}>
        Make a quick call
      </button>
      {/* </Link> */}
    </div>
  );
};

export default Welcome;
