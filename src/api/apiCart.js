import axios from "axios";

const axiosConfig = {
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/'
};

export const apiCart = axios.create(axiosConfig);