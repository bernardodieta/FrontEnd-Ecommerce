import axios from "axios";

const axiosConfig = {
    withCredentials: true,
    baseURL: 'https://ecommerce-fullbackend-production.up.railway.app/api/'
};

export const apiCart = axios.create(axiosConfig);