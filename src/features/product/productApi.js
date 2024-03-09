import axios from "axios";

export function getAllProducts(filter, pagination, sort) {
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
        "http://localhost:4000/products?" + queryString
      );
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
      const res = await axios.get(`http://localhost:4000/products/${id}`);
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
      const res = await axios.get("http://localhost:4000/categories");
      const data = res.data;
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
        `http://localhost:4000/products/update/${Id}`,
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
