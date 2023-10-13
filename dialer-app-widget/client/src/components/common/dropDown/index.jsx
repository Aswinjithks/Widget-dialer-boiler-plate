import React, { useEffect } from "react";

const DropDown = (props) => {
  const {
    id,
    label,
    options = [],
    width = "100%",
    name,
    value = "",
    onChange,
    onBlur,
    formik,
    placeholder,
    className,
  } = props;

  return (
    <div className={`flex flex-col w-[${width}] justify-center mt-[12px]`}>
      <label htmlFor={id} className="text-[0.9rem] text-[#404385]">
        {label}
      </label>
      <select
        placeholder="Select your department"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        className={
          className
            ? `${className} ${
                formik.touched[name] && formik.errors[name]
                  ? "border-[#bb3d34]"
                  : "border-[#CFDEF4]"
              } `
            : `my-[12px] bg-[#fff] border-[2px] ${
                formik.touched[name] && formik.errors[name]
                  ? "border-[#bb3d34]"
                  : "border-[#CFDEF4]"
              }  drop-shadow-[0_0_2px_#CFDEF4] text-[0.9rem] p-[8px] focus:outline-none rounded-[4px] h-[40px] `
        }
      >
        {options.length > 0 ? (
          <>
            <option value="" disabled className="text-[#8F8F8F]">
              {placeholder ?? "-Select an option-"}
            </option>
            {options?.map((option, i) => (
              <option value={option?.name} key={i}>
                {option?.name}
              </option>
            ))}
          </>
        ) : (
          <option value="">-No data-</option>
        )}

        {/* <option value="option 2"> Option 2</option>
        <option value="option 3"> Option 3</option> */}
      </select>
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-[14px] text-red-600 relative bottom-[8px]">
          {formik.errors[name]}
        </div>
      ) : null}
    </div>
  );
};

export default DropDown;
