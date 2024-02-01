import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Style.css';
import { store } from './Redux/app/Store';
import { Provider } from 'react-redux';
import ProductDetail from './features/product/components/ProductDetail';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Cart from './features/cart/Cart';
import Whishlist from './features/wishlist/Whishlist';
import PageNotFound from './pages/PageNotFound';
import Toptopage from './features/scrolltop/Toptopage';
import Addressform from './features/Checkout/components/BasicDetails';
import Completeorder from './features/Checkout/components/Completeorder';
import Filterproducts from './features/product/components/Filterproducts';
import SignUp from './features/UserAuthentication/components/SignUp';
import Login from './features/UserAuthentication/components/Login';
import AdminMain from './AdminComponents/AdminMain';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppContainer = () => {
  const currentPath = window.location.pathname;

  if (currentPath === '/adminpanel') {
    // Render only AdminMain component for "/adminpanel" route
    return (
      <React.StrictMode>
        <BrowserRouter>
        <Provider store={store}>
        
          <Routes>
            <Route path='/adminpanel' element={<AdminMain />} />
          </Routes>
          </Provider>

        </BrowserRouter>
      </React.StrictMode>
    );
  }

  // Render Header, Toptopage, Footer along with other components for other routes
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Routes>
          <Route path='/' element={<App />} />
      <Route path='/productdetail/:id' element={<ProductDetail />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/wishlist' element={<Whishlist />} />
      <Route path='/checkout' element={<Addressform />} />
      <Route path='/ordercomplete' element={<Completeorder />} />
      <Route path='/filterproducts' element={<Filterproducts />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
    
      <Route path='*' element={<PageNotFound />} />
          </Routes>
          <Toptopage />
          <Footer />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

root.render(<AppContainer />);
reportWebVitals();
