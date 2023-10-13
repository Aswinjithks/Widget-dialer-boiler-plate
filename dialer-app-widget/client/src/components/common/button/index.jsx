import React from "react";

const PrimaryButton = (props) => {
  const {
    label = "Label",
    onClick,
    type = "",
    btnStyle = "fill",
    width = "100%",
  } = props;
  return (
    <button
      onClick={onClick}
      type={type}
      className={`mx-[8px] p-2.5 w-[${width}] h-[40px] rounded-[8px]  ${
        btnStyle === "fill"
          ? "bg-[#3F8CFF] text-[#fff] hover:bg-[#387feb]"
          : "border-[1px] hover:border-[2px] border-[#3F8CFF] text-[#3F8CFF]"
      }`}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
