import axios from 'axios';

export function addtocart(cartData){
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.post(`http://localhost:3000/cart/add/${cartData.userId}`, cartData)
            const data = res.data
            resolve(data);

        } catch(error){
            reject(error)
        }
    })
};

export function updatecart(cartData){
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.patch(`http://localhost:3000/cart/update/${cartData.userId}`, cartData)
            const data = res.data
            resolve(data);

        } catch(error){
            reject(error)
        }
    })
};

export function allCartData(userId){
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.get(`http://localhost:3000/cart/${userId}`)
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
            const res = await axios.delete(`http://localhost:3000/cart/delete/${cartData.userId}`, {
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
            const res = await axios.delete(`http://localhost:3000/cart/deleteCart/${id}`);
            const data = res.data
            resolve(data);

        } catch(error){
            reject(error)
        }
    })
};