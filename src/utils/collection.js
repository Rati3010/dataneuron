import axios from 'axios';
const api = 'https://dataneuron-api.onrender.com/api';

export const getCollection = async() =>{
    try {
        const response = await axios.get(`${api}/collection`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const addCollection = async (text) => {
    try {
        const response = await axios.post(`${api}/collection/add`, {text});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCollection = async (collectionId, text) => {
    try {
        const response = await axios.put(`${api}/collection/update/${collectionId}`, {text});
        return response.data;
    } catch (error) {
        throw error;
    }
};