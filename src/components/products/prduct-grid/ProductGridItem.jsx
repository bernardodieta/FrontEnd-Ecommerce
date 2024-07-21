'use client'
import Image from "next/image";
import { useRouter } from 'next/navigation'

export const ProductGridItem = ({ product }) => {
    const router = useRouter()
    const handleclick = (id) => {
        console.log(id)
        router.push(`/product/${id}`)
    }
    return (
        <div className="flex rounded-md overflow-hidden w-60 h-80">
            {product.img.length > 0 && (
                <div className="flex flex-col justify-around h-full">
                    <Image
                        alt="asd"
                        src={`http://localhost:8080/${product.img[0].path}`}
                        className="h-auto w-auto object-contain max-h-32 mx-auto"
                        width={200}
                        height={200}
                    />
                    <h4 className="text-base font-semibold">
                        {product.title.toString().substring(0, 40)}
                    </h4>
                    <p className="text-sm text-green-600">
                        Envio Gratis
                    </p>
                    <p className="text-sm text-blue-950">
                        12 meses sin intereses
                    </p>
                    <h3 className="text-lg font-semibold">
                        $: {product.price}
                    </h3>
                    <button className="w-full px-6 py-2 text-sm bg-blue-600 hover:bg-blue-900 text-white transition-all" onClick={() => handleclick(product._id)}>Ver</button>
                </div>
            )}
        </div>
    );
};
