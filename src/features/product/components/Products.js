import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { Link } from 'react-router-dom';
import { addtocart, addtowishlist, displayproducts, updateAddedToCart } from '../../../Redux/features/counter/ProductSlice'

import { allProductsAsync, allFetchedProducts } from '../productSlice';
import { allCartDataAsync, addCartAsync } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../UserAuthentication/authSlice";
const Products = () => {
    const products = useSelector(allFetchedProducts);
    const dispatch = useDispatch()
    const User = useSelector(selectLoggedInUser);

    useEffect(() => {
        const filter = {}
        dispatch(allProductsAsync(filter))
        dispatch(allCartDataAsync(User.user._id))
        console.log(products)
    }, [])

    const handleCart = (itemId) => {
        const cartData = {
          userId : User.user._id,
          productId : itemId,
          quantity: 1
        }
        console.log(cartData)
        dispatch(addCartAsync(cartData))
      }

    const displaydata = products.map((item) => {
        return (
            <div className=" col-sm-6 col-md-4 col-lg-3 mb-4 mt-3 mb-lg-0 ">

                <div className="card pt-3 shadow border rounded hover-zoom ">

                    <Link to={`/productdetail/${item._id}`}>
                        <div style={{ textAlign: 'center' }}>


                            <div className='hover-zoom'>
                                <img src={item.image}
                                    className="card-img-top    " style={{ height: '150px', width: '150px', margin: 'auto' }} alt="Laptop" />
                            </div>

                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-2">
                                    <h5 className="mb-0">{ }</h5>
                                    <h5 className="text-dark mb-0">${item.price}</h5>
                                </div>

                                <div className="d-flex justify-content-between  ">
                                    <p className="text-muted mb-0">Available: <span className="fw-bold">6</span></p>
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
                                onClick={() => handleCart(item._id) }
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
                </div>
            </section>
        </div>
    )
}

export default Products