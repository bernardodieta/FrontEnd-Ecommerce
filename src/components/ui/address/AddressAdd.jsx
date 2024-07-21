'use client'
import { useState } from "react";
import { usersApi } from "@/api/usersApi"

const AddressForm = () => {
    const [formData, setFormData] = useState({
        country: "",
        state: "",
        city: "",
        zipcode: "",
        addressText: "",
        numext: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const addressData = {
        ...formData
    }
    console.log('addressData', addressData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('addressData', addressData);
            const saveAddress = await usersApi.post('/address/save', addressData)

            if (saveAddress) {
                console.log('Data submitted successfully');
            } else {
                console.error('Failed to submit data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-96 mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Address Form</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="country">
                    Country:
                </label>
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="state">
                    State:
                </label>
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
                    City:
                </label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="zipcode">
                    Zipcode:
                </label>
                <input
                    type="number"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="addressText">
                    Address:
                </label>
                <input
                    type="text"
                    name="addressText"
                    value={formData.addressText}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="numext">
                    Number:
                </label>
                <input
                    type="number"
                    name="numext"
                    value={formData.numext}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Submit
            </button>
        </form>
    );
};

export default AddressForm;
