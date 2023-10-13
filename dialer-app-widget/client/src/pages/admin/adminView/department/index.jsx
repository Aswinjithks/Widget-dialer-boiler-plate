import React, { useState } from "react";
import searchIcon from "../../../../assets/images/searchicon.svg";
import Tags from "../../../../components/admin/tags";
import editIcon from "../../../../assets/images/editIcon.svg";
import PrimaryButton from "../../../../components/common/button";
import useDepartment from "./useDepartment";
import DepartmentForm from "./form";
import useAgent from "../agents/useAgent";

const Department = () => {
  const [modal, setModal] = useState({ show: false, id: "", name: "" });
  const { departmentList, formik, deleteAgent,agentList } = useDepartment();
  const isEdit = !!modal?.id;


  return (
    <>
      <div className=" w-full h-[100vh] p-8">
        <p className="font-medium text-2xl">Departments</p>

        <div className="flex justify-between  space-x1">
          <div className="pt-5 w-80 items-start items-center">
            {/* <div className="search-bar bg-white border border-gray-300 flex items-center gap-4 px-3 py-1 w-full max-w-sm rounded-lg shadow-sm">
              <div className="search-icon flex items-center justify-center w-5 h-12 rounded-full">
                <img src={searchIcon} alt="search icon" />
              </div>
              <input
                type="text"
                placeholder="Search for anything"
                className="font-medium text-gray-700 w-full focus:outline-none"
              />
            </div> */}
          </div>

          <div className="items-end pt-5 items-center ">
            <PrimaryButton
              btnStyle="fill"
              label="New Department"
              width="50"
              onClick={() => {
                setModal({ show: true, id: "", name: "" });
              }}
            />
          </div>
        </div>

        <div className="border mt-[20px] border-solid border-[#E7E7E7] rounded-t-lg">
          <table class="table-auto w-full divide-y text-left  ">
            <thead className="bg-[#FBFAFA]  h-14 ">
              <tr>
                <th className="p-4 font-normal text-[#6B6B6B]">Department</th>
                <th className="p-4 font-normal text-[#6B6B6B]">Members</th>
                <th className="p-4 font-normal text-[#6B6B6B]">Action</th>
              </tr>
            </thead>
            <tbody>
              {departmentList.map((item) => (
                <tr className="border-b">
                  <td className="p-4 text-[#6B6B6B]">{item.name}</td>
                  <td className="p-4 flex text-[#6B6B6B]">                
                    {agentList?.length > 0 &&  agentList
                      .filter((agentData) => agentData.department === item.name).length
                      // .map((agent) => (
                      //   <Tags
                      //     name={agent.username}
                      //     id={agent.id}
                      //     onCloseClicked={deleteAgent}
                      //   />
                      // ))

                      }
                  </td>
                  <td className="p-4 ">
                    <div className="flex ">
                      <button
                        onClick={() =>
                          setModal({ show: true, id: item.id, name: item.name })
                        }
                        className="bg-[white] border border-[#CFDEF4] flex items-center justify-center  rounded-lg w-12 h-12"
                      >
                        <img src={editIcon} width={25} height={25} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-[50%]">
        {modal?.show === true && (
          <DepartmentForm setModal={setModal} modal={modal} id={modal?.id} />
        )}
      </div>
    </>
  );
};

export default Department;
