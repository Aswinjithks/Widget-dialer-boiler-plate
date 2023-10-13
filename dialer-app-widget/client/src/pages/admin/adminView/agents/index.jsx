import React, { useState } from "react";
import searchIcon from "../../../../assets/images/searchicon.svg";
import pencilIcon from "../../../../assets/images/pencil.svg";
import PrimaryButton from "../../../../components/common/button";
import useSearch from "../../../../hooks/common/useSearch";
import Modal from "react-modal";
import useAgent from "./useAgent";
import AgentForm from "./agentForm";

const Agents = () => {
  //search keywords
  const [searchKeyword, setSearchKeyword] = useState("");
  //searching agents by department name

  const [modal, setModal] = useState({
    show: false,
    id: "",
    username: "",
    department: "",
  });

  const { agentList } = useAgent();
  const searchAgentList = useSearch(agentList, "username", searchKeyword);

  const handleSearchKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <>
      <div className="p-[2%]">
        <h2 className="text-[1.3rem] font-medium leading-7 text-[#353945]">
          Agent
        </h2>
        <div className="flex items-center justify-between my-[1%]">
          <div className="flex items-center justify-between rounded w-[30%] bg-white border p-[4px] drop-shadow border-[#CFDEF4]">
            <img
              src={searchIcon}
              alt="search icon"
              className="w-[18px] ml-2 relative bottom-[1px]"
            />
            <input
              placeholder="Search for agents"
              type="text"
              className="focus:outline-none w-[90%] h-[30px]"
              onChange={handleSearchKeywordChange}
              value={searchKeyword}
            />
          </div>
          <PrimaryButton
            btnStyle="fill"
            label="New Agent"
            width="20%"
            onClick={() =>
              setModal({ show: true, id: "", username: "", department: "" })
            }
          />
        </div>

        {/* table wrapper */}
        <div className="max-h-[65vh] mt-[2%] overflow-hidden border-2 border-t-0 rounded-[8px] overflow-scroll">
          <table className="w-[100%] rounded-[8px]  max-h-[80%]">
            <thead className="rounded-[8px] sticky top-0 h-[56px]">
              <tr className="rounded-t-[8px]">
                <th className="bg-[#E7E7E7] first:rounded-tl-[8px] text-left pl-[24px] text-[0.9rem] font-normal first:w-[30%]">
                  Agent
                </th>
                <th className="bg-[#E7E7E7]  text-left p-[8px] pl-[24px] text-[0.9rem] font-normal">
                  Department
                </th>
                <th className="bg-[#E7E7E7] last:rounded-tr-[8px] text-left p-[8px] pl-[24px] text-[0.9rem] font-normal last:text-right last:pr-[24px] last:w-[10%]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {JSON.stringify(agentList?.result)}
              {agentList?.length > 0 ? (
                agentList
       
                  ?.map((agent, i) => (
                    <tr key={i}>
                      <td className="border-b h-[30px] py-[14px] pl-[24px] first:w-[30%]">
                        {agent?.username}
                      </td>
                      <td className="border-b h-[30px] py-[14px] pl-[24px]">
                        <span className="border-2 border-[#CFDEF4] rounded-[8px] p-[8px] font-[300] text-[1rem] drop-shadow-[0_35px_35px_rgba(207, 222, 244, 1)]">
                          {agent?.department}
                        </span>
                      </td>
                      <td className="border-b h-[30px] py-[14px] pl-[24px] last:text-right last:pr-[30px] last:w-[10%]">
                        <button
                          onClick={() =>
                            setModal({
                              show: true,
                              id: agent.id,
                              username: agent.username,
                              department: agent.department,
                            })
                          }
                          className="border-2 border-[#CFDEF4] rounded-[8px] p-[8px] drop-shadow-[0_35px_35px_rgba(207, 222, 244, 1)]"
                        >
                          <img src={pencilIcon} alt="edit icon" className="" />
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="border-b h-[30px] py-[14px] text-center"
                  >
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Todo pagination styling pending */}
          {/* <div className="text-[#6B6B6B] flex justify-between items-center sticky bottom-0 bg-white h-[58px] border-t-2 py-[14px] px-[12px]">
            <div className="flex items-center justify-start">
              <p className="text-[#6B6B6B]">Show rows per page</p>
            </div>
            <div className="w-[10%] flex justify-between">
              <button>{"<"}</button>
              <button>1</button>
              <button>2</button>
              <button>3</button>
              <button>{">"}</button>
            </div>
          </div> */}
        </div>

        <Modal
          isOpen={modal?.show}
          onRequestClose={() =>
            setModal({ show: false, id: "", username: "", department: "" })
          }
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <AgentForm modal={modal} setModal={setModal} />
        </Modal>
      </div>
    </>
  );
};

export default Agents;
