export default function Gallery({ data }) {
    if (!data || !data.images || data.images.length === 0) return null

    const images = data.images

    return (
        <section className="py-24 relative overflow-hidden bg-[var(--color-background-light)]">
            {/* Video Background */}
            {data.videoUrl && (
                <div className="absolute inset-0 z-0">
                    <video
                        src={data.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                </div>
            )}

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                    {images.map((imgUrl, idx) => {
                        // Create a masonry-like feel by making some items larger
                        const isLarge = idx % 5 === 0;
                        const isTall = idx % 3 === 0 && !isLarge;

                        return (
                            <div
                                key={idx}
                                className={`relative rounded-[2rem] overflow-hidden shadow-xl group ${isLarge ? 'md:col-span-2 md:row-span-2' : ''} ${isTall ? 'lg:row-span-2' : ''}`}
                            >
                                <img
                                    src={imgUrl}
                                    alt={`Gallery image ${idx + 1}`}
                                    className="w-full h-full object-cover transition-all duration-700 ease-out opacity-90 group-hover:opacity-100 group-hover:scale-110"
                                    loading="lazy"
                                />
                                {/* Optional subtle vignette for deeper traditional feel */}
                                <div className="absolute inset-0 bg-black/10 opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
