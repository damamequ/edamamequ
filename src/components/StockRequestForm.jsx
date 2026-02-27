import { useState } from 'react';
import { submitGoogleForm } from '../utils/gform';

export default function StockRequestForm({ baseURL, entryName, entryPhone }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !phone.trim()) {
            alert('Mohon isi nama dan nomor WhatsApp Anda.');
            return;
        }

        setStatus('loading');

        // Ensure configuration is present
        if (!baseURL || !entryName || !entryPhone) {
            alert('Terjadi kesalahan konfigurasi. Silakan hubungi admin.');
            setStatus('idle');
            return;
        }

        const result = await submitGoogleForm(
            baseURL,
            entryName,
            entryPhone,
            name,
            phone
        );

        if (!result.success) {
            alert(result.error || 'Terjadi kesalahan saat mengirim pesanan.');
            setStatus('idle');
            return;
        }

        setStatus('success');
        setName('');
        setPhone('');

        // Revert back to idle after a reasonable time
        setTimeout(() => setStatus('idle'), 5000);
    };

    if (status === 'loading') {
        return (
            <div className="bg-[#f0fdf4] border border-[#166534]/20 rounded-xl p-8 text-center shadow-inner mt-6 animate-pulse">
                <div className="size-12 rounded-full border-4 border-[#25D366] border-t-transparent animate-spin mx-auto mb-4"></div>
                <h4 className="text-xl font-bold text-[#166534] mb-2">Membuka form konfirmasi...</h4>
                <p className="text-[#166534]/70 text-sm">Mohon tunggu sebentar, kami sedang menyiapkan lembar pesanan Anda.</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="bg-[#f0fdf4] border border-[#166534]/20 rounded-xl p-8 text-center shadow-inner mt-6 transition-all">
                <div className="size-14 rounded-full bg-[#25D366] text-white flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h4 className="text-xl font-bold text-[#166534] mb-2">Berhasil Terkirim!</h4>
                <p className="text-[#166534]/70 text-sm mb-4">Pesanan Anda telah masuk ke sistem kami.</p>
                <button onClick={() => setStatus('idle')} className="text-sm font-bold text-[#166534] underline hover:text-[#15803d]">Kirim Baru</button>
            </div>
        );
    }

    // Fallback if config is missing -> disable form
    const isDisabled = !baseURL || !entryName || !entryPhone;

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] border border-[var(--color-primary)]/10 shadow-sm p-6 md:p-8 mt-6 max-w-lg mx-auto text-left">
            <h3 className="text-2xl font-bold mb-2 text-center text-[var(--color-accent-dark)]">Kirim Pesanan</h3>
            <p className="text-center text-sm text-[var(--color-accent-dark)]/60 mb-6 font-medium">
                Sistem kami sedang memproses ketersediaan. Silakan isi data berikut dan pesanan Anda otomatis terkirim.
            </p>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="name">Nama Lengkap</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#166534] focus:border-transparent transition-all bg-gray-50/50"
                        placeholder="Contoh: Budi Santoso"
                        required
                        disabled={isDisabled}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="phone">Nomor WhatsApp</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#166534] focus:border-transparent transition-all bg-gray-50/50"
                        placeholder="Contoh: 08123456789"
                        required
                        disabled={isDisabled}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isDisabled || status === 'loading'}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 font-bold rounded-xl shadow-md transition-all ${isDisabled || status === 'loading' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#166534] text-white hover:shadow-lg hover:scale-[1.02]'}`}
                >
                    <span className="material-symbols-outlined">{isDisabled ? 'lock' : 'send'}</span>
                    Kirim Pesanan Sekarang
                </button>
            </div>
            {isDisabled && (
                <p className="text-red-500 text-sm text-center mt-4">Form saat ini tidak tersedia. Konfigurasi belum diatur.</p>
            )}
        </form>
    );
}
