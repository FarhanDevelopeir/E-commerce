
import './App.css';
import Category from './features/product/components/Category';

import Products from './features/product/components/Products';
import Slider from './features/product/components/Slider'




function App() {
  
  return (

      <div className='container'>
       
        <Slider />
        <Category/>
        <Products />
      </div>
    
  );
}

export default App;
