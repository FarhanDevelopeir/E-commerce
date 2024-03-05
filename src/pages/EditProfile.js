import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/UserAuthentication/authSlice";
import { TextField } from "@mui/material";

const EditProfile = (props) => {
  const profileData = useSelector(selectLoggedInUser);
  console.log(profileData);
  // const name = profileData.user.name;
  // const email = profileData.user.email;

  // const [formData, setFormDate] = useState({
  //   name: name,
  //   email: email,
  //   password: ``,
  // });

  const handleUpdate = () => {};

  const handleChange = () => {};

  return (
    <div
      className="fixed z-10 inset-0 bg-opacity-70 bg-gray-950  
     flex justify-center items-center"
    >
      <div className="relative bg-white  w-[90%] sm:w-[50%] md:w-[40%] lg:w-[35%]  xl:w-[27%] shadow-2xl rounded-lg py-3">
        <div className=" flex justify-end pr-3 ">
        <button
          className="     rounded-sm  "
          onClick={() => props.setOpenModal(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        </div>
        <div>
          <div className="relative flex flex-col     rounded-xl   ">
            <div className="">
              <img
                className=" m-auto outline outline-4 outline-red-900 h-[80px] w-[80px] sm:h-28 sm:w-28 rounded-full "
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />

              <div className="  text-center my-4  m-auto w-full  ">
                <form onSubmit={handleUpdate} className="w-[85%] sm:w-[80%] md:w-[80%] m-auto">
               <div className='d-flex flex-row align-items-center mb-4  '>
               <i class=" fas fa-user fa-lg me-3 fa-fw"></i>
                  <TextField
                    type="text"
                    id="form3Example1c"
                    name="name"
                    label="Name"
                    variant="standard"
                    fullWidth
                    // value={formData.name}
                    
                    onChange={handleChange}
                  />
               </div>
               <div className='d-flex flex-row align-items-center mb-4  '>
               <i class=" fas fa-envelope fa-lg me-3 fa-fw"></i>
                  <TextField
                    type="text"
                    id="form3Example1c"
                    name="email"
                    label="Email"
                    variant="standard"
                    fullWidth
                    // value={formData.email}
                    onChange={handleChange}
                  />
               </div>
               {/* <div className='d-flex flex-row align-items-center mb-4  '>
               <i class=" fas fa-lock fa-lg me-3 fa-fw"></i>
                  <TextField
                    type="text"
                    id="form3Example1c"
                    name="password"
                    label="Password"
                    variant="standard"
                    fullWidth
                    // value={formData.password}
                    onChange={handleChange}
                  />
               </div> */}

               <button className="w-full  bg-gradient-to-r  from-indigo-500 to-pink-500 hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-700  text-white px-4 py-2 rounded ">
                Update
               </button>
                </form>
               
                
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
