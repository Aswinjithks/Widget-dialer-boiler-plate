import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ticket from "../../../assets/images/ticketIcon.svg";
import assigneeArrow from "../../../assets/images/assigneeArrow.svg";
import leftArrow from "../../../assets/images/leftArrow.svg";
import rightArrow from "../../../assets/images/rightArrow.svg";
import missedIcon from "../../../assets/images/missedIcon.svg";
import { useNavigate } from "react-router-dom";
import { PRIVATE } from "../../../routes/routes";
import AdminService from "../../../services/admin.service";
import ROLES from "../../../config/roles";

const CallBody = () => {
  const { user } = useSelector((store) => store.user);
  console.log("user-----", user);

  const [details, setDetails] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(10);
  useEffect(() => {
    getDetails();
  }, [selectedValue , currentPage]);
  useEffect(() => {
    // Recalculate total pages when selectedValue changes
    const totalItems = details.length;
    const itemsPerPage = selectedValue;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(totalPages);
  }, [selectedValue]);
  const navigate = useNavigate();
  const getDetails = async () => {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    };

    let response = await AdminService.getCallDetails({currentPage,selectedValue});
    let data = response?.data?.callDetails;
    setDetails(data);

    const filter = data.filter((item) => item.to === user.userName);
    setFilteredData(filter);
    const totalItems = response.data.totalCount;
    const itemsPerPage = selectedValue;
    const totallPages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(totallPages);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div>
      <table className="table-auto rounded-[10px] truncate border-separate  w-[100%] border-[1px] border-solid  mt-[20px] border-spacing-0 bg-[#ffff]">
        <thead>
          <tr className="text-left h-[56px] text-[#6B6B6B] bg-[#FBFAFA] rounded-[16px]">
            <th className="border-b-[1px] border-solid border-[#E7E7E7] px-4 pl-8">
              <span className="flex gap-[10px]">
                Contact
                <img alt="sdf" src={assigneeArrow} />
              </span>
            </th>
            <th className="border-b-[1px] border-solid border-[#E7E7E7] px-4">
              Duration
            </th>

            <th className="border-b-[1px] border-solid border-[#E7E7E7] px-4">
              <span className="flex gap-[10px]">
                Assignee
                <img alt="sdf" src={assigneeArrow} />
              </span>
            </th>
            <th className="border-b-[1px] border-solid border-[#E7E7E7] px-4">
              {" "}
              <span className="flex gap-[10px]">
                Department
                <img src={assigneeArrow} />
              </span>
            </th>
            <th className="border-b-[1px] border-solid border-[#E7E7E7] px-4">
              Ticket
            </th>
            <th className="border-b-[1px] border-solid border-[#E7E7E7] text-right px-4 pr-8">
              Time
            </th>
          </tr>
        </thead>

        <tbody className="border-collapse border-[1px] border-solid rounded-[16px] text-[#6B6B6B] ">
          {(user.userType === "admin" ? details : filteredData).map((item) => (
            <tr
              className="h-[70px]"
              onClick={() => {
                navigate(
                  `/${
                    PRIVATE.ADMIN.ADMIN_BASE_PATH
                  }/${PRIVATE.ADMIN.PAGES.CALL_LOGS_DETAILS.replace(
                    ":id",
                    item?.id
                  )}`
                );
              }}
            >
              
              <td className="px-4 pl-8 border-b-[1px] border-solid border-[#E7E7E7]">
                <span className="flex">
                  {/* {console.log("item00", item)} */}
                  {item.from}
                </span>
                {/* <span className="text-[#EB9557] flex">
                                        {" "}
                                        <img alt="ds" src={missedIcon} />
                                        Missed Call
                                    </span> */}
              </td>

              {/* <td className="px-4 pl-8 border-b-[1px] border-solid border-[#E7E7E7]">
                                <span className="flex">
                                    {console.log("item00", item)}
                                    {item.firstName} {item.lastName}
                                </span>
                                <span className="text-[#27AE60] flex gap-[0.281rem]">
                                    {" "}
                                    <img src={answered} alt="" />
                                    Answered
                                </span>
                            </td> */}

              <td className="px-4 border-b-[1px] border-solid border-[#E7E7E7]">
                {item.duration}
              </td>
              <td className="px-4 border-b-[1px] border-solid border-[#E7E7E7]">
                {item.to}
              </td>
              <td className="px-4 border-b-[1px] border-solid border-[#E7E7E7]">
                {item.department}
              </td>

              <td className="px-4 border-b-[1px] border-solid border-[#E7E7E7]">
                <span className="bg-[#F1F1F1] border-[1px] border-solid rounded-xl inline-flex items-center pl-[14px] pr-[16px] h-[39px] gap-[5px]">
                  {" "}
                  <img alt="dff" src={ticket} className="h-[11px]" />
                  <span className="text-[#3F8CFF]">#</span>{" "}
                  <span className="text-[#6B6B6B]">{item.ticket}</span>
                </span>
              </td>
              <td className="text-right px-4 pr-8 border-b-[1px] border-solid border-[#E7E7E7]">
                <span className="block">{item.time}</span>
                <span>{item.date}</span>
              </td>
            </tr>
          ))}
        </tbody>

        {/* Table footer section */}
        <tfoot className="bg-[#FFFFFF] h-[75px]">
          <tr>
            <td colSpan={6}>
              <div className="flex justify-between">
                <div
                  className="pl-8 h-[39px] text-[#6B6B6B] gap-[11px] flex relative"
                  style={{ minHeight: isOpen ? "25vh" : "39px" }}
                >
                  show rows per page
                  <div className="relative inline-block">
                    <button
                      className="bg-[#F1F1F1] border-[1px] border-solid rounded-[0.625rem] inline-flex items-center gap-[10px] w-[64px] border-[#F1F1F1] justify-center"
                      onClick={toggleDropdown}
                    >
                      {selectedValue}
                      <img src={assigneeArrow} alt="Arrow" />
                    </button>
                    {isOpen && (
                      <ul className="absolute left-0 mt-1 w-[64px] bg-white border border-gray-300 rounded-md shadow-lg">
                        <li
                          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                          onClick={() => handleOptionSelect(10)}
                        >
                          10
                        </li>
                        <li
                          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                          onClick={() => handleOptionSelect(20)}
                        >
                          20
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
                <div>
                  <span className="flex list-none text-[#6B6B6B] px-4 pl-8">
                    <div>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          <span className="px-1">{index + 1}</span>
                        </button>
                      ))}
                    </div>
                  </span>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CallBody;
