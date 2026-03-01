import { useState } from 'react';
import { submitGoogleForm } from '../utils/gform';

export default function StockRequestForm({ baseURL, entryName, entryPhone, entryAddress, entrySource, entryKnowledge, whatsappUrl }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [source, setSource] = useState('');
    const [knowledge, setKnowledge] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !phone.trim() || !address.trim() || !source.trim() || !knowledge.trim()) {
            alert('Mohon isi semua data formulir.');
            return;
        }

        setStatus('loading');

        // Ensure configuration is present
        if (!baseURL || !entryName || !entryPhone || !entryAddress || !entrySource || !entryKnowledge) {
            alert('Terjadi kesalahan konfigurasi. Silakan hubungi admin.');
            setStatus('idle');
            return;
        }

        const result = await submitGoogleForm(
            baseURL,
            entryName,
            entryPhone,
            entryAddress,
            entrySource,
            entryKnowledge,
            name,
            phone,
            address,
            source,
            knowledge
        );

        if (!result.success) {
            alert(result.error || 'Terjadi kesalahan saat mengirim pesanan.');
            setStatus('idle');
            return;
        }

        setStatus('success');
        setName('');
        setPhone('');
        setAddress('');
        setSource('');
        setKnowledge('');

        // Revert back to idle after a reasonable time
        setTimeout(() => setStatus('idle'), 5000);
    };

    if (status === 'loading') {
        return (
            <div className="bg-white/[0.06] border border-white/10 rounded-xl p-8 text-center mt-6 animate-pulse">
                <div className="size-12 rounded-full border-4 border-[var(--color-primary)] border-t-transparent animate-spin mx-auto mb-4"></div>
                <h4 className="text-xl font-bold text-white mb-2">Membuka form konfirmasi...</h4>
                <p className="text-white/50 text-sm">Mohon tunggu sebentar, kami sedang menyiapkan lembar pesanan Anda.</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="bg-white/[0.06] border border-white/10 rounded-xl p-8 text-center mt-6 transition-all">
                <div className="size-14 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Berhasil Terkirim!</h4>
                <p className="text-white/50 text-sm mb-4">Pesanan Anda telah masuk ke sistem kami.</p>
                <button onClick={() => setStatus('idle')} className="text-sm font-bold text-[var(--color-primary)] underline hover:text-[var(--color-primary)]/80">Kirim Baru</button>
            </div>
        );
    }

    // Fallback if config is missing -> disable form
    const isDisabled = !baseURL || !entryName || !entryPhone || !entryAddress || !entrySource || !entryKnowledge;

    return (
        <form onSubmit={handleSubmit} className="bg-white/[0.06] rounded-2xl border border-white/10 p-6 md:p-8 mt-6 max-w-lg mx-auto text-left">
            <h3 className="text-2xl font-bold mb-2 text-center text-white">Kirim Pesanan</h3>
            <div className="mb-6">
                <a
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 w-full bg-transparent text-[#25D366] font-bold border border-[#25D366]/40 rounded-xl hover:bg-[#25D366] hover:text-white transition-all group"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg className="size-5 fill-[#25D366] group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.435-9.89 9.886-.001 2.225.683 4.315 1.95 6.071l-1.029 3.756 3.869-1.015zm10.534-7.443c-.279-.14-1.647-.812-1.903-.905-.256-.092-.441-.139-.627.139-.186.279-.719.905-.882 1.091-.162.186-.325.209-.604.069-.279-.14-1.18-.435-2.248-1.388-.83-.741-1.39-1.655-1.552-1.934-.163-.279-.017-.43.122-.569.126-.125.279-.325.418-.487.14-.162.186-.279.279-.465.093-.186.046-.349-.023-.487-.069-.14-.627-1.511-.859-2.071-.227-.546-.456-.471-.627-.48l-.534-.006c-.186 0-.488.07-.744.349-.256.279-.976.953-.976 2.325s1.001 2.697 1.14 2.883c.139.186 1.968 3.006 4.767 4.213.667.287 1.187.458 1.593.587.67.213 1.28.183 1.763.111.538-.08 1.647-.674 1.88-1.325.233-.651.233-1.209.163-1.325-.069-.116-.256-.186-.534-.326z" />
                    </svg>
                    Pesan via WhatsApp
                </a>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-white/70 mb-2" htmlFor="name">Nama Lengkap</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-transparent transition-all bg-white/[0.06] text-white placeholder:text-white/30"
                        placeholder="Contoh: Budi Santoso"
                        required
                        disabled={isDisabled}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-white/70 mb-2" htmlFor="phone">Nomor WhatsApp</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-transparent transition-all bg-white/[0.06] text-white placeholder:text-white/30"
                        placeholder="Contoh: 08123456789"
                        required
                        disabled={isDisabled}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-white/70 mb-2" htmlFor="address">Alamat Lengkap</label>
                    <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-transparent transition-all bg-white/[0.06] text-white placeholder:text-white/30"
                        placeholder="Contoh: Jl. Sudirman No. 1..."
                        rows="2"
                        required
                        disabled={isDisabled}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-white/70 mb-2" htmlFor="source">Kenal edamameQu dari mana?</label>
                    <input
                        type="text"
                        id="source"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-transparent transition-all bg-white/[0.06] text-white placeholder:text-white/30"
                        placeholder="Contoh: Instagram, Teman, Iklan..."
                        required
                        disabled={isDisabled}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-white/70 mb-2" htmlFor="knowledge">Apa yang diketahui tentang edamame?</label>
                    <textarea
                        id="knowledge"
                        value={knowledge}
                        onChange={(e) => setKnowledge(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-transparent transition-all bg-white/[0.06] text-white placeholder:text-white/30"
                        placeholder="Contoh: Kedelai jepang yang sehat..."
                        rows="2"
                        required
                        disabled={isDisabled}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isDisabled || status === 'loading'}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 font-bold rounded-xl transition-all ${isDisabled || status === 'loading' ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-[var(--color-primary)] text-[var(--color-accent-dark)] hover:shadow-lg hover:shadow-[var(--color-primary)]/20 hover:scale-[1.02]'}`}
                >
                    <span className="material-symbols-outlined">{isDisabled ? 'lock' : 'send'}</span>
                    Kirim Pesanan Sekarang
                </button>
            </div>
            {isDisabled && (
                <p className="text-red-400 text-sm text-center mt-4">Form saat ini tidak tersedia. Konfigurasi belum diatur.</p>
            )}
        </form>
    );
}
