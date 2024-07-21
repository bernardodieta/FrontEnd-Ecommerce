'use client'
import { ProductGrid, Title } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductPage = ({ params }) => {
    const { id } = params;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios.get(`https://ecommerce-fullbackend-production.up.railway.app/api/products?category=${id}`);
                const { payload } = result.data
                setProducts(payload.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getData();
    }, []);

    return (
        <>
            <Title title={`Productos de ${id}`} />
            <ProductGrid products={products} />
        </>
    );
}
ProductPage.displayName = 'ProductPage';

export default ProductPage
