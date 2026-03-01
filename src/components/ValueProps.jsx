import { useState } from 'react';

export default function ValueProps({ data }) {
    const [activeCard, setActiveCard] = useState(null);
    if (!data) return null;

    return (
        <section className="relative overflow-hidden py-32 md:py-48 min-h-screen flex items-center justify-center">
            {/* Background Image Container */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url("${data.image || 'https://images.unsplash.com/photo-1577413681498-5c3171305dfa?q=80&w=1200'}")` }}
            >
                {/* Dark overlay – no blur */}
                <div className="absolute inset-0 bg-[#0d1a0a]/80" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                        {data.heading}
                    </h2>
                    <div className="w-20 h-1 bg-[var(--color-primary)]/60 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {data.items?.map((item, i) => {
                        const parts = item.description.split(/(terbaik|Jogja|Non-GMO|premium)/i);
                        const isActive = activeCard === i;

                        return (
                            <div
                                key={i}
                                onClick={() => setActiveCard(isActive ? null : i)}
                                className={`cursor-pointer p-8 rounded-2xl transition-all duration-500 ${isActive
                                    ? 'bg-white/10 -translate-y-2 shadow-lg shadow-[var(--color-primary)]/5'
                                    : 'bg-white/[0.03] hover:bg-white/[0.07]'
                                    }`}
                            >
                                {/* Standalone icon — no background shape */}
                                <span className={`material-symbols-outlined text-4xl mb-6 block transition-colors duration-500 ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-primary)]/70'}`}>
                                    {item.icon}
                                </span>
                                <h3 className={`text-lg font-bold mb-3 transition-colors duration-300 ${isActive ? 'text-[var(--color-primary)]' : 'text-white'
                                    }`}>
                                    {item.title}
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {parts.map((part, index) =>
                                        /terbaik|Jogja|Non-GMO|premium/i.test(part) ? (
                                            <span key={index} className="text-white/90 font-semibold">{part}</span>
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
