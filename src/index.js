import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import './Components/Style.css';
import { store } from './Redux/app/Store';
import { Provider } from 'react-redux';
import ProductDetail from './Components/ProductDetail';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Cart from './Components/Cart';
import Whishlist from './Components/Whishlist';
import PageNotFound from './Components/PageNotFound';
import ScrollToTopOnNavigate from './Components/ScrolltoTop';
import Toptopage from './Components/Toptopage';
// import Addressform from './Components/Checkout/Addressform';
import Addressform from './Components/Checkout/BasicDetails';
import Completeorder from './Components/Checkout/Completeorder';
import Filterproducts from './Components/Category/Filterproducts';
import SignUp from './Components/UserAuthentication/SignUp';
import Login from './Components/UserAuthentication/Login';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (<App/>  ),
//   },
//   {
//     path: "about",
//     element: <div>About</div>,
//   },
//   {
//     path: "/productdetail/:id",
//     element: (<ProductDetail/>),
//   },
//   {
//     path: "/cart",
//     element: (<Cart/>),
//   },
//   {
//     path: "/wishlist",
//     element: (<Whishlist/>),
//   },
//   {
//     path: "*",
//     element: (<PageNotFound/>),
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <ScrollToTopOnNavigate />
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/productdetail/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Whishlist />} />
          <Route path='/checkout' element={<Addressform />} />
          <Route path='/ordercomplete' element={<Completeorder />} />
          <Route path='/filterproducts/:category' element={ <Filterproducts/>} />
          <Route path='/signup' element={ <SignUp/>} />
          <Route path='/login' element={ <Login/>} />
          <Route path='*' element={<PageNotFound />} />
          <Route />
          <Route />
        </Routes>
        <Toptopage/>

        <Footer />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
