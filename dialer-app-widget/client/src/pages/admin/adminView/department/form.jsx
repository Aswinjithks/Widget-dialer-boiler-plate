import React from "react";
import closeIcon from "../../../../assets/images/closeicon.svg";
import Input from "../../../../components/common/input";
import useDepartment from "./useDepartment";

const DepartmentForm = ({ setModal, modal, id }) => {
  const isEdit = !!id;
  const { formik } = useDepartment(isEdit, modal);
  return (
    <div className="">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative  my-6 w-[40%]">
          <form onSubmit={formik.handleSubmit} className="">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl font-semibold">
                  {isEdit ? "Edit" : "Add"} Department
                </h3>
                <button>
                  <button
                    type="button"
                    onClick={() => setModal({ show: false, id: "", name: "" })}
                  >
                    <img src={closeIcon} alt="" />
                  </button>
                </button>
              </div>
              <div className="relative p-6 flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <span className="text-[#404385]">Name</span>
                  <Input
                    id="dpt"
                    placeholder="Enter department name"
                    name="department"
                    value={formik.values.department}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    formik={formik}
                    className=" border border-primary-light shadow-md rounded-md box-border flex p-4 gap-4  w-full h-12 left-6 mb-5 top-36"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  type="button"
                  onClick={() => setModal({ show: false, id: "", name: "" })}
                  class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-[#3F8CFF] focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="text-white bg-[#3F8CFF] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default DepartmentForm;
