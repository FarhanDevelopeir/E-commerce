import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  allCategoriesAsync,
  allProductsAsync,
  allFetchedCategories,
  allFetchedProducts,
  selectCategory,
  selectedCategory,
  totalItemsCount,
  getfilterProducts,
  filterproducts,
} from "../productSlice";
import {
  IsAlert,
  IsSubmitting,
  addCartAsync,
  setAlert,
  setSubmitting,
} from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../UserAuthentication/authSlice";
import Header from "../../../pages/Header";
import Footer from "../../../pages/Footer";
import { Toaster, toast } from "sonner";
import Skeleton from "../../../Shared/Skeleton.js";

const Filterproducts = () => {
  const isSubmitting = useSelector(IsSubmitting);
  const isAlert = useSelector(IsAlert);
  const [SpecificId, setSpecificId] = useState("");
  const totalItems = useSelector(totalItemsCount);
  const category2 = useSelector(selectedCategory);
  const dispatch = useDispatch();
  const allfilterproducts1 = useSelector(filterproducts);
  console.log(allfilterproducts1);
  const Category = useSelector(allFetchedCategories);
  const User = useSelector(selectLoggedInUser);
  const [filter, setfilter] = useState({});
  const [sort, setSort] = useState({});
  const [searchInput, setSearchInput] = useState(""); // Step 1

  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (allfilterproducts1.length === 0 && Object.keys(filter).length > 0) {
      const token = User.token
      dispatch(allProductsAsync({ filter, sort, token }));
    }
  }, [filter, sort]);

  useEffect(() => {
    if (isAlert) {
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
    const token = User.token
    console.log(cartData);
    dispatch(addCartAsync({cartData, token}));
  };

  useEffect(() => {
    handlefilter(category2);
    console.log("user ==> ", User.token);
  }, [category2]);

  useEffect(() => {
    dispatch(allCategoriesAsync());
  }, []);

  useEffect(() => {
    if (Object.keys(filter).length > 0) {
      const token = User.token
      dispatch(allProductsAsync({ filter, sort, token }));
      // dispatch(getfilterProducts({ filter, sort }));
    }
  }, [dispatch, filter, sort]);

  const searchdata = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };

  const handleResposivefilter = (e) => {
    const value = e.target.value;
    const filterObject = {
      category: value,
    };
    setfilter(filterObject);
    dispatch(selectCategory(value));
  };
  const handlefilter = (value) => {
    const filterObject = {
      category: value,
    };
    setfilter(filterObject);
    console.log(value);
    dispatch(selectCategory(value));
  };

  const handleSort = (e) => {
    const sort = {
      _sort: "price",
      _order: e.target.value,
    };
    setSort(sort);
    console.log(sort);
  };

  const displaydata = allfilterproducts1.map((item) => {
    return (
      <div className="   ">
        <div className=" border rounded-lg    ">
          <Link to={`/productdetail/${item._id}`}>
            <div style={{ textAlign: "center" }}>
              <div className=" h-32 sm:h-40  ">
                <img
                  src={item.thumbnailImage}
                  className=" h-full w-full  rounded-t-lg    "
                  // style={{ height: "150px", width: "150px", margin: "auto" }}
                  alt="Laptop"
                />
              </div>

              <div className=" w-[90%] m-auto text-gray-500">
                <div className="flex justify-between items-center my-2 text-xs ">
                  <p className="mb-0">{item.title}</p>
                  <p className="text-dark mb-0 text-sm hidden md:block">
                    ${item.price}
                  </p>
                  <div className="items-center flex md:hidden text-warning">
                    <p className="text-dark mb-0 text-sm  ">5</p>
                    <i className="fa fa-star"></i>
                  </div>
                </div>

                <div className="flex justify-between  text-sm my-2 items-center">
                  <p className="text-muted mb-0">
                    Stock <span className="fw-bold">{item.stock}</span>
                  </p>
                  <div className=" hidden md:block ms-auto text-warning">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <div className="items-center flex md:hidden">
                    <p className="text-dark mb-0 text-sm  md:hidden">
                      ${item.price}
                    </p>
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
                  } relative w-[80%] px-3 py-2 rounded-md font-semibold text-xs md:text-sm`}
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
    <div className="   flex flex-col justify-between  " >
      <div>
      <Header></Header>
      <div className=" mt-[100px] lg:mt-5 pt-5  ">
        <div className=" w-[95%]    xl:w-[90%] m-auto md:flex  ">
          <div className="  pr-10 pt-10 hidden md:block  ">
            <h3 className="mb-4 text-gray-500">Filters</h3>
            <h5 className="mb-2">Category</h5>

            <div className=" grid">
              {Category.map((item, i) => {
                return (
                  <>
                    <label className=" ml-2   flex     ">
                      <div>
                        <input
                          type="radio"
                          onChange={(e) => handlefilter(item.name)}
                          class=" mr-1"
                          name="category"
                          checked={category2 === item.name}
                        />
                      </div>
                      <div>
                        <p className=" m-auto "> {item.name}</p>
                      </div>
                    </label>
                  </>
                );
              })}
            </div>
          </div>
          <div className="  flex-1 ">
            <div className="">
              <div className=" md:hidden">
                <h6 className="font-semibold ">Filters</h6>
              </div>
              <div className="flex gap-2 md:justify-between  mb-4 mt-3  w-100">
                <div className="hidden md:block">
                  <h6> {totalItems} results</h6>
                </div>

                <div className=" md:hidden ">
                  <select
                    class="form-select  form-select-sm "
                    aria-label=".form-select-lg example"
                    onChange={(e) => handleResposivefilter(e)}
                  >
                    <option value="" selected disabled>
                      Category
                    </option>
                    {Category.map((item, i) => {
                      return (
                        <>
                          <option className="p-2" value={item.name}>
                            {item.name}
                          </option>
                          <br />
                        </>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <select
                    class="form-select form-select-sm md:form-select-lg "
                    aria-label=".form-select-lg example"
                    onClick={(e) => handleSort(e)}
                  >
                    <option value="" selected disabled>
                      Sort by Price
                    </option>
                    <option value="asc">Lower to High</option>
                    <option value="desc">Highest to lower</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="my-1">
              <h6 className="block md:hidden text-xs text-end">
                {totalItems} results{" "}
              </h6>
            </div>
            {allfilterproducts1.length === 0 ? (
              // <div className="  w-full h-3/4 flex flex-col justify-center  ">
              //   <div className=" m-auto h-10 w-10 rounded-full animate-[spin_2s_linear_infinite] border-4 border-dotted border-blue-800  "></div>
              // </div>
              <>
              <Skeleton/>
              </>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5  gap-2 mt-2">
                {displaydata}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
      <div className="mt-5">
      <Footer />
      </div>
    </div>
  );
};

export default Filterproducts;
