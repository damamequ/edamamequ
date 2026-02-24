export default function Nutrition({ data }) {
    if (!data) return null

    return (
        <section className="min-h-screen flex items-center py-24 bg-[var(--color-accent-dark)] text-white overflow-hidden relative" id="nutrition">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                            {data.heading}<br />
                            <span className="text-[var(--color-primary)]">{data.headingHighlight}</span>
                        </h2>
                        <p className="text-white/60 mb-12 max-w-lg">{data.description}</p>

                        <div className="space-y-8">
                            {data.benefits?.map((benefit, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="size-12 rounded-lg bg-[var(--color-primary)]/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[var(--color-primary)]">{benefit.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-1">{benefit.title}</h4>
                                        <p className="text-white/50 text-sm">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-[var(--color-primary)] p-12 rounded-[3rem] text-[var(--color-accent-dark)] transform lg:rotate-3 shadow-2xl">
                            <div className="flex justify-between items-center border-b border-[var(--color-accent-dark)]/10 pb-6 mb-6">
                                <span className="text-sm font-bold uppercase tracking-widest">Fakta Nutrisi</span>
                                <span className="text-xs">Per sajian 100g</span>
                            </div>
                            <div className="space-y-6">
                                {data.facts?.map((fact, i) => (
                                    <div key={i} className="flex justify-between items-end border-b border-[var(--color-accent-dark)]/5 pb-2">
                                        <span className="text-2xl font-black italic">{fact.value}</span>
                                        <span className="font-bold">{fact.label}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-8 text-[10px] leading-relaxed opacity-60">
                                *Persen Angka Kecukupan Gizi berdasarkan diet 2.000 kalori.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
