import axios from 'axios';

export function getAllProducts(filter) {

    let queryString = '';
    for (let key in filter) {
        if (queryString !== '') {
            queryString += '&'; 
        }
        queryString += `${key}=${filter[key]}`;
    }
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get("http://localhost:3000/products?" + queryString)
            const data = res.data
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
};

export function getOneProduct(id) {
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.get(`http://localhost:3000/products/${id}`)
            const data = res.data
            resolve(data)
        } catch (error){
            reject(error)
        }
    })
}

export function fetchCategories() {

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get("http://localhost:3000/categories")
            const data = res.data
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}