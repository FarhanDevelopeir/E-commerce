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
import { allFetchedCartData } from './cartSlice';
import { selectLoggedInUser } from '../UserAuthentication/authSlice';
import { allCartDataAsync, updateCartAsync } from './cartSlice';
import Header from '../../pages/Header';
import { deleteCartAsync } from './cartSlice';
import { addQuantity } from './cartSlice';

const Cart = () => {
  const cart = useSelector((state) => state.product.cart);
  // const quantity=useSelector((state)=>state.product.quantity);
  
  const dispatch = useDispatch()
  const [checkout, setcheckout] = useState(false);
  const User = useSelector(selectLoggedInUser);
  const Cart = useSelector(allFetchedCartData);
  const totalQuantity = Cart.products ? Cart.products.reduce((total, product) => {
    return total + product.quantity;
}, 0) : 0;


  const handleCheckout = () => {
    setcheckout(true)
    dispatch(addQuantity(totalQuantity))
  }


  const changeQuality = (id, decrease) => {
    const cartData = {
      userId : User.user._id,
      productId : id,
      quantity: 1,
      decrease: decrease
    }
    console.log(cartData)
    dispatch(updateCartAsync(cartData))
  }

  const deleteProduct = (id) => {
    const cartData = {
      userId : User.user._id,
      productId : id,
    }
    console.log(cartData)
    dispatch(deleteCartAsync(cartData))
  }

  useEffect(() => {
    dispatch(allCartDataAsync(User.user._id))
    console.log(Cart);
  }, [allFetchedCartData])


  const displaycart = Cart.products ? Cart.products.map((item, index) => {
    return (
      <div>
        <Header></Header>
        <div className="row" key={index}>
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

          <p><strong>{item.productId.description}</strong></p>
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

          <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
            <button className="btn btn-primary px-3 me-2"
              onClick={() => dispatch(() => changeQuality(item.productId._id, true))}>
              <i className="fas fa-minus"></i>
            </button>

            <div className="form-outline">
              <input id="form1" min="0" name="quantity" value={item.quantity} type="number" className="form-control" />
              {/* <label className="form-label" for="form1">Quantity </label> */}
            </div>

            <button className="btn btn-primary px-3 ms-2"
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
      <section className="h-100 gradient-custom bg-grey ">
        {Cart.length === 0 ? <h1>Your cart is empty </h1> :
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              {checkout === true ?
                <>
                  <Stepper />

                </>
                :
                <div className="col-md-8">
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between py-3">
                      <h5 className="mb-0">Cart - {Cart.products.length} items</h5>
                      <button className='btn btn-danger' onClick={() => { dispatch(clearcart()) }}>Clear Cart</button>
                    </div>
                    <div className="card-body">
                      {/* <!-- Single item --''> */}
                      {displaycart}
                    </div>
                  </div>
                </div>}
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Summary</h5>
                  </div>
                  <div className="card-body">
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
                          {/* <strong>
                             <p className="mb-0">(including VAT)</p>
                           </strong> */}
                        </div>
                        <span><strong>{Cart.bill}</strong></span>
                      </li>
                    </ul>

                    <button type="button" onClick={handleCheckout} className="btn btn-primary btn-lg btn-block">
                      Go to checkout
                    </button>
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