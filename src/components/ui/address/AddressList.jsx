'use client';
import { useEffect, useState } from "react";
import { usersApi } from "@/api/usersApi";
import { Address } from "@/components/ui/address/Address";

export const AddressList = () => {
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await usersApi.get('/address');
                setAddresses(response.data.payload);
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };
        fetchAddresses();
    }, []);

    const handleUpdateAddress = (updatedAddress) => {
        setAddresses(prevAddresses =>
            prevAddresses.map(address =>
                address._id === updatedAddress._id ? updatedAddress : address
            )
        );
    };

    return (
        <div className="flex flex-col">
            Lista de direcciónes guardadas:
            {addresses.length > 0 && addresses.map(address => (
                <Address key={address._id} address={address} onUpdate={handleUpdateAddress} />
            ))}
        </div>
    );
};