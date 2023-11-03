import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import {  contactdetails } from '../../Redux/features/counter/ProductSlice';

const Addressform = (props) => {
    const billingdetailss = useSelector((state)=>state.product.shipmentdetail)
    const dispatch=useDispatch();
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [phone, setphone] = useState('');
    const [email, setemail] = useState('');

    // form error
    const [firstnameError, setFirstnameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handlephone = (e) => {
        const input = e.target.value;
        // Use a regular expression to remove any non-numeric characters
        const numericInput = input.replace(/\D/g, '');
        setphone(numericInput);

        dispatch(contactdetails(phone))
    }


    const handleform = (e) => {

        e.preventDefault()

        setFirstnameError(false)
        setLastnameError(false)
        setPhoneError(false)
        setEmailError(false)

        if (firstname === '') {
            setFirstnameError('First Name is required')

        }
        if (lastname === '') {
            setLastnameError('Last Name is required')
        }
       
        if (email === '') {
            setEmailError('Email is required')
        } else {
            setEmailError(false)
        }
        if (phone === '') {
            setPhoneError('Phone is required')
        }
        

        if (firstname && lastname && email && phone) {
            const formData = {
                firstname,
                lastname,
                email,
                phone,
              };
              console.log(formData)
            dispatch(contactdetails(formData))
           
        }
    }



    return (
        <div className="mt-4">
            <div className='card border'>
                <div className="card-header d-flex justify-content-between py-3">
                    <h5 className="mb-0">Basic Details</h5>

                </div>
                <div className='card-body'>
                    <form className=' ' onSubmit={handleform}>

                        <div className='d-flex justify-content-between mb-3 w-100 '>
                            <div style={{ width: '48%' }} >
                                <TextField
                                    label='First Name *'
                                    style={{ width: '100%' }}
                                    onChange={(e) => {setfirstname(e.target.value); dispatch(contactdetails(firstname))} }
                                    value={firstname}
                                    error={firstnameError}
                                />
                                {firstnameError ? <span style={{ display: 'block', color: 'red' }} >{firstnameError}</span> : null}
                            </div>
                            <div style={{ width: '48%' }}>
                                <TextField
                                    label='Last Name *'
                                    style={{ width: '100%' }}
                                    onChange={(e) => {setlastname(e.target.value); dispatch(contactdetails(lastname))}}
                                    value={lastname}
                                    error={lastnameError}
                                />
                                {lastnameError ? <span style={{ display: 'block', color: 'red' }} >{lastnameError}</span> : null}

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
                            onChange={(e) => {setemail(e.target.value); dispatch(contactdetails(email))}}
                            error={emailError}
                        />
                        {emailError ? <span style={{ dislay: 'block', color: 'red' }}>{emailError}</span> : null}

                        <TextField
                            label='Phone *'
                            value={phone}
                            type='tel'
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
                        onClick={props.handleNext}
                        variant="contained" 
                        disabled={firstname==='' || lastname==='' || email==='' || phone==='' }  
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