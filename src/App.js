
import { useEffect } from 'react';
import './App.css';
import Category from './features/product/components/Category';
import Products from './features/product/components/Products';
import Slider from './features/product/components/Slider'
import Header from './pages/Header';

import { useSelector, useDispatch } from 'react-redux'
import { selectLoggedInUser } from './features/UserAuthentication/authSlice';
import { allCartDataAsync } from './features/cart/cartSlice';




function App() {
  
  const dispatch = useDispatch()
  const User = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(allCartDataAsync(User.user._id))
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
