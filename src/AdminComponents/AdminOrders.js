import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addtocart,
  addtowishlist,
  displayproducts,
  updateAddedToCart,
} from "../Redux/features/counter/ProductSlice";
import { fetchData } from "./features/AdminSlice";

const AdminOrders = () => {
  const getproducts = useSelector((state) => state.adminslice.data);
  console.log(getproducts);
  const products = useSelector((state) => state.product.products);
  const cart = useSelector((state) => state.product.cart);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  console.log(products);

  const filteredOrders = getproducts.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log(currentOrders);

  return (
   
      <div class="mx-2 overflow-scroll  sm:rounded-lg">
        <div className="my-4 text-xs md:text-sm ">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-[65%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] "
          />
        </div>
        <table class="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Image
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3">
                Method
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((item) => {
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      class="w-10 h-10 rounded-full"
                      src={item.thumbnail}
                      alt="Jese image"
                    />
                  </th>
                  <td>
                    <div class="ps-3">
                      <div class="text-base font-semibold">{item.title}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4">{item.stock}</td>
                  <td class="px-6 py-4">COD</td>
                  <td className="px-6 py-4">
                    <select
                      className="rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-1 py-1.5 font-sans text-[15px] font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-gray-900 focus:border-t-transparent focus:outline-none disabled:border-0 disabled:bg-blue-gray-50"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td class="px-6 py-4">${item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav className="flex flex-col sm:flex-row items-center justify-between pt-4" aria-label="Table navigation">
          <ul className="flex flex-wrap justify-center sm:justify-start -mx-1 my-2">
            <li className="mx-1">
              <a
                href="#"
                className={`px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }`}
                onClick={() => paginate(currentPage - 1)}
              >
                Previous
              </a>
            </li>
            <li className="mx-1">
              <a
                href="#"
                className={`px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === Math.ceil(getproducts.length / ordersPerPage)
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
   
  );
};

export default AdminOrders;
