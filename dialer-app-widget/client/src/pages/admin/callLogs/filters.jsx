import React, { useState } from "react";

const Filters = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = (index) => {
        setIsOpen((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className=" bg-[#FFFFFF] border-[1px] border-solid border-[#CFDEF4] p-5 rounded-[0.625rem] absolute right-0	top-16 min-w-[17.188rem]	">
            <div className="head flex justify-between mb-3">
                <span>Filters</span>
                <button className="text-[#3F8CFF]">Clear all</button>
            </div>
            <div>
                <label className="relative block">
                    <span className="sr-only">Search</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </span>
                    <input
                        className="min-w-[363px] placeholder:italic placeholder:text-slate-400 block bg-white border border-[#CFDEF4] rounded-md py-2 h-[50px] pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        placeholder="Search for filter.."
                        type="text"
                        name="search"
                    />
                </label>
            </div>

            <div id="accordion-open" data-accordion="open" className="mt-5">
                <div className="border-b border-[#F1F1F1]">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="flex items-center justify-between w-full h-[3.063rem] font-medium text-left text-gray-500  dark:text-gray-400 hover:bg-gray-100 "
                        data-accordion-target="#accordion-open-body-1"
                        aria-expanded="true"
                        aria-controls="accordion-open-body-1"
                    >
                        <span className="flex items-center">Call</span>

                        <svg
                            data-accordion-icon
                            className="w-6 h-6 rotate-180 shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <div className="">
                        <label className="flex gap-[0.75rem]">
                            <input
                                type="checkbox"
                                className="accent-blue-500 w-[1.25rem] h-[1.25rem] mb-2"
                            />{" "}
                            Customized
                        </label>

                        <label className="flex gap-[0.75rem]">
                            <input
                                type="checkbox"
                                className="accent-blue-500 w-[1.25rem] h-[1.25rem] mb-2"
                            />{" "}
                            Customized
                        </label>
                    </div>
                </div>

                {/* assignee */}
                <div className="border-b border-[#F1F1F1]">
                    <button
                        type="button"
                        className="flex items-center justify-between w-full h-[3.063rem] font-medium text-left text-gray-500   dark:text-gray-400 hover:bg-gray-100 "
                        data-accordion-target="#accordion-open-body-1"
                        aria-expanded="true"
                        aria-controls="accordion-open-body-1"
                    >
                        <span className="flex items-center mb-2">Assignee</span>
                        <svg
                            data-accordion-icon
                            className="w-6 h-6 rotate-180 shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <div className="">
                        <label className="flex gap-[0.75rem]">
                            <input
                                type="checkbox"
                                className="accent-blue-500 w-[1.25rem] h-[1.25rem] mb-2 "
                            />{" "}
                            Adarsh Lohi
                        </label>

                        <label className="flex gap-[0.75rem]">
                            <input
                                type="checkbox"
                                className="accent-blue-500 w-[1.25rem] h-[1.25rem] mb-2"
                            />{" "}
                            Adila Sherin
                        </label>

                        <label className="flex gap-[0.75rem]">
                            <input
                                type="checkbox"
                                className="accent-blue-500 w-[1.25rem] h-[1.25rem] mb-2"
                            />{" "}
                            Shibin Kumar
                        </label>
                    </div>
                </div>

                {/* Department */}
                <div className="border-b border-[#F1F1F1]">
                    <button
                        type="button"
                        className="flex items-center justify-between w-full h-[3.063rem] font-medium text-left text-gray-500   dark:text-gray-400 hover:bg-gray-100 "
                        data-accordion-target="#accordion-open-body-1"
                        aria-expanded="true"
                        aria-controls="accordion-open-body-1"
                    >
                        <span className="flex items-center">Department</span>
                        <svg
                            data-accordion-icon
                            className="w-6 h-6 rotate-180 shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <div className="">
                        <label className="flex gap-[0.75rem]">
                            <input
                                type="checkbox"
                                className="accent-blue-500 w-[1.25rem] h-[1.25rem] mb-2"
                            />{" "}
                            Marketing
                        </label>

                        <label className="flex gap-[0.75rem]">
                            <input
                                type="checkbox"
                                className="accent-blue-500 w-[1.25rem] h-[1.25rem] mb-2"
                            />{" "}
                            Sales
                        </label>

                        <label className="flex gap-[0.75rem]">
                            <input
                                type="checkbox"
                                className="accent-blue-500 w-[1.25rem] h-[1.25rem] mb-2"
                            />{" "}
                            Hr
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
