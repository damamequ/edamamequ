export default function ValueProps({ data }) {
    if (!data) return null;

    return (
        <section className="relative overflow-hidden py-24">
            {/* Background Image Container */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1200")' }}
            >
                {/* Dark green overlay for readability */}
                <div className="absolute inset-0 bg-[#0d1a0a]/85 backdrop-blur-sm" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                        {data.heading}
                    </h2>
                    <div className="w-20 h-1.5 bg-[#37ec13] mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.items?.map((item, i) => {
                        // Highlight logic for description: we can make keywords semi-bold
                        // Based on existing items like "Kualitas Seleksi Sultan", "Kesegaran Kebun Jogja"
                        const parts = item.description.split(/(terbaik|Jogja|Non-GMO|premium)/i);

                        return (
                            <div
                                key={i}
                                className="group p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-[var(--color-primary)]/40 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="size-14 rounded-2xl bg-[#37ec13]/10 flex items-center justify-center text-[#37ec13] mb-6 group-hover:bg-[#37ec13]/20 transition-colors duration-500">
                                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    {parts.map((part, index) =>
                                        /terbaik|Jogja|Non-GMO|premium/i.test(part) ? (
                                            <span key={index} className="text-white font-semibold">{part}</span>
                                        ) : (
                                            part
                                        )
                                    )}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
