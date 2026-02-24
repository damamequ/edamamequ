export default function Gallery({ data }) {
    if (!data || !data.images || data.images.length === 0) return null

    const images = data.images
    // Distribute images across 4 columns
    const cols = [[], [], [], []]
    images.forEach((img, i) => cols[i % 4].push({ url: img, index: i }))

    const shapeClasses = [
        ['blob-shape h-64', 'rounded-2xl h-80'],
        ['rounded-2xl h-80', 'blob-shape-alt h-64'],
        ['blob-shape h-64', 'rounded-2xl h-80'],
        ['rounded-2xl h-80', 'blob-shape-alt h-64'],
    ]

    return (
        <section className="py-24 relative overflow-hidden">
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

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {cols.map((col, colIdx) => (
                        <div
                            key={colIdx}
                            className={`space-y-4 md:space-y-8 ${colIdx % 2 === 1 ? 'pt-8 md:pt-16' : ''}`}
                        >
                            {col.map((img, imgIdx) => (
                                <div
                                    key={img.index}
                                    className={`${shapeClasses[colIdx]?.[imgIdx] || 'rounded-2xl h-64'} bg-cover bg-center shadow-lg transform hover:scale-[1.03] transition-transform duration-500`}
                                    style={{ backgroundImage: `url('${img.url}')` }}
                                    role="img"
                                    aria-label={`Gallery image ${img.index + 1}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
