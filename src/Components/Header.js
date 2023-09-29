import React from 'react'
import logo from '../Images/bluelogo.png';

const Header = () => {
  return (
    <div className='mb-5'>
        <div className=" fixed-top p-3 text-center text-white border-bottom   ">
    <div className="container">
      <div className="row gy-3">
   
        <div className="col-lg-2 col-sm-4 col-4">
          <a href="https://mdbootstrap.com/"  className="float-start">
            <img src={logo} height="45" alt='no' />
            {/* <h3>Storehook</h3> */}
          </a>
        </div>
        
        <div className="order-lg-last col-lg-5 col-sm-8 col-8">
          <div className="d-flex float-end">
            <a  className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" > <i className="fas fa-user-alt m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Sign in</p> </a>
            <a  className="me-1  py-1 px-3 nav-link d-flex align-items-center" > <i className="fas fa-heart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Wishlist</p> </a>
           <a class="py-1 px-3 nav-link d-flex "  >
          <span><i class="fas fa-shopping-cart  me-md-2"></i></span>
          <span class="badge rounded-pill badge-notification bg-primary">0</span>
          <span className='d-none d-md-block '>My Cart</span>
           </a>
      
          </div>
        </div>
       
        <div className="col-lg-5 col-md-12 col-12">
          <div className="input-group float-center">
            <div className="form-outline ">
              <input type="search" id="form1" className="form-control border rounded-left bg-white " />
              
              <label className="form-label  " for="form1">Search</label>
            </div>
            <button type="button" className="btn btn-primary shadow-0">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        
      </div>
    </div>
  </div>
    </div>
  )
}

export default Header