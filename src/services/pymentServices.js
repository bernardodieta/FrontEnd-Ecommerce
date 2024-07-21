import { getHeader } from "@/utils/utils.js";
import AxiosClient from "./axiosClient";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const REACT_APP_PAYMENT_ENDPOINT = process.env.REACT_APP_PAYMENT_ENDPOINT;
console.log(REACT_APP_BASE_URL);
console.log(REACT_APP_PAYMENT_ENDPOINT);


export default class PaymentServices {
    constructor() {
        this.client = new AxiosClient();
    }

    createPaymentIntent = ({ orderId, callbackSuccess, callbackError }) => {
        console.log('Creating payment intent...');
        const requestInfo = {
            url: `https://ecommerce-fullbackend-production.up.railway.app/api/payment-intents?id=${orderId}`,
            config: getHeader(),
            callbackSuccess: (response) => {
                console.log('Response from createPaymentIntent:', response);
                if (response && response.data && response.data.payload && response.data.payload.payload) {
                    const clientSecret = response.data.payload.payload.client_secret;
                    console.log('Extracted client_secret:', clientSecret);
                    callbackSuccess(clientSecret);
                } else {
                    console.error('Client secret not found in response');
                }
            },
            callbackError
        };
        this.client.postRequest(requestInfo); // Use GET here if you're fetching data
    }

    pay = ({ body, callbackSuccess, callbackError }) => {
        const requestInfo = { url: `https://ecommerce-fullbackend-production.up.railway.app/api/checkout`, body, config: getHeader(), callbackSuccess, callbackError }
        this.client.postRequest(requestInfo);
    }
}