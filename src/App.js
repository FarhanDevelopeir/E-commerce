
import { useEffect } from 'react';
import './App.css';
import Category from './features/product/components/Category';
import Products from './features/product/components/Products';
import Slider from './features/product/components/Slider'

// import {loadStripe} from '@stripe/stripe-js'
import Header from './pages/Header';

import { useSelector, useDispatch } from 'react-redux'
import { checkUserAsync, selectLoggedInUser } from './features/UserAuthentication/authSlice';
import { allCartDataAsync } from './features/cart/cartSlice';




function App() {
  // const stripepromise=loadStripe('pk_test_51NzIZSCBMDupYIZL2RuVb44yZr0MlJbvNFXcdjQ0CDBM4R4ZOivpXbsSA8IjfWUdaedTvTUa1gaPJAmBhAHcq32D00loCw2Rij');
  // console.log(stripepromise)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserAsync())
    dispatch(allCartDataAsync())
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
