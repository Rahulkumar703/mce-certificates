const layout = ({ children }) => {
    return (
        <section className="w-full h-[calc(100dvh-8.5rem)] flex items-center justify-center">
            {children}
        </section>
    )
}
export default layout