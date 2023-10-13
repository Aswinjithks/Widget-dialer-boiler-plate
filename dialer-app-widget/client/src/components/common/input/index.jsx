import { Children, useRef, useState } from "react";

const Input = (props) => {
  const {
    id,
    label,
    placeholder,
    width = "100%",
    type = "text",
    name,
    value,
    onChange,
    onBlur,
    formik,
    className,
  } = props;
  const Icon = props.children;
  const childArray = Children.toArray(Icon);
  const [isPassword, setIsPassword] = useState(
    type === "password" ? true : false
  );
  const inputRef = useRef();
  //toggle password field
  const togglePassword = () => {
    switch (inputRef.current.type) {
      case "password":
        inputRef.current.type = "text";
        setIsPassword(false);
        break;
      case "text":
        inputRef.current.type = "password";
        setIsPassword(true);
        break;

      default:
        setIsPassword(false);
        break;
    }
  };

  return (
    <div className={`w-[${width}]`}>
      <label htmlFor={id} className="text-[0.9rem] text-[#404385]">
        {label}
      </label>
      <div
        className={
          className
            ? `${className} ${
                formik.touched[name] && formik.errors[name]
                  ? "border-[#bb3d34]"
                  : "border-[#CFDEF4]"
              }`
            : `single-input-wrapper flex items-center justify-between my-[12px] bg-[#fff] border-[2px] ${
                formik.touched[name] && formik.errors[name]
                  ? "border-[#bb3d34]"
                  : "border-[#CFDEF4]"
              } drop-shadow-[0_0_2px_#CFDEF4]  focus:outline-none rounded-[4px] h-[40px]`
        }
      >
        <input
          ref={inputRef}
          id={id}
          type={type}
          name={name}
          className={`w-[100%] h-full p-[8px] text-[0.9rem] focus:outline-none`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
        />
        <span
          className="mr-[10px] cursor-pointer"
          onClick={type === "password" && togglePassword}
        >
          {Icon && childArray.length === 1
            ? Icon
            : isPassword === true
            ? childArray[0]
            : childArray[1]}
        </span>
      </div>
      {formik.touched[name] && formik.errors[name] ? (
        <p className="text-[14px] text-red-600 relative bottom-[8px]">
          {formik.errors[name]}
        </p>
      ) : null}
    </div>
  );
};

export default Input;
