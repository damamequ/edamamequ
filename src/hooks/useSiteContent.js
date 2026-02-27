import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

// Default content used as fallback when Supabase is empty or unreachable
const defaultContent = {
    hero: {
        badge: "Kualitas Jepang, Kini Hadir di Jogja",
        title: "Sumber",
        titleHighlight: "Protein",
        titleSuffix: "Alami",
        subtitle: "Fresh & Premium",
        description: "Kedelai Sultan segar, organik, dan berkelanjutan yang siap menemani hari-hari Anda di Jogja. Rasakan kualitas Fresh & Premium yang kami persembahkan khusus untuk Anda.",
        ctaPrimary: "Lihat Pilihan",
        ctaSecondary: "Metode Kami",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1200"
    },
    story: {
        heading: "Kisah Sang Kedelai Sultan",
        items: [
            { icon: "agriculture", title: "Pertanian Lokal Berkelanjutan", description: "Ditanam di dataran tinggi subur menggunakan metode pertanian organik yang ramah lingkungan." },
            { icon: "fitness_center", title: "Tinggi Protein", description: "Sumber protein nabati lengkap untuk gaya hidup aktif Anda." },
            { icon: "local_shipping", title: "Dari Petani Lokal ke Meja Anda", description: "Dipanen saat kematangan puncak dan langsung dibekukan untuk mengunci nutrisi." }
        ]
    },
    products: {
        heading: "Daftar Harga",
        badge: "Fresh & Premium Edition",
        description: "Kedelai Sultan segar berkualitas premium langsung dari petani lokal Jogja.",
        items: [
            { name: "500 Gram", price: "Rp 15.000", bestSeller: false, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=400&auto=format&fit=crop" },
            { name: "1 Kilogram", price: "Rp 28.000", bestSeller: true, image: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=400&auto=format&fit=crop" },
            { name: "2 Kilogram", price: "Rp 55.000", bestSeller: false, image: "https://plus.unsplash.com/premium_photo-1664472637341-3ec829d1f4da?q=80&w=400&auto=format&fit=crop" },
            { name: "3 Kilogram", price: "Rp 80.000", bestSeller: false, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=400&auto=format&fit=crop" },
            { name: "4 Kilogram", price: "Rp 105.000", bestSeller: false, image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=400&auto=format&fit=crop" },
            { name: "5 Kilogram", price: "Rp 130.000", bestSeller: false, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=400&auto=format&fit=crop" }
        ],
        ctaHeading: "Siap merasakan kebaikannya?",
        ctaDescription: "Cukup ketuk tombol di bawah untuk mengirim pesan ke tim kami dan memesan langsung via WhatsApp.",
        cta_type: "gform_prefill",
        gform_prefill_base_url: "https://docs.google.com/forms/d/e/1FAIpQLScX_EXAMPLE/viewform?usp=pp_url",
        gform_entry_name: "entry.111111",
        gform_entry_phone: "entry.222222",
        whatsappUrl: "https://wa.me/yournumber"
    },
    nutrition: {
        heading: "Polong Kecil,",
        headingHighlight: "Manfaat Besar",
        description: "Satu cangkir edamame menyediakan sekitar 18 gram protein nabati lengkap, menjadikannya camilan pasca-olahraga yang sempurna atau tambahan sehat untuk makanan apa pun.",
        benefits: [
            { icon: "spa", title: "100% Vegan & Non-GMO", desc: "Murni nabati, seperti yang diinginkan alam." },
            { icon: "bolt", title: "Indeks Glikemik Rendah", desc: "Energi berkelanjutan tanpa lonjakan gula." },
            { icon: "favorite", title: "Sehat untuk Jantung", desc: "Kaya akan lemak tak jenuh ganda yang sehat dan serat." }
        ],
        facts: [
            { value: "122", label: "Kalori" },
            { value: "11g", label: "Protein" },
            { value: "5g", label: "Serat" },
            { value: "0mg", label: "Kolesterol" }
        ]
    },
    process: {
        heading: "Proses Dari Kebun ke Meja Anda",
        description: "Kami mengontrol setiap langkah perjalanan untuk memastikan sang Kedelai Sultan dengan kualitas tertinggi sampai ke tangan Anda.",
        steps: [
            { icon: "outdoor_garden", title: "1. Ditanam di Tanah Subur", description: "Benih Non-GMO berkualitas ditanam di tanah vulkanik yang kaya mineral." },
            { icon: "wb_sunny", title: "2. Tumbuh", description: "Dirawat dengan pupuk organik dan irigasi alami." },
            { icon: "content_cut", title: "3. Panen Segar", description: "Dipetik segar setiap pagi untuk memastikan rasa manis alami dan kerenyahan Sang Kedelai Sultan." },
            { icon: "kitchen", title: "4. Dikirim", description: "Dibekukan cepat dan dikemas vakum untuk kesegaran maksimal." }
        ]
    },
    gallery: {
        videoUrl: "",
        images: [
            "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1200",
            "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=1200",
            "https://plus.unsplash.com/premium_photo-1664472637341-3ec829d1f4da?q=80&w=1200",
            "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1200",
            "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1200",
            "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1200",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200",
            "https://images.unsplash.com/photo-1628187886470-394dd546ec84?q=80&w=1200"
        ]
    },
    contact: {
        heading: "Mari Terhubung",
        description: "Punya pertanyaan tentang sumber kami atau peluang grosir? Kirim pesan atau bergabung dengan komunitas kami.",
        email: "edamameku00@gmail.com",
        address: "Pandeyan Umbulharjo, Kota Yogyakarta, DIY",
        socialHeading: "Sosial Media",
        socialDescription: "Yuk, ikuti keseruan kami di media sosial! Dapatkan berbagai inspirasi gaya hidup sehat, update produk terbaru, hingga promo menarik yang kami siapkan spesial untuk Anda.",
        socials: [
            { platform: "instagram", url: "https://www.instagram.com/edamamequ?igsh=MTd0bWxlOGFkZ2R2ZQ%3D%3D&utm_source=qr", handle: "@edamamequ" },
            { platform: "tiktok", url: "https://www.tiktok.com/@edamamequ?_r=1&_t=ZS-944cxdLZFiO", handle: "@edamamequ" }
        ]
    },
    footer: {
        brand: "EdamameQu",
        tagline: "Fresh & Premium",
        links: [
            { label: "Kebijakan Privasi", url: "#" },
            { label: "Syarat Layanan", url: "#" },
            { label: "Informasi Pengiriman", url: "#" }
        ],
        copyright: "© 2024 EdamameQu. Hak cipta dilindungi undang-undang."
    },
    navbar: {
        brand: "EdamameQu",
        links: [
            { label: "Cerita Kami", href: "#story" },
            { label: "Produk", href: "#products" },
            { label: "Nutrisi", href: "#nutrition" },
            { label: "Metode Kami", href: "#process" }
        ],
        ctaText: "Pesan via WhatsApp",
        whatsappUrl: "https://wa.me/yournumber"
    },
    theme: {
        primary: "#37ec13",
        backgroundLight: "#f6f8f6",
        backgroundDark: "#132210",
        accentDark: "#0d1a0a"
    },
    valueProps: {
        heading: "Kenapa Memilih EdamameQu?",
        items: [
            {
                icon: "verified_user",
                title: "Kualitas Seleksi Sultan",
                description: "Hanya polong terbaik yang lolos seleksi ketat kami, menjamin kepuasan di setiap gigitan."
            },
            {
                icon: "eco",
                title: "Kesegaran Kebun Jogja",
                description: "Langsung dari petani lokal, dipanen pada puncak kematangan untuk mengunci rasa manis alami."
            },
            {
                icon: "health_and_safety",
                title: "Nutrisi Tanpa Kompromi",
                description: "Bebas pengawet dan Non-GMO. Camilan mewah yang mencintai tubuh Anda."
            },
            {
                icon: "schedule",
                title: "Siap Saji, Kapan Saja",
                description: "Kemudahan premium untuk gaya hidup modern Anda yang aktif dan sehat."
            }
        ]
    }
}

export function useSiteContent() {
    const [content, setContent] = useState(defaultContent)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchContent = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const { data, error: dbError } = await supabase
                .from('site_content')
                .select('section, content')

            if (dbError) throw dbError

            if (data && data.length > 0) {
                const merged = { ...defaultContent }
                data.forEach(row => {
                    if (row.section && row.content) {
                        // Deep merge: defaults + DB data, so new default fields aren't lost
                        merged[row.section] = { ...defaultContent[row.section], ...row.content }
                    }
                })
                setContent(merged)
            }
            // If no data, keep defaultContent
        } catch (err) {
            console.error('Error fetching site content:', err)
            setError(err.message)
            // Keep defaultContent on error
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchContent()
    }, [fetchContent])

    const updateContent = async (section, newData) => {
        try {
            const { error: dbError } = await supabase
                .from('site_content')
                .upsert(
                    { section, content: newData, updated_at: new Date().toISOString() },
                    { onConflict: 'section' }
                )

            if (dbError) throw dbError

            setContent(prev => ({ ...prev, [section]: newData }))
            return { success: true }
        } catch (err) {
            console.error('Error updating content:', err)
            return { success: false, error: err.message }
        }
    }

    return { content, loading, error, updateContent, refetch: fetchContent }
}

export { defaultContent }
