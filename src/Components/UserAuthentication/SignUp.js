import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link , useNavigate} from 'react-router-dom'
import signuppic from '../../Images/signuppic3.png'
import axios from 'axios'
import { Userdata } from '../../Redux/features/counter/ProductSlice'



const SignUp = () => {
  const userdata=useSelector((state)=>state.product.Usersdata)
  const dispatch=useDispatch()
  const [formData, setFormData] = useState({ name: '', email: '' , password: ''});
  const navigate=useNavigate()
  const [Errorname, setErrorName]=useState(false)
  const [Erroremail, setErrorEmail]=useState(false)
  const [Errorpassword, setErrorPassword]=useState(false)

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    setErrorName(false)
    setErrorEmail(false)
    setErrorPassword(false)
    if(formData.email===''){
      setErrorEmail(true)
      
    }
    if(formData.name===''){
      setErrorName(true)
     
    }
    if(formData.password===''){
      
      setErrorPassword(true)
    }
    else {
      
      console.log(formData);
      signupform(formData)
    }
    }

  const signupform = async(user,token)=>{
    try{
      const res = await axios.post('http://localhost:3000/users', user)
      console.log(res);
      navigate('/');
     
      dispatch(Userdata( res.data.user,res.data.token ));
    } catch (error){
      console.log('err', error)
    }
  }
  return (
   
    <div className=''>
        <section class="" style={{ backgroundColor: '#eee' }} >
  <div class="container pt-5 pb-4">
    <div class="signup row d-flex justify-content-center align-items-center ">
      <div class="col-lg-12 col-xl-11">
        <div class="loginsignupbox card text-black m-auto" style={{borderRadius: '25px'}}>
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4" onSubmit={handleSubmit}>

                  <div class=" flex-row align-items-center mb-4 " >
                   <div  className='d-flex flex-row align-items-center mb-4  '>
                   <i class="signup-icon fas fa-user fa-lg me-3 fa-fw"></i>
                  
                      <div  className=' w-100 '>
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
                    <span className='text-danger'>  {Errorname ? <p>Field is required</p>:''}</span>
                  </div>

                  <div class="flex-row align-items-center mb-4">
                    <div  className='d-flex flex-row align-items-center mb-4'>
                    <i class="signup-icon fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div  className=' w-100 '>
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
                   <span className='text-danger'>{Erroremail ? <p>Field is required</p>:''}</span>

                  </div>

                  <div class="  align-items-center mb-4">
                   <div className='d-flex flex-row align-items-center mb-4'>
                   <i class="signup-icon fas fa-lock fa-lg me-3 fa-fw"></i>
                   <div  className=' w-100 '>
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
                    {Errorpassword ? <p>Field is required</p>:''}
                    </span>

                  </div>

                  {/* <div class="d-flex flex-row align-items-center mb-4">
                    <i class="signup-icon fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0 border rounded">
                      <input type="password" id="form3Example4cd" class="form-control border rounded" />
                      <label class="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div> */}

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" class="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src={signuppic} 
                  class="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default SignUp