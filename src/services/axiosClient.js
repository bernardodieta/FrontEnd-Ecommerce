import axios from "axios";
import { getHeader } from "@/utils/utils.js";

export default class AxiosClient {

    getRequest = ({ url, config, callbackSuccess, callbackError }) => {
        axios.get(url, { ...config, ...getHeader() })
            .then(response => {
                console.log('Respuesta GET:', response);
                if (callbackSuccess) callbackSuccess(response);
            })
            .catch(error => {
                console.error('Error GET:', error);
                if (callbackError) callbackError(error);
            });
    }

    postRequest = ({ url, body, config, callbackSuccess, callbackError }) => {
        axios.post(url, body, { ...config, ...getHeader() })
            .then(response => {
                console.log('Respuesta POST:', response);
                if (callbackSuccess) callbackSuccess(response);
            })
            .catch(error => {
                console.error('Error POST:', error);
                if (callbackError) callbackError(error);
            });
    }

    putRequest = ({ url, body, config, callbackSuccess, callbackError }) => {
        axios.put(url, body, { ...config, ...getHeader() })
            .then(response => {
                console.log('Respuesta PUT:', response);
                if (callbackSuccess) callbackSuccess(response);
            })
            .catch(error => {
                console.error('Error PUT:', error);
                if (callbackError) callbackError(error);
            });
    }

    deleteRequest = ({ url, config, callbackSuccess, callbackError }) => {
        axios.delete(url, { ...config, ...getHeader() })
            .then(response => {
                console.log('Respuesta DELETE:', response);
                if (callbackSuccess) callbackSuccess(response);
            })
            .catch(error => {
                console.error('Error DELETE:', error);
                if (callbackError) callbackError(error);
            });
    }
}
