import React, { useEffect, useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import {  contactdetails } from '../../../Redux/features/counter/ProductSlice';
import { addressState, handleAddress } from '../checkoutSlice';

const Addressform = (props) => {
    const billingdetailss = useSelector((state)=>state.product.shipmentdetail)
    const address = useSelector(addressState)
    const dispatch=useDispatch();
    const [firstName, setfirstName] = useState(address.firstName || '');
    const [lastName, setlastName] = useState(address.lastName ||'');
    const [phone, setphone] = useState(address.phone || null);
    const [email, setemail] = useState(address.email ||'');

    // form error
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handlephone = (e) => {
        const input = e.target.value;
        // Use a regular expression to remove any non-numeric characters
        const numericInput = input.replace(/\D/g, '');
        setphone(numericInput);
    }


    const handleform = (e) => {

        e.preventDefault()

        setFirstNameError(false)
        setLastNameError(false)
        setPhoneError(false)
        setEmailError(false)

        if (firstName === '') {
            setFirstNameError('First Name is required')

        }
        if (lastName === '') {
            setLastNameError('Last Name is required')
        }
       
        if (email === '') {
            setEmailError('Email is required')
        } else {
            setEmailError(false)
        }
        if (phone === '') {
            setPhoneError('Phone is required')
        }
        
        if (firstName && lastName && email && phone) {
            const formData = {
                firstName,
                lastName,
                email,
                phone,
              };
              console.log(formData)
            dispatch(handleAddress(formData))
        }
        props.handleNext();
    }

    useEffect(() => {
        console.log(address);
    }, [address] )



    return (
        <div className="mt-4">
            <div className=' border rounded-lg shadow-sm'>
                <div className="card-header d-flex justify-content-between py-3  ">
                    <h5 className="mb-0 px-4 " >Basic Details</h5>

                </div>
                <div className='card-body p-3 '>
                    <form className=' ' onSubmit={handleform}>

                        <div className='d-flex justify-content-between mb-3 w-full '>
                            <div style={{ width: '48%' }} >
                                <TextField
                                    label='First Name *'
                                    style={{ width: '100%' }}
                                    onChange={(e) => {setfirstName(e.target.value)}}
                                    value={firstName}
                                    error={firstNameError}
                                />
                                {firstNameError ? <span style={{ display: 'block', color: 'red' }} >{firstNameError}</span> : null}
                            </div>
                            <div style={{ width: '48%' }}>
                                <TextField
                                    label='Last Name *'
                                    style={{ width: '100%' }}
                                    onChange={(e) => {setlastName(e.target.value)}}
                                    value={lastName}
                                    error={lastNameError}
                                />
                                {lastNameError ? <span style={{ display: 'block', color: 'red' }} >{lastNameError}</span> : null}

                            </div>

                        </div>

                        {/* <MDBInput wrapperClass='mb-4' id='form6Example3' label='Company name' /> */}
                        {/* 
                        <select
                            className={` w-100 pt-2 pb-2 rounded `}
                            style={{ border: '1px solid grey', height: '55px' }}
                            // className={provinceError ? 'error-input' : ''}
                            value={province}

                            onChange={(e) => setprovince(e.target.value)}
                        >
                            <option selected>  Select Province *</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Sindh">Sindh</option>
                            <option value="KPK">KPK</option>
                            <option value="Balochistan">Balochistan</option>
                        </select>
                        {provinceError ? <span style={{ display: 'block', color: 'red' }}>{provinceError}</span> : null}



                        <TextField
                            type='text'
                            label='Address *'
                            onChange={(e) => setaddress(e.target.value)}
                            value={address}
                            error={addressError}
                            fullWidth
                            className='mt-3'
                        />
                        {addressError ? <span style={{ display: 'block', color: 'red' }}>{addressError}</span> : null} */}

                        <TextField
                            label='Email *'
                            value={email}
                            type='email'
                            fullWidth
                            className='mt-3'
                            onChange={(e) => {setemail(e.target.value)}}
                            error={emailError}
                        />
                        {emailError ? <span style={{ dislay: 'block', color: 'red' }}>{emailError}</span> : null}

                        <TextField
                            label='Phone *'
                            value={phone}
                            type='number'
                            fullWidth
                            className='mt-3'
                            error={phoneError}
                            onChange={handlephone}
                        />
                        {phoneError ? <span style={{ display: 'block', color: 'red' }}>{phoneError}</span> : null}


                        {/* <label className='mt-3'>Optional</label>
                        <textarea
                            placeholder='Additional information'
                            value={info}
                            textarea
                            fullWidth
                            name="message"
                            className=' border rounded border-dark w-100'
                            onChange={(e) => setinfo(e.target.value)}
                        /> */}

                        {/* {infoError ? <p style={{ display: 'block', color: 'red' }}>{infoError}</p> : null} */}



                        <Button 
                        variant="contained" 
                        disabled={firstName==='' || lastName==='' || email==='' || phone==='' }  
                        className='mt-4' color="primary" 
                        type="submit"
                        >Next</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Addressform