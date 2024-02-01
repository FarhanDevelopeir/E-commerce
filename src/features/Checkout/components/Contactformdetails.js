import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { addressdetails } from '../../../Redux/features/counter/ProductSlice';


const Contactformdetails = (props) => {
    const billingdetailss=useSelector((state)=>state.product.shipmentdetail)
    const dispatch=useDispatch();

    const [province, setprovince] = useState('');
    const [address, setaddress] = useState('');
    const [phone, setphone] = useState('');
    const [info, setinfo] = useState('');

    // form error
    const [provinceError, setProvinceError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [infoError, setInfoError] = useState(false);


    const handlephone=(e)=>{
        const input = e.target.value;
        // Use a regular expression to remove any non-numeric characters
        const numericInput = input.replace(/\D/g, '');
        setphone(numericInput);
    }


    const handleform = (e) => {
        e.preventDefault()
      

        setAddressError(false)
        setProvinceError(false)
        setInfoError(false)
    
        if (province === '') {
            setProvinceError('Province is required')
        }
       
        if (address === '') {
            setAddressError('Address is required')
        }
        
        if( address && province ){
            console.log({
           
            province,
            address,
            
            info  
            })   
            const formdata={
            province,
            address,
            info  
            }
            dispatch(addressdetails(formdata))   
        }
    }



    return (
        <div className=" mt-4">
            <div className='card border'>
                <div className="card-header d-flex justify-content-between py-3">
                    <h5 className="mb-0">Address Details</h5>

                </div>
                <div className='card-body'>
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
                        onClick={props.handleNext}
                         >Next</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contactformdetails