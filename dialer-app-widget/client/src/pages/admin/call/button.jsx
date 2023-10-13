import React from "react";

const Button = (props) => {
  return (
    <>
      <button
        style={{ backgroundColor: props.background }}
        className={`rounded-[50%] w-[50px] h-[50px] flex justify-center items-center`}
        onClick={props.click}
      >
        <img src={props.image} alt="call"></img>
      </button>
    </>
  );
};

export default Button;
