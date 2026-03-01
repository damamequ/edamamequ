export default function Nutrition({ data }) {
    if (!data) return null

    return (
        <section className="relative min-h-screen flex items-center py-24 text-white overflow-hidden" id="nutrition">
            {/* Background image with dark overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1666318300303-fa93066b7f88?q=80&w=1600')` }}
            />
            <div className="absolute inset-0 bg-[#0d1a0a]/85" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                            {data.heading}<br />
                            <span className="text-[var(--color-primary)]">{data.headingHighlight}</span>
                        </h2>
                        <p className="text-white/50 mb-12 max-w-lg leading-relaxed">{data.description}</p>

                        <div className="space-y-8">
                            {data.benefits?.map((benefit, i) => (
                                <div key={i} className="flex gap-5 items-start">
                                    {/* Standalone icon — no background shape */}
                                    <span className="material-symbols-outlined text-3xl text-[var(--color-primary)] shrink-0 mt-0.5">
                                        {benefit.icon}
                                    </span>
                                    <div>
                                        <h4 className="text-lg font-bold mb-1">{benefit.title}</h4>
                                        <p className="text-white/45 text-sm leading-relaxed">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Nutrition fact card — soft muted tones */}
                    <div className="relative">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
                            Siap merasakan <br />
                            <span className="text-[var(--color-primary)]">kebaikannya?</span>
                        </h2>
                        <div className="bg-[#d1fae5] p-12 rounded-[2.5rem] text-[#14532d] transform lg:rotate-3 shadow-xl">
                            <div className="flex justify-between items-center border-b border-[#14532d]/10 pb-6 mb-6">
                                <span className="text-sm font-bold uppercase tracking-widest">Fakta Nutrisi</span>
                                <span className="text-xs opacity-60">Per sajian 100g</span>
                            </div>
                            <div className="space-y-6">
                                {data.facts?.map((fact, i) => (
                                    <div key={i} className="flex justify-between items-end border-b border-[#14532d]/5 pb-2">
                                        <span className="text-2xl font-black italic">{fact.value}</span>
                                        <span className="font-bold text-[#14532d]/70">{fact.label}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-8 text-[10px] leading-relaxed opacity-50">
                                *Persen Angka Kecukupan Gizi berdasarkan diet 2.000 kalori.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
