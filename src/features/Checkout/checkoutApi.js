import axios from "axios";

export function createOrder(orderData){
    return new Promise(async(resolve , reject) => {
        try{
            const res = await axios.post("http://localhost:3000/orders/add", orderData);
            const data = res.data;
            resolve(data)
        }catch(error){
            reject(error)
        }
    });
};

export function getUserOrders(id){
    return new Promise(async(resolve , reject) => {
        try{
            const res = await axios.get(`http://localhost:3000/orders/${id}`);
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
            const res = await axios.get(`http://localhost:3000/orders`);
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
            const res = await axios.patch(`http://localhost:3000/orders/${updateData.userId}`,updateData );
            const data = res.data;
            resolve(data)
        }catch(error){
            reject(error)
        }
    });
};
