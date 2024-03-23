import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import loginpic from "../../../Images/loginpic3.png";
import { displayError, emptyError, loginUserAsync, selectLoggedInUser, setSubmitting, submitState } from "../authSlice"; import axios from 'axios';
import LoginRoles from "./LoginRoles";
import GuestComponent from "./guest";

const Login = () => {
  const userdata = useSelector(selectLoggedInUser);
  const Error = useSelector(displayError);
  const isSubmitting = useSelector(submitState);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSelected, setIsSelected] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [Erroremail, setErrorEmail] = useState(false);
  const [Errorpassword, setErrorPassword] = useState(false);
  const [userType, setUserType] = useState('');

  axios.defaults.withCredentials = true;
  axios.defaults.withCredentials = true;

  useEffect(() => {
    setTimeout(() => {
      dispatch(emptyError());
    }, 4000);
  }, [Error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear all error states initially

        setErrorEmail(false);
        setErrorPassword(false);

        // Validate each field individually
        if (name === "email" && !value.includes("@")) {
          setErrorEmail(true);
        }

        if (name === "password" && value.length < 8) {
          setErrorPassword(true);
        }
  };

  const handleGuestLogin = () => {
    setUserType('Guest')
    dispatch(setSubmitting("true"))
    const formData = {
      email: 'mz982604@gmail.com',
      password: 'Zeeshan789@#'
    }
    dispatch(loginUserAsync(formData));
  }

  const handleSubmit = (e) => {
    setUserType('actual')
    dispatch(setSubmitting("true"));
    e.preventDefault();
    setErrorEmail(false);
    setErrorPassword(false);
    if (formData.email === "") {
      setErrorEmail(true);
    }
    if (formData.password === "") {
      setErrorPassword(true);
    } else {
      dispatch(loginUserAsync(formData));
    }
  };

  const handleUserType = (type) => {
    setIsSelected(true);
    if (type === "user") {
      setIsUser(true);
    } else {
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    console.log(userdata);
  }, [userdata]);

  return (

    <div className=" h-screen" >
      {userdata.token && isUser && <Navigate to={'/'} replace={true} ></Navigate>}
      {userdata.token && isAdmin && <Navigate to={'/adminpanel'} replace={true} ></Navigate>}
      {isSelected && <div className=''>
        <section class="   h-fit md:min-h-dvh  bg-gray-200 ">
          <div class="container  pt-5 pb-4">
            <div class="signup row d-flex justify-content-center align-items-center h-100">
              <div class="col-lg-12 col-xl-11">
                <div class="loginsignupbox card text-black  m-auto" style={{ borderRadius: '25px' }}>
                  <div class="card-body p-md-5">
                    <div class="row justify-content-between ">
                      <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                        <form class="mx-1 mx-md-4" onSubmit={handleSubmit}>
                          <div class="d-flex flex-row align-items-center mb-4">
                            <i class="signup-icon fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className=" w-100 ">
                              <TextField
                                type="text"
                                id="form3Example1c"
                                name="email"
                                label="Email"
                                variant="standard"
                                fullWidth
                                value={formData.email}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <span className="text-danger">
                            {Erroremail ? <p>must include @</p> : ""}
                          </span>

                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="signup-icon fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div className=" w-100 ">
                                <TextField
                                  type="text"
                                  id="form3Example1c"
                                  name="password"
                                  variant="standard"
                                  label="Password"
                                  fullWidth
                                  value={formData.password}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <span className="text-danger">
                              {/* {Errorpassword ? <p>Field is required</p> : ""} */}
                            </span>

                          
                          {Error && <p className=" text-red-600" >{Error}</p>}
                          <div
                            class=" relative text-center text-lg-start mt-5 d-flex justify-content-center ">
                            <button
                              type="submit"

                              className={`${isSubmitting || !formData.email || Erroremail || !formData.password
                                  ? "bg-gray-200 pointer-events-none cursor-not-allowed text-gray-400"
                                  : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-700 text-white"
                                } relative w-[80%] px-3 py-2 rounded-md font-semibold`}
                              style={{
                                paddingLeft: "2.5rem",
                                paddingRight: "2.5rem",
                              }}
                            >
                              Login
                            </button>
                            {isSubmitting && userType === 'actual' ? (
                              <div className="absolute mt-[5px]  h-7 w-7 border-dashed border-4 border-gray-600 rounded-full animate-spin"></div>
                            ) : (
                              ""
                            )}
                          </div>
                          <p class="small fw-bold text-center mt-1 w-100 pt-1 mb-0">
                            Don't have an account?
                            <Link to={"/signup"}>
                              <a class="link-danger">Register</a>
                            </Link>
                          </p>
                        </form>
                        <GuestComponent userType={userType} isSubmitting={isSubmitting} handleGuestLogin={handleGuestLogin}/>
                      </div>
                      <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src={loginpic}
                          height={250}
                          width={500}
                          class="img-fluid "
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>}
      {isSelected ? '' :
        <LoginRoles handleUserType={handleUserType} />
      }
    </div>
  );
};

export default Login;
