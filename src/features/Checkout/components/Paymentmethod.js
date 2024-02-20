import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import StripeContainer from './StripeContainer'
import { Button } from '@mui/material'
import { addressState } from '../checkoutSlice';
import { selectLoggedInUser } from '../../UserAuthentication/authSlice'
import { allFetchedCartData } from '../../cart/cartSlice'
import { createOrderAsync } from '../checkoutSlice'
import { useNavigate } from 'react-router-dom';
import { totalItemsInCart } from '../../cart/cartSlice';

const Paymentmethod = () => {
  const contactdetail = useSelector((state) => state.product.contactdetail)
  const addressdetail = useSelector((state) => state.product.addressdetail)
  const address = useSelector(addressState)
  const totalCartItems = useSelector(totalItemsInCart)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector(selectLoggedInUser)
  const Cart = useSelector(allFetchedCartData)
  const [isformopen, setisformopen] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [displaydone, setdisplaydone] = useState(false)




  const handlepayment = (e) => {
    setSelectedMethod(e.target.value);

    if (e.target.value === 'online') {
      setisformopen(true)
      setdisplaydone(false)
    }
    else {
      setisformopen(false)
      setdisplaydone(true)
    }

  }

  const handleOrder = () => {
    const orderData = {
      userId: User.user._id,
      products: Cart.products,
      status: 'pending',
      address: address,
      paymentMethod: selectedMethod,
      bill: Cart.bill,
      totalItems: totalCartItems
    }
    console.log(orderData)
    dispatch(createOrderAsync(orderData))
    navigate('/ordercomplete');
  }

  useEffect(() => {
    console.log(address);
    console.log(Cart);
  }, []);



  return (
    <div className='card mt-4 border'>
      <div className='card-header'>
        <h3>Payment Method</h3>
      </div>
      <div className='card-body'>
        <div className='d-flex justify-content-between w-75 m-auto '>
          <button
            className={`btn ${selectedMethod === 'cod' ? 'btn-danger' : 'btn-secondary'}`}
            onClick={handlepayment}
            value='cod'
          >
            Cash On Delivery
          </button>
          <button
            className={`btn ${selectedMethod === 'online' ? 'btn-danger' : 'btn-secondary'}`}
            onClick={handlepayment}
            value='online'
          >
            Online Transaction
          </button>
        </div>
        {displaydone &&
          <Button variant='contained'
            sx={{
              width: '25%',
              margin: '20px auto',
              textAlign: 'center',
              position: 'absolute',
              right: '20px',
              marginTop: '40px',
            }}
            onClick={() => handleOrder()}

          >Finish</Button>}
      </div>
    </div>
  )
}

export default Paymentmethod