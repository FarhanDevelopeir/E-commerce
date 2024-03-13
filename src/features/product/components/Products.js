import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import axios from 'axios';

import { Link } from "react-router-dom";
import {
  addtocart,
  addtowishlist,
  displayproducts,
  updateAddedToCart,
} from "../../../Redux/features/counter/ProductSlice";

import { allProductsAsync, allFetchedProducts, totalItemsCount } from "../productSlice";
import {
  allCartDataAsync,
  addCartAsync,
  IsSubmitting,
  setSubmitting,
  IsAlert,
  setAlert,
} from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../UserAuthentication/authSlice";
import { Toaster, toast } from "sonner";

const Products = () => {
    const products = useSelector(allFetchedProducts);
    const dispatch = useDispatch()
    const User = useSelector(selectLoggedInUser);
    const [selectedPage, setselectedPage] = useState(1);
    const limit = 10
    const totalItems = useSelector(totalItemsCount)

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const pagination = { _page: selectedPage, _limit: limit }
        dispatch(allProductsAsync({pagination} ))
        dispatch(allCartDataAsync())
        console.log(products)
    }, [selectedPage])
  const isSubmitting = useSelector(IsSubmitting);
  const isAlert = useSelector(IsAlert);
  console.log(isSubmitting);
  const [SpecificId, setSpecificId] = useState("");
  
  useEffect(() => {
    
      if(isAlert){
        toast.success("Product Successfully added to cart  ");
      setTimeout(() => {
        dispatch(setAlert(false));
      }, 2000);
      }
    
  }, [isAlert]);

  const handleCart = (itemId) => {
    
    dispatch(setSubmitting(true));
    setSpecificId(itemId);
    const cartData = {
      productId: itemId,
      quantity: 1,
    };
    console.log(cartData);
    dispatch(addCartAsync(cartData));
  };

  const handlePage = (page) => {
    setselectedPage(page);
  };

    const displaydata = products.map((item) => {
        return (
            <div className=" col-sm-6 col-md-4 col-lg-3 mb-4 mt-3 mb-lg-0 ">

                <div className="card pt-3 shadow border rounded hover-zoom ">

                    <Link to={`/productdetail/${item._id}`}>
                        <div style={{ textAlign: 'center' }}>


                            <div className='hover-zoom'>
                                <img src={item.thumbnailImage}
                                    className="card-img-top    " style={{ height: '150px', width: '150px', margin: 'auto' }} alt="Laptop" />
                            </div>

              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="mb-0">{}</h5>
                  <h5 className="text-dark mb-0">${item.price}</h5>
                </div>

                <div className="d-flex justify-content-between  ">
                  <p className="text-muted mb-0">
                    Available: <span className="fw-bold">{item.stock}</span>
                  </p>
                  <div className="ms-auto text-warning">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div
            className="w-full  mb-3 d-flex justify-center"
            style={{ margin: "auto" }}
          >
            {!item.addedToCart ? (
              <>
                <button
                  type="button"
                  className={`${
                    isSubmitting && SpecificId === item._id
                      ? "bg-gray-200 pointer-events-none cursor-not-allowed text-gray-400"
                      : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-700 text-white"
                  } relative w-[80%] px-3 py-2 rounded-md font-semibold`}
                  onClick={() => handleCart(item._id)}
                >
                  Add to Cart
                </button>
                {isSubmitting && SpecificId === item._id ? (
                  <div className="absolute mt-[5px]  h-7 w-7 border-dashed border-4 border-gray-600 rounded-full animate-spin"></div>
                ) : (
                  ""
                )}

                {isAlert && <Toaster richColors position="top-right" />}
              </>
            ) : (
              <Link to={"/cart"}>
                <button type="button" className="btn btn-warning">
                  View Cart
                </button>
              </Link>
            )}
            {/* <button className='btn btn-warning' onClick={() => { dispatch(addtowishlist(item)) }} >
                            <i className="fas fa-heart m-1 me-md-2"></i>
                        </button> */}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="mb-5 ">
      <h2 className="mt-4   ">For You</h2>
      <section style={{ backgroundColor: "#fff" }}>
        <div className="container  order mt-3 rounded  ">
          <div className="row mb-3 ">
            {products.length < 1 ? (
              <>
                <div
                  class="spinner-border text-danger m-auto d-inline"
                  role="status"
                >
                  <span class="visually-hidden ">Loading...</span>
                </div>
                <h1 className="text-center">...loading</h1>
              </>
            ) : (
              <>{displaydata}</>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(selectedPage - 1) * limit + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {selectedPage * limit > totalItems
                      ? totalItems
                      : selectedPage * limit}
                  </span>{" "}
                  of <span className="font-medium">{totalItems}</span> results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  {Array.from({
                    length: Math.ceil(totalItems / limit),
                  }).map((el, index) => {
                    return (
                      <div
                        onClick={(e) => handlePage(index + 1)}
                        aria-current="page"
                        className={`relative z-10 cursor-pointer inline-flex items-center ${
                          index + 1 === selectedPage
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-50"
                        }  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                      >
                        {index + 1}
                      </div>
                    );
                  })}

                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    ...
                  </span>

                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
