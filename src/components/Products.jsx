import StockRequestForm from './StockRequestForm'

export default function Products({ data }) {
    if (!data) return null

    return (
        <section className="min-h-screen flex items-center py-24 bg-[#e8f5e9]" id="products">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4">{data.heading}</h2>
                    <p className="text-[var(--color-primary)] font-bold uppercase tracking-[0.2em] text-xs mb-4">{data.badge}</p>
                    <p className="text-[var(--color-accent-dark)]/70 text-lg">{data.description}</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] shadow-xl overflow-hidden max-w-3xl mx-auto border border-white/50">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#dcfce7]">
                            <tr>
                                <th className="py-6 px-4 md:px-8 text-sm md:text-lg font-extrabold text-[#166534] uppercase tracking-wider border-b-2 border-[#bbf7d0]">Gambar</th>
                                <th className="py-6 px-4 md:px-8 text-sm md:text-lg font-extrabold text-[#166534] uppercase tracking-wider border-b-2 border-[#bbf7d0]">Berat Kemasan</th>
                                <th className="py-6 px-4 md:px-8 text-sm md:text-lg font-extrabold text-[#166534] uppercase tracking-wider text-right border-b-2 border-[#bbf7d0]">Harga</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.items?.map((item, i) => (
                                <tr
                                    key={i}
                                    className={`hover:bg-[#f0fdf4] transition-colors duration-300 ${item.bestSeller ? 'bg-[#f0fdf4]' : ''}`}
                                >
                                    <td className="py-4 px-4 md:px-8 align-middle w-24 md:w-32">
                                        {item.image ? (
                                            <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-sm border border-black/5 bg-gray-100 flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-gray-400">image</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className={`py-6 px-4 md:px-8 text-lg md:text-xl align-middle ${item.bestSeller ? 'font-extrabold text-[#166534]' : 'font-semibold text-gray-700'}`}>
                                        <div className="flex items-center gap-3">
                                            {item.name}
                                            {item.bestSeller && (
                                                <span className="text-[10px] bg-[#166534] text-white px-3 py-1 rounded-full uppercase tracking-wider font-bold shrink-0 hidden sm:inline-block">
                                                    Terlaris
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-6 px-4 md:px-8 text-xl md:text-2xl font-black text-[#15803d] text-right align-middle">
                                        {item.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-16 text-center bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/50 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4">{data.ctaHeading}</h3>
                        <p className="text-[var(--color-accent-dark)]/60 mb-8 max-w-lg mx-auto">{data.ctaDescription}</p>

                        <StockRequestForm
                            baseURL={data.gform_prefill_base_url}
                            entryName={data.gform_entry_name}
                            entryPhone={data.gform_entry_phone}
                            entryAddress={data.gform_entry_address}
                            entrySource={data.gform_entry_source}
                            entryKnowledge={data.gform_entry_knowledge}
                        />

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300/50"></div>
                            </div>
                            <div className="relative flex justify-center text-sm font-medium leading-6">
                                <span className="bg-white/80 px-4 text-gray-500 rounded-full border border-gray-200 backdrop-blur-md">Atau hubungi manual lewat WhatsApp</span>
                            </div>
                        </div>

                        <a
                            className="inline-flex items-center justify-center gap-3 px-10 py-4 w-full max-w-lg mx-auto bg-white text-[#25D366] font-bold border-2 border-[#25D366] rounded-xl shadow-sm hover:bg-[#25D366] hover:text-white transition-all group"
                            href={data.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg className="size-6 fill-[#25D366] group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.435-9.89 9.886-.001 2.225.683 4.315 1.95 6.071l-1.029 3.756 3.869-1.015zm10.534-7.443c-.279-.14-1.647-.812-1.903-.905-.256-.092-.441-.139-.627.139-.186.279-.719.905-.882 1.091-.162.186-.325.209-.604.069-.279-.14-1.18-.435-2.248-1.388-.83-.741-1.39-1.655-1.552-1.934-.163-.279-.017-.43.122-.569.126-.125.279-.325.418-.487.14-.162.186-.279.279-.465.093-.186.046-.349-.023-.487-.069-.14-.627-1.511-.859-2.071-.227-.546-.456-.471-.627-.48l-.534-.006c-.186 0-.488.07-.744.349-.256.279-.976.953-.976 2.325s1.001 2.697 1.14 2.883c.139.186 1.968 3.006 4.767 4.213.667.287 1.187.458 1.593.587.67.213 1.28.183 1.763.111.538-.08 1.647-.674 1.88-1.325.233-.651.233-1.209.163-1.325-.069-.116-.256-.186-.534-.326z" />
                            </svg>
                            Pesan via WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
