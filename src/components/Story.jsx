export default function Story({ data }) {
    if (!data) return null

    return (
        <section className="min-h-screen flex items-center py-20 bg-[var(--color-background-light)]" id="story">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">{data.heading}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                    {data.items?.map((item, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="size-16 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-6">
                                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-[var(--color-accent-dark)]/60 text-sm leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
