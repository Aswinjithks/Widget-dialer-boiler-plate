import React from "react";

const MultiStepProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex w-full bg-gray-200 rounded-lg overflow-hidden">
      {Array.from({ length: totalSteps }, (value, index) => (
        <div key={index} className={`flex-1 h-2 relative`}>
          <div
            className={`absolute top-0 left-0 h-full ${
              index < currentStep ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${(100 / totalSteps) * (index + 1)}%` }}
          ></div>
          <div
            className={`absolute top-0 left-0 h-4 w-4 rounded-full ${
              index < currentStep ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{
              left: `${(100 / totalSteps) * (index + 0.5)}%`,
              transform: "translateX(-50%)",
            }}
          ></div>
          {index < currentStep ? (
            <svg
              className="absolute top-0 left-0 h-4 w-4 text-white"
              style={{
                left: `${(100 / totalSteps) * (index + 0.5)}%`,
                transform: "translate(-50%, -50%)",
              }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.29289 14.7071L7.87868 16.1213C7.48857 16.5114 6.85536 16.5114 6.46526 16.1213C6.07515 15.7312 6.07515 15.098 6.46526 14.7071L10.4645 10.7071C10.8546 10.317 11.4878 10.317 11.8779 10.7071L17.8787 16.7071C18.2688 17.0972 18.2688 17.7304 17.8787 18.1205C17.4886 18.5106 16.8554 18.5106 16.4653 18.1205L11.9999 13.6551L9.29289 16.3631C8.90279 16.7532 8.26957 16.7532 7.87946 16.3631C7.48936 15.973 7.48936 15.3398 7.87946 14.9497L9.29289 13.5363C9.683 13.1462 10.3162 13.1462 10.7063 13.5363L15.2929 18.1229L15.293 18.1229L15.293 18.1229L15.293 18.1229L15.293 18.1229L15.293 18.1229L15.2929 18.1229L15.2929 18.1229L15.2929 18.1228L15.2929 18.1229L15.2929 18.1229L15.2929 18.1229L15.2929 18.1229Z"
                fill="currentColor"
              />
            </svg>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default MultiStepProgressBar;
