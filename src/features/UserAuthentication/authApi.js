import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setError } from './authSlice';
import { URL } from '../../constants/constants';

export function createUser(user){
    
    return new Promise(async (resolve, reject) => {
      
        try{
            const res = await axios.post(`${URL}/users`, user)
            // console.log('data',res.data)
            const data = await res.data
           
            resolve(data)
        } catch (error) {
            reject(error.response.data.message)
            // console.log(error.response.data.message)
           
        }
    })
};
 
export function LoginUser(user){
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.post(`${URL}/users/login`, user)
            const data = await res.data
            resolve(data)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
};


export function checkUser(){
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.get(`${URL}/users/check`,)
            const data = await res.data
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
};