import React, { useState } from "react";
import logo from "../Images/bluelogo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MDBInput } from "mdb-react-ui-kit";
import { allFetchedCartData } from "../features/cart/cartSlice";
import { Navigate } from "react-router-dom";
import { clearUser } from "../features/UserAuthentication/authSlice";

const Header = () => {
  const cart = useSelector((state) => state.product.cart);
  const cart1 = useSelector(allFetchedCartData);
  const wishlist = useSelector((state) => state.product.wishlist);
  const userdata = useSelector((state) => state.product.Usersdata);
  const dispatch = useDispatch()
  console.log("header cart data => ", cart1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlelogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Dispatch an action to clear user state in Redux
    dispatch(clearUser());

    // Redirect to login page
    return <Navigate to="/login" replace />;
  }

  const handleProfile = () => {};

  return (
    <div className="mb-5">
      <div className=" fixed-top p-3 text-center text-white border-bottom   ">
        <div className="container">
          <div className="row gy-3">
            <div className="col-lg-2 col-sm-4 col-4">
              <a className="float-start">
                <Link to={"/"}>
                  <img src={logo} className="h-[45px]" />
                </Link>
                {/* <h3>Storehook</h3> */}
              </a>
            </div>

            <div className="order-lg-last col-lg-5 col-sm-8 col-8">
              <div className="d-flex float-end">
                <Link to={"/orders"}>
                  <a className="me-1  py-2 px-3 nav-link d-flex text-white hover-shadow  align-items-center">
                    {wishlist.length === 0 ? (
                      <i className="fas fa-heart m-1 me-md-2"></i>
                    ) : (
                      <i class="fas fa-heart  m-1 me-md-2 text-warning "></i>
                    )}
                    {/* {wishlish && wishlish.length === 0 ? (
  <i className="fas fa-heart m-1 me-md-2"></i>
) : (
  <i className="fas fa-shopping-cart m-1 me-md-2"></i>
)} */}
                    <p className="d-none d-md-block mb-0">Wishlist</p>{" "}
                  </a>
                </Link>
                <Link to={"/cart"}>
                  <a class="py-2 px-3  text-white hover-shadow    nav-link d-flex ">
                    <span>
                      <i class="fas fa-shopping-cart  me-md-2"></i>
                    </span>
                    {cart1 && cart1.products && cart1.products.length > 0 && (
                      <span
                        class="badge rounded-pill badge-notification bg-primary"
                        style={{ fontSize: "bold" }}
                      >
                        {cart1.products.length}
                      </span>
                    )}
                    <span className="d-none d-md-block ">My Cart</span>
                  </a>
                </Link>
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      onClick={toggleMenu}
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>

                  <div
                    className={`absolute text-left  right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                      isMenuOpen
                        ? "transition ease-in-out duration-100 transform opacity-100 scale-100"
                        : "transition ease-in duration-95 transform opacity-0 scale-95"
                    }`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    {isMenuOpen && (
                      <div className="py-1">
                        <Link to={"/orders"}>
                          <a
                            onClick={() => {
                              handleProfile(setIsMenuOpen(false));
                            }}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="user-menu-item-0"
                          >
                            Your Profile
                          </a>
                        </Link>

                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-2"
                          onClick={handlelogout}
                        >
                          Sign out
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-12 col-12">
              <div className="input-group float-center">
                <div className="form-outline ">
                  <MDBInput
                    className="bg-white"
                    id="form6Example1"
                    label="Search"
                  />
                </div>
                <button type="button" className="btn btn-primary shadow-0">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
