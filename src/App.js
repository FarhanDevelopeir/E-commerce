
import './App.css';
import Header from './Components/Header';
import Products from './Components/Products';
import Slider from './Components/Slider'


function App() {
  return (
    <div className="">
      <Header/>
     <div className='container'>
      <Slider/>
      <Products/>
     </div>
      {/* <Slider/> */}

    </div>
  );
}

export default App;
