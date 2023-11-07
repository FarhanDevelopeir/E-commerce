import React from 'react'
import logo from '../Images/bluelogo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MDBInput } from 'mdb-react-ui-kit';

const Header = () => {
  const cart = useSelector((state) => state.product.cart)
  const wishlist = useSelector(state => state.product.wishlist)
  const userdata=useSelector((state)=>state.product.Usersdata)
  console.log(userdata.password);


  return (
    <div className='mb-5'>
      <div className=" fixed-top p-3 text-center text-white border-bottom   ">
        <div className="container">
          <div className="row gy-3">

            <div className="col-lg-2 col-sm-4 col-4">
              <a className="float-start">
                <Link to={'/'}>
                  <img src={logo} height="45" alt='no' />
                </Link>
                {/* <h3>Storehook</h3> */}
              </a>
            </div>

            <div className="order-lg-last col-lg-5 col-sm-8 col-8">
              <div className="d-flex float-end">
                {userdata && userdata.length === 1 ?
                   ( <h4>{userdata.name}</h4>):
                 ( <Link to={'/login'}>
                  <a className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center " > <i className="fas fa-user-alt m-1 me-md-2 text-white"></i><p className="text-white d-none d-md-block mb-0">Login</p> </a>
                  </Link>)}
                <Link to={'/wishlist'}>
                  <a className="me-1  py-2 px-3 nav-link d-flex text-white hover-shadow  align-items-center" >

                    {wishlist.length === 0 ? <i className="fas fa-heart m-1 me-md-2"></i>
                      : <i class="fas fa-heart  m-1 me-md-2 text-warning "></i>}

                    {/* {wishlish && wishlish.length === 0 ? (
  <i className="fas fa-heart m-1 me-md-2"></i>
) : (
  <i className="fas fa-shopping-cart m-1 me-md-2"></i>
)} */}

                    <p className="d-none d-md-block mb-0">Wishlist</p> </a>
                </Link>
                <Link to={'/cart'}>
                  <a class="py-2 px-3  text-white hover-shadow    nav-link d-flex "  >
                    <span><i class="fas fa-shopping-cart  me-md-2"></i></span>
                    {cart.length === 0 ? '' : <span class="badge rounded-pill badge-notification  bg-primary" style={{ fontSize: 'bold' }}>{cart.length}</span>}
                    <span className='d-none d-md-block '>My Cart</span>
                  </a>
                </Link>



              </div>
            </div>

            <div className="col-lg-5 col-md-12 col-12">
              <div className="input-group float-center">
                <div className="form-outline ">

                  <MDBInput className='bg-white' id='form6Example1' label='Search' />
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