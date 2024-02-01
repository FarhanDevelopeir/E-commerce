import React, { useEffect, useState } from "react";
import { category } from "../Redux/features/counter/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { ActivePage, AddProducts, SingleProductData } from "./features/AdminSlice";
import { useLocation, useParams } from "react-router-dom";

const AdminAddProducts = () => {
  const Product = useSelector((state)=>state.adminslice.singleProduct)
  console.log('get single product ', Product)
  const dispatch = useDispatch()
  const location = useLocation();
  const [image, setImage]=useState('')
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    price: 0,
    category: "",
    stock: 0,
    thumbnail: null,
    images: [],
    rating: 0,
    discountPercentage: 0,
    description: "",
  });

  let id = ''
  // Parse the URL to extract the ID
  const pathname = location.pathname;
  const parts = pathname.split('/');
  id = parts[parts.length - 1]; // Assuming the ID is the last part of the URL
  console.log('ID from URL:', id);

  useEffect(() => {
    if(id !== '' ){
      dispatch(SingleProductData(id))
    } 
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    dispatch(AddProducts(formData));
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleThumbnailChange = (e) => {
  
  // if(e.target && e.target.files[0]){
  //   formsData.append('file', e.target.files[0]);
  // }
  // console.log(e.target.files[0])
  // console.log(formData)
    const file = e.target.files[0];
   
    setFormData({ ...formData, thumbnail: file });
    setImage(file)
};

const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevFormData) => ({
        ...prevFormData,
        images: [...prevFormData.images, ...files],
    }));
};

  return (
    <div>
      <section class=" pt-6 px-3 sm:pt-6 sm:px-8  dark:bg-gray-500">
        <div class="  mx-auto  ">
          <h2 class="mb-4 text-xl font-bold text-gray-600 drop-shadow-md dark:text-white">
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
                    // id="name"
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
                      class=" mb-2 text-sm font-medium text-gray-600 dark:text-white"
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
                      <option value="SP">Smartphones</option>
                      <option value="LT">Laptops</option>
                      <option value="FR">Fragrances</option>
                      <option value="SK">Skincare</option>
                      <option value="GR">Groceries</option>
                      <option value="HD">Home-decoration</option>
                    </select>
                  </div>
                  <div>
                    <label
                      for="item-weight"
                      class="mb-2 text-sm font-medium text-gray-600 dark:text-white"
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
                    <input
                      type="file"
                      id="thumbnail"
                      onChange={handleThumbnailChange}
                      class="bg-white shadow-md mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  {/* {formData.thumbnail && (
                <img
                  src={URL.createObjectURL(formData.thumbnail)}
                  alt="Thumbnail"
                  className="mt-2 h-20"
                />
              )} */}
              {image=== '' ? '':
              <img src={image} />
            }

                </div>

                <div>
                  <label
                    for="category"
                    class="mb-2 text-sm  font-semibold text-gray-600 dark:text-white"
                  >
                    Image's
                  </label>
                  <div className="grid grid-cols-2 gap-2  sm:grid sm:grid-cols-3 sm:gap-4 ">
                    <div>
                      <input
                        type="file"
                        
                        id="images"
                        onChange={handleImagesChange}
                        class="bg-white shadow-md mb-2 border sm:py-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <input
                        type="file"
                        id="images"
                        onChange={handleImagesChange}
                        class="bg-white shadow-md mb-2 sm:py-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <input
                        type="file"
                        id="images"
                        onChange={handleImagesChange}
                        class="bg-white shadow-md mb-2 border sm:py-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                      {/* <div className="flex flex-wrap mt-2">
                {formData.images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index + 1}`}
                    className="mr-2 mb-2 h-20"
                  />
                ))}
              </div> */}
                    </div>
                  </div>
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
                    class="mb-2 text-sm font-medium text-gray-600 dark:text-white"
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
              class="shadow-md mb-2 bg-gradient-to-r  from-indigo-500  to-pink-500 hover:bg-gradient-to-l    hover:from-pink-500  hover:to-indigo-700 text-semibold inline-flex float-right font-semibold items-center px-5 py-2.5 mt-4 sm:mt-6 text-md text-center text-white bg-primary-700 rounded-md focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add product
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AdminAddProducts;
