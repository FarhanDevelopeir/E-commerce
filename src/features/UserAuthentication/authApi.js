import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setError } from './authSlice';


export function createUser(user){
    
    return new Promise(async (resolve, reject) => {
      
        try{
            const res = await axios.post('http://localhost:4000/users', user)
            // console.log('data',res.data)
            const data = await res.data
           
            resolve(data)
        } catch (error) {
            reject(error.response.data.message)
            console.log(error.response.data.message)
           
        }
    })
};
 
export function LoginUser(user){
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.post('http://localhost:4000/users/login', user)
            const data = await res.data
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
};
