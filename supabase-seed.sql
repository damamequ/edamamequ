-- EdamameQu: Supabase Schema & Seed Data
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- 0. Create Storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit) 
VALUES ('site-assets', 'site-assets', true, 1073741824) -- 1GB limit
ON CONFLICT (id) DO UPDATE SET file_size_limit = EXCLUDED.file_size_limit;

-- Storage policy: allow public read
DROP POLICY IF EXISTS "Public read storage" ON storage.objects;
CREATE POLICY "Public read storage" ON storage.objects FOR SELECT USING (bucket_id = 'site-assets');

-- Storage policy: allow authenticated uploads
DROP POLICY IF EXISTS "Auth upload storage" ON storage.objects;
CREATE POLICY "Auth upload storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-assets');

-- Storage policy: allow authenticated deletes
DROP POLICY IF EXISTS "Auth delete storage" ON storage.objects;
CREATE POLICY "Auth delete storage" ON storage.objects FOR DELETE USING (bucket_id = 'site-assets');

-- 1. Create the table
CREATE TABLE IF NOT EXISTS site_content (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  section text UNIQUE NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- 3. Public read policy
DROP POLICY IF EXISTS "Public read" ON site_content;
CREATE POLICY "Public read" ON site_content FOR SELECT USING (true);

-- 4. Public write policy (no auth — restrict later)
DROP POLICY IF EXISTS "Public write" ON site_content;
CREATE POLICY "Public write" ON site_content FOR ALL USING (true) WITH CHECK (true);

-- 5. Seed data
INSERT INTO site_content (section, content) VALUES

('navbar', '{
  "brand": "EdamameQu",
  "links": [
    {"label": "Cerita Kami", "href": "#story"},
    {"label": "Produk", "href": "#products"},
    {"label": "Nutrisi", "href": "#nutrition"},
    {"label": "Metode Kami", "href": "#process"}
  ],
  "ctaText": "Pesan via WhatsApp",
  "whatsappUrl": "https://wa.me/yournumber"
}'::jsonb),

('hero', '{
  "badge": "Kualitas Jepang, Kini Hadir di Jogja",
  "title": "Sumber",
  "titleHighlight": "Protein",
  "titleSuffix": "Alami",
  "subtitle": "Fresh & Premium",
  "description": "Kedelai Sultan segar, organik, dan berkelanjutan yang siap menemani hari-hari Anda di Jogja. Rasakan kualitas Fresh & Premium yang kami persembahkan khusus untuk Anda.",
  "ctaPrimary": "Lihat Pilihan",
  "ctaSecondary": "Metode Kami",
  "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuA77tRG9vQrCVmAQShVVwWoZ_nuUJ6tIf5g3jwB2qX4hW8rnc2gxaIdvcVd7Ib62Sv4OBfVZhW0KDMoGGSRFfLM2eV2RVr9gLwa1ulkQPf68zX5LVQKNMX13Y-UdS3tMgnetNoqoUSEIcclNH5AfFvgJdkvo2L5tFXuwo_WYn-GoxocsLSiH8ACnoF5WFuPAl7ufIG-pvYMW9HB6WfmpoIrgTVsXSDFr9e213Tdw9gcHcTLeb_OwmDkhCSwSUjQHeOFvbeGkd3vjfiK"
}'::jsonb),

('story', '{
  "heading": "Kisah Sang Kedelai Sultan",
  "items": [
    {"icon": "agriculture", "title": "Pertanian Lokal Berkelanjutan", "description": "Ditanam di dataran tinggi subur menggunakan metode pertanian organik yang ramah lingkungan."},
    {"icon": "fitness_center", "title": "Tinggi Protein", "description": "Sumber protein nabati lengkap untuk gaya hidup aktif Anda."},
    {"icon": "local_shipping", "title": "Dari Petani Lokal ke Meja Anda", "description": "Dipanen saat kematangan puncak dan langsung dibekukan untuk mengunci nutrisi."}
  ]
}'::jsonb),

('products', '{
  "heading": "Daftar Harga",
  "badge": "Fresh & Premium Edition",
  "description": "Kedelai Sultan segar berkualitas premium langsung dari petani lokal Jogja.",
  "items": [
    {"name": "500 Gram", "price": "Rp 15.000", "bestSeller": false},
    {"name": "1 Kilogram (Best Seller)", "price": "Rp 28.000", "bestSeller": true}
  ],
  "ctaHeading": "Siap merasakan kebaikannya?",
  "ctaDescription": "Cukup ketuk tombol di bawah untuk mengirim pesan ke tim kami dan memesan langsung via WhatsApp.",
  "whatsappUrl": "https://wa.me/yournumber"
}'::jsonb),

('nutrition', '{
  "heading": "Polong Kecil,",
  "headingHighlight": "Manfaat Besar",
  "description": "Satu cangkir edamame menyediakan sekitar 18 gram protein nabati lengkap, menjadikannya camilan pasca-olahraga yang sempurna atau tambahan sehat untuk makanan apa pun.",
  "benefits": [
    {"icon": "spa", "title": "100% Vegan & Non-GMO", "desc": "Murni nabati, seperti yang diinginkan alam."},
    {"icon": "bolt", "title": "Indeks Glikemik Rendah", "desc": "Energi berkelanjutan tanpa lonjakan gula."},
    {"icon": "favorite", "title": "Sehat untuk Jantung", "desc": "Kaya akan lemak tak jenuh ganda yang sehat dan serat."}
  ],
  "facts": [
    {"value": "122", "label": "Kalori"},
    {"value": "11g", "label": "Protein"},
    {"value": "5g", "label": "Serat"},
    {"value": "0mg", "label": "Kolesterol"}
  ]
}'::jsonb),

('process', '{
  "heading": "Proses Dari Kebun ke Meja Anda",
  "description": "Kami mengontrol setiap langkah perjalanan untuk memastikan sang Kedelai Sultan dengan kualitas tertinggi sampai ke tangan Anda.",
  "steps": [
    {"icon": "outdoor_garden", "title": "1. Ditanam di Tanah Subur", "description": "Benih Non-GMO berkualitas ditanam di tanah vulkanik yang kaya mineral."},
    {"icon": "wb_sunny", "title": "2. Tumbuh", "description": "Dirawat dengan pupuk organik dan irigasi alami."},
    {"icon": "content_cut", "title": "3. Panen Segar", "description": "Dipetik segar setiap pagi untuk memastikan rasa manis alami dan kerenyahan Sang Kedelai Sultan."},
    {"icon": "kitchen", "title": "4. Dikirim", "description": "Dibekukan cepat dan dikemas vakum untuk kesegaran maksimal."}
  ]
}'::jsonb),

('gallery', '{
  "videoUrl": "/videos/merapi_background.mp4",
  "images": [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDfWSuWt9CNLLDlZTvMoAj8d_frGnsVy82v80lOyIGARKsuvNOxC4zod-bS0xhjtDYb15Dw2X98ZCLiSeg6uls8jLmlUNHJqWDviR0XgBWg-DE2w6JM8ceKwO16z-tsIaHInCWCad8NZTk0BKdwZ2c7gJtq41QATsO0w-Z-W5dXUtmpMSu2_Rr6RHI61fHR4vOy6OBihsRUpE0hcHNmulZA-KX9tSoBr5RvoFW12cJ-j8J5-YjqydczkUglcPdk4yOSjCHPSMY26ZHm",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA9AaN5S0O6ghDhkNLiORf_LtK0fSGFEHWwi3FtSV3pOzJi_JWCIJ5k7xZ8XTb7M7DygUXk0kruZEpFd3-ikzYgdVadXAvArF7EI67bdzqQjZDSkgExChl9Y_1RWyCysyHKn-SSdZUv_vBKb19gTnOiypDpKme_Hz_0iNGmWf3Q-ZzkTKFIen5QqhpOmp-PkTBl1aE2KKMK1Oe7BpQQHWec7i2KwKBbMsOz4uOF45cOepXmIRpdGtVmYN55tKVVRMWR0-FLg6V04VDO",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAGyWoeb3rIc18wINuXtrdhFRHiHHmqrmWEiP4BgANGpA4V5DD034HM1N2kcMOggMnsPblyZWQ6BawPWvvXhk_W-g_9LZ3p_Ce66bB74-eM4gxsonH7t12Xcu0HtHg19C3wVodUnT68bbZW_ZSte2mCIzwPzOm9Cq7eF4oVKkrYW17R1F94hJFHK43etm5t0lrAm6dN54OB1sSm8D6GvyxQeXsO-ZrlalhXgVkuLb67jFjB-Rn0HFCB544Rzvgt3LPgaRFpnA5E-z7r",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAiZiIr-f9YV-Y1Tb9YpXHv0sRCYbrusecw3uYkLm-nEWXHoSecfyamgKTKk2cUbdthU7l2B67CGmnl-Jk1jKJtDvZU7EkwWb3Lw5ThBr5gG81PecoF1OmYee6sZA2vu6pBy84aLbky7ne5kYPWVycIyLWRV2GnBukZs85510XMHXRwBlgLRs5gwXUG5j7vZI7O90N_Nf42wwZI0RKjz6xIOiDGHAIwPN21CpXwK-8qFg-N3x8ng0ZmgH_xX1vvjRgiVzm6vqJqXnkU",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBTZg-g8XoI70YaLBuBvgfx2Be0IvGk2H3u4BJ0SMwvYvPeXmtqDbb9LltZXSGzi8FisFT8G0LNvqWtp54GPyi9msd3yYtcG9qErb73xG6LHYMY9dRGdob-rakKjnjDX2qoACdZcNIQugAmjLzt9SLpeTmisjwFLIwkHUfQWeuPddL9fNVXUIW4pI47R8Wa-IYHOR0wIWxiyG_9DT5OCZqYw4ra4Jzm3dUz6zfTmlUjPWmDeWHTj8oqdTSi3IpNlItR7I0RRXF_iUwF",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDHZ012QXpGNExkREIYcpA7LhAkfYCBKwwiuLRj8c9_-9WhkGkq72JhaTis191A22yAMEhdu9ALnP8lqYfvwO-91PtAsKsr5Mj5hT3tNu_cO30dmIosEdc73eXM34M8YbalSo1__z82uY06oKDh0sEz3kvVPbV8YP-fMgBPVmBSY173cqjQ4HV5z8_dRRj58Iu0X1VpNacyQ0KpQgyTUdMbayP9bX0QCnS8CTROcSJHx7R6CpGeIXeNMXZZa2KaB-gtgiIizlwtdhbu",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDSExF8-_egRfa_8qImb-1gbzhIcrAuYPWLgTEaDSfXlTsQ2zdVjsR2bXK2FULtGFbcGKXXHgoph_k94KpVShjvCISn3PHMhkXKacdlkBGtnzte-q1JxZ2wiYA22brizmhcmRWGlhUp2v9-eL0b4Kdltkub_Vxb_2UwgeljvwMKlZas4HJlRPbnEXx9h_XPg9YViaIIdPkwPyrb_635gv7PzRAQRzjOngf6u3yxw0zfJERNNDdsX2JBGEs2ZajV2CZZeK7EYX1srz1-",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDxbbr5EpQ95SM7qehG1citN-IU0x1e8pPXZO_SP61wrWWZ2YBVSBDgBqoSqMCyX4wVp2UmMZQtF09zVSbVH_oU_c8hyorLI2mYyxej1X_YS390xJfzeuboxvNjCdF6RkqyxSMmQshjHJ09tDXFJws2eLbyS432XrNVAbV_HuOm8X1Hn5P8nohWrugONNz7Gxv5m1wGpasY7FX8L2_Zdqc45ThOyOJ0F8uKNGMCug6MgkOpIyBF6FjZ1pnNBN0e8fZnI4KefpqkWP2O"
  ]
}'::jsonb),

('contact', '{
  "heading": "Mari Terhubung",
  "description": "Punya pertanyaan tentang sumber kami atau peluang grosir? Kirim pesan atau bergabung dengan komunitas kami.",
  "email": "edamameku00@gmail.com",
  "address": "Pandeyan Umbulharjo, Kota Yogyakarta, DIY",
  "socialHeading": "Sosial Media",
  "socialDescription": "Yuk, ikuti keseruan kami di media sosial! Dapatkan berbagai inspirasi gaya hidup sehat, update produk terbaru, hingga promo menarik yang kami siapkan spesial untuk Anda.",
  "socials": [
    {"platform": "instagram", "url": "https://www.instagram.com/edamamequ?igsh=MTd0bWxlOGFkZ2R2ZQ%3D%3D&utm_source=qr", "handle": "@edamamequ"},
    {"platform": "tiktok", "url": "https://www.tiktok.com/@edamamequ?_r=1&_t=ZS-944cxdLZFiO", "handle": "@edamamequ"}
  ]
}'::jsonb),

('footer', '{
  "brand": "EdamameQu",
  "tagline": "Fresh & Premium",
  "links": [
    {"label": "Kebijakan Privasi", "url": "#"},
    {"label": "Syarat Layanan", "url": "#"},
    {"label": "Informasi Pengiriman", "url": "#"}
  ],
  "copyright": "© 2024 EdamameQu. Hak cipta dilindungi undang-undang."
}'::jsonb),

('theme', '{
  "primary": "#37ec13",
  "backgroundLight": "#f6f8f6",
  "backgroundDark": "#132210",
  "accentDark": "#0d1a0a"
}'::jsonb)

ON CONFLICT (section) DO UPDATE SET content = EXCLUDED.content, updated_at = now();
