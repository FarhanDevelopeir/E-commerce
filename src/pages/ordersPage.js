import { useSelector, useDispatch } from "react-redux";
import { fetchedUserAllOrders, getUserOrdersAsync } from "../features/Checkout/checkoutSlice";
import { useEffect } from "react";
import { selectLoggedInUser } from "../features/UserAuthentication/authSlice";
import Header from "./Header";

const OrdersPage = () => {

    const userOrders = useSelector(fetchedUserAllOrders)
    const User = useSelector(selectLoggedInUser)
    const dispatch = useDispatch()
   
    

    useEffect(() => {
        dispatch(getUserOrdersAsync(User.user._id))
        console.log(User)
        console.log(userOrders)
    }, []);

    return (

        <>
        <Header></Header>
        <div className="mb-10" >
            <div className="mx-auto mt-5 max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="text-lg font-medium text-gray-900" >MY Orders</p>
            </div>

            {userOrders && userOrders.map((order) => {
                return (
                    <>
                        <div className="mx-auto mt-5 max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-full flex-col  bg-white shadow-xl">
                                <div className="flex-1  px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h4 className="text-lg font-medium text-gray-900">
                                            Order No # {order._id}
                                        </h4>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Order Status : {order.status}
                                        </h3>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul
                                                role="list"
                                                className="-my-6 divide-y divide-gray-200"
                                            >
                                                {order.products.map((item) => (
                                                    <li key={item.id} className="flex py-6">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                src={'http://localhost:4000/images/' + item.productId.thumbnailImage}
                                                                alt={item.productId.title}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href={item.productId.title}>
                                                                            {item.productId.title}
                                                                        </a>
                                                                    </h3>
                                                                    <p className="ml-4">${item.productId.price}</p>
                                                                </div>
                                                                
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <div className="text-gray-500">
                                                                    <label
                                                                        htmlFor="quantity"
                                                                        className=" text-sm mr-5 inline font-medium leading-6 text-gray-900"
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

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${order.bill}</p>
                                    </div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Total items in Cart</p>
                                        <p>{order.totalItems} items</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">
                                        Shipping and taxes calculated at checkout.
                                    </p>

                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
        </>
    )
};


export default OrdersPage;