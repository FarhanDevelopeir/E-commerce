
import './App.css';
import Products from './Components/Products';
import Slider from './Components/Slider'
import Toptopage from './Components/Toptopage';
import {loadStripe} from '@stripe/stripe-js'


function App() {
  const stripepromise=loadStripe('pk_test_51NzIZSCBMDupYIZL2RuVb44yZr0MlJbvNFXcdjQ0CDBM4R4ZOivpXbsSA8IjfWUdaedTvTUa1gaPJAmBhAHcq32D00loCw2Rij');
  console.log(stripepromise)
  return (

      <div className='container'>
        <Slider />
        <Products />
      </div>
    
  );
}

export default App;
