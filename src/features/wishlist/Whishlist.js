import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { addtocart, updateAddedToCart } from '../../Redux/features/counter/ProductSlice'


const Whishlist = () => {
    // const products = useSelector((state) => state.product.products);
    // const cart = useSelector((state) => state.product.cart)
    const wishlist=useSelector(state=>state.product.wishlist);
    console.log(wishlist);
    const dispatch=useDispatch()
    const displaywishlist = wishlist.map((item) => {
        return (
            <div className=" col-sm-6 col-md-4 col-lg-3 mb-4 mt-3 mb-lg-0 ">

                <div className="card pt-3 hover-shadow bg-image border hover-zoom">
                   
                    <Link to={`/productdetail/${item.id}`}>
                        <div style={{ textAlign: 'center' }}>


                            <img src={item.image}
                                className="card-img-top   " style={{ height: '150px', width: '150px', margin: 'auto' }} alt="Laptop" />

                            <div className="card-body">
                                {/* <div className="d-flex justify-content-between">
                            <p className="small"><a href="#!" className="text-muted">Laptops</a></p>
                            <p className="small text-danger"><s>$ {item.price}</s></p>
                        </div> */}

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
                    <div className='w-100 mb-3' style={{ textAlign: 'center' }} >

                        {!item.addedToCart ? (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    dispatch(addtocart(item));
                                    // Update the addedToCart property when the item is added to the cart
                                    dispatch(updateAddedToCart({ productId: item.id, addedToCart: true }));
                                }}
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

                      

                    </div>
                </div>

            </div>
        )
    })
  return (
    <div >
        <div className="container  border  rounded pt-5 ">
                    <div className="row mb-3">
                        {wishlist.length===0? <h1>Sorry there is no Product that you are add to wishlish </h1>: <div className="row mb-3">{displaywishlist}</div>}
                       
                    </div>
                </div>
    </div>
  )
}

export default Whishlist