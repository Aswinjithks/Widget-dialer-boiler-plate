import React, { useState, useEffect } from "react";
import ticket from "../../../assets/images/ticketIcon.svg";
import missedIcon from "../../../assets/images/missedIcon.svg";
import assigneeArrow from "../../../assets/images/assigneeArrow.svg";
import leftArrow from "../../../assets/images/leftArrow.svg";
import rightArrow from "../../../assets/images/rightArrow.svg";
import medium from "../../../assets/images/medium.svg";
import CallHeader from "./callHeader";
import { PRIVATE } from "../../../routes/routes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ROLES from "../../../config/roles";

const Tickets = () => {
  const { user } = useSelector((store) => store.user);

  const [details, setDetails] = useState([]);
  useEffect(() => {
    getDetails();
  }, []);
  const navigate = useNavigate();

  const getDetails = async () => {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    };

    let response = await fetch(
      "https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001",
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();

    setDetails(data);
  };
  return (
    <div>
      <table className="table-auto rounded-[10px] truncate border-separate  w-[100%] border-[1px] border-solid  mt-[20px] border-spacing-0 bg-[#ffff]">
        <thead>
          <tr className="text-left h-[56px] text-[#6B6B6B] bg-[#FBFAFA] rounded-[16px]">
            <th className="border-b-[1px] border-solid border-[#E7E7E7] px-4 pl-8">
              <span className="flex gap-[10px]">
                Contact <img alt="sdf" src={assigneeArrow} />
              </span>
            </th>
            <th className="border-b-[1px] border-solid border-[#E7E7E7] px-4">
              Ticket
            </th>
            <th className="border-b-[1px] border-solid border-[#E7E7E7] px-4">
              <span className="flex gap-[10px]">
                Assignee <img alt="sdf" src={assigneeArrow} />
              </span>
            </th>
            <th className="border-b-[1px] border-solid border-[#E7E7E7] px-4">
              {" "}
              <span className="flex gap-[10px]">
                Department <img src={assigneeArrow} />
              </span>
            </th>
            <th className="border-b-[1px] border-solid border-[#E7E7E7] px-4">
              <span className="flex gap-[10px]">
                Priority <img src={assigneeArrow} />
              </span>
            </th>
            <th className="border-b-[1px] border-solid border-[#E7E7E7] px-4">
              <span className="flex gap-[10px]">
                Status <img src={assigneeArrow} />
              </span>
            </th>
            <th className="border-b-[1px] border-solid border-[#E7E7E7] text-right px-4 pr-8">
              Time
            </th>
          </tr>
        </thead>

        <tbody className="border-collapse border-[1px] border-solid rounded-[16px] text-[#6B6B6B] ">
          {details.map((item) => (
            <tr
              className="h-[70px]"
              onClick={() => {
                if (user.userType === ROLES.ADMIN) {
                  navigate(
                    `/${
                      PRIVATE.ADMIN.ADMIN_BASE_PATH
                    }/${PRIVATE.ADMIN.PAGES.CALL_LOGS_DETAILS.replace(
                      ":id",
                      item?.id
                    )}`
                  );
                }
                if (user.userType === ROLES.AGENT) {
                  navigate(
                    `/${
                      PRIVATE.AGENT.AGENT_BASE_PATH
                    }/${PRIVATE.AGENT.PAGES.CALL_LOGS_DETAILS.replace(
                      ":id",
                      item?.id
                    )}`
                  );
                }
              }}
            >
              <td className="px-4 pl-8 border-b-[1px] border-solid border-[#E7E7E7]">
                <span className="flex">
                  {/* {console.log("item00", item)} */}
                  {item.firstName} {item.lastName}
                </span>
                <span className="text-[#EB9557] flex">
                  {" "}
                  <img alt="ds" src={missedIcon} />
                  Missed Call
                </span>
              </td>

              <td className="px-4 border-b-[1px] border-solid border-[#E7E7E7]">
                <span className="bg-[#F1F1F1] border-[1px] border-solid rounded-xl inline-flex items-center pl-[14px] pr-[16px] h-[39px] gap-[5px]">
                  {" "}
                  <img alt="dff" src={ticket} className="h-[11px]" />
                  <span className="text-[#3F8CFF]">#</span>{" "}
                  <span className="text-[#6B6B6B]">1234567</span>
                </span>
              </td>

              {/* <td className="px-4 border-b-[1px] border-solid border-[#E7E7E7]">
                                20min
                            </td> */}
              <td className="px-4 border-b-[1px] border-solid border-[#E7E7E7]">
                Mammootty
              </td>
              <td className="px-4 border-b-[1px] border-solid border-[#E7E7E7]">
                Marketing
              </td>
              <td className="px-4 border-b-[1px] border-solid border-[#E7E7E7]">
                <span className="flex text-center item-center gap-2">
                  <img src={medium} alt="" />
                  Medium
                </span>
              </td>
              <td className="px-4 border-b-[1px] border-solid border-[#E7E7E7] ">
                <select className="flex item-center border-2 border-solid border-[#E2B93B] text-[#E2B93B] gap-1.5 rounded-1.25 rounded-[1.5rem] w-[7.25rem] h-[2.438rem] items-center px-3 text-base bg-[#e2b93b1a]">
                  <option value="open">Pending</option>{" "}
                  <option value="open">Open</option> <img src={assigneeArrow} />
                </select>
              </td>

              {/* <td className="px-4 border-b-[1px] border-solid border-[#E7E7E7] ">
                                <select className="flex item-center border-2 border-solid border-[#E2B93B] text-[#27AE60] gap-1.5 rounded-1.25 rounded-[1.5rem] w-[7.25rem] h-[2.438rem] items-center px-3 text-base bg-[#27ae601a]">
                                    <option value="open">Pending</option>{" "}
                                    <option value="open">Open</option>{" "}
                                    <img src={assigneeArrow} />
                                </select>
                            </td> */}
              <td className="text-right px-4 pr-8 border-b-[1px] border-solid border-[#E7E7E7]">
                <span className="block">3:23pm</span>
                <span>May 22, 2023</span>
              </td>
            </tr>
          ))}
        </tbody>

        {/* Table footer section */}
        <tfoot className="bg-[#FFFFFF] h-[75px]">
          <tr>
            <td colSpan={7}>
              <div className="flex justify-between">
                <div className="pl-8  h-[39px] text-[#6B6B6B]  gap-[11px] flex ">
                  show rows per page
                  <span className="bg-[#F1F1F1] border-[1px] border-solid rounded-[0.625rem] inline-flex items-center gap-[10px] w-[64px] border-[#F1F1F1] justify-center">
                    10
                    <img src={assigneeArrow} />
                  </span>
                </div>
                <div>
                  <span className="flex list-none text-[#6B6B6B] px-4 pl-8">
                    <img src={leftArrow} />
                    <li className="ml-[15px]">1</li>
                    <li className="ml-[6px]">2</li>
                    <li className="ml-[6px]">3</li>
                    <li className="ml-[6px]">4</li>
                    <li className="ml-[6px]">..</li>
                    <li className="mr-[14px]">10</li>
                    <img src={rightArrow} className="mr-[32px]" />
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

export default Tickets;
