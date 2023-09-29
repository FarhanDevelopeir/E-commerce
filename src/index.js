import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter as  Route, RouterProvider, Routes, createBrowserRouter,      } from 'react-router-dom';
import './Components/Style.css';
import { store } from './Redux/app/Store';
import { Provider } from 'react-redux';
import ProductDetail from './Components/ProductDetail';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Cart from './Components/Cart';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<App/>  ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/productdetail/:id",
    element: (<ProductDetail/>),
  },
  {
    path: "/cart",
    element: (<Cart/>),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Header/> */}
    <RouterProvider router={router} />
    <Footer/>
    </Provider>
    
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
