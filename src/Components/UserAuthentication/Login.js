import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='mt-5 pt-5 '>
            <section class="">
                <div class="container-fluid h-custom ">
                    <div class="  d-flex justify-content-center w-75 border rounded m-auto align-items-center h-100 ">
                        <div class="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                class="img-fluid" alt="Sample image" />
                        </div>
                        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>

                                <div class="form-outline mb-4 border rounded">
                                    <input type="email" id="form3Example3" class="form-control form-control-lg border rounded"
                                        placeholder="Enter a valid email address" />
                                    <label class="form-label" for="form3Example3">Email address</label>
                                </div>


                                <div class="form-outline mb-3 border rounded">
                                    <input type="password" id="form3Example4" class="form-control form-control-lg border rounded"
                                        placeholder="Enter password" />
                                    <label class="form-label" for="form3Example4">Password</label>
                                </div>

                                <div class="d-flex justify-content-between align-items-center">

                                    {/* <div class="form-check mb-0">
              <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label class="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div> */}

                                </div>

                                <div class="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" class="btn btn-primary btn-lg"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                                    <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
                                        <Link to={'/signup'} >
                                            <a class="link-danger">Register</a>
                                        </Link>
                                    </p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Login