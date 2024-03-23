import axios from "axios";
import { URL } from "../../constants/constants";

export function AddProducts(formData){
  console.log("api working ")
  return new Promise(async(resolve, reject)=>{
      try{
          const res = await axios.post(`${URL}/products/create`, formData,{
              headers:{
                  'Content-Type': 'multipart/form-data',
              }
          })
          const data = res.data
          resolve(data)
      }
      catch(error){
          reject("Error", error)
      }
  })
}

export function getAllProducts(filter, pagination, sort, token) {
  let queryString = "";
  for (let key in filter) {
    if (queryString !== "") {
      queryString += "&";
    }
    queryString += `${key}=${filter[key]}`;
  }

  for (let key in pagination) {
    if (queryString !== "") {
      queryString += "&";
    }
    queryString += `${key}=${pagination[key]}`;
  }

  for (let key in sort){
    if(queryString !== ""){
      queryString += "&";
    }
    queryString += `${key}=${sort[key]}`
  }
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(
        `${URL}/products?` + queryString,
        { headers: {
          'Authorization': `Bearer ${token}`, // Include your JWT token here
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'withCredentials': true, // Include credentials (cookies)
        }
    });
      const data = res.data;
      const totalItems = await res.headers.get('X-Total-Count');
      resolve({ data: { products: data, totalItems: +totalItems } });
    } catch (error) {
      reject(error);
    }
  });
}

export function getOneProduct(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${URL}/products/${id}`);
      const data = res.data;
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchCategories() {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${URL}/categories`);
      const data = res.data;
      console.log(data)
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

export function getUpdateProduct(formDataWithFiles, Id) {

  console.log(formDataWithFiles, Id)
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(
        `${URL}/products/update/${Id}`,
        formDataWithFiles, {
          headers:{
            'Content-Type': 'multipart/form-data',
        }
        }
      );
      console.log(response.data);
      const data = response.data;

      resolve(data);
    } catch (error) {
      reject("Error", error);
    }
  });
}
