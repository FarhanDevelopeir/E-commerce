import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
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
} from "../../Redux/features/counter/ProductSlice";
import { Button } from "@mui/material";
import { MDBInput } from "mdb-react-ui-kit";

const Filterproducts = () => {
  const { category } = useParams(); // Use useParams to get the category from the URL
  const dispatch = useDispatch();
  const allfilterproducts = useSelector(
    (state) => state.product.allproductsinfilterComponent
  );
  const filterproduct = useSelector((state) => state.product.filterproducts);
  const Category = useSelector((state) => state.product.categoryNames);
  const { price } = allfilterproducts;
  const [categoryfilter, setcategoryfilter] = useState(false);

  const [searchInput, setSearchInput] = useState(""); // Step 1

  // Use useLocation to get the current location object
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const selectedCategory = searchParams.get('category'); // Get the category parameter from the URL

  // ...

  // console.log(checkprice);

  const fetchproducts = async () => {
    const res = await axios
      .get("https://fakestoreapi.com/products")
      .catch((error) => {
        console.log("err", error);
      });
    dispatch(allproductsinfilter(res.data));
    // const rescate = await axios
    //     .get('https://fakestoreapi.com/products/categories')
    //     .catch((error) => {
    //         console.log('err', error)
    //     })
    // dispatch(namecategory(rescate.data));
  };

  // useEffect(() => {
  //     fetchproducts();

  // }, [])
  useEffect(() => {
    fetchproducts();
    // Check if the category exists and apply the category filter
    // if (selectedCategory) {
    //     filtercategory(selectedCategory);
    // }
  }, [category]);

  const searchdata = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };
  const filtercategory = (selectcategory) => {
    const filteredProducts = allfilterproducts.filter(
      (item) => item.category === selectcategory
    );
    dispatch(filter(filteredProducts));
    setcategoryfilter(true);
  };

  const filterprice = (selectedprice) => {
    const filterprice = allfilterproducts.filter(
      (item) => item.price === selectedprice
    );
    dispatch(filter(filterprice));
    setcategoryfilter(true);
  };

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

  const displaydata = nomatchesproducts ? (
    <h2 className="mt-5 text-center">Sorry, data is not available</h2>
  ) : (
    filteredProducts.map((item) => {
      return (
        <div className=" col-sm-6 col-md-4 col-lg-3 mb-4 mt-3 mb-lg-0 ">
          <div className="card pt-3   hover-zoom shadow ">
            <Link to={`/productdetail/${item.id}`}>
              <div style={{ textAlign: "center" }}>
                <div className="hover-zoom">
                  <img
                    src={item.image}
                    className="card-img-top    "
                    style={{ height: "150px", width: "150px", margin: "auto" }}
                    alt="Laptop"
                  />
                </div>

                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <h5 className="mb-0">{truncateTitle(item.title, 2)}</h5>
                    <h5 className="text-dark mb-0">${item.price}</h5>
                  </div>

                  <div className="d-flex justify-content-between  ">
                    <p className="text-muted mb-0">
                      Available: <span className="fw-bold">6</span>
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
              className="w-75 mb-3 d-flex justify-content-between"
              style={{ margin: "auto" }}
            >
              {!item.addedToCart ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(addtocart(item));
                    // Update the addedToCart property when the item is added to the cart
                    dispatch(
                      updateAddedToCart({
                        productId: item.id,
                        addedToCart: true,
                      })
                    );
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <Link to={"/cart"}>
                  <button type="button" className="btn btn-warning">
                    View Cart
                  </button>
                </Link>
              )}
              <button
                className="btn btn-warning"
                onClick={() => {
                  dispatch(addtowishlist(item));
                }}
              >
                <i className="fas fa-heart m-1 me-md-2"></i>
              </button>
            </div>
          </div>
        </div>
      );
    })
  );

  return (
    <div className="mt-5 pt-5">
      <div className="container d-flex">
        <div className="" style={{ width: "20%", marginTop: "10px" }}>
          <h3 className="mb-4">Filters</h3>
          <h5 className="mb-2">Category</h5>
          {Category.map((item) => {
            return (
              <>
                <label>
                  <input
                    type="radio"
                    onChange={(e) => filtercategory(item)}
                    class="form-check-input"
                    name="category"
                  />
                  {item}
                </label>
                <br />
              </>
            );
          })}

          {/* price filter */}
          <h5 className="mt-3 mb-2">Price</h5>
          <form class="multi-range-field ">
            <input
              id="multi6"
              class="multi-range"
              type="range"
              min="0"
              max="1500"
              step="250"
            />
          </form>

          <button
            className="btn btn-danger mt-3"
            name="category"
            onClick={() => {
              setcategoryfilter(false);
              setSearchInput("");
            }}
          >
            Clear filters
          </button>
        </div>
        <div style={{ width: "96%" }}>
          <div>
            <div className="d-flex justify-content-between w-100">
              {/* <div className='d-flex justify-content-between ' style={{width:'70%'}}> */}
              <div className="form-outline w-25 ">
                <MDBInput
                  className="bar  bg-white "
                  id="form6Example1"
                  label="Search products"
                  onChange={searchdata}
                />
              </div>
              <div>
                <h5>Total products {filteredProducts.length}</h5>
              </div>

              <div>
                <select
                  class="form-select  form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option selected>Sort by Price</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row mt-2">{displaydata}</div>
        </div>
      </div>
    </div>
  );
};

export default Filterproducts;
