'use client'
import { useState } from "react";
import { usersApi } from "@/api/usersApi";
import { useRouter } from "next/navigation";
const UserRegisterForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        age: "",
        email: "",
        password: "",
        repassword: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (formData.password !== formData.repassword) {
            formErrors.repassword = "Passwords do not match";
        }
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await usersApi.post('/users/register', {
                first_name: formData.first_name,
                last_name: formData.last_name,
                age: formData.age,
                email: formData.email,
                password: formData.password
            });
            console.log('response', response)
            if (response.status === 201) {
                console.log('User registered successfully');
                setFormData({
                    first_name: "",
                    last_name: "",
                    age: "",
                    email: "",
                    password: "",
                    repassword: ""
                });

                setErrors({});
                router.push('/auth/login')
            } else {
                console.error('Failed to register user');
                // Handle error
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Register User</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="first_name">
                    First Name:
                </label>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="last_name">
                    Last Name:
                </label>
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
                    Age:
                </label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                    Email:
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                    Password:
                </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="repassword">
                    Confirm Password:
                </label>
                <input
                    type="password"
                    name="repassword"
                    value={formData.repassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
                {errors.repassword && (
                    <p className="text-red-500 text-sm mt-2">{errors.repassword}</p>
                )}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Submit
            </button>
        </form>
    );
};

export default UserRegisterForm;
