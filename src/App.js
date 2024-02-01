
import './App.css';
import Category from './features/product/components/Category';

import Products from './features/product/components/Products';
import Slider from './features/product/components/Slider'

import {loadStripe} from '@stripe/stripe-js'


function App() {
  const stripepromise=loadStripe('pk_test_51NzIZSCBMDupYIZL2RuVb44yZr0MlJbvNFXcdjQ0CDBM4R4ZOivpXbsSA8IjfWUdaedTvTUa1gaPJAmBhAHcq32D00loCw2Rij');
  console.log(stripepromise)
  return (

      <div className='container'>
       
        <Slider />
        <Category/>
        <Products />
      </div>
    
  );
}

export default App;
