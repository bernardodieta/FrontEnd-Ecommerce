import Link from "next/link";

const AdminProductList = () => {
    return (
        <div>
            <Link href='/admin/addProduct'>Vender un Producto</Link>
            <Link href='/admin/productList'>Administrar todos los productos</Link>
            <Link href='/admin/productList'>Administrar todos los productos</Link>
        </div>
    )
}

AdminProductList.displayName = 'AdminProductList'
export default AdminProductList