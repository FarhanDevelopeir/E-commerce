import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { useDispatch, useSelector } from "react-redux";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminAddProducts from "./AdminAddProducts";
import { ActivePage } from "./features/AdminSlice";
import AdminProfile from "./AdminProfile";

const AdminHeader = () => {
  const activepage = useSelector((state)=>state.adminslice.activePage)
  console.log(activepage)
  const dispatch = useDispatch()

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfile=(itemName)=>{
    dispatch(ActivePage(itemName));
    setIsMenuOpen(false)
  }

  const handleSignOut = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="dashboard  w-full ml-2  ">
      <div className=" p-3 border-b-2 border-gray-400  flex justify-between  items-center">
        <p className="hidden sm:block font-sans font-semibold text-xl mt-2">{activepage}</p>
        <div className="flex  items-center float-left w-[100%]  sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[20%]   justify-around">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox=" "
            fill="currentColor"
            class="w-6 h-6  sm:w-8  sm:h-8 "
          >
            <path
              fill-rule="evenodd"
              d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox=" 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z"
              clip-rule="evenodd"
            />
          </svg>

          <div class="flex items-center justify-between gap-3 ">
            <div className="flex flex-col h-full text-xs  ">
              <h6 class=" font-sans text-[14px] sm:text-[17px]  font-semibold  mt-2">
                Farhan <br/>
                <span className='text-xs md:text-sm font-normal'>Admin</span>
                <br />
              </h6>
              {/* <p class=" font-sans text-sm antialiased font-normal  text-gray-700">
                Web Developer
              </p> */}
            </div>
            <div className="relative ml-3">
      <div>
        <button
          type="button"
          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          id="user-menu-button"
          onClick={toggleMenu}
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </button>
      </div>

      <div
        className={`absolute text-left  right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
          isMenuOpen
            ? 'transition ease-in-out duration-100 transform opacity-100 scale-100'
            : 'transition ease-in duration-95 transform opacity-0 scale-95'
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex="-1"
      >
        {isMenuOpen && (
          <div className="py-1">
            <a
            onClick={()=>handleProfile('Profile')}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-0"
            >
              Your Profile
            </a>
            
            <a
            onClick={()=>handleSignOut()}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-2"
            >
              Sign out
            </a>
          </div>
        )}
      </div>
    </div>
          </div>
        </div>
      </div>
      <div className="">
        
        {activepage === "Dashboard" ? <AdminDashboard/>: ''}
        {activepage === "Orders" ? <AdminOrders/> :'' }
        {activepage === "Products" ? <AdminProducts/> : ''}
        {activepage === "Add Products" ? <AdminAddProducts/> : ''}
        {activepage === "Profile" ? <AdminProfile/> : ''}




      </div>
    </div>
  );
};

export default AdminHeader;
