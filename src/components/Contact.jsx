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

const socialIcons = { instagram: InstagramIcon, tiktok: TiktokIcon }

export default function Contact({ data }) {
    if (!data) return null

    return (
        <section className="py-24 bg-[var(--color-accent-dark)] text-white">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                    <h2 className="text-4xl font-bold mb-8">{data.heading}</h2>
                    <p className="text-white/60 mb-12">{data.description}</p>
                    <div className="space-y-6">
                        <a className="flex items-center gap-4 text-lg hover:text-[var(--color-primary)] transition-colors" href={`mailto:${data.email}`}>
                            <span className="material-symbols-outlined">mail</span>
                            {data.email}
                        </a>
                        <div className="flex items-center gap-4 text-lg">
                            <span className="material-symbols-outlined">location_on</span>
                            {data.address}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-white/5 p-10 rounded-3xl border border-white/10">
                        <h3 className="text-2xl font-bold mb-6">{data.socialHeading}</h3>
                        <p className="text-white/60 mb-8">{data.socialDescription}</p>

                        <div className="flex gap-4 mb-12">
                            {data.socials?.map((social, i) => {
                                const Icon = socialIcons[social.platform]
                                return (
                                    <a
                                        key={i}
                                        className="size-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[var(--color-accent-dark)] transition-all"
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {Icon && <Icon />}
                                    </a>
                                )
                            })}
                        </div>

                        <div className="space-y-4">
                            {data.socials?.map((social, i) => {
                                const Icon = socialIcons[social.platform]
                                return (
                                    <a
                                        key={i}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl transition-all group"
                                    >
                                        <div className="size-10 rounded-full bg-white text-[var(--color-accent-dark)] flex items-center justify-center group-hover:scale-110 transition-transform">
                                            {Icon && <svg className="size-6 fill-current" viewBox="0 0 24 24">{Icon === InstagramIcon ? <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-2a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" /> : <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />}</svg>}
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
