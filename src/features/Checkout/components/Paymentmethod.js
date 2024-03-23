import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { addressState } from '../checkoutSlice';
import { selectLoggedInUser } from '../../UserAuthentication/authSlice'
import { allFetchedCartData } from '../../cart/cartSlice'
import { createOrderAsync } from '../checkoutSlice'
import { useNavigate } from 'react-router-dom';
import { totalItemsInCart } from '../../cart/cartSlice';

const Paymentmethod = () => {
  const address = useSelector(addressState)
  const totalCartItems = useSelector(totalItemsInCart)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Cart = useSelector(allFetchedCartData)
  const User = useSelector(selectLoggedInUser)
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [displaydone, setdisplaydone] = useState(false)
  const [displayCardButton, setdisplayCardButton] = useState(false)




  const handlepayment = (e) => {
    console.log(e.target.value)
    setSelectedMethod(e.target.value)
    setdisplayCardButton(false)
    setdisplaydone(false)
    if(e.target.value === 'online'){
      setdisplayCardButton(true)
    } else {
      setdisplaydone(true)
  } 
  }

  const handleOrder = () => {
 

    const orderData = {
      products: Cart.products,
      status: 'pending',
      address: address,
      paymentMethod: selectedMethod,
      bill: Cart.bill,
      totalItems: totalCartItems
    }
    console.log(orderData)
    const token = User.token
    dispatch(createOrderAsync({orderData, token}))
    navigate('/ordercomplete');
   
  }

  const handlePayment = () => {
    navigate('/stripePayment');
  }

  useEffect(() => {
    console.log(address);
    console.log(Cart);
  }, []);



  return (
    <div className=' relative mt-4 border rounded-lg shadow-sm'>
      <div className='card-header py-3'>
        <h3 className=' px-3 text-[16px] md:text-xl font-semibold'>Payment Method</h3>
      </div>
      <div className='card-body p-3'>
        <div className='flex justify-around w-full md:w-75 m-auto '>
          <button
            className={` ${selectedMethod === 'cod' ?  'bg-red-700' : ' bg-gray-400'} text-[11px] lg:text-lg text-white px-3 py-2 rounded-lg`}
            onClick={(e) => handlepayment(e)}
            value='cod'
          >
            Cash On Delivery
          </button>
          <button
            className={` ${selectedMethod === 'online' ? ' bg-red-700' : ' bg-gray-400'} text-[11px] lg:text-lg text-white px-3 py-2 rounded-lg`}
            onClick={(e) => handlepayment(e)}
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
              right: '10px',
              marginTop: '64px',
            }}
            onClick={() => handleOrder()}

          >Finish</Button>}
        {displayCardButton &&
          <Button variant='contained'
            sx={{
              width: '40%',
              margin: '20px auto',
              textAlign: 'center',
              fontSize: '10px',
              position: 'absolute',
              right: '10px',
              marginTop: '64px',
            }}
            onClick={() => handlePayment()}

          >Add Card Details</Button>}
      </div>
    </div>
  )
}

export default Paymentmethod