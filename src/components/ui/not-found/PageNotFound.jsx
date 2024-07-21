import Link from "next/link"

export const PageNotFound = () => {
    return (
        <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
            <div className="text-center px-5 mx-5">
                <h2>404</h2>
                <p>Whoops!, lo sentimos mucho.</p>
                <Link href='/'>Inicio</Link>
            </div>

        </div>
    )
}
