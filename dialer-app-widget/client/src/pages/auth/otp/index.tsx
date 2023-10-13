import React from "react";
import { Link } from "react-router-dom";
import moreIcon from "../../../assets/images/backIcon-left.png";
import useOtp from "./useOtp";
import Input from "../../../components/common/input";

const Otp = () => {
    const { formik } = useOtp();
    return (
        <div className="right-column">
            <div className="mb-[70px] ">
                <h6 className="inline-flex gap-3 h-[12px] items-center">
                    <img src={moreIcon} />
                    Back
                </h6>
            </div>
            <div className="top">
                <h1 className="font-medium text-[40px]">Email Verification</h1>
                <p className="mb-[60px] text-[#404385] text-xl">
                    We have sent you One Time Password to your email-id
                </p>
            </div>

            <div className="form-control">
                <form action="" onSubmit={formik.handleSubmit}>
                    <Input
                        id="userOtpInp"
                        label="Email Verification Code"
                        placeholder="Enter your name"
                        name="otp"
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        formik={formik}
                        className="mt-1 mb-[12px] block w-full px-3 h-[50px] bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
 "
                    />
                    <div className="mt-[12px] text-right">
                        <span>00:25</span>
                    </div>
                    <button className="w-[100%] bg-[#3F8CFF] text-[#FFFFFF] rounded-[10px] h-[50px] mb-[24px] mt-[22px]">
                        Sign In
                    </button>
                </form>
            </div>

            <div className="create-account">
                <p className="text-[16px] text-[#404385] text-right mb-[150px]">
                    Didn’t recieved the code?{" "}
                    <Link to="..">
                        {" "}
                        <span className="text-[#3F8CFF]">Resend</span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Otp;
