'use client'
import { usersApi } from "@/api/usersApi";
import { useState } from "react";

const ProductForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        stock: 0,
        price: 0,
        category: "",
        files: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 5) {
            alert("You can only upload up to 5 images");
        } else {
            setFormData({
                ...formData,
                files: files
            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('title', formData.title);
        form.append('description', formData.description);
        form.append('stock', formData.stock);
        form.append('price', formData.price);
        form.append('category', formData.category);
        formData.files.forEach((file) => {
            form.append('files', file); // Agregar el archivo, no solo el nombre
        });

        try {
            const response = await usersApi.post('/products/register', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('response', response);
            if (response.status === 201) {
                console.log('Product registered successfully');
                setFormData({
                    title: "",
                    description: "",
                    stock: 0,
                    price: 0,
                    category: "",
                    files: []
                });
            } else {
                console.log('Failed to register product');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Register Product</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                    Title:
                </label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                    Description:
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="stock">
                    Stock:
                </label>
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                    Price:
                </label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
                    Category:
                </label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="files">
                    Upload Images (up to 5):
                </label>
                <input
                    type="file"
                    name="files"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Submit
            </button>
        </form>
    );
};

export default ProductForm;
