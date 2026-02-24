import Logo from './Logo'

export default function Footer({ data }) {
    if (!data) return null

    return (
        <footer className="py-12 bg-[var(--color-accent-dark)] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                    <Logo className="size-7" />
                    <span className="text-white font-bold tracking-tight">{data.brand}</span>
                    <span className="text-[10px] text-white/30 ml-2 border border-white/10 px-2 py-0.5 rounded uppercase font-medium">
                        {data.tagline}
                    </span>
                </div>

                <div className="flex gap-8 text-xs font-medium text-white/40 uppercase tracking-widest">
                    {data.links?.map((link, i) => (
                        <a key={i} className="hover:text-[var(--color-primary)] transition-colors" href={link.url}>
                            {link.label}
                        </a>
                    ))}
                </div>

                <p className="text-white/40 text-xs">{data.copyright}</p>
            </div>
        </footer>
    )
}
