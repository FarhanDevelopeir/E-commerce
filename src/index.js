import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import Addressform from './Components/Checkout/BasicDetails';
import Completeorder from './Components/Checkout/Completeorder';
import Filterproducts from './Components/Category/Filterproducts';
import SignUp from './Components/UserAuthentication/SignUp';
import Login from './Components/UserAuthentication/Login';
import AdminMain from './AdminComponents/AdminMain';

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppContainer = () => {
  const currentPath = window.location.pathname;

  if (currentPath.startsWith("/adminpanel")) {
    // Render only AdminMain component for "/adminpanel" route and its sub-routes
    return (
      <React.StrictMode>
        <BrowserRouter>
          <Provider store={store}>
            <Routes>
              <Route path="/adminpanel/*" element={<AdminMain />} />
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
            <Route path="/" element={<App />} />
            <Route path="/productdetail/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Whishlist />} />
            <Route path="/checkout" element={<Addressform />} />
            <Route path="/ordercomplete" element={<Completeorder />} />
            <Route path="/filterproducts" element={<Filterproducts />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            <Route path="*" element={<PageNotFound />} />
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
