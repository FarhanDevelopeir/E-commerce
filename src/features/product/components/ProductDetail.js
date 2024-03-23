import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addtocart,
  productview,
} from "../../../Redux/features/counter/ProductSlice";
import { singleProductFetched, getOneProductAsync } from "../productSlice";
import { selectLoggedInUser } from "../../UserAuthentication/authSlice";
import { IsAlert, IsSubmitting, addCartAsync, setAlert, setSubmitting } from "../../cart/cartSlice";
import Header from "../../../pages/Header";
import { Toaster, toast } from "sonner";

const ProductDetail = ({ item }) => {
  const singleproduct = useSelector(singleProductFetched);
  const User = useSelector(selectLoggedInUser);
  const cart = useSelector((state) => state.product.cart);
  const [quantity, setQuantity] = useState(1);
  const isSubmitting = useSelector(IsSubmitting);
  const isAlert = useSelector(IsAlert);


  const { price, image, title, description, rating } = singleproduct || {};
  console.log(singleproduct);
  const { id } = useParams();
  const dispatch = useDispatch();

  axios.defaults.withCredentials = true;
  // const [selectedSize, setSelectedSize] = useState(null);

  const [selectedImage, setSelectedImage] = useState(
    singleproduct.thumbnailImage
  );

  const handleImageChange = (newImage) => {
    setSelectedImage(newImage);
  };

  useEffect(() => {
    if (isAlert) {
      toast.success("Product Successfully added to cart  ");
      setTimeout(() => {
        dispatch(setAlert(false));
      }, 2000);
    }
  }, [isAlert]);

  // const handleSizeSelect = (size) => {
  //   setSelectedSize(size);
  // };

  const handleCart = (itemId) => {
    dispatch(setSubmitting(true));
    const cartData = {
      productId: itemId,
      quantity: quantity,
    };
    const token = User.token
    console.log(cartData);
    dispatch(addCartAsync({cartData, token}));
  };

  // {Old code }

  // const changeQuality = (decrease) => {
  //   if (decrease) {
  //     if (quantity === 1) {
  //       setQuantity(1)
  //     } else {
  //       setQuantity(prevQuantity => prevQuantity - 1)
  //     }
  //   } else {
  //     setQuantity(prevQuantity => prevQuantity + 1)
  //   }
  // }

  // {better code }
  const changeQuality = (decrease) => {
    setQuantity((prevQuantity) => {
      if (decrease) {
        return prevQuantity === 1 ? 1 : prevQuantity - 1;
      } else {
        return prevQuantity + 1;
      }
    });
  };

  useEffect(() => {
    if (id && id !== "") dispatch(getOneProductAsync(id));
  }, [id, singleProductFetched]);

  useEffect(() => {
    dispatch(productview({})); // Pass an empty object to reset the state
  }, []);

  // console.log(products);
  return (
    <div>
      <Header />
      {singleproduct.length === 0 ? (
        <h1 className="mt-5 pt-5">...loading</h1>
      ) : (
        <section className="py-5 mt-24">
          <div className=" w-[97%] md:w-[90%] lg:w-[80%] m-auto  p-3">
            <div className="md:flex gx-5">
              <div class="lg:col-span-3 ">
                <div className=" lg:items-start">
                  <div className="lg:order-2 lg:ml-5">
                    <div className="max-w-2xl overflow-hidden rounded-lg">
                      <img
                        className="h-full w-full max-w-full object-cover"
                        src={selectedImage || singleproduct.thumbnailImage}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className=" mt-2 lg:mt-0 w-full lg:order-1  lg:flex-shrink-0">
                    <div className="flex justify-around  ">
                      <button
                        type="button"
                        className={`flex-0 aspect-square mb-3  h-14  sm:h-16 lg:h-20 overflow-hidden rounded-lg  text-center ${
                          selectedImage === singleproduct.thumbnailImage
                            ? "border-2 border-yellow-600"
                            : ""
                        } `}
                        onClick={() =>
                          handleImageChange(singleproduct.thumbnailImage)
                        }
                      >
                        <img
                          className="h-full w-full object-cover"
                          src={singleproduct.thumbnailImage}
                          alt=""
                        />
                      </button>
                      <button
                        type="button"
                        className={`flex-0 aspect-square mb-3 h-14  sm:h-16 lg:h-20 overflow-hidden rounded-lg  text-center ${
                          selectedImage === singleproduct.image1
                            ? "border-2 border-yellow-600"
                            : ""
                        } `}
                        onClick={() => handleImageChange(singleproduct.image1)}
                      >
                        <img
                          className="h-full w-full object-cover"
                          src={singleproduct.image1}
                          alt=""
                        />
                      </button>
                      <button
                        type="button"
                        className={`flex-0 aspect-square mb-3 h-14  sm:h-16 lg:h-20 overflow-hidden rounded-lg  text-center ${
                          selectedImage === singleproduct.image2
                            ? "border-2 border-yellow-600"
                            : ""
                        } `}
                        onClick={() => handleImageChange(singleproduct.image2)}
                      >
                        <img
                          className="h-full w-full object-cover"
                          src={singleproduct.image2}
                          alt=""
                        />
                      </button>
                      <button
                        type="button"
                        className={`flex-0 aspect-square mb-3 h-14  sm:h-16 lg:h-20 overflow-hidden rounded-lg  text-center ${
                          selectedImage === singleproduct.image3
                            ? "border-2 border-yellow-600"
                            : ""
                        } `}
                        onClick={() => handleImageChange(singleproduct.image3)}
                      >
                        <img
                          className="h-full w-full object-cover"
                          src={singleproduct.image3}
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <main className=" ml-3 col-lg-6">
                <div className="ps-lg-3">
                  <h4 className="title text-lg md:text-xl text-dark">{singleproduct.title}</h4>
                  <h6 className=" hidden md:block title text-dark">
                    {singleproduct.description}
                  </h6>
                  <div className="d-flex flex-row mt-3">
                    <div className="text-warning mb-1 me-2">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                    <span className="text-muted">
                      <i className="fas fa-shopping-basket fa-sm mx-1"></i>
                      {singleproduct.rating} rating
                    </span>
                  </div>

                  <div className="">
                    <span className="h5">
                      ${singleproduct.discountPercentage}
                    </span>
                  </div>
                  <div className="mb-1">
                    <span className="text-sm line-through">
                      ${singleproduct.price}
                    </span>
                  </div>

                  <p>{/* {singleproduct.description} */}</p>

                  <div className="row text-sm md:text-[15px]">
                    <dt className="col-3">Brand</dt>
                    <dd className="col-9">{singleproduct.brand}</dd>

                    <dt className="col-3">Stock</dt>
                    <dd className="col-9">{singleproduct.stock}</dd>

                    <dt className="col-3 ">Category</dt>
                    <dd className="col-9  m-auto px-4 sm:px-0">{singleproduct.category}</dd>
                  </div>

                  <hr />

                  <div className="row mb-4">
                    <div className="col-md-4 col-6 mb-3">
                      <label className="mb-2 d-block font-semibold">Quantity</label>
                      <div className="  flex justify-between items-center  " >
                        
                        <button
                        onClick={() => changeQuality(true)}
                          style={{borderRadius: '9999px'}}
                          class="text-white h-8 w-8 md:h-10 md:w-10  bg-black hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-gray-500 font-medium rounded-full text-sm text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          <i className="fas fa-minus m-auto"></i>
                          
                        </button>

                        <p className=" font-semibold text-center m-auto   ">
                          {quantity}
                        </p>
                        <button
                        onClick={() => changeQuality(false)}
                          style={{borderRadius: '9999px'}}
                          class="text-white h-8 w-8 md:h-10 md:w-10 bg-black hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-gray-500 font-medium rounded-full text-sm text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          <i className="fas fa-plus m-auto"></i>
                          
                        </button>
                      
                      </div>
                    </div>
                  </div>
                
                <div className=" relative ">
                  
                <button
                  type="button"
                  className={`${
                    isSubmitting 
                      ? "bg-gray-200 pointer-events-none cursor-not-allowed text-gray-400"
                      : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-700 text-white"
                  }   w-full sm:w-[80%] md:w-[60%] lg:w-[40%] m-auto md:m-0  px-3 py-3 rounded-md font-semibold text-xs md:text-sm`}
                  onClick={() => handleCart(singleproduct._id)}
                >
                  <div className="text-[15px]">
                  <i className="me-1 fa fa-shopping-basket"/> <span >Add to cart</span>
                  </div>
                </button>
                {isSubmitting ? (
                  <div className="absolute top-3 left-[47%] sm:left-[40%] md:left-[26%]  lg:left-[18%]   h-7 w-7 border-dashed border-4 border-gray-600 rounded-full animate-spin"></div>
                ) : (
                  ""
                )}
                {isAlert && <Toaster richColors position="top-right" />}
                </div>
                  
                </div>
              </main>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
