import axios from "axios";
import { URL } from "../../constants/constants";

export function createOrder(orderData, token) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`${URL}/orders/add`, orderData, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include your JWT token here
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'withCredentials': true, // Include credentials (cookies)
                }
            });
            const data = res.data;
            resolve(data)
        } catch (error) {
            reject(error)
        }
    });
};

export function getUserOrders(token) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(`${URL}/orders/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include your JWT token here
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'withCredentials': true, // Include credentials (cookies)
                }
            });
            const data = res.data;
            resolve(data)
        } catch (error) {
            reject(error)
        }
    });
};

export function getAllOrders() {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(`${URL}/orders`);
            const data = res.data;
            resolve(data)
        } catch (error) {
            reject(error)
        }
    });
};


export function updateOrder(updateData) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.patch(`${URL}/orders/update/${updateData._id}`, updateData);
            const data = res.data;
            resolve(data)
        } catch (error) {
            reject(error)
        }
    });
};
