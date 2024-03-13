import axios from "axios";

export function AddProducts(formData){
    console.log("api working ")
    return new Promise(async(resolve, reject)=>{
        try{
            const res = await axios.post('/products/create', formData,{
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