import React, { useEffect, useRef, useState } from "react";
import { category } from "../Redux/features/counter/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css'
import {
  ActivePage,
  AddProducts,
  AddProductsAsync,
  EmptySelectedProduct,
  SingleProductData,
  updateProduct,
} from "./features/AdminSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminDashboard from "./AdminDashboard";

const AdminAddProducts = () => {
  const singleProduct = useSelector((state)=>state.product1.selectedProduct)
  console.log(singleProduct)
  const [alertPopup, setalertPopup] = useState(false)
  const activePage = useSelector((state) => state.adminslice.activePage);
  // const Product = useSelector((state) => state.adminslice.editProduct);
  // console.log("get single product ", Product);
  const dispatch = useDispatch();

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [thumbnailImage, setthumbnailImage] = useState("");
  const [chnagesMade, setchnagesMade] = useState(false);
  const [formData, setFormData] = useState({
    title: singleProduct.title || "",
    brand: singleProduct.brand || "",
    price: singleProduct.price || "",
    category: singleProduct.category || "",
    stock: singleProduct.stock || "",
    // thumbnailImage: Product.thumbnail || '',
    // image1: Product.image1 || '',
    // image2: Product.image2 || '',
    // image3: Product.image3 || '',
    rating: singleProduct.rating || "",
    discountPercentage: singleProduct.discountPercentage || "",
    description: singleProduct.description || "",
  });

  // Assuming `Product` is a prop passed to this component
  useEffect(() => {
    if (Object.keys(singleProduct).length !== 0) {
      // If a product is available, populate the form fields with its data
      setFormData({
        title: singleProduct.title || "",
        brand: singleProduct.brand || "",
        price: singleProduct.price || "",
        category: singleProduct.category || "",
        stock: singleProduct.stock || "",
        thumbnail: singleProduct.thumbnail || null,
        images: singleProduct.images || [],
        rating: singleProduct.rating || "",
        discountPercentage: singleProduct.discountPercentage || "",
        description: singleProduct.description || "",
      });
      setthumbnailImage(singleProduct.thumbnail);
     
    } else {
      // If no product is available, reset the form fields
      // setFormData({
      //   title: "",
      //   brand: "",
      //   price: "",
      //   category: "",
      //   stock: "",
      //   rating: "",
      //   discountPercentage: "",
      //   description: "",
      // });
    }
  }, [singleProduct]); // Update the form data whenever `Product` changes

  

  useEffect(() => {
    const cleanupFunction = (e) => {
      if (Object.keys(singleProduct).length !== 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };


    window.addEventListener("beforeunload", cleanupFunction);

    return () => {

      if (chnagesMade) {

        const userConfirmation = window.confirm("You have unsaved changes. Do you want to leave?");
        if (!userConfirmation) {
          console.log('cancel button')
          dispatch(ActivePage('Add Products'));
          return false
        }
      }
    };
  }, [chnagesMade]);

  useEffect(() => {
    if (Object.keys(singleProduct).length !== 0 && formData.title !== singleProduct.title) {
      setchnagesMade(true);
    }
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(singleProduct).length !== 0) {
      formData.id = singleProduct._id;
      dispatch(updateProduct(formData));
      dispatch(EmptySelectedProduct());
    } else {
      console.log( thumbnailImage, image1, image2, image3  )
      const SubmitFormData = new FormData()
      SubmitFormData.append('title', formData.title)
      SubmitFormData.append('brand', formData.brand)
      SubmitFormData.append('category', formData.category)
      SubmitFormData.append('rating', formData.rating)
      SubmitFormData.append('description', formData.description)
      SubmitFormData.append('discountPercentage', formData.discountPercentage)
      SubmitFormData.append('price', formData.price)
      SubmitFormData.append('stock', formData.stock)
      SubmitFormData.append('thumbnailImage', thumbnailImage)
      SubmitFormData.append('image1', image1)
      SubmitFormData.append('image2', image2)
      SubmitFormData.append('image3', image3)
      console.log(SubmitFormData);
      dispatch(AddProductsAsync(SubmitFormData));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setthumbnailImage(file)
    // setThumbnail(URL.createObjectURL(file)); // Display selected image
  };

  const handleimage1Change = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setImage1(file)
    // setThumbnail(URL.createObjectURL(file)); // Display selected image
  };

  const handleimage2Change = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setImage2(file)
    // setThumbnail(URL.createObjectURL(file)); // Display selected image
  };

  const handleimage3Change = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setImage3(file)
    // setThumbnail(URL.createObjectURL(file)); // Display selected image
  };

  // const handleImagesChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     images: [...prevFormData.images, ...files],
  //   }));
  // };
 
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
                      {thumbnailImage && (
                        <img
                          src={thumbnailImage}
                          alt="Thumbnail"
                          className="mt-2 h-12 w-12 rounded-full"
                        />
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
                      {image1 && (
                        <img
                          src={image1}
                          alt="image1"
                          className="mt-2 h-12 w-12 rounded-full"
                        />
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
                      Product Image 2
                    </label>
                    <div className="flex justify-between p-2.5 bg-white border border-gray-300 rounded-lg shadow-md">
                      <input
                        type="file"
                        id="image2"
                        onChange={handleimage2Change}
                      ></input>
                      {image2 && (
                        <img
                          src={image2}
                          alt="image2"
                          className="mt-2 h-12 w-12 rounded-full"
                        />
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
                      Product Image 3
                    </label>
                    <div className="flex justify-between p-2.5 bg-white border border-gray-300 rounded-lg shadow-md">
                      <input
                        type="file"
                        id="image3"
                        onChange={handleimage3Change}
                      ></input>
                      {image3 && (
                        <img
                          src={image3}
                          alt="image3"
                          className="mt-2 h-12 w-12 rounded-full"
                        />
                      )}
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
              className={`shadow-md mb-2 ${
                // !formData.title ||
                // !formData.brand ||
                // // !formData.category ||
                // !formData.description ||
                // !formData.discountPercentage ||
                // !formData.price ||
                // !formData.rating ||
                // !formData.stock'*: 
                ''  
                ? "bg-gray-200 pointer-events-none cursor-not-allowed text-gray-400"
                  : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-700 text-white"
              } cursor-pointer inline-flex float-right font-semibold items-center px-5 py-2.5 mt-4 sm:mt-6 text-md text-center 
  rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900`}
            >
              {Object.keys(singleProduct).length !== 0
                ? "Update Product"
                : "Add Product"}
            </button>
          </form>
          {alertPopup && 
          <div className="fixed inset-0 bg-opacity-30
    backdrop-blur-[7px]  bg-slate-900  
    p-2 flex justify-center items-center">
        <div className="bg-black border-2  w-[60%] shadow-2xl rounded-lg p-3">
          <h5 className="text-white" >Your changes are not saved. Are you sure you want to leave?</h5>
          <div className="float-right mt-3">
          <button className="text-white px-4 py-2 rounded mr-2 bg-gradient-to-r  from-indigo-500 to-pink-500 hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-700" >Cancel </button>
         <button className="bg-red-600   text-white px-4 py-2 rounded"  >Leave </button>
          </div>
        
        </div>

          </div>}
        </div>
      </section>
    </div>
  );
};

export default AdminAddProducts;
