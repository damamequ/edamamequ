import StockRequestForm from './StockRequestForm'

export default function Products({ data, globalWhatsAppUrl }) {
    if (!data) return null

    return (
        <section className="relative min-h-screen flex items-center py-24 overflow-hidden" id="products">
            {/* Background image with dark overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1666318300348-a4d0226d81ad?q=80&w=1600')` }}
            />
            <div className="absolute inset-0 bg-[#0d1a0a]/80" />

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-white">{data.heading}</h2>
                    <p className="text-[var(--color-primary)] font-bold uppercase tracking-[0.2em] text-xs mb-4">{data.badge}</p>
                    <p className="text-white/60 text-lg">{data.description}</p>
                </div>

                {/* Price table – solid white background */}
                <div className="bg-white rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-lg shadow-black/10">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-5 px-4 md:px-8 text-sm font-bold text-[#166534] uppercase tracking-wider">Gambar</th>
                                <th className="py-5 px-4 md:px-8 text-sm font-bold text-[#166534] uppercase tracking-wider">Berat Kemasan</th>
                                <th className="py-5 px-4 md:px-8 text-sm font-bold text-[#166534] uppercase tracking-wider text-right">Harga</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.items?.map((item, i) => (
                                <tr
                                    key={i}
                                    className={`hover:bg-gray-50 transition-colors duration-300 ${item.bestSeller ? 'bg-green-50' : ''}`}
                                >
                                    <td className="py-4 px-4 md:px-8 align-middle w-24 md:w-32">
                                        {item.image ? (
                                            <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-gray-300">image</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className={`py-6 px-4 md:px-8 text-lg md:text-xl align-middle ${item.bestSeller ? 'font-extrabold text-[#166534]' : 'font-semibold text-gray-800'}`}>
                                        <div className="flex items-center gap-3">
                                            {item.name}
                                            {item.bestSeller && (
                                                <span className="text-[10px] bg-green-100 text-[#166534] px-3 py-1 rounded-full uppercase tracking-wider font-bold shrink-0 hidden sm:inline-block border border-green-200">
                                                    Terlaris
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-6 px-4 md:px-8 text-xl md:text-2xl font-black text-gray-900 text-right align-middle">
                                        {item.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* CTA Area */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <StockRequestForm
                        baseURL={data.gform_prefill_base_url}
                        entryName={data.gform_entry_name}
                        entryPhone={data.gform_entry_phone}
                        entryAddress={data.gform_entry_address}
                        entrySource={data.gform_entry_source}
                        entryKnowledge={data.gform_entry_knowledge}
                        whatsappUrl={globalWhatsAppUrl || data.whatsappUrl}
                    />
                </div>
            </div>
        </section>
    )
}
