import axios from "axios";

const URL="https://jsonplaceholder.typicode.com/users/"
export const getUsers=async()=>{
    try {
        const response=await axios.get(URL);
        return response.data ;
    } catch (error) {
        throw new Error("url is unable to fetch data")
    }
    
}

export const addUser=async(user)=>{
    try {
        const response=await axios.post(URL,user);
        return response.data ;
    } catch (error) {
        throw new Error("url is unable to add data")
    }
    
}

export const deleteUser=async(id)=>{
    try {
        const response=await axios.delete(`${URL}${id}`);
        return response.data ;
    } catch (error) {
        console.log(error)
        throw new Error("url is unable to delete user")
    }
    
}

export const updateUser=async(id,user)=>{
    try {
        const response=await axios.put(`${URL}${id}`,user);
        return response.data ;
    } catch (error) {
        throw new Error("url is unable to update user")
    }
    
}