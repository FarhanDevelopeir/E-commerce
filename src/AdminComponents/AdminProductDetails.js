import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ActivePage, ProductEdit } from "./features/AdminSlice";
import { getOneProductAsync, productId, selectedProduct, singleProductFetched } from "../features/product/productSlice";

const AdminProductDetails = (props) => {
  const singleProduct = useSelector((state)=>state.product1.selectedProduct)
  console.log(singleProduct)
  const Product = useSelector((state) => state.adminslice.selectedProduct);
  console.log("get single product ", Product);
  
  const dispatch = useDispatch()

  const handleEdit = (itemName, itemId) => {
    // Add logic to handle update functionality
    console.log("Update product");
    dispatch(productId(itemId))

    // dispatch(ProductEdit(itemId))
  
    dispatch(ActivePage(itemName, itemId));
  };

  const handleDelete = () => {
    // Add logic to handle delete functionality
    console.log("Delete product");
  };

  // useEffect(()=>{
  //   getOneProductAsync()
  // },[])

  return (
    <div className="fixed inset-0 bg-opacity-50
     bg-gray-950  
    p-2 flex justify-center items-center ">
      <div className=" bg-white border-2 w-[80%] ml-14 md:ml-0 md:w-[60%] shadow-2xl rounded-lg p-2">
     <button className="  float-end rounded-sm  " onClick={() => props.setOpenModal(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="p-2">
        <h2 className= "text-sm md:text-xl font-bold mb-4 p-2 border-b-2 ">Product Details</h2>
        <div className=" md:flex  md:justify-between ">
        <div className="md:w-[45%] mb-2 md:mb-0 ">
          {/* <img src={Product.thumbnailImage} className=" w-full rounded-lg overflow-hidden" /> */}
        </div>
        <div
    class="   w-0.5 self-stretch bg-neutral-200 opacity-100 dark:opacity-50">

    </div>
        <div className=" text-xs sm:text-sm md:w-[50%] flex flex-col justify-around ">
        <div className="">
          <p className="mb-2">
            <strong>{singleProduct.title} </strong> 
          </p>
         
          <p className="mb-2">
            <strong>${singleProduct.price}</strong> 
          </p>
          <p className="mb-2">
            {singleProduct.description}
          </p>
          <p className="mb-2">
            Stock   <strong>{singleProduct.stock}</strong> 
          </p>
          <p className="mb-2">
            Brand  <strong>{singleProduct.brand}</strong> 
          </p>
          <p className="mb-2">
          Rating 
           <strong>{singleProduct.rating}</strong>
          </p>
        </div>
        <div className=" flex justify-end  ">
          <button className="  bg-gradient-to-r  from-indigo-500 to-pink-500 hover:bg-gradient-to-l hover:from-pink-500 hover:to-indigo-700  text-white px-4 py-2 rounded mr-2" onClick={() => handleEdit("Add Products",singleProduct._id)}>
            Edit
          </button>
          <button className="bg-red-600   text-white px-4 py-2 rounded" onClick={handleDelete}>
            Delete
          </button>
        </div>
        </div>
        </div>
        
      </div>
     </div> 
    </div>
  );
};

export default AdminProductDetails;
