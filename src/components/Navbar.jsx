import { useState, useEffect } from 'react'
import Logo from './Logo'

export default function Navbar({ data }) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!data) return null

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-[var(--color-background-light)]/90 backdrop-blur-md border-b border-[var(--color-primary)]/10 shadow-sm'
                : 'bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Logo className="size-9" />
                    <span className={`text-xl font-extrabold tracking-tight transition-colors duration-300 ${scrolled ? 'text-[var(--color-accent-dark)]' : 'text-white'}`}>
                        {data.brand}
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {data.links?.map((link, i) => (
                        <a
                            key={i}
                            className={`text-sm font-semibold hover:text-[var(--color-primary)] transition-colors ${scrolled ? 'text-[var(--color-accent-dark)]' : 'text-white/80'}`}
                            href={link.href}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href={data.whatsappUrl}
                        className="hidden sm:block text-sm font-bold px-6 py-2.5 bg-[var(--color-primary)] text-[var(--color-accent-dark)] rounded-lg hover:shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all"
                    >
                        {data.ctaText}
                    </a>
                    <button
                        className={`md:hidden transition-colors ${scrolled ? 'text-[var(--color-accent-dark)]' : 'text-white'}`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-[var(--color-background-light)] border-b border-[var(--color-primary)]/10 px-6 py-4 space-y-3 shadow-lg">
                    {data.links?.map((link, i) => (
                        <a
                            key={i}
                            className="block text-sm font-semibold hover:text-[var(--color-primary)] transition-colors py-2"
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href={data.whatsappUrl}
                        className="block text-center text-sm font-bold px-6 py-2.5 bg-[var(--color-primary)] text-[var(--color-accent-dark)] rounded-lg mt-2"
                    >
                        {data.ctaText}
                    </a>
                </div>
            )}
        </header>
    )
}
