import React, { useState } from 'react'
import EditProfile from '../pages/EditProfile';

const AdminProfile = () => {
    const [openModal, setOpenModal] = useState(false);
  
    const editProfile = () => {
      setOpenModal(true);
    };
  return (
    <div className='flex  h-screen '>
        <div className="relative flex flex-col h-[50%] lg:h-[30%] lg:flex-row md:w-[60%] lg:w-[70%] xl:w-[70%] 2xl:w-[60%] self-center m-auto mt-5  flex-wrap border-[1px] bg-white border-gray-300 shadow-md rounded-xl   ">
            <div className=" h-[45%] lg:h-full lg:w-[30%] relative  overflow-hidden rounded-t-xl lg:rounded-l-xl   ">
              <img
                className=" w-full h-[100%] rounded-t-xl lg:rounded-l-xl "
                src="https://t3.ftcdn.net/jpg/05/35/47/38/240_F_535473874_OWCa2ohzXXNZgqnlzF9QETsnbrSO9pFS.jpg"
              />
              <span class="absolute  h-[100%] w-full  inset-0 bg-gray-800 opacity-40"></span>
            </div>
            <div className=" w-[100%] lg:w-[70%] ">
              <button
                onClick={() => editProfile()}
                className=" w-full relative  "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class=" absolute right-1 -top-3 w-6 h-6"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
              </button>
              <img
                className="absolute  outline outline-4 outline-red-900 left-[34%] top-[34%] sm:left-[38%] sm:top-[28%]  md:left-[40%] md:top-[30%] lg:top-[25%] lg:left-[23%] h-20 sm:h-24 lg:h-28 lg:w-28 rounded-full "
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />

              <div className=" mt-12 text-xs text-center lg:mt-10 lg:text-center  w-[100%]  lg:pl-20">
                <div class="flex items-center w-[70%] sm:w-[60%]  md:w-[40%] m-auto lg:w-full ">
                  <i class="fas fa-user fa-lg fa-fw "></i>
                  <h3 class="mx-4 my-auto text-lg sm:text-xl ">Farhan123</h3>
                </div>

                <div class="flex items-center my-2 w-[80%]  sm:w-[70%]  md:w-[40%] m-auto lg:w-full ">
                  <i class=" fas fa-envelope fa-lg  fa-fw"></i>
                  <h3 class="mx-4 my-auto text-sm sm:text-lg ">farhandev@gmail.com</h3>
                </div>

              </div>
            </div>
          </div>
          {openModal ? (
          <EditProfile openModal={openModal} setOpenModal={setOpenModal} />
        ) : (
          ""
        )}
    </div>
  )
}

export default AdminProfile