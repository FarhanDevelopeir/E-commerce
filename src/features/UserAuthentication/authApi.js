import axios from 'axios';

export function createUser(user){
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.post('http://localhost:3000/users', user)
            // console.log('data',res.data)
            const data = await res.data
           
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
};

export function LoginUser(user){
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.post('http://localhost:3000/users/login', user)
            const data = await res.data
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
};
