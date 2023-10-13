import React, { useState } from "react";
import DropDown from "../../../../components/common/dropDown";
import Input from "../../../../components/common/input";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "../../../../components/common/button";

import useAgent from "./useAgent";
const AgentForm = ({ setModal, modal }) => {
  const { departmentList, formik } = useAgent(modal?.id, modal);

  const isEdit = !!modal?.id;

  return (
    <>
      <div className="flex items-center justify-between">
        {" "}
        <h2 className="text-[1.3rem] font-medium leading-7 text-[#353945]">
          {isEdit ? "Edit" : "Add"} New Agent
        </h2>
        <button
          onClick={() =>
            setModal({ show: false, id: "", username: "", department: "" })
          }
        >
          {" "}
          <XMarkIcon className="h-5 w-5" />{" "}
        </button>
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-[5%]">
        <div className="form-wrapper w-[50%]">
          <DropDown
            id="selectDpt"
            label="Department"
            name="department"
            placeholder="Choose your department"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.department}
            options={departmentList}
            formik={formik}
          />
          <Input
            id="agentUserNameInp"
            label="Username"
            placeholder="Enter username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            formik={formik}
          />
          <Input
            id="agentCreatePassInp"
            label="Create Password"
            placeholder="Enter password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            formik={formik}
          >
            <EyeSlashIcon className={`h-5 w-5`} />
            <EyeIcon className={`h-5 w-5`} />
          </Input>
          <Input
            id="agentConfirmPassInp"
            label="Re-enter Password"
            placeholder="adarsh@123"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            formik={formik}
          >
            <EyeSlashIcon className={`h-5 w-5`} />
            <EyeIcon className={`h-5 w-5`} />
          </Input>
        </div>

        <div className="btn-container my-[2%] flex items-center justify-end">
          <PrimaryButton
            type="reset"
            label="Cancel"
            width="20%"
            btnStyle="outline"
            onClick={() => setModal({ show: false })}
          />
          {isEdit ? (
            <PrimaryButton label="Update" width="20%" />
          ) : (
            <PrimaryButton label="Create" width="20%" />
          )}
        </div>
      </form>
    </>
  );
};

export default AgentForm;
