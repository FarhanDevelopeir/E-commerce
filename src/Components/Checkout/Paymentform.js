import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import { Button } from '@mui/material'

const CARD_OPTIONS={
    iconStyle: 'solid',
    style:{
        base:{
            iconColor: '#c4f0ff',
            color:'#fff',
            fontWeight:'500',
            fontFamily:'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize:'16px',
            fontSmoothing:'antialiased',
            ':-webkit-autofill':{color:'#fce883'},
            '::placeholder':{color:'#87bbfd'}
        },
        invalid: {
            iconColor: '#ffc7ee',
            color:'#ffc7ee'
        }
    }
}

const Paymentform = () => {
    const [success, setsuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })


        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post('http://localhost:4000/payment', {
                    amount: 1000,
                    id
                })

                if (response.data.success) {
                    console.log('Successful Payment')
                    setsuccess(true)
                }
            } catch (error) {
                console.log('Error', error)
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className='FormGroup mt-3'>
                <div className='FormRow'>
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            
            <Button variant='contained' type='submit' style={{margin:'auto'}} >Pay</Button>
        </form>   :
        <div>
            <h2>You bought a book .. Congrats this is the best decision of you're life</h2>
        </div> 
    }
        </>
    )
}


export default Paymentform