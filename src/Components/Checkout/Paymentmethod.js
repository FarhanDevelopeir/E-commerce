import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import StripeContainer from './StripeContainer'

const Paymentmethod = () => {
  const contactdetail = useSelector((state) => state.product.contactdetail)
  const addressdetail = useSelector((state) => state.product.addressdetail)
  const { firstname, lastname, email, phone } = contactdetail
  const { province, address } = addressdetail
  const [isformopen, setisformopen] = useState(false)

  const handlepayment=(e)=>{
    if(e.target.value==='online'){
      setisformopen(true)
    }
    else{
     setisformopen(false)
    }

  }

  return (
    <div className='card mt-4 border'>
      <div className='card-header'>
        <h3>Payment Method</h3>
      </div>
      <div className='card-body'>
        <form>
          
          <label><input type='radio' name='payment' value='cod' onChange={handlepayment}/>Cash on Delivery <br /></label>
          <label><input type='radio' name='payment' value='online' onChange={handlepayment} />Online Transaction <br /></label>
          </form>
          {isformopen &&
            <StripeContainer/>
          }
          

       
      </div>
    </div>
  )
}

export default Paymentmethod