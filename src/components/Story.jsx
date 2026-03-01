export default function Story({ data }) {
    if (!data) return null

    return (
        <section className="relative min-h-screen flex items-center py-20 overflow-hidden" id="story">
            {/* Background image with dark overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1649257171206-37625b1f3b2f?q=80&w=1600')` }}
            />
            <div className="absolute inset-0 bg-[#0d1a0a]/75" />

            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{data.heading}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                    {data.items?.map((item, i) => (
                        <div key={i} className="flex flex-col items-center">
                            {/* Standalone icon — no background shape */}
                            <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] mb-6">
                                {item.icon}
                            </span>
                            <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                            <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
