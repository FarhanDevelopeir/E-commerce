import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate, Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import {
  addtocart,
  addtowishlist,
  allproductsinfilter,
  displayproducts,
  category,
  filter,
  updateAddedToCart,
  namecategory,
} from "../../../Redux/features/counter/ProductSlice";
import { Button } from "@mui/material";
import { MDBInput } from "mdb-react-ui-kit";
import { allCategoriesAsync, allProductsAsync, allFetchedCategories, allFetchedProducts, selectCategory, selectedCategory, totalItemsCount } from '../productSlice';
import { IsAlert, IsSubmitting, addCartAsync, setAlert, setSubmitting } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../UserAuthentication/authSlice";
import Header from "../../../pages/Header";
import { Toaster, toast } from "sonner";


const Filterproducts = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isSubmitting = useSelector(IsSubmitting);
  const isAlert = useSelector(IsAlert);
  const [SpecificId, setSpecificId] = useState("");
  const totalItems = useSelector(totalItemsCount)
  const category1 = params.get("category");
  const category2 = useSelector(selectedCategory);
  const { category } = useParams(); // Use useParams to get the category from the URL
  const dispatch = useDispatch();
  const allfilterproducts = useSelector(
    (state) => state.product.allproductsinfilterComponent
  );
  const filterproduct = useSelector((state) => state.product.filterproducts);
  const allfilterproducts1 = useSelector(allFetchedProducts);
  console.log(allfilterproducts1)
  const Category = useSelector(allFetchedCategories);
  const User = useSelector(selectLoggedInUser);
  const { price } = allfilterproducts;
  const [categoryfilter, setcategoryfilter] = useState(false);
  const [filter, setfilter] = useState({});
  const [sort, setSort] = useState({});
  const [searchInput, setSearchInput] = useState(""); // Step 1

  // Use useLocation to get the current location object
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const selectedCategory = searchParams.get('category'); // Get the category parameter from the URL

  // ...

  axios.defaults.withCredentials = true;
 
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
      quantity: 1
    }
    console.log(cartData)
    dispatch(addCartAsync(cartData))
  }

  useEffect(() => {
    handlefilter(category2);
    console.log("user ==> ", User.token)
  }, [category2]);

  useEffect(() => {
    dispatch(allCategoriesAsync())
  }, [])

  useEffect(() => {
    if (Object.keys(filter).length > 0) {
      dispatch(allProductsAsync({ filter, sort }));
    }
    dispatch(allProductsAsync())
  }, [dispatch , sort]);

 

  const searchdata = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };


  const handlefilter = (value) => {
    const filterObject = {
      category: value
    }
    setfilter(filterObject)
    dispatch(selectCategory(value));

  }

  const handleSort = (e) => {
    const sort = {
      _sort : 'price',
      _order : e.target.value
    };
    setSort(sort);
    console.log(sort)
  }

  const displayproductsinfilteration =
    categoryfilter === true ? filterproduct : allfilterproducts;

  const filteredProducts = displayproductsinfilteration.filter((item) => {
    const productCategory = item.category.toLowerCase();
    const productTitle = item.title.toLowerCase();
    const search = searchInput.toLowerCase();
    return productTitle.includes(search) || productCategory.includes(search);
  });



  const truncateTitle = (title, maxWords) => {
    const words = title.split(" ");

    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }

    return title;
  };

  const nomatchesproducts = filteredProducts.length === 0;

  const displaydata = allfilterproducts1.length < 0 ? (
    <h2 className="mt-5 text-center">Sorry, data is not available</h2>
  ) : (
    allfilterproducts1.map((item) => {
      return (
        <div className=" col-sm-6 col-md-4 col-lg-3 mb-4 mt-3 mb-lg-0 ">
          <div className="card pt-3   hover-zoom shadow ">
            <Link to={`/productdetail/${item.id}`}>
              <div style={{ textAlign: "center" }}>
                <div className="hover-zoom">
                  <img
                    src={item.thumbnailImage}
                    className="card-img-top    "
                    style={{ height: "150px", width: "150px", margin: "auto" }}
                    alt="Laptop"
                  />
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
    })
  );

  return (
    <div>
      <Header></Header>
      <div className="mt-5 pt-5">
        <div className="container d-flex">
          <div className="" style={{ width: "20%", marginTop: "10px" }}>
            <h3 className="mb-4">Filters</h3>
            <h5 className="mb-2">Category</h5>


            {Category.map((item, i) => {
              return (
                <>
                  <label>
                    <input
                      type="radio"
                      onChange={(e) => handlefilter(item.name)}
                      class="form-check-input"
                      name="category"
                      checked={category2 === item.name}
                    />
                    {item.name}
                  </label>
                  <br />
                </>
              );
            })}

          </div>
          <div style={{ width: "96%" }}>
            <div>
              <div className="d-flex justify-content-between w-100">
                <div>
                  <h5>Total products {totalItems}</h5>
                </div>

                <div>
                  <select
                    class="form-select  form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    onClick={(e) => handleSort(e)}
                  >
                    <option value="" selected disabled>Sort by Price</option>
                    <option value="asc">Lower to High</option>
                    <option value="desc">Highest to lower</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row mt-2">{displaydata}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filterproducts;
