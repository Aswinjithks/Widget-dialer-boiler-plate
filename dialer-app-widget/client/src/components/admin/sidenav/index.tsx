import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logoutImg from "../../../assets/images/logout.svg";
import AdminSideNavData, { AgentSideNavData } from "../../../config/adminSideNav";
import { logout } from "../../../store/slices/user";
import { useAppSelector } from "../../../store/hooks";
import ROLES from "../../../config/roles";

const AdminSideNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAppSelector((state: any) => state.user);

  return (
    <div className="left-panel bg-[#FFFFFF] w-[235px] border-r-[1px] border-solid border-[#E7E7E7] shadow-md px-[20px] pt-[40px] h-[100%]">
      <h3 className="text-[#3372D1] text-[36px]">CallerCloud</h3>

      <ul className="mt-[53px] h-[100%]">
        {/* Admin side nav */}
        {user?.userType === ROLES.ADMIN &&
          AdminSideNavData.map((item: any, i) => (
            <li
              className=""
              onClick={() => item?.link && navigate(`${item.link}`)}
              key={i}
            >
              <div className="inline-flex h-[19px] gap-[18px] mb-[30px]">
                <i className="items-center">
                  <img src={item?.icon} />
                </i>
                <span
                  className={`${
                    (
                      item.link
                        ? location.pathname.includes(item.link)
                        : AdminSideNavData?.find((item) =>
                            item?.subNav?.find((_item) =>
                              location.pathname.includes(_item.link)
                            )
                          )
                    )
                      ? "flex items-center px-3 cursor-pointer gap-4  mb-5 h-10 bg-blue-50 border-l-4 border-blue-500 rounded-md transition-colors duration-200"
                      : "text-base text-[#8F8F8F] inline-flex h-[19px] gap-[18px] mb-7 transition-colors duration-200 cursor-pointer"
                  }`}
                >
                  {item?.title}
                </span>
              </div>
              {item?.subNav && (
                <ul className="mt-0 ml-3 pl-7 border-l-2">
                  {item.subNav.map((item: any, i: number) => (
                    <li
                      className="my-4 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        item.link && navigate(`${item.link}`);
                      }}
                      key={i}
                    >
                      <span
                        className={`text-[16px] text-[${
                          location.pathname.includes(item.link)
                            ? "#3e8cff"
                            : "#8F8F8F"
                        }]`}
                      >
                        <i className="items-center">
                          <img src={item?.icon} />
                        </i>
                        <span
                          className={`text-[16px] text-[${
                            location.pathname.includes(item.link)
                              ? "#3e8cff"
                              : "#8F8F8F"
                          }]`}
                        >
                          {item?.title}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

        {/* Agent side nav */}
        {user?.userType === ROLES.AGENT &&
          AgentSideNavData.map((item: any, i) => (
            <li
              className=""
              onClick={() => item?.link && navigate(`${item.link}`)}
              key={i}
            >
              <div className="inline-flex h-[19px] gap-[18px] mb-[30px]">
                <i className="items-center">
                  <img src={item?.icon} />
                </i>
                <span
                  className={`${
                    (
                      item.link
                        ? location.pathname.includes(item.link)
                        : AdminSideNavData?.find((item) =>
                            item?.subNav?.find((_item) =>
                              location.pathname.includes(_item.link)
                            )
                          )
                    )
                      ? "flex items-center px-3 cursor-pointer gap-4  mb-5 h-10 bg-blue-50 border-l-4 border-blue-500 rounded-md transition-colors duration-200"
                      : "text-base text-[#8F8F8F] inline-flex h-[19px] gap-[18px] mb-7 transition-colors duration-200 cursor-pointer"
                  }`}
                >
                  {item?.title}
                </span>
              </div>
              {item?.subNav && (
                <ul className="mt-0 ml-3 pl-7 border-l-2">
                  {item.subNav.map((item: any, i: number) => (
                    <li
                      className="my-4 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        item.link && navigate(`${item.link}`);
                      }}
                      key={i}
                    >
                      <span
                        className={`text-[16px] text-[${
                          location.pathname.includes(item.link)
                            ? "#3e8cff"
                            : "#8F8F8F"
                        }]`}
                      >
                        <i className="items-center">
                          <img src={item?.icon} />
                        </i>
                        <span
                          className={`text-[16px] text-[${
                            location.pathname.includes(item.link)
                              ? "#3e8cff"
                              : "#8F8F8F"
                          }]`}
                        >
                          {item?.title}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        <li
          className=""
          onClick={() => {
            dispatch(logout(user?.userType ) as any);
          }}
        >
          <div className="inline-flex h-[19px] gap-[18px] mb-[30px]">
            <i className="items-center">
              <img src={logoutImg} />
            </i>
            <span
              className={` text-base text-[#8F8F8F] inline-flex h-[19px] gap-[18px] mb-7 transition-colors duration-200 cursor-pointer"
                `}
            >
              Logout
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideNav;
