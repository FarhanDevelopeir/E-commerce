import React, { useEffect, useRef, useState } from "react";
import { category } from "../Redux/features/counter/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from 'sonner'

// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css'
import {
  ActivePage,
  AddProducts,
  SingleProductData,
  updateProduct,
} from "./features/AdminSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminDashboard from "./AdminDashboard";
import {
  updateProductAsync,
  EmptySelectedProduct,
  submitState,
  setSubmitting,
  AddProductsAsync,
  Alert,
  setAlert,
} from "../features/product/productSlice";

import useApiCall from "../Hooks/useApiCall";

const AdminAddProducts = () => {
  const singleProduct = useSelector((state) => state.product1.editProduct);
  const [alertPopup, setalertPopup] = useState(false);
  const activePage = useSelector((state) => state.adminslice.activePage);
  const isSubmitting = useSelector(submitState);
  const alert = useSelector(Alert);
  console.log(alert)
  const dispatch = useDispatch();

  // const [image1, setImage1] = useState(null);
  // const [image2, setImage2] = useState(null);
  // const [image3, setImage3] = useState(null);
  // const [thumbnailImage, setthumbnailImage] = useState(null);
  const [editthumbnailImage, seteditthumbnailImage] = useState(
    singleProduct.thumbnailImage || ""
  );
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [chnagesMade, setchnagesMade] = useState(false);
  const [formData, setFormData] = useState({
    title: singleProduct.title || "",
    brand: singleProduct.brand || "",
    price: singleProduct.price || "",
    category: singleProduct.category || "",
    stock: singleProduct.stock || "",
    rating: singleProduct.rating || "",
    discountPercentage: singleProduct.discountPercentage || "",
    description: singleProduct.description || "",
    thumbnailImage: null,
    image1: null,
    image1: null,
    image3: null,
  });

  
  useEffect(() => {
    
    if(Object.keys(singleProduct).length !== 0 ){
      toast.success('Successfully Updated');
      setTimeout(() => {
        dispatch(setAlert(false));
      }, 3000);
    }else{
      toast.success('Product has been created');
      setTimeout(() => {
        dispatch(setAlert(false));
      }, 3000);
    }
    
  }, [alert]);

  useEffect(() => {
    if (Object.keys(singleProduct).length === 0) {
      setFormData({
        title: "",
        brand: "",
        price: "",
        category: "",
        stock: "",
        rating: "",
        discountPercentage: "",
        description: "",
      });
    }
  }, [singleProduct]);

  useEffect(() => {
    const cleanupFunction = (e) => {
      if (Object.keys(singleProduct).length !== 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", cleanupFunction);

    return () => {
      if (chnagesMade) {
        const userConfirmation = window.confirm(
          "You have unsaved changes. Do you want to leave?"
        );
        if (!userConfirmation) {
          console.log("cancel button");
          dispatch(ActivePage("Add Products"));
          return false;
        }
      }
    };
  }, [chnagesMade]);

  useEffect(() => {
    if (
      Object.keys(singleProduct).length !== 0 &&
      formData.title !== singleProduct.title
    ) {
      setchnagesMade(true);
    }
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(alert=== true){
    //   toast.success('Product has been created')
    // }

    dispatch(setSubmitting("true"));

    if (Object.keys(singleProduct).length !== 0) {
      const Id = singleProduct._id;
      dispatch(updateProductAsync({ formData, Id }));
      // dispatch(EmptySelectedProduct());
    } else {
      const SubmitFormData = new FormData();
      SubmitFormData.append("title", formData.title);
      SubmitFormData.append("brand", formData.brand);
      SubmitFormData.append("category", formData.category);
      SubmitFormData.append("rating", formData.rating);
      SubmitFormData.append("description", formData.description);
      SubmitFormData.append("discountPercentage", formData.discountPercentage);
      SubmitFormData.append("price", formData.price);
      SubmitFormData.append("stock", formData.stock);
      SubmitFormData.append("thumbnailImage", formData.thumbnailImage);
      SubmitFormData.append("image1", formData.image1);
      SubmitFormData.append("image2", formData.image2);
      SubmitFormData.append("image3", formData.image3);
      console.log(SubmitFormData);
      dispatch(AddProductsAsync(SubmitFormData));
    }
    // setIsSubmitting(false)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    // setthumbnailImage(file);
    setFormData({ ...formData, thumbnailImage: file });
    // setthumbnailImage(URL.createObjectURL(file)); // Display selected image
  };

  const handleimage1Change = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image1: file });
    // setThumbnail(URL.createObjectURL(file)); // Display selected image
  };

  const handleimage2Change = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image2: file });
    // setThumbnail(URL.createObjectURL(file)); // Display selected image
  };

  const handleimage3Change = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image3: file });
    // setThumbnail(URL.createObjectURL(file)); // Display selected image
  };

  return (
    <div>
      <section class=" pt-6 px-3 sm:pt-6 sm:px-8  dark:bg-gray-500">
        <div class="  mx-auto  ">
          <h2 class="mb-4 text-lg md:text-xl font-bold text-gray-600 drop-shadow-md dark:text-white">
            Add a new product
          </h2>
          <form action="#" onSubmit={handleSubmit}>
            <div className="lg:flex lg:justify-around">
              <div class="grid grid-cols-1  gap-1 lg:w-[45%]  ">
                <div class="w-full   ">
                  <label
                    for="name"
                    class="mb-2 text-sm font-semibold text-gray-600 dark:text-white"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="title"
                    class="bg-white shadow-md mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required=""
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className=" justify-between w-[100%]    sm:grid sm:grid-cols-2 sm:gap-2 grid grid-cols-1  ">
                  <div class="w-full">
                    <label
                      for="brand"
                      class=" mb-2 text-sm font-semibold text-gray-600  dark:text-white"
                    >
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      id="brand"
                      class="bg-white shadow-md mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Product brand"
                      required=""
                    />
                  </div>
                  <div class="w-full">
                    <label
                      for="price"
                      class=" mb-2 text-sm font-semibold text-gray-600 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      id="price"
                      class="bg-white shadow-md mb-2 border  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$2999"
                      required=""
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="category"
                      class="mb-2 text-sm  font-semibold text-gray-600 dark:text-white"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      class="bg-white shadow-md mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="">Select category</option>
                      <option value="smartphones">smartphones</option>
                      <option value="Samsung">Samsung</option>
                      <option value="laptops">laptops</option>
                      <option value="fragrances">fragrances</option>
                      <option value="groceries">groceries</option>
                      <option value="skincare">skincare</option>
                      {/* corrected value */}
                      <option value="HD">home-decoration</option>
                    </select>
                  </div>
                  <div>
                    <label
                      for="item-weight"
                      class="mb-2 text-sm font-semibold text-gray-600 dark:text-white"
                    >
                      Stock
                    </label>
                    <input
                      value={formData.stock}
                      onChange={handleChange}
                      type="number"
                      name="stock"
                      id="item-weight"
                      class="bg-white shadow-md mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="12"
                      required=""
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label
                      for="category"
                      class="mb-2 text-sm  font-semibold text-gray-600 dark:text-white"
                    >
                      Thumbnail Image
                    </label>
                    <div className="flex justify-between p-2.5 bg-white border border-gray-300 rounded-lg shadow-md">
                      <input
                        type="file"
                        id="thumbnail"
                        onChange={handleThumbnailChange}
                      ></input>
                      {formData.thumbnailImage || editthumbnailImage ? (
                        <img
                          src={
                            formData.thumbnailImage
                              ? formData.thumbnailImage
                              : "http://localhost:4000/images/" +
                                editthumbnailImage
                          }
                          alt="Thumbnail"
                          className="mt-2 h-12 w-12 rounded-full"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <label
                      for="category"
                      class="mb-2 text-sm  font-semibold text-gray-600 dark:text-white"
                    >
                      Product Image 1
                    </label>
                    <div className="flex justify-between p-2.5 bg-white border border-gray-300 rounded-lg shadow-md">
                      <input
                        type="file"
                        id="image1"
                        onChange={handleimage1Change}
                      ></input>
                      {/* {image1 && (
                        <img
                          src={image1}
                          alt="image1"
                          className="mt-2 h-12 w-12 rounded-full"
                        />
                      )} */}
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <label
                      for="category"
                      class="mb-2 text-sm  font-semibold text-gray-600 dark:text-white"
                    >
                      Product Image 2
                    </label>
                    <div className="flex justify-between p-2.5 bg-white border border-gray-300 rounded-lg shadow-md">
                      <input
                        type="file"
                        id="image2"
                        onChange={handleimage2Change}
                      ></input>
                      {/* {image2 && (
                        <img
                          src={image2}
                          alt="image2"
                          className="mt-2 h-12 w-12 rounded-full"
                        />
                      )} */}
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <label
                      for="category"
                      class="mb-2 text-sm  font-semibold text-gray-600 dark:text-white"
                    >
                      Product Image 3
                    </label>
                    <div className="flex justify-between p-2.5 bg-white border border-gray-300 rounded-lg shadow-md">
                      <input
                        type="file"
                        id="image3"
                        onChange={handleimage3Change}
                      ></input>
                      {/* {image3 && (
                        <img
                          src={image3}
                          alt="image3"
                          className="mt-2 h-12 w-12 rounded-full"
                        />
                      )} */}
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    for="category"
                    class="mb-2 text-sm  font-semibold text-gray-600 dark:text-white"
                  >
                    Image's
                  </label>
                  {/* <div className="grid grid-cols-2 gap-2  sm:grid sm:grid-cols-3 sm:gap-4 ">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="bg-white overflow-hidden shadow-md mb-2 border sm:py-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <input
                          type="file"
                          id={`image_${index}`}
                          onChange={(e) => handleImagesChange(e, index)}
                        />
                        {images && images[index] && (
                          <img
                            src={images[index]}
                            alt={`Thumbnail ${index}`}
                            className="m-auto mt-2 h-12 w-12 rounded-full"
                          />
                        )}
                      </div>
                    ))}
                  </div> */}
                </div>
              </div>
              <div class="grid gap-1  lg:w-[45%] sm:grid-cols-1 ">
                <div class="w-full">
                  <label
                    for="name"
                    class="mb-2 text-sm font-semibold text-gray-600 dark:text-white"
                  >
                    Rating
                  </label>
                  <input
                    type="Number"
                    value={formData.rating}
                    onChange={handleChange}
                    name="rating"
                    id="name"
                    class="bg-white shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="4.5"
                    required=""
                  />
                </div>
                <div class="w-full">
                  <label
                    for="name"
                    class="mb-2 text-sm font-semibold text-gray-600 dark:text-white"
                  >
                    Discounted Price
                  </label>
                  <input
                    type="Number"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                    name="discountPercentage"
                    // id="name"
                    class="bg-white shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$1550"
                    required=""
                  />
                </div>
                <div class="w-full">
                  <label
                    for="description"
                    class="mb-2 text-sm font-semibold text-gray-600 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={handleChange}
                    id="description"
                    name="description"
                    rows="11"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-white shadow-md mb-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your description here"
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className={`shadow-md mb-2  ${
                // !formData.title ||
                // !formData.brand ||
                // !formData.category ||
                // !formData.description ||
                !formData.discountPercentage || isSubmitting
                  ? // !formData.price ||
                    // !formData.rating ||
                    // !formData.stock

                    "bg-gray-200 pointer-events-none cursor-not-allowed text-gray-400"
                  : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-700 text-white"
                // isSubmitting ?
                // "bg-gray-200 pointer-events-none cursor-not-allowed text-gray-400"
                // :'bg-gradient-to-r from-indigo-500 to-pink-500 hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-700 text-white'
              } relative  cursor-pointer  flex justify-between float-right font-semibold  px-5 py-2.5 mt-4 sm:mt-6 text-md text-center 
  rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className=" absolute left-[43%] h-7 w-7 border-dashed border-4 border-gray-700 rounded-full animate-spin ">
                  {" "}
                </div>
              ) : (
                ""
              )}
              {Object.keys(singleProduct).length !== 0
                ? "Update Product"
                : "Add Product"}
            </button>
          </form>
          {alert && (
   
             
            <Toaster richColors position="top-center" />
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminAddProducts;
