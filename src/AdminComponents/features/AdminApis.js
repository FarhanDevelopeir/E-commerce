import axios from "axios";

export function AddProducts(formData){
    return new Promise(async(resolve, reject)=>{
        try{
            const res = await axios.post('http://localhost:4000/products/create', formData,{
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