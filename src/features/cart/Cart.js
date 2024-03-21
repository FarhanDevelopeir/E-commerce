// import React, { useState } from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import { decreasequantity, increasequantity, removefromcart, productPrice, updateTotalAmount, clearcart } from '../../Redux/features/counter/ProductSlice';
import Addressform from '../Checkout/components/BasicDetails';
import Stepper from '../Checkout/components/Stepper';
import { useState } from 'react';
import { IsSubmitting, allFetchedCartData, setSubmitting } from './cartSlice';
import { selectLoggedInUser } from '../UserAuthentication/authSlice';
import { allCartDataAsync, updateCartAsync } from './cartSlice';
import Header from '../../pages/Header';
import { deleteCartAsync } from './cartSlice';
import { addQuantity } from './cartSlice';
import { Toaster } from 'sonner';
import axios from 'axios';
const Cart = () => {
  const isSubmitting = useSelector(IsSubmitting)
  const dispatch = useDispatch()
  const [checkout, setcheckout] = useState(false);
  const [SpecificId, setSpecificId] = useState("");
  const Cart = useSelector(allFetchedCartData);
  const totalQuantity = Cart.products ? Cart.products.reduce((total, product) => {
    return total + product.quantity;
}, 0) : 0;

axios.defaults.withCredentials = true;

  const handleCheckout = () => {
    setcheckout(true)
    dispatch(addQuantity(totalQuantity))
  }


  const changeQuality = (id, decrease) => {

    dispatch(setSubmitting(true))
    
    setSpecificId(id)
    const cartData = {
      productId : id,
      quantity: 1,
      decrease: decrease
    }
    // console.log(cartData)
    dispatch(updateCartAsync(cartData))
  }

  const deleteProduct = (id) => {
    const cartData = {
      productId : id,
    }
    console.log(cartData)
    dispatch(deleteCartAsync(cartData))
  }

  useEffect(() => {
    dispatch(allCartDataAsync())
    console.log(Cart);
  }, [Cart])


  const displaycart = Cart.products ? Cart.products.map((item, index) => {
  
    return (
      <div>
        <div className="row text-center " key={index}>
        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
          {/* <!-- Image --> */}
          <div className="bg-image  hover-zoom ripple rounded" data-mdb-ripple-color="light">
            <img src={item.productId.thumbnailImage}
              className="w-100" alt="Blue Jeans Jacket" />
            <a href="#!">
              <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
            </a>
          </div>

        </div>

        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">

          <p><strong>{item.productId.title}</strong></p>
          <p>Color: blue</p>
          <p>Size: M</p>
          <button type="button" onClick={() => deleteProduct(item.productId._id)} className="btn btn-danger btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
            title="Remove item">
            <i className="fas fa-trash"></i>
          </button>
          <button type="button" className="btn btn-warning btn-sm mb-2" data-mdb-toggle="tooltip"
            title="Move to the wish list">
            <i className="fas fa-heart"></i>
          </button>

        </div>

        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">

          <div className=" relative  flex mb-4 " >
            <button 
            className={`${
              isSubmitting && SpecificId === item.productId._id
                ? "bg-gray-200 pointer-events-none cursor-not-allowed text-gray-400"
                : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-700 text-white"
            }  w-[80%] px-[1px] ms-2 py-2 rounded-md font-semibold shadow-xl`}
              onClick={() => dispatch(() => changeQuality(item.productId._id, true))}>
              <i className="fas fa-minus"></i>
              {/* {isSubmitting && SpecificId === item.productId._id ?   <div className='absolute left-5 top-2   h-7 w-7 border-dashed border-4 border-gray-600 rounded-full animate-spin' ></div>:''} */}
            </button>

            <div className="form-outline ">
              <input id="form1" min="0" name="quantity" value={item.quantity} 
               className={`${
                isSubmitting && SpecificId === item.productId._id
                  ? " text-gray-300"
                  : " "
              }  w-[80%] px-[1px] ms-2 py-2  font-semibold text-center `}

               />
              {/* <label className="form-label" for="form1">Quantity </label> */}
              {isSubmitting && SpecificId === item.productId._id ?   <div className='  absolute m-auto left-6 top-2   h-7 w-7 border-dashed border-4 border-gray-600 rounded-full animate-spin' ></div>:''}
            </div>

            <button 
            // className="btn btn-primary px-3 ms-2"
            className={`${
              isSubmitting && SpecificId === item.productId._id
                ? "bg-gray-200 pointer-events-none cursor-not-allowed text-gray-400"
                : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-700 text-white"
            }  w-[80%] px-[1px] ms-2 py-2 rounded-md font-semibold shadow-xl`}
              onClick={() => {
                dispatch(()=> changeQuality(item.productId._id, false));

              }}
            > 
              <i className="fas fa-plus"></i>
       
            </button>
          </div>

          <p className="text-start text-md-center">
            <strong>$ {item.price}</strong>
          </p>

        </div>
        <hr className="my-4" />
      </div>

      </div>
      
    )
  }): '';

  return (
    <div>
      <Header></Header>
      <section className="  ">
        {Cart.length === 0 ? <h1 className='mt-40' >Your cart is empty </h1> :
          <div className=" px-2 border md:p-10 mt-40 lg:mt-0">
            <div className=" md:flex lg:ml-14  my-6">
              {checkout === true ?
                <>
                  <Stepper />

                </>
                :
                <div className="md:w-[60%] border rounded-lg shadow-sm mb-4  ">
                  <div className=" mb-4">
                    <div className="card-header flex justify-between py-3 px-4 mb-2">
                      <h5 className="mb-0">Cart - {Cart.products.length} items</h5>
                    </div>
                    <div className=" pr-1 pl-1 md:pr-4 md:pl-4 ">
                      {displaycart}
                    </div>
                  </div>
                </div>}
              <div className=" md:fixed  right-10 col-md-4 shadow-sm border rounded-lg ">
                <div className=" mb-4">
                  <div className="card-header py-3 px-4">
                    <h5 className="mb-0">Summary</h5>
                  </div>
                  <div className="card-body px-4">
                    <ul className="list-group list-group-flush">
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Total Products
                        <span>{totalQuantity}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>Gratis</span>
                      </li>
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        
                        </div>
                        <span><strong>{Cart.bill}</strong></span>
                      </li>
                    </ul>

                    {!checkout && Cart.products && <button type="button" onClick={handleCheckout} className="btn btn-primary btn-lg btn-block">
                      Go to checkout
                    </button>}
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </section>
    </div>
  )
}

export default Cart