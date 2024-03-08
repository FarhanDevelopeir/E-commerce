import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import loginpic from '../../../Images/loginpic3.png'
import { loginUserAsync, selectLoggedInUser } from '../authSlice'
import axios from 'axios';


const Login = () => {
    const userdata = useSelector(selectLoggedInUser);
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [Erroremail, setErrorEmail] = useState(false)
    const [Errorpassword, setErrorPassword] = useState(false)

    axios.defaults.withCredentials = true;

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        setErrorEmail(false)
        setErrorPassword(false)
        if (formData.email === '') {
            setErrorEmail(true)

        }
        if (formData.password === '') {

            setErrorPassword(true)
        }
        else {
            dispatch(loginUserAsync(formData))
        }
    }

    useEffect(() => {
        console.log(userdata)
    }, [userdata])

    return (
        <div>
            {userdata.token && <Navigate to={'/'} replace={true} ></Navigate>}
            <div className=''>
                <section class="" style={{ backgroundColor: '#eee' }}>
                    <div class="container h-100 pt-5 pb-4">
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
                                                    <span className='text-danger'>{Erroremail ? <p>Field is required</p> : ''}</span>

                                                    <div class="d-flex flex-row align-items-center mb-4">
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
                                                        {Errorpassword ? <p>Field is required</p> : ''}
                                                    </span>



                                                    {/* <div class="form-check d-flex justify-content-center mb-5">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div> */}

                                                    {/* <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" class="btn btn-primary btn-lg">Register</button>
                   


                  </div> */}
                                                    <div class="text-center text-lg-start mt-5 d-flex justify-content-center ">
                                                        <button type="submit" class="btn btn-primary btn-lg m-auto "
                                                            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>

                                                    </div>
                                                    <p class="small fw-bold text-center mt-1 w-100 pt-1 mb-0">Don't have an account?
                                                        <Link to={'/signup'} >
                                                            <a class="link-danger">Register</a>
                                                        </Link>
                                                    </p>

                                                </form>

                                            </div>
                                            <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                                <img src={loginpic} height={250} width={500}
                                                    class="img-fluid " alt="Sample image" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Login