import React, { useEffect } from 'react'
import { useSelector , useDispatch} from 'react-redux'
import axios from 'axios'

import { Link } from 'react-router-dom';
import { addtocart, displayproducts } from '../Redux/features/counter/ProductSlice'

const Products = () => {
    const products = useSelector((state) => state.product.products)
    const dispatch=useDispatch()
    // const {price, id, name, image}=products

    const fetchproducts = async () => {
        const res= await axios
        .get('https://fakestoreapi.com/products?limit=8')
        .catch((error)=>{
            console.log('err', error)
        })
        dispatch(displayproducts(res.data));
        console.log(res.data)

    }

    useEffect(()=>{
        fetchproducts();
    },[])

    const displaydata = products.map((item) => {
        return (
            <div className=" col-sm-6 col-md-4 col-lg-3 mb-4 mt-3 mb-lg-0">
                
                <div className="card pt-3 hover-shadow ">
                    {/* <div className="d-flex justify-content-between p-3">
                        <p className="lead mb-0">Today's Combo Offer</p>
                        <div
                            className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                            style={{ width: "35px", height: "35px" }}>
                            <p className="text-white mb-0 small">x4</p>
                        </div>
                    </div> */}
                      <Link to={`/productdetail/${item.id}`}>
                    <div style={{textAlign:'center'}}>
                  
                    <img src={item.image}
                        className="card-img-top  " style={{height:'150px',width:'150px',margin:'auto' }} alt="Laptop" />
                    <div className="card-body">
                        {/* <div className="d-flex justify-content-between">
                            <p className="small"><a href="#!" className="text-muted">Laptops</a></p>
                            <p className="small text-danger"><s>$ {item.price}</s></p>
                        </div> */}

                        <div className="d-flex justify-content-between mb-2">
                            <h5 className="mb-0">{}</h5>
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
                    <div className='w-100 mb-3' style={{textAlign:'center'}} >
                    <button type="button" className=" btn btn-primary " onClick={()=>{dispatch(addtocart(item))}} >Add to Cart</button>
                    </div>
                </div>
                
            </div>
        )
    })

    return (
        <div className='mb-5 '>
            <h1 className='mt-4  text-center '>Luxury Bags</h1>
            <section style={{ backgroundColor: '#eee' }}>
                <div className="container  border mt-3 rounded  ">
                    <div className="row mb-3">
                        {/* {products.id===''? <h1>sorry data is not </h1>: <div>{displaydata}</div>} */}
                        {displaydata}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Products