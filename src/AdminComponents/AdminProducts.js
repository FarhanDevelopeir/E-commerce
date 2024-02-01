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
import { ActivePage, AddProducts, fetchData } from "./features/AdminSlice";

const AdminProducts = () => {
  const getproducts = useSelector((state) => state.adminslice.data);
  console.log(getproducts);
  const [activeItem, setActiveItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleClick = (itemName, itemId) => {
    setActiveItem(itemName === activeItem ? null : itemName);
    dispatch(ActivePage(itemName,itemId));
    // Dispatch an action with the item ID
    
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
                  src={item.thumbnail}
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
                   <Link to={`${item.id}`}>
                  <button className="flex" 
                 onClick={() => handleClick("Add Products",item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                  </button>
                  </Link>
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
                  <span class="visually-hidden ">Loading...</span>
                </div>
                <h1 className="text-center">...loading</h1>
              </>
            )}
          </div>
        </div>
        <div>{paginationButtons}</div>
      </section>
    </div>
  );
};

export default AdminProducts;
