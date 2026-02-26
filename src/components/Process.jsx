export default function Process({ data }) {
    if (!data) return null

    return (
        <section className="min-h-screen flex items-center py-24 bg-[#f0fdf4]" id="process">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold mb-6">{data.heading}</h2>
                    <p className="text-[var(--color-accent-dark)]/60">{data.description}</p>
                </div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-[var(--color-primary)]/20 -z-0" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {data.steps?.map((step, i) => (
                            <div key={i} className="text-center group">
                                <div className="size-24 rounded-full bg-white/60 border-2 border-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-8 group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all shadow-lg backdrop-blur-sm">
                                    <span className="material-symbols-outlined text-3xl group-hover:text-[var(--color-accent-dark)]">
                                        {step.icon}
                                    </span>
                                </div>
                                <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                                <p className="text-sm text-[var(--color-accent-dark)]/60">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
