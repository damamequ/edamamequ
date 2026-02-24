export default function Hero({ data }) {
    if (!data) return null

    return (
        <section className="relative overflow-hidden min-h-screen flex items-center">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${data.image}')` }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
            {/* Accent glow */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-primary)]/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 py-20 w-full">
                <div className="max-w-2xl">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest mb-6 border border-[var(--color-primary)]/20 backdrop-blur-sm">
                        {data.badge}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 text-white">
                        {data.title}{' '}
                        <span className="text-[var(--color-primary)] italic">{data.titleHighlight}</span>{' '}
                        {data.titleSuffix}
                        <span className="block text-2xl md:text-3xl text-[var(--color-primary)]/70 font-medium mt-2 tracking-tight">
                            {data.subtitle}
                        </span>
                    </h1>
                    <p className="text-lg text-white/70 mb-10 max-w-lg leading-relaxed">
                        {data.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            className="px-8 py-4 bg-[var(--color-primary)] text-[var(--color-accent-dark)] font-bold rounded-xl shadow-xl shadow-[var(--color-primary)]/20 hover:scale-[1.02] transition-transform"
                            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {data.ctaPrimary}
                        </button>
                        <button
                            className="px-8 py-4 border-2 border-white/20 font-bold rounded-xl hover:bg-white/10 transition-colors text-white backdrop-blur-sm"
                            onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {data.ctaSecondary}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
