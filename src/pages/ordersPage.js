import { useSelector, useDispatch } from "react-redux";
import {
  fetchedUserAllOrders,
  getUserOrdersAsync,
} from "../features/Checkout/checkoutSlice";
import { useEffect, useState } from "react";
import { selectLoggedInUser } from "../features/UserAuthentication/authSlice";
import Header from "./Header";
import axios from "axios";
import EditProfile from "./EditProfile";

const OrdersPage = () => {

  const userOrders = useSelector(fetchedUserAllOrders)
  const User = useSelector(selectLoggedInUser)
  const profileData = useSelector(selectLoggedInUser);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch()

  axios.defaults.withCredentials = true;

 
  useEffect(() => {
    dispatch(getUserOrdersAsync(User.token));
    console.log(profileData)
  }, []);

  const editProfile = () => {
    setOpenModal(true);
  };

  const date = new Date()

  return (
    < div className="">
      <Header />
      <div className=" pt-24 lg:pt-14 pb-20  ">


        <div className=" lg:flex  justify-between h-screen   w-[95%] sm:w-[90%] md:w-[97%] lg:w-[95%] xl:w-[85%] m-auto gap-4">
          <div className="lg:w-[28%]">

            <div className=" h-screen  lg:h-screen lg:fixed   m-auto ">
              <h4>Profile</h4>

              <div className="relative flex  h-[40%] sm:h-[27%] lg:h-[50%] sm:flex-row lg:flex-col flex-col  flex-wrap    border-[1px] border-gray-300 shadow-md rounded-xl   ">

                <div className="h-[45%] sm:w-[30%] lg:w-full relative sm:h-[100%] lg:h-[45%]  overflow-hidden rounded-t-xl sm:rounded-ss-xl sm:rounded-s-xl  sm:rounded-t-none lg:rounded-tl-xl lg:rounded-tr-xl lg:rounded-l-none">
                  <img
                    className=" w-full h-[100%]  "
                    src="https://t3.ftcdn.net/jpg/05/35/47/38/240_F_535473874_OWCa2ohzXXNZgqnlzF9QETsnbrSO9pFS.jpg"
                  />
                  <span class="absolute  h-[100%] w-full  inset-0 bg-gray-800 opacity-40"></span>
                </div>
                <div className=" sm:w-[70%] lg:w-full  flex flex-col justify-center items-center  h-[55%] sm:h-full lg:h-[55%]  ">
                  <button
                    onClick={() => editProfile()}
                    className="w-full  relative "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class=" absolute right-1 -top-[55px] sm:-top-[65px]  w-6 h-6"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                  </button>
                  <img
                    className="absolute  outline outline-4 outline-red-900  left-[37%] top-[30%] sm:left-[25%] sm:top-[28%] lg:top-[27%] lg:left-[33%] h-20 lg:h-28 lg:w-28 rounded-full "
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  />

                  <div className="flex    ">
                    <div className=" flex flex-col items-center sm:items-start text-xs lg:items-center   w-[100%] sm:pl-[15%] md:pl-[10%] lg:pl-0 ">
                      <div class="flex items-center  ">
                        <i class="fas fa-user fa-lg fa-fw "></i>
                        <h3 class="mx-1 my-auto text-lg sm:text-xl ">{profileData.user ? profileData.user.name : '' }</h3>
                      </div>

                      <div class="flex items-center my-2 ">
                        <i class=" fas fa-envelope fa-lg  fa-fw"></i>
                        <h3 class="mx-2 my-auto text-sm sm:text-lg ">{profileData.user ? profileData.user.email: ''}</h3>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:w-[67%] xl:w-[75%] -mt-96 sm:-mt-[500px]  lg:-mt-0">
            <h4>My Orders</h4>
            <div className=" flex flex-col gap-4 pb-10  " >
              {userOrders &&
                userOrders.map((order, index) => {
                  console.log(index)
                  const orderNumber = index + 1
                  return (
                    <div className=" shrink-0    bg-white border-[1px] border-gray-300 shadow-md rounded-xl">
                      <div className="flex-1   ">
                        <div className=" text-sm px-2 py-1 flex items-center justify-between  bg-gray-300 rounded-t-xl">
                          <div className=" flex flex-col  ">
                            <h4 className="text-[14px]  text-gray-900">
                              Order No : <span className="font-semibold"> {orderNumber}</span>
                            </h4>
                            <h4 className="text-[14px]  text-gray-900">
                              Order Date :<span className="font-semibold"> {date.toLocaleDateString()}</span>
                            </h4>

                          </div>

                          <div className="  flex  flex-col sm:flex-row  h-[60px] sm:h-full    sm:gap-2    ">
                            <p className="text-[14px]   font-normal text-gray-900">
                              Order Status
                            </p>
                            <p className="text-[14px]  -mt-4 sm:-mt-0 text-end  text-yellow-500 font-semibold ">
                              {order.status}
                            </p>
                          </div>



                        </div>
                        <div className="my-6 ">
                          <div className=" ">
                            <ul

                              className="  divide-y divide-gray-200"
                            >
                              {order.products.map((item) => (
                                <li key={item.id} className="flex py-6   -ml-8  pl-2 pr-2 sm:pl-4 sm:pr-4  ">
                                  <div className=" h-14 w-14 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-full border border-gray-200">
                                    <img
                                      // src={item.productId.image}
                                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                      alt={item.productId.title}
                                      className="  h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h5 className="text-sm sm:text-lg">
                                          <a >
                                            {item.productId.title}
                                          </a>
                                        </h5>
                                        <p className="text-sm sm:text-lg">
                                          ${item.productId.price}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="text-gray-500">
                                        <label
                                          htmlFor="quantity"
                                          className="  text-sm mr-5 inline font-semibold leading-6 text-gray-900"
                                        >
                                          Qty : {item.quantity}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200  px-4 py-2 sm:px-6">
                        <div className="flex justify-between text-sm sm:text-lg font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p className="font-semibold">${order.bill}</p>
                        </div>
                        <div className="flex justify-between text-sm sm:text-lg text-gray-900">
                          <p>Total items in Cart</p>
                          <p className="font-semibold">{order.totalItems} items</p>
                        </div>

                      </div>
                    </div>


                  );
                })}
            </div>

          </div>
        </div>



        {openModal ? (
          <EditProfile openModal={openModal} setOpenModal={setOpenModal} />
        ) : (
          ""
        )}
      </div>




    </div>
  );
};

export default OrdersPage;
