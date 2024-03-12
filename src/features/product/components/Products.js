import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

import { Link } from 'react-router-dom';
import { addtocart, addtowishlist, displayproducts, updateAddedToCart } from '../../../Redux/features/counter/ProductSlice'

import { allProductsAsync, allFetchedProducts } from '../productSlice';
import { allCartDataAsync, addCartAsync } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../UserAuthentication/authSlice";
const Products = () => {
    const products = useSelector(allFetchedProducts);
    const dispatch = useDispatch()
    const User = useSelector(selectLoggedInUser);
    const [selectedPage, setselectedPage] = useState(1);
    const limit = 10
    const totalItems = 20

    
    useEffect(() => {
        const pagination = { _page: selectedPage, _limit: limit }
        dispatch(allProductsAsync({pagination} ))
        dispatch(allCartDataAsync(User.user._id))
        console.log(products)
    }, [selectedPage])

    const handleCart = (itemId) => {
        const cartData = {
            userId: User.user._id,
            productId: itemId,
            quantity: 1
        }
        console.log(cartData)
        dispatch(addCartAsync(cartData))
    };

    const handlePage = (page) => {
        setselectedPage(page)
    }

    const displaydata = products.map((item) => {
        return (
            <div className=" col-sm-6 col-md-4 col-lg-3 mb-4 mt-3 mb-lg-0 ">

                <div className="card pt-3 shadow border rounded hover-zoom ">

                    <Link to={`/productdetail/${item._id}`}>
                        <div style={{ textAlign: 'center' }}>


                            <div className='hover-zoom'>
                                <img src={item.thumbnailImage}
                                    className="card-img-top    " style={{ height: '150px', width: '150px', margin: 'auto' }} alt="Laptop" />
                            </div>

                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-2">
                                    <h5 className="mb-0">{ }</h5>
                                    <h5 className="text-dark mb-0">${item.price}</h5>
                                </div>

                                <div className="d-flex justify-content-between  ">
                                    <p className="text-muted mb-0">Available: <span className="fw-bold">{item.stock}</span></p>
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
                    </Link>
                    <div className='w-75 mb-3 d-flex justify-content-between' style={{ margin: 'auto' }} >

                        {!item.addedToCart ? (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleCart(item._id)}
                            >
                                Add to Cart
                            </button>
                        ) : (
                            <Link to={'/cart'}>

                                <button type="button" className="btn btn-warning">
                                    View Cart
                                </button>
                            </Link>
                        )}
                        <button className='btn btn-warning' onClick={() => { dispatch(addtowishlist(item)) }} >
                            <i className="fas fa-heart m-1 me-md-2"></i>
                        </button>



                    </div>
                </div>

            </div>
        )
    })

    return (
        <div className='mb-5 '>
            <h2 className='mt-4   '>For You</h2>
            <section style={{ backgroundColor: '#fff' }}>
                <div className="container  order mt-3 rounded  ">
                    <div className="row mb-3 ">
                        {products.length < 1 ? (

                            <>
                                <div class="spinner-border text-danger m-auto d-inline" role="status">
                                    <span class="visually-hidden ">Loading...</span>
                                </div>
                                <h1 className='text-center'>...loading</h1>
                            </>

                        ) : (
                            <>{displaydata}</>
                        )}
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <a
                                href="#"
                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Previous
                            </a>
                            <a
                                href="#"
                                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Next
                            </a>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{(selectedPage - 1) * limit + 1}</span> to <span className="font-medium">{selectedPage * limit > totalItems ? totalItems : selectedPage * limit}</span> of{' '}
                                    <span className="font-medium">{totalItems}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                    {Array.from({
                                        length: Math.ceil(totalItems / limit),
                                    }).map((el, index) => {
                                        return (
                                            <div
                                                onClick={e => handlePage(index + 1)}
                                                aria-current="page"
                                                className={`relative z-10 cursor-pointer inline-flex items-center ${index + 1 === selectedPage ? 'bg-indigo-600 text-white' : 'bg-gray-50'}  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                            >
                                                {index + 1}
                                            </div>
                                        )

                                    })}

                                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                        ...
                                    </span>

                                    <a
                                        href="#"
                                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Products