const InstagramIcon = () => (
    <svg className="size-5 fill-current" viewBox="0 0 24 24">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-2a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
    </svg>
)

const TiktokIcon = () => (
    <svg className="size-5 fill-current" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
)

const TwitterIcon = () => (
    <svg className="size-5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

const FacebookIcon = () => (
    <svg className="size-5 fill-current" viewBox="0 0 24 24">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-1.125 0-2.518.271-2.518 1.48v1.495h3.766l-.587 3.666h-3.18v7.98z" />
    </svg>
)

const YoutubeIcon = () => (
    <svg className="size-5 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
)

const socialIcons = {
    instagram: InstagramIcon,
    tiktok: TiktokIcon,
    twitter: TwitterIcon,
    facebook: FacebookIcon,
    youtube: YoutubeIcon
}

export default function Contact({ data }) {
    if (!data) return null

    return (
        <section className="relative py-24 text-white overflow-hidden">
            {/* Background image with dark overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1611810174991-5cdd99a2c6b2?q=80&w=1600')` }}
            />
            <div className="absolute inset-0 bg-[#0d1a0a]/88" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
                <div>
                    <h2 className="text-4xl font-bold mb-8">{data.heading}</h2>
                    <p className="text-white/50 mb-12 leading-relaxed">{data.description}</p>
                    <div className="space-y-6">
                        <a className="flex items-center gap-4 text-lg hover:text-[var(--color-primary)] transition-colors" href={`mailto:${data.email}`}>
                            <span className="material-symbols-outlined text-[var(--color-primary)]">mail</span>
                            {data.email}
                        </a>
                        <div className="flex items-center gap-4 text-lg">
                            <span className="material-symbols-outlined text-[var(--color-primary)]">location_on</span>
                            {data.address}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-white/[0.04] p-10 rounded-2xl border border-white/10">
                        <h3 className="text-2xl font-bold mb-6">{data.socialHeading}</h3>
                        <p className="text-white/50 mb-8 leading-relaxed">{data.socialDescription}</p>

                        <div className="flex gap-4 mb-12">
                            {data.socials?.map((social, i) => {
                                const Icon = socialIcons[social.platform]
                                return (
                                    <a
                                        key={i}
                                        className="size-12 rounded-full border border-white/15 flex items-center justify-center hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-accent-dark)] transition-all"
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {Icon && <Icon />}
                                    </a>
                                )
                            })}
                        </div>

                        <div className="space-y-3">
                            {data.socials?.map((social, i) => {
                                const Icon = socialIcons[social.platform]
                                return (
                                    <a
                                        key={i}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 p-4 rounded-xl transition-all group"
                                    >
                                        <div className="size-10 rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-accent-dark)] transition-all">
                                            {Icon && <Icon />}
                                        </div>
                                        <span className="font-bold">{social.handle}</span>
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
