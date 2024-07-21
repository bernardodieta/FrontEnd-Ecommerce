
import { ProductGridItem } from "./ProductGridItem"

export const ProductGrid = ({ products }) => {
    console.log(products)
    return (
        <div className="flex flex-row flex-wrap justify-center sm: gap-20 mb-10 w-4/5 m-auto">
            {
                products.map(product => (
                    <ProductGridItem
                        key={product.id}
                        product={product}

                    />
                ))
            }
        </div>
    )
}
