import React, { useState } from "react";
import "./AdminSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { ActivePage } from "./features/AdminSlice";

const AdminSideBar = () => {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(null);
  const [collapsed, setCollapsed] = useState(true);

  const handleClick = (itemName) => {
    setActiveItem(itemName === activeItem ? null : itemName);
    dispatch(ActivePage(itemName));
  };
  // console.log(activePage)
  const handleCollapse = () => {
    setCollapsed(!collapsed);
    console.log("skhvhk");
  };

  return (
    <div
      className={`position  z-10 bg-gradient-to-b    from-indigo-500 via-purple-800 to-pink-500 
      lg:flex  md:flex-col border  transition-width duration-500
    ${collapsed ? "w-64" : "w-14"} 
    `}
    >
      <div className="flex-col   flex overflow-y-auto ">
        <div
          onClick={handleCollapse}
          className={`absolute bg-gradient-to-b  from-indigo-500 via-purple-800 to-pink-500 bg-white border-white border-4 rounded-full p-1 top-5 transition-left duration-500
        ${collapsed ? "left-[240px]" : "left-[37px]"} 
        `}
        >
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          )}
        </div>
        <div
          className={`h-screen flex flex-col justify-between  pb-3 pt-[45px] ${
            collapsed ? "px-3" : "px-2  "
          } `}
        >
          <div className="">
            <div className="bg-top bg-cover space-y-1 mt-5">
              <a
                href="#"
                onClick={() => handleClick("Dashboard")}
                className={`styleOnHover font-medium text-sm mb-4 items-center rounded-lg text-white py-2.5 flex
                 transition-all duration-200  hover:text-black  hover:bg-gray-200  cursor-pointer ${
                   activeItem === "Dashboard" ? "active" : ""
                 } ${collapsed ? "px-4" : "px-1"}
                 `}
              >
                <span className="justify-center items-center flex ">
                  <span className="justify-center items-center flex">
                    <span className="justify-center items-center flex">
                      <span className="items-center justify-center flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class={`w-6 ${collapsed ? "mr-3" : "ml-[3.5px]"}`}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                          />
                        </svg>
                      </span>
                    </span>
                  </span>
                </span>
                {collapsed ? <span>Dashboard</span> : ""}
              </a>
              <p
                onClick={() => handleClick("Products")}
                className={`styleOnHover font-medium mb-4 text-sm flex  w-full   items-center py-2 cursor-pointer 
              rounded-lg text-white transition-all duration-200 hover:bg-gray-200  ${
                activeItem === "Products" ? "active" : ""
              } ${collapsed ? "px-4" : "px-1"} `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class={`w-6 ${collapsed ? "mr-3" : "ml-[3.5px]"}`}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                  />
                </svg>
                {collapsed ? <span>Products</span> : ""}
              </p>
              <p
                onClick={() => handleClick("Orders")}
                className={`styleOnHover font-medium mb-4  text-sm flex  w-full items-center py-2 
              cursor-pointer rounded-lg text-white transition-all duration-200 hover:bg-gray-200 ${
                activeItem === "Orders" ? "active" : ""
              } ${collapsed ? "px-4" : "px-1"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class={`w-6 ${collapsed ? "mr-3" : "ml-[3.5px]"}`}
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
                    clip-rule="evenodd"
                  />
                </svg>

                {collapsed ? <span>Orders</span> : ""}
              </p>
              <p
                onClick={() => handleClick("Add Products")}
                className={`styleOnHover font-medium  text-sm flex  w-full items-center py-2 
              cursor-pointer rounded-lg text-white transition-all duration-200 hover:bg-gray-200 ${
                activeItem === "Add Products" ? "active" : ""
              } ${collapsed ? "px-4" : "px-1"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class={`w-6 ${collapsed ? "mr-3" : "ml-[3.5px]"}`}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                {collapsed ? <span>Add Products</span> : ""}
              </p>
              <hr class=" h-[1.5px] border-t-0 mt-4 bg-gray-400 opacity-100 dark:opacity-50" />
            </div>
          </div>
          <div className="mt-12 pb-4">
            <div className="bg-top bg-cover space-y-1">
              <a
                href="#"
                onClick={() => handleClick("Settings")}
                className={`styleOnHover font-medium text-sm items-center rounded-lg text-white  py-2.5 flex
                    transition-all duration-200 hover:bg-gray-200 group cursor-pointer ${
                      activeItem === "Settings" ? "active" : ""
                    }
                    ${collapsed ? "px-4" : "px-1"}
                    
              `}
              >
                <span className="justify-center items-center flex">
                  <span className="justify-center items-center flex">
                    <span className="justify-center items-center flex">
                      <span className="items-center justify-center flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class={`w-6 ${collapsed ? "mr-3" : "ml-[3.5px]"}`}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </span>
                    </span>
                  </span>
                </span>
                {collapsed ? <span>Settings</span> : ""}
              </a>
              <a
                href="#"
                className={`font-medium text-sm items-center rounded-lg text-white  py-2.5 flex 
                    transition-all duration-200    cursor-pointer ${
                      collapsed
                        ? "transition-all duration-200 px-4 bg-gradient-to-tr from-slate-400 via-purple-500 to-blue-500"
                        : "px-1"
                    }`}
              >
                <span className="justify-center items-center flex">
                  <span className="justify-center items-center flex">
                    <span className="justify-center items-center flex">
                      <span className="items-center justify-center flex">
                        <svg
                          class={`w-6 ${collapsed ? "mr-3" : "ml-[3.5px]"}`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                          />
                        </svg>
                      </span>
                    </span>
                  </span>
                </span>
                {collapsed ? <span>Logout</span> : ""}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
