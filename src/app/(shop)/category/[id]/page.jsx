'use client'
import { ProductGrid, Title } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductPage({ params }) {
    const { id } = params;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/api/products?category=${id}`);
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
