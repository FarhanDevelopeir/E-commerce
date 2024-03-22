import axios from 'axios';
import { URL } from '../../constants/constants';

export function addtocart(cartData){
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.post(`${URL}/cart/add`, cartData)
            const data = res.data
            console.log(data)
            resolve(data);

        } catch(error){
            reject(error)
        }
    })
};

export function updatecart(cartData){
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.patch(`${URL}/cart/update`, cartData)
            const data = res.data
            resolve(data);

        } catch(error){
            reject(error)
        }
    })
};

export function allCartData(){
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.get(`${URL}/cart`)
            const data = res.data
            resolve(data);

        } catch(error){
            reject(error)
        }
    })
};

export function deletecart(cartData){
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.delete(`${URL}/cart/delete`, {
                data: cartData
            });
            const data = res.data
            resolve(data);

        } catch(error){
            reject(error)
        }
    })
};

export function deletefullcart(id){
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.delete(`${URL}/cart/deleteCart/${id}`);
            const data = res.data
            resolve(data);

        } catch(error){
            reject(error)
        }
    })
};