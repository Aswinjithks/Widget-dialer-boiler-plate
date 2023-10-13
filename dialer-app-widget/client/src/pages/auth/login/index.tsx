import React from "react";
import { Link } from "react-router-dom";
import GoogleBtn from "../../../components/auth/googleBtn";
import { AUTH } from "../../../routes/routes";
import useSignUp from "./useLogin";
import Input from "../../../components/common/input";

const LoginPage: React.FC = () => {
    const { formik } = useSignUp();
    return (
        <div className="right-column flex flex-col h-full justify-between">
            <div className="top">
                <h1 className="font-medium text-[40px]">
                    Let’s get{" "}
                    <span className="text-[#3F8CFF] mb-[16px]">Started</span>
                </h1>
                <p className="mb-[60px] text-[#404385] text-xl">
                    Monitor and chat with the visitors on your website,respond
                    to support{" "}
                </p>
                <div className="form-control">
                    <form action="" onSubmit={formik.handleSubmit}>
                        <Input
                            id="signupUserNameInp"
                            label="Name"
                            placeholder="Enter your name"
                            name="name"
                            value={formik.values.name}
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

                        <Input
                            id="signupEmailInp"
                            label="Email"
                            placeholder="Enter your email"
                            name="email"
                            value={formik.values.email}
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

                        <button className="w-[100%] bg-[#3F8CFF] text-[#FFFFFF] rounded-[10px] h-[50px] mb-[24px] mt-[3rem]">
                            Get OTP
                        </button>
                    </form>
                </div>

                <div className="create-account">
                    <p className="text-[16px] text-[#404385] text-right">
                        Already have an account?{" "}
                        <Link to={`${AUTH.BASE_PATH}/${AUTH.PAGES.SIGNIN}`}>
                            {" "}
                            <span className="text-[#3F8CFF]">Login</span>
                        </Link>
                    </p>
                </div>
            </div>

            <div className="bottom flex flex-col items-center ">
                <div className="flex gap-[15px] w-[100%] mb-8 items-center text-center before:content-normal before:inline-block before:h-[1px] before:bg-[#D9D9D9] before:w-[50%] after:content-normal after:inline-block after:h-[1px] after:bg-[#D9D9D9] after:w-[50%]">
                    OR
                </div>
                <GoogleBtn />
            </div>
        </div>
    );
};

export default LoginPage;
