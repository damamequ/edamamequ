export default function Process({ data }) {
    if (!data) return null

    return (
        <section className="min-h-screen flex items-center py-24 bg-[#f0fdf4]" id="process">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold mb-6 text-[var(--color-accent-dark)]">{data.heading}</h2>
                    <p className="text-[var(--color-accent-dark)]/60">{data.description}</p>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {data.steps?.map((step, i) => (
                            <div key={i} className="text-center group">
                                {/* Standalone icon – no circular background */}
                                <div className="flex items-center justify-center mx-auto mb-8">
                                    <span className="material-symbols-outlined text-5xl text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300">
                                        {step.icon}
                                    </span>
                                </div>
                                <h4 className="text-xl font-bold mb-4 text-[var(--color-accent-dark)]">{step.title}</h4>
                                <p className="text-sm text-[var(--color-accent-dark)]/60 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
