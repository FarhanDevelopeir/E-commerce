
import { useEffect, useState } from 'react';
import './App.css';
import Category from './features/product/components/Category';
import Products from './features/product/components/Products';
import Slider from './features/product/components/Slider'

// import {loadStripe} from '@stripe/stripe-js'
import Header from './pages/Header';

import { useSelector, useDispatch } from 'react-redux'
import { allCartDataAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/UserAuthentication/authSlice';




function App() {
  const User = useSelector(selectLoggedInUser)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allCartDataAsync(User.token))
  }, [])
  return (

    

      <div className='container'>
        <Header />
        <Slider />
        <Category/>
        <Products />
      </div>
    
  );
}

export default App;
