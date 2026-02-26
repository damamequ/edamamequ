export default function ValueProps({ data }) {
    if (!data) return null;

    return (
        <section className="py-24 bg-[var(--color-background-light)] relative overflow-hidden">
            {/* Soft decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-accent-dark)] mb-4">
                        {data.heading}
                    </h2>
                    <div className="w-20 h-1.5 bg-[var(--color-primary)] mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.items?.map((item, i) => (
                        <div
                            key={i}
                            className="group p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-black/5 hover:border-[var(--color-primary)]/30 hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="size-14 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-6 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-500">
                                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-[var(--color-accent-dark)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-[var(--color-accent-dark)]/60 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
