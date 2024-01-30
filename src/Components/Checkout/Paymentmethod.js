import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import StripeContainer from './StripeContainer'
import { Button } from '@mui/material'
import { Link, Navigate } from 'react-router-dom'



const Paymentmethod = () => {
  const contactdetail = useSelector((state) => state.product.contactdetail)
  const addressdetail = useSelector((state) => state.product.addressdetail)
  const [isformopen, setisformopen] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [displaydone, setdisplaydone] = useState(false)

  const handlepayment=(e)=>{
    setSelectedMethod(e.target.value);

    if(e.target.value==='online'){
      setisformopen(true)
      setdisplaydone(false)
    }
    else{
     setisformopen(false)
     setdisplaydone(true)
    }

  }



  return (
    <div className='card mt-4 border'>
      <div className='card-header'>
        <h3>Payment Method</h3>
      </div>
      <div className='card-body'>
        <div className='d-flex justify-content-between w-75 m-auto '>
        <button
            className={`btn ${selectedMethod === 'cod' ? 'btn-danger' : 'btn-secondary'}`}
            onClick={handlepayment}
            value='cod'
          >
            Cash On Delivery
          </button>
          <button
            className={`btn ${selectedMethod === 'online' ? 'btn-danger' : 'btn-secondary'}`}
            onClick={handlepayment}
            value='online'
          >
            Online Transaction
          </button>
        </div>
        {displaydone && <Link to={'/ordercomplete'}>
          <Button variant='contained' 
        sx={{
          width:'25%',
          margin:'20px auto' , 
          textAlign:'center',
          position:'absolute', 
          right:'20px', 
          marginTop:'40px',
          }} 
          
          >Finish</Button>
        </Link>}
          {/* {isformopen &&
            <StripeContainer/>
          } */}
          

       
      </div>
    </div>
  )
}

export default Paymentmethod