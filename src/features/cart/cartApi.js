import axios from 'axios';
import { URL } from '../../constants/constants';

export function addtocart(cartData, token) {
    console.log(token)
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`${URL}/cart/add`, cartData, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include your JWT token here
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'withCredentials': true, // Include credentials (cookies)
                }
            })
            const data = res.data
            console.log(data)
            resolve(data);

        } catch (error) {
            reject(error)
        }
    })
};

export function updatecart(cartData, token) {
    console.log(token)
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.patch(`${URL}/cart/update`, cartData, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include your JWT token here
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'withCredentials': true, // Include credentials (cookies)
                }
            })
            const data = res.data
            resolve(data);

        } catch (error) {
            reject(error)
        }
    })
};

export function allCartData(token) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(`${URL}/cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include your JWT token here
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'withCredentials': true, // Include credentials (cookies)
                }
            })
            const data = res.data
            resolve(data);

        } catch (error) {
            reject(error)
        }
    })
};

export function deletecart(cartData, token) {
    console.log(token)
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.delete(`${URL}/cart/delete`,{
                headers: {
                    'Authorization': `Bearer ${token}`, // Include your JWT token here
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'withCredentials': true, // Include credentials (cookies)
                },
                data: cartData,
            });
            const data = res.data
            resolve(data);

        } catch (error) {
            reject(error)
        }
    })
};

export function deletefullcart(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.delete(`${URL}/cart/deleteCart/${id}`);
            const data = res.data
            resolve(data);

        } catch (error) {
            reject(error)
        }
    })
};