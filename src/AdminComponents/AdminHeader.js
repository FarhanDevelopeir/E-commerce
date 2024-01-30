import React from "react";
import AdminDashboard from "./AdminDashboard";
import { useSelector } from "react-redux";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminAddProducts from "./AdminAddProducts";
import { ActivePage } from "./features/AdminSlice";

const AdminHeader = () => {
  const activepage = useSelector((state)=>state.adminslice.activePage)
  console.log(activepage)
  return (
    <div className="dashboard ml-5 w-full   ">
      <div className=" p-3 border-b-2 border-gray-400  flex justify-between  items-center">
        <p className="hidden sm:block font-sans font-semibold text-xl mt-2">{activepage}</p>
        <div className="flex  items-center float-left w-[100%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[20%]   justify-around">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox=" 24 24"
            fill="currentColor"
            class="w-6 h-6"
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
            <div className="flex flex-col h-full  ">
              <h6 class=" font-sans   font-semibold  mt-2">
                Farhan <br/>
                <span className='text-sm font-normal'>Admin</span>
                <br />
              </h6>
              {/* <p class=" font-sans text-sm antialiased font-normal  text-gray-700">
                Web Developer
              </p> */}
            </div>
            <img
              src="https://www.upwork.com/profile-portraits/c19dXgv9zpC7qTDdo7SQwzKxPBD2SmAms87tIhtSZ_6iul2dz28FXhibj7qTQ8qFrF"
              alt="avatar"
              class="inline-block  object-cover object-center !rounded-full w-12 h-12"
            />
          </div>
        </div>
      </div>
      <div className="">
        
        {activepage === "Dashboard" ? <AdminDashboard/>: ''}
        {activepage === "Orders" ? <AdminOrders/> :'' }
        {activepage === "Products" ? <AdminProducts/> : ''}
        {activepage === "Add Products" ? <AdminAddProducts/> : ''}



      </div>
    </div>
  );
};

export default AdminHeader;
