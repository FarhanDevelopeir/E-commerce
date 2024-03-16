// import { TextField } from '@mui/material'
import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import signuppic from '../../../Images/signuppic.jpg'
import axios from 'axios'
import { Userdata } from '../../../Redux/features/counter/ProductSlice'
import { createUserAsync, displayError, emptyError, selectLoggedInUser, setSubmitting, submitState } from '../authSlice'
import SignupRoles from './SignupRoles'



const SignUp = () => {
  const userdata = useSelector(selectLoggedInUser);
  const isSubmitting = useSelector(submitState);
  const dispatch = useDispatch();
  const Error = useSelector(displayError)

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate()
  const [Errorname, setErrorName] = useState(false)
  const [Erroremail, setErrorEmail] = useState(false)
  const [Errorpassword, setErrorPassword] = useState(false)
  const [isSelected, setIsSelected] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(()=>{
    setTimeout(() => {
      dispatch(emptyError())
    }, 4000);
  },[Error])

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
// Clear all error states initially
setErrorName(false);
setErrorEmail(false);
setErrorPassword(false);

// Validate each field individually
if (name === 'name' && value === '') {
  setErrorName(true);
}

if (name === 'email' && !value.includes('@')) {
  setErrorEmail(true);
}

if (name === 'password' && value.length < 8) {
  setErrorPassword(true);
}
  };

  const handleUserType = (type) => {

    setIsSelected(true);
    if (type === 'user') {
      setIsUser(true)
    } else {
      setIsAdmin(true)
    }

  };


  const handleSubmit = (e) => {
    dispatch(setSubmitting("true"))
    e.preventDefault()
    setErrorName(false)
    setErrorEmail(false)
    setErrorPassword(false)
    if (formData.email === '') {
      setErrorEmail(true)

    }
    if (formData.name === '') {
      setErrorName(true)

    }
    if (formData.password === '') {

      setErrorPassword(true)
    }
    else {


      dispatch(createUserAsync(formData, dispatch))
    }
  }


  useEffect(() => {
    console.log(userdata)
  }, [userdata])




  return (
    <div>
      {userdata.token && isUser && <Navigate to={'/'} replace={true} ></Navigate>}
      {userdata.token && isAdmin && <Navigate to={'/adminpanel'} replace={true} ></Navigate>}
      {isSelected && <div className=''>
        <section class="" style={{ backgroundColor: '#eee' }} >
          <div class="container pt-5 pb-4">
            <div class="signup row d-flex justify-content-center align-items-center ">
              <div class="col-lg-12 col-xl-11">
                <div class="loginsignupbox card text-black m-auto" style={{ borderRadius: '25px' }}>
                  <div class="card-body p-md-5">
                    <div class="row justify-content-center">
                      <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                        <form class="mx-1 mx-md-4" onSubmit={handleSubmit}>

                          <div class=" flex-row align-items-center mb-4 " >
                            <div className='d-flex flex-row align-items-center mb-4  '>
                              <i class="signup-icon fas fa-user fa-lg me-3 fa-fw"></i>

                              <div className=' w-100 '>
                                <TextField type="text"
                                  id="form3Example1c"
                                  name="name"
                                  label='Name'
                                  variant="standard"
                                  fullWidth
                                  value={formData.name}
                                  onChange={handleChange}
                                />
                              </div>


                            </div>
                            <span className='text-danger'>  {Errorname ? <p>name is required*</p> : ''}</span>
                          </div>

                          <div class="flex-row align-items-center mb-4">
                            <div className='d-flex flex-row align-items-center mb-4'>
                              <i class="signup-icon fas fa-envelope fa-lg me-3 fa-fw"></i>
                              <div className=' w-100 '>
                                <TextField type="text"
                                  id="form3Example1c"
                                  name="email"
                                  label='Email'
                                  variant="standard"
                                  fullWidth
                                  value={formData.email}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <span className='text-danger'>{Erroremail ? <p>In email must include @</p> : ''}</span>

                          </div>

                          <div class="  align-items-center mb-4">
                            <div className='d-flex flex-row align-items-center mb-4'>
                              <i class="signup-icon fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div className=' w-100 '>
                                <TextField type="text"
                                  id="form3Example1c"
                                  name="password"

                                  variant="standard"
                                  label='Password'
                                  fullWidth
                                  value={formData.password}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <span className='text-danger'>
                              {Errorpassword ? <p>password must be greater than 7 digits</p> : ''}
                            </span>

                          </div>

                          {/* <div class="d-flex flex-row align-items-center mb-4">
                    <i class="signup-icon fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0 border rounded">
                      <input type="password" id="form3Example4cd" class="form-control border rounded" />
                      <label class="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div> */}
                   {Error && <p className=" text-red-600" >{Error}</p>}

                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" 
                          className={`${
                            isSubmitting || Errorname || !formData.name  || Erroremail || !formData.email  || !formData.password  || Errorpassword
                              ? "bg-gray-200 pointer-events-none cursor-not-allowed text-gray-400"
                              : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-700 text-white"
                          } relative w-[80%] px-3 py-2 rounded-md font-semibold`}
                          >Register</button>
                           {isSubmitting  ? (
                  <div className="absolute mt-[5px]  h-7 w-7 border-dashed border-4 border-gray-600 rounded-full animate-spin"></div>
                ) : (
                  ""
                )}
                        </div>
                      
                        </form>

                      </div>
                      <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                        <img src={signuppic}
                          class="img-fluid" alt="Sample image" />

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>}
      {isSelected ? '' : <div>
        {/* <button onClick={() => handleUserType('user')} >SignUp as User</button>
        <button onClick={() => handleUserType('admin')}  >SignUp as Admin</button> */}
        <SignupRoles handleUserType={handleUserType} />
      </div>}
    </div>
  )
}

export default SignUp