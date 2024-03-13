import axios from "axios";

export function createOrder(orderData){
    return new Promise(async(resolve , reject) => {
        try{
            const res = await axios.post("/orders/add", orderData);
            const data = res.data;
            resolve(data)
        }catch(error){
            reject(error)
        }
    });
};

export function getUserOrders(){
    return new Promise(async(resolve , reject) => {
        try{
            const res = await axios.get(`/orders/user`);
            const data = res.data;
            resolve(data)
        }catch(error){
            reject(error)
        }
    });
};

export function getAllOrders(){
    return new Promise(async(resolve , reject) => {
        try{
            const res = await axios.get(`/orders`);
            const data = res.data;
            resolve(data)
        }catch(error){
            reject(error)
        }
    });
};


export function updateOrder(updateData){
    return new Promise(async(resolve , reject) => {
        try{
            const res = await axios.patch(`/orders/update/${updateData._id}`,updateData );
            const data = res.data;
            resolve(data)
        }catch(error){
            reject(error)
        }
    });
};
