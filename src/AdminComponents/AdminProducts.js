import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Link } from "react-router-dom";
import {
  addtocart,
  addtowishlist,
  displayproducts,
  updateAddedToCart,
} from "../Redux/features/counter/ProductSlice";
import { ActivePage, AddProducts, ProductId, fetchData } from "./features/AdminSlice";
import AdminProductDetails from "./AdminProductDetails";
import { allFetchedProducts, allProductsAsync, getOneProductAsync, productId } from "../features/product/productSlice";

const AdminProducts = () => {
  const getproducts = useSelector(allFetchedProducts)
  console.log(getproducts)
  
  
  // const getproducts = useSelector((state) => state.adminslice.data);
  // console.log(getproducts);
  const [openModal, setOpenModal] = useState(false)
  const [activeItem, setActiveItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchData());
    dispatch(allProductsAsync({}))
  }, []);

  const handleViewProduct = ( itemId) => {
    dispatch(productId(itemId))
    console.log(itemId)
    setOpenModal(true)
    // getOneProductAsync(itemId)
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = getproducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  console.log(currentProducts);
  


  const displaydata = currentProducts.map((item) => {
    return (
      <div className="overflow-hidden ">
        <div className=" h-[250px] shadow overflow-hidden  text-sm rounded-lg  bg-white">
          {/* <Link to={`/productdetail/${item.id}`}> */}
          <div className="" style={{ textAlign: "center" }}>
            <div className=" w-full   ">
              <img
                src={item.thumbnailImage}
                className="hover-zoom rounded-t-lg mb-2 w-full"
                style={{
                  height: "150px",
                  // width: "150px",
                  margin: "auto",
                  backgroundColor: "gray !important",
                }}
                alt="Laptop"
              />
            </div>

            <div className="card-body px-3 py-2">
              <div className="flex">
                <h5 className="text-dark text-left w-full text-sm mb-0">
                  {item.title}
                </h5>
                
                <button
                  
                  className="flex"
                   onClick={()=>handleViewProduct(item._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      fill-rule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
               
              </div>

              <div className="mb-2">
                <h5 className="text-dark text-right text-sm mb-0">
                  ${item.price}
                </h5>
              </div>
              {/* <div>
                  {item.description}
                </div> */}

              <div className="d-flex justify-content-between">
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
          {/* </Link> */}
        </div>
      </div>
    );
  });

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(getproducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  //   Pagination /

  const paginationButtons = (
    <div className="flex justify-center">
      <div className="pagination   mt-4 ">
        {/* Previous Button */}
        <button
          onClick={() => paginate(currentPage - 1)}
          className={`btn btn-link border hover:bg-blue-600  ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >
          Previous
        </button>

        {/* Page Number Buttons */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`btn btn-link border ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          className={` btn btn-link border bg-blue-500 ${
            currentPage === pageNumbers.length ? "disabled" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="mb-5  ">
      {/* <h2 className='mt-4   '>For You</h2> */}
      <section>
        <div className="container  order mt-3 rounded overflow-hidden ">
          <div className=" grid grid-cols-1 overflow-hidden sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3  ">
            {getproducts ? (
              <>{displaydata}</>
            ) : (
              <>
                <div
                  class="spinner-border text-danger m-auto d-inline"
                  role="status"
                >
                   <h1 className="text-center">...loading</h1>
                </div>
               
              </>
            )}
          </div>
         
        </div>
        <div>{paginationButtons}</div>
      </section>
      
    { openModal && <AdminProductDetails openModal={openModal} setOpenModal={setOpenModal} />}
    
    </div>
  );
};

export default AdminProducts;
