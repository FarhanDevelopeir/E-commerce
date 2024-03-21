import React, { useEffect, useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { addressState, handleAddress } from '../checkoutSlice';


const Contactformdetails = (props) => {
    const dispatch=useDispatch();
    const address1 = useSelector(addressState)
    const [province, setprovince] = useState(address1.state || '');
    const [city, setcity] = useState(address1.city || '');
    const [address, setaddress] = useState(address1.street || '');
    const [info, setinfo] = useState(address1.info || '');

    // form error
    const [provinceError, setProvinceError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [cityError, setCityError] = useState(false);


    const handleform = (e) => {
        e.preventDefault()
      

        setAddressError(false)
        setProvinceError(false)
        setCityError(false)
    
        if (province === '') {
            setProvinceError('Province is required')
        }
       
        if (address === '') {
            setAddressError('Address is required')
        }

        if (city === '') {
            setCityError('Address is required')
        }
        
        if( address && province && city ){  
            const formdata={
            state : province,
            city : city,
            street : address,
            info : info  
            }
            console.log(formdata)
            dispatch(handleAddress(formdata))   
        }
        props.handleNext();
    }

    useEffect(() => {
        console.log(address1);
    }, [address1] )


    return (
        <div className=" mt-4">
            <div className='border rounded-lg shadow-sm'>
                <div className="card-header d-flex justify-content-between py-3">
                    <h5 className="mb-0 px-4">Address Details</h5>

                </div>
                <div className='card-body p-3'>
                    <form className=' ' onSubmit={handleform}>

                        
 
                        {/* <MDBInput wrapperClass='mb-4' id='form6Example3' label='Company name' /> */}

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
                            label='City *'
                            onChange={(e) => setcity(e.target.value)}
                            value={city}
                            error={cityError}
                            fullWidth
                            className='mt-3'
                        />
                        {cityError ? <span style={{ display: 'block', color: 'red' }}>{cityError}</span> : null}



                        <TextField
                            type='text'
                            label='Address *'
                            onChange={(e) => setaddress(e.target.value)}
                            value={address}
                            error={addressError}
                            fullWidth
                            className='mt-3'
                        />
                        {addressError ? <span style={{ display: 'block', color: 'red' }}>{addressError}</span> : null}


                         <label className='mt-3'>Optional</label>
                        <textarea
                            placeholder='Additional information'
                            value={info}
                            textarea
                            fullWidth
                            name="message"
                            className=' border rounded border-dark w-100'
                            onChange={(e) => setinfo(e.target.value)}
                        />

                        {/* {infoError ? <p style={{ display: 'block', color: 'red' }}>{infoError}</p> : null} */}



                        <Button 
                        variant="contained" 
                        className='mt-4' 
                        color="primary" 
                        type="submit"
                        disabled={province==='' || address==='' }
                         >Next</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contactformdetails