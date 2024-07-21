'use client';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useCartStore from '@/store/ui/cart-store';
import { IoStarOutline, IoStarSharp } from 'react-icons/io5'; // Importa íconos de estrellas

export default function ProductPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        const fetchedProduct = response.data.payload;

        // Calcular cantidad de valoraciones
        const numValorations = fetchedProduct.valorations.length;

        // Calcular promedio de estrellas
        let totalStars = 0;
        fetchedProduct.valorations.forEach(valoration => {
          totalStars += valoration.star;
        });
        const avgStars = numValorations > 0 ? totalStars / numValorations : 0;

        // Agregar cantidad de valoraciones y promedio de estrellas al producto
        fetchedProduct.numValorations = numValorations;
        fetchedProduct.avgStars = avgStars;

        setProduct(fetchedProduct);

        if (fetchedProduct.img.length > 0) {
          setSelectedImage(fetchedProduct.img[0].path);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Función para generar íconos de estrellas basados en el promedio de estrellas
  const renderStars = () => {
    const stars = [];
    const avgStars = product.avgStars.toFixed(2); // Promedio de estrellas redondeado a 2 decimales
    const fullStars = Math.floor(avgStars); // Número completo de estrellas llenas
    const hasHalfStar = avgStars % 1 !== 0; // Determina si hay media estrella

    // Generar estrellas llenas
    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoStarSharp key={i} size={25} className="text-yellow-500" />);
    }

    // Generar media estrella si es necesario
    if (hasHalfStar) {
      stars.push(<IoStarSharp key="half" size={25}  className="text-yellow-500" />);
    }

    // Rellenar con estrellas vacías hasta llegar a 5
    while (stars.length < 5) {
      stars.push(<IoStarOutline key={stars.length} size={25}  className="text-gray-300" />);
    }

    return stars;
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-col md:flex-row bg-blue-100 p-5 rounded-lg shadow-md">
        <div className="flex flex-col md:w-1/2 p-5">
          <div className="flex space-x-2 mb-5">
            {product.img.length > 0 &&
              product.img.map((image, index) => (
                <div key={index} className="w-20 h-20 rounded-md overflow-hidden cursor-pointer" onClick={() => setSelectedImage(image.path)}>
                  <Image
                    alt={product.title}
                    src={`http://localhost:8080/${image.path.replace(/\\/g, '/')}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
          </div>
          {selectedImage && (
            <div className="w-full max-w-lg mx-auto rounded-md overflow-hidden">
              <Image
                alt={product.title}
                src={`http://localhost:8080/${selectedImage.replace(/\\/g, '/')}`}
                width={300}
                height={300}
                className="object-contain w-full h-auto"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col md:w-1/2 p-5 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <h2 className="text-2xl text-green-600 font-semibold mb-2">${product.price}</h2>
          <div className="flex flex-col mb-5 items-center justify-center mx-auto">
            <h5 className="text-lg font-medium">Envio Gratis</h5>
            <h5 className="text-lg font-medium">6 Meses sin intereses</h5>
            <h2 className="mt-5 text-xl font-semibold">Stock disponible: {product.stock}</h2>
            <div className="flex items-center justify-center mx-auto w-full">
              {renderStars()} <p>({product.numValorations})</p>
            </div>
          </div>
          <p className="text-gray-700 mb-5">{product.description}</p>
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
              Comprar Ahora
            </button>
            <button
              onClick={() => addToCart(product, 1)}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
            >
              Añadir al Carrito
            </button>
          </div>
          <div>
            <h2>Opiniones del producto</h2>
            {product.valorations.map(valoration => (
              <div key={valoration._id}>
                <p>Usuario: {valoration.userId}</p>
                <p>Mensaje: {valoration.message}</p>
                <p>Estrellas: {valoration.star}</p>
                <p>Fecha: {new Date(valoration.date).toLocaleDateString()}</p>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
