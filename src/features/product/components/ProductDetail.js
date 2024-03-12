import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addtocart, productview } from '../../../Redux/features/counter/ProductSlice'
import { singleProductFetched, getOneProductAsync } from '../productSlice'
import { selectLoggedInUser } from '../../UserAuthentication/authSlice'
import { addCartAsync } from '../../cart/cartSlice'
import Header from '../../../pages/Header'

const ProductDetail = ({ item }) => {
  const singleproduct = useSelector(singleProductFetched);
  const User = useSelector(selectLoggedInUser);
  const cart = useSelector((state) => state.product.cart);
  const [quantity, setQuantity] = useState(1)

  const { price, image, title, description, rating, } = singleproduct || {}
  console.log(price)
  const { id } = useParams();
  const dispatch = useDispatch();


  const fetchproducts = async () => {
    const res = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => {
        console.log('Error', err)
      })
    dispatch(productview(res.data))
  }

  const handleCart = (itemId) => {
    const cartData = {
      userId: User.user._id,
      productId: itemId,
      quantity: quantity
    }
    console.log(cartData)
    dispatch(addCartAsync(cartData))
  }

  // {Old code }

  // const changeQuality = (decrease) => {
  //   if (decrease) {
  //     if (quantity === 1) {
  //       setQuantity(1)
  //     } else {
  //       setQuantity(prevQuantity => prevQuantity - 1)
  //     }
  //   } else {
  //     setQuantity(prevQuantity => prevQuantity + 1)
  //   }
  // }

  // {better code }
  const changeQuality = (decrease) => {
    setQuantity((prevQuantity) => {
      if (decrease) {
        return prevQuantity === 1 ? 1 : prevQuantity - 1;
      } else {
        return prevQuantity + 1;
      }
    });
  };

  useEffect(() => {
    if (id && id !== '') dispatch(getOneProductAsync(id));
  }, [id, singleProductFetched])

  useEffect(() => {
    dispatch(productview({})); // Pass an empty object to reset the state
  }, []);

  // console.log(products);
  return (
    <div>
      <Header />
      {singleproduct.length === 0 ? <h1 className='mt-5 pt-5'>...loading</h1> :
        (
          <section className="py-5">
            <div className="container border p-3">
              <div className="row gx-5">
                <aside className="col-lg-6">
                  <div className="border rounded-4 mb-3 d-flex justify-content-center">
                    <a data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image" href="#">
                      <img style={{ maxWidth: "100%", maxHeight: '50vh', margin: 'auto' }} className="rounded-4 fit" src={singleproduct.thumbnailImage} />
                    </a>
                  </div>
                  {/* <div className="d-flex justify-content-center mb-3">
          <a data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb" target="_blank" data-type="image" href="#" >
            <img width="60" height="60" className="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big1.webp" />
          </a>
          <a data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb" target="_blank" data-type="image" href="#" >
            <img width="60" height="60" className="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big2.webp" />
          </a>
          <a data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb" target="_blank" data-type="image" href="#" >
            <img width="60" height="60" className="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big3.webp" />
          </a>
          <a data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb" target="_blank" data-type="image" href="#">
            <img width="60" height="60" className="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big4.webp" />
          </a>
          <a data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb" target="_blank" data-type="image" href="#" >
            <img width="60" height="60" className="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp" />
          </a>
        </div> */}

                </aside>
                <main className="col-lg-6">
                  <div className="ps-lg-3">
                    <h4 className="title text-dark">
                      {singleproduct.title}
                    </h4>
                    <div className="d-flex flex-row my-3">
                      {/* <div className="text-warning mb-1 me-2">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
              <span className="ms-1">
                4.5
              </span>
            </div>
            <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>{rating.count} orders</span>
            <span className="text-success ms-2">In stock</span> */}
                      {rating && rating.count ? (
                        <div className="text-warning mb-1 me-2">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <span className="ms-1">{rating.count}</span>
                        </div>
                      ) : (
                        <div className="text-muted">No rating available</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <span className="h5">$ {singleproduct.price}</span>
                      <span className="text-muted">/per box</span>
                    </div>

                    <p>
                      {singleproduct.description}
                    </p>

                    <div className="row">
                      <dt className="col-3">Type:</dt>
                      <dd className="col-9">Regular</dd>

                      <dt className="col-3">Color</dt>
                      <dd className="col-9">Brown</dd>

                      <dt className="col-3">Material</dt>
                      <dd className="col-9">Cotton, Jeans</dd>

                      <dt className="col-3">Brand</dt>
                      <dd className="col-9">Reebook</dd>
                    </div>

                    <hr />

                    <div className="row mb-4">
                      <div className="col-md-4 col-6">
                        <label className="mb-2">Size</label>
                        <select className="form-select border border-secondary" style={{ height: "35px" }}>
                          <option>Small</option>
                          <option>Medium</option>
                          <option>Large</option>
                        </select>
                      </div>

                      <div className="col-md-4 col-6 mb-3">
                        <label className="mb-2 d-block">Quantity</label>
                        <div className="input-group " style={{ width: '170px' }}>
                          <button onClick={() => changeQuality(true)}
                            className="btn btn-white border border-secondary px-3"
                            type="button"
                            id="button-addon1"
                            data-mdb-ripple-color="dark"
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <h4 className='form-control text-center  '>
                            {quantity}
                          </h4>
                          <button
                            onClick={() => changeQuality(false)}
                            className="btn btn-white border border-secondary px-3"
                            type="button"
                            id="button-addon2"
                            data-mdb-ripple-color="dark">
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <a href="#" className="btn btn-warning shadow-0"> Buy now </a>
                    <a href="#" onClick={() => handleCart(singleproduct._id)} className="btn btn-primary shadow-0"> <i className="me-1 fa fa-shopping-basket"></i> Add to cart </a>
                    <a href="#" className="btn btn-light border border-secondary py-2 icon-hover px-3"> <i className="me-1 fa fa-heart fa-lg"></i> Save </a>
                  </div>
                </main>
              </div>
            </div>
          </section>
        )}
    </div>
  )
}

export default ProductDetail