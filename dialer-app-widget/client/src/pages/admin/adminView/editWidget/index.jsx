import React, { useState } from "react";
import Enabled from "../../../../assets/images/enabled.png";
import Disabled from "../../../../assets/images/disabled.png";
import pencilIcon from "../../../../assets/images/pencil.svg";
import CustomModal from "./customModal";
import { useEditWidget } from "./useEditWidget";
function EditWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, prev, next } =
    useEditWidget([<h1>One</h1>, <h1>two</h1>, <h1>three</h1>]);
  const handleModalClose = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="p-4 flex justify-between">
        <h1 className="text-2xl">Widgets</h1>
        <button
          onClick={handleModalClose}
          className="bg-[#3F8CFF] w-[100] h-[50] p-4 rounded-[10px] text-white cursor-pointer hover:bg-blue-500 transition-all delay-[0.1s] ease"
        >
          Generate Widget
        </button>
      </div>
      <div className="max-h-[65vh] mt-[2%]  border-2 border-t-0 rounded-[8px] overflow-scroll">
        <table className="w-[100%] rounded-[8px]  max-h-[80%]">
          <thead className="rounded-[8px] sticky top-0 h-[56px]">
            <tr className="rounded-t-[8px]">
              <th className="bg-[#E7E7E7] first:rounded-tl-[8px] text-left pl-[24px] text-[0.9rem] font-normal first:w-[30%]">
                Widget Name
              </th>
              <th className="bg-[#E7E7E7]  text-left p-[8px] pl-[24px] text-[0.9rem] font-normal">
                Widget ID
              </th>
              <th className="bg-[#E7E7E7]  text-left p-[8px] pl-[24px] text-[0.9rem] font-normal">
                Status
              </th>
              <th className="bg-[#E7E7E7] last:rounded-tr-[8px] text-left p-[8px] pl-[24px] text-[0.9rem] font-normal last:text-right last:pr-[24px] last:w-[10%]">
                Action
              </th>
            </tr>
          </thead>
          <tr>
            <td className="border-b h-[30px] py-[14px] pl-[24px] first:w-[30%]">
              Sales
            </td>
            <td className="border-b h-[30px] py-[14px] pl-[24px]">Sales 123</td>
            <td>
              <img
                className=" py-[14px] pl-[24px] "
                src={Enabled}
                alt="enabled"
              />
            </td>
            <td className="border-b h-[30px] py-[14px] pl-[24px] last:text-right last:pr-[30px] last:w-[10%]">
              <button className="border-2 border-[#CFDEF4] rounded-[8px] p-[8px] drop-shadow-[0_35px_35px_rgba(207, 222, 244, 1)]">
                <img src={pencilIcon} alt="edit" />
              </button>
            </td>
          </tr>
          <tr>
            <td className="border-b h-[30px] py-[14px] pl-[24px] first:w-[30%]">
              Finance
            </td>
            <td className="border-b h-[30px] py-[14px] pl-[24px]">
              Finance123
            </td>
            <td>
              <img
                className=" py-[14px] pl-[24px] "
                src={Enabled}
                alt="enabled"
              />
            </td>
            <td className="border-b h-[30px] py-[14px] pl-[24px] last:text-right last:pr-[30px] last:w-[10%]">
              <button className="border-2 border-[#CFDEF4] rounded-[8px] p-[8px] drop-shadow-[0_35px_35px_rgba(207, 222, 244, 1)]">
                <img src={pencilIcon} alt="edit" />
              </button>
            </td>
          </tr>
          <tr>
            <td className="border-b h-[30px] py-[14px] pl-[24px] first:w-[30%]">
              Marketing
            </td>
            <td className="border-b h-[30px] py-[14px] pl-[24px]">
              Marketing123
            </td>
            <td>
              <img
                className=" py-[14px] pl-[24px] "
                src={Disabled}
                alt="disabled"
              />
            </td>
            <td className="border-b h-[30px] py-[14px] pl-[24px] last:text-right last:pr-[30px] last:w-[10%]">
              <button className="border-2 border-[#CFDEF4] rounded-[8px] p-[8px] drop-shadow-[0_35px_35px_rgba(207, 222, 244, 1)]">
                <img src={pencilIcon} alt="edit" />
              </button>
            </td>
          </tr>
        </table>
      </div>
      {isOpen && (
        <CustomModal isOpen={isOpen} closeModal={closeModal}>
          {step}
        </CustomModal>
      )}
    </>
  );
}

export default EditWidget;
