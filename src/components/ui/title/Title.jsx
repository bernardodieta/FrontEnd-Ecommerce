
export const Title = ({ title, subtitle, className }) => {
    return (
        <div className={`mt-3 ${className}`}>
            <h1 className="antialiased text-4xl font-semibold my-10">{title}</h1>
            {
                subtitle && (
                    <h3 className="text-xl mb-10">{subtitle}</h3>
                )
            }
        </div>
    )
}
