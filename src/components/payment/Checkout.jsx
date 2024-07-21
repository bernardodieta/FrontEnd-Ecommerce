'use client';
import { useEffect, useState } from "react";
import PaymentServices from "@/services/pymentServices.js";
import PaymentForm from "./PayForm.jsx";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { usersApi } from "@/api/usersApi.js";

const REACT_APP_STRIPE_KEY = "pk_test_51PYcWiIMwwxwvchgXb8EsTd2YHNDfOF6IoVOZjGwx6IGsVSjLstDokcs94N2P2JgYIldPa5O0Zr8zDP7oTptUY4v00w5orbZTt";
const stripePromise = loadStripe(REACT_APP_STRIPE_KEY);
const Checkout = () => {
    const [address, setAddress] = useState([]);
    const [order, setOrder] = useState({});
    const [selectedAddress, setSelectedAddress] = useState('');
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderStatus = await usersApi.get('/cart/prepurchase/');
                const addressList = await usersApi.get('/address/');
                if (orderStatus.status === 200 && addressList.status === 200) {
                    setAddress(addressList.data.payload);
                    setOrder(orderStatus.data.payload);
                } else {
                    console.log('Algo salió mal');
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchOrder();
    }, []);
    useEffect(() => {
        console.log('id de direccion', selectedAddress);
    }, [selectedAddress]);

    const handleAddressChange = async (event) => {
        const selectedId = event.target.value;
        const selectedAddr = address.find(addr => addr._id === selectedId);
        setSelectedAddress(selectedAddr);
        const updateAddresOrder = await usersApi.post(`/orders/${order._id}`, { selectedAddress })
        console.log('respuesta de update de address en orders', updateAddresOrder);
    };

    const handlePaymentIntent = async () => {
        if (order._id) {
            const service = new PaymentServices();
            try {
                await service.createPaymentIntent({
                    orderId: order._id,
                    callbackSuccess: (res) => {
                        const clientSecret = res;
                        setClientSecret(clientSecret);
                    },
                    callbackError: (err) => {
                        console.error("Error en la llamada a createPaymentIntent:", err);
                    }
                });
            } catch (error) {
                console.error("Error en la creación del intento de pago:", error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Orden de Compra</h1>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Detalles de la compra</h2>
                <p><strong>ID de Orden:</strong> {order._id}</p>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>Total:</strong> ${order.total}</p>
                <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Seleccione una dirección de envío.</h2>
                <select
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    value={selectedAddress}
                    onChange={handleAddressChange}
                >
                    <option value="" disabled>Seleccione una dirección:</option>
                    {address.map((addr) => (
                        <option key={addr._id} value={addr._id}>
                            {addr.addressText}, {addr.city}, {addr.state}, {addr.country}, {addr.zipcode}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-4">
                {selectedAddress && (
                    <div>
                        <h3 className="text-lg font-semibold">Dirección de envío seleccionada:</h3>
                        {address.map((addr) => addr._id === selectedAddress && (
                            <div key={addr._id} className="p-2 border border-gray-300 rounded mt-2">
                                <p><strong>Country:</strong> {addr.country}</p>
                                <p><strong>State:</strong> {addr.state}</p>
                                <p><strong>City:</strong> {addr.city}</p>
                                <p><strong>Zipcode:</strong> {addr.zipcode}</p>
                                <p><strong>Address:</strong> {addr.addressText}</p>
                                {addr.numext && <p><strong>External Number:</strong> {addr.numext}</p>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="mt-4">
                <div className="mt-4">
                    <h1 className="text-xl font-bold">Stripe Payment</h1>
                    {!clientSecret ? (
                        <button
                            onClick={handlePaymentIntent}
                            className="mt-4 p-2 bg-blue-500 text-white rounded"
                        >
                            Obtener clientSecret y continuar
                        </button>
                    ) : (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <PaymentForm />
                        </Elements>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
