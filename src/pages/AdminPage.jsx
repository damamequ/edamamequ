import { useState, useEffect } from 'react'
import { useSiteContent } from '../hooks/useSiteContent'
import { useAuth } from '../hooks/useAuth'
import LoadingSpinner from '../components/LoadingSpinner'
import FileUpload from '../components/FileUpload'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'

// Toast notification
function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div className={`toast-enter fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-semibold ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            <span className="material-symbols-outlined text-lg">{type === 'success' ? 'check_circle' : 'error'}</span>
            {message}
        </div>
    )
}

// Section editor wrapper
function SectionEditor({ title, icon, children, onSave, saving }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors text-left"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[var(--color-primary)]">{icon}</span>
                    </div>
                    <h3 className="text-lg font-bold">{title}</h3>
                </div>
                <span className={`material-symbols-outlined transition-transform ${open ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>

            {open && (
                <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                    {children}
                    <button
                        onClick={onSave}
                        disabled={saving}
                        className="mt-4 px-6 py-2.5 bg-[var(--color-primary)] text-[var(--color-accent-dark)] font-bold rounded-lg hover:shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">{saving ? 'hourglass_empty' : 'save'}</span>
                        {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </div>
            )}
        </div>
    )
}

// Field components
function Field({ label, value, onChange, type = 'text', placeholder }) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
            <input
                type={type}
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="admin-input"
            />
        </div>
    )
}

function TextArea({ label, value, onChange, placeholder }) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
            <textarea
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="admin-textarea"
            />
        </div>
    )
}

// --- Section Forms ---
function HeroEditor({ data, onChange }) {
    const update = (key, val) => onChange({ ...data, [key]: val })
    return (
        <>
            <Field label="Badge" value={data.badge} onChange={v => update('badge', v)} />
            <div className="grid grid-cols-3 gap-3">
                <Field label="Title" value={data.title} onChange={v => update('title', v)} />
                <Field label="Highlight" value={data.titleHighlight} onChange={v => update('titleHighlight', v)} />
                <Field label="Suffix" value={data.titleSuffix} onChange={v => update('titleSuffix', v)} />
            </div>
            <Field label="Subtitle" value={data.subtitle} onChange={v => update('subtitle', v)} />
            <TextArea label="Description" value={data.description} onChange={v => update('description', v)} />
            <div className="grid grid-cols-2 gap-3">
                <Field label="Primary CTA" value={data.ctaPrimary} onChange={v => update('ctaPrimary', v)} />
                <Field label="Secondary CTA" value={data.ctaSecondary} onChange={v => update('ctaSecondary', v)} />
            </div>
            <FileUpload label="Background Image" value={data.image} onChange={v => update('image', v)} accept="image/*" folder="hero" />
        </>
    )
}

function ValuePropsEditor({ data, onChange }) {
    const update = (key, val) => onChange({ ...data, [key]: val })
    const updateItem = (idx, key, val) => {
        const items = [...(data.items || [])]
        items[idx] = { ...items[idx], [key]: val }
        update('items', items)
    }
    const addItem = () => update('items', [...(data.items || []), { icon: 'star', title: '', description: '' }])
    const removeItem = idx => update('items', data.items.filter((_, i) => i !== idx))

    return (
        <>
            <Field label="Heading" value={data.heading} onChange={v => update('heading', v)} />
            <div className="space-y-4 mt-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Features</label>
                {data.items?.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-400">Item {i + 1}</span>
                            <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 transition-colors">
                                <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Icon" value={item.icon} onChange={v => updateItem(i, 'icon', v)} />
                            <Field label="Title" value={item.title} onChange={v => updateItem(i, 'title', v)} />
                        </div>
                        <TextArea label="Description" value={item.description} onChange={v => updateItem(i, 'description', v)} />
                    </div>
                ))}
                <button onClick={addItem} className="text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">add</span> Tambah Fitur
                </button>
            </div>
            <div className="mt-6">
                <FileUpload label="Background Image" value={data.image} onChange={v => update('image', v)} accept="image/*" folder="valueProps" />
            </div>
        </>
    )
}

function StoryEditor({ data, onChange }) {
    const update = (key, val) => onChange({ ...data, [key]: val })
    const updateItem = (idx, key, val) => {
        const items = [...(data.items || [])]
        items[idx] = { ...items[idx], [key]: val }
        update('items', items)
    }
    const addItem = () => update('items', [...(data.items || []), { icon: 'star', title: '', description: '' }])
    const removeItem = idx => update('items', data.items.filter((_, i) => i !== idx))

    return (
        <>
            <Field label="Heading" value={data.heading} onChange={v => update('heading', v)} />
            <div className="space-y-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Items</label>
                {data.items?.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-400">Item {i + 1}</span>
                            <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 transition-colors">
                                <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Icon" value={item.icon} onChange={v => updateItem(i, 'icon', v)} />
                            <Field label="Title" value={item.title} onChange={v => updateItem(i, 'title', v)} />
                        </div>
                        <TextArea label="Description" value={item.description} onChange={v => updateItem(i, 'description', v)} />
                    </div>
                ))}
                <button onClick={addItem} className="text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">add</span> Tambah Item
                </button>
            </div>
        </>
    )
}

function ProductsEditor({ data, onChange }) {
    const update = (key, val) => onChange({ ...data, [key]: val })
    const updateItem = (idx, key, val) => {
        const items = [...(data.items || [])]
        items[idx] = { ...items[idx], [key]: val }
        update('items', items)
    }
    const addItem = () => update('items', [...(data.items || []), { name: '', price: '', bestSeller: false, image: '' }])
    const removeItem = idx => update('items', data.items.filter((_, i) => i !== idx))

    return (
        <>
            <Field label="Heading" value={data.heading} onChange={v => update('heading', v)} />
            <Field label="Badge" value={data.badge} onChange={v => update('badge', v)} />
            <TextArea label="Description" value={data.description} onChange={v => update('description', v)} />

            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Products</label>
            {data.items?.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400">Product {i + 1}</span>
                        <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 transition-colors">
                            <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <Field label="Name" value={item.name} onChange={v => updateItem(i, 'name', v)} />
                        <Field label="Price" value={item.price} onChange={v => updateItem(i, 'price', v)} />
                    </div>
                    <FileUpload
                        label="Product Image"
                        value={item.image}
                        onChange={v => updateItem(i, 'image', v)}
                        accept="image/*"
                        folder="products"
                    />
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={item.bestSeller || false}
                            onChange={e => updateItem(i, 'bestSeller', e.target.checked)}
                            className="rounded border-gray-300"
                        />
                        <span className="font-medium">Best Seller</span>
                    </label>
                </div>
            ))}
            <button onClick={addItem} className="text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">add</span> Tambah Produk
            </button>

            <Field label="CTA Heading" value={data.ctaHeading} onChange={v => update('ctaHeading', v)} />
            <TextArea label="CTA Description" value={data.ctaDescription} onChange={v => update('ctaDescription', v)} />

            <div className="mt-6 p-4 border border-gray-200 rounded-xl bg-white space-y-4">
                <h4 className="font-bold text-gray-800 text-sm">Pengaturan Form Pemesanan (Google Form)</h4>

                <div className="space-y-3 pt-2">
                    <Field
                        label="Google Form Base URL"
                        value={data.gform_prefill_base_url}
                        onChange={v => update('gform_prefill_base_url', v)}
                        placeholder="Contoh: https://docs.google.com/forms/d/e/.../viewform?usp=pp_url"
                        type="url"
                    />
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <Field
                            label="Entry ID - Nama"
                            value={data.gform_entry_name}
                            onChange={v => update('gform_entry_name', v)}
                            placeholder="entry.123456"
                        />
                        <Field
                            label="Entry ID - WhatsApp"
                            value={data.gform_entry_phone}
                            onChange={v => update('gform_entry_phone', v)}
                            placeholder="entry.654321"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <Field
                            label="Entry ID - Alamat"
                            value={data.gform_entry_address}
                            onChange={v => update('gform_entry_address', v)}
                            placeholder="entry.111111"
                        />
                        <Field
                            label="Entry ID - Kenal EdamameQu"
                            value={data.gform_entry_source}
                            onChange={v => update('gform_entry_source', v)}
                            placeholder="entry.222222"
                        />
                    </div>
                    <Field
                        label="Entry ID - Pengetahuan Edamame"
                        value={data.gform_entry_knowledge}
                        onChange={v => update('gform_entry_knowledge', v)}
                        placeholder="entry.333333"
                    />
                    <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                        Pastikan Anda mendapatkan link <strong>"Dapatkan link yang sudah terisi" (Get pre-filled link)</strong> dari Google Form untuk mengetahui ID Entry masing-masing. <br />
                        Catatan: Pilihan tombol "Pesan via WhatsApp" akan menggunakan pengaturan URL WhatsApp dari menu <strong>Navigation Bar</strong>.
                    </p>
                </div>
            </div>
        </>
    )
}

function NutritionEditor({ data, onChange }) {
    const update = (key, val) => onChange({ ...data, [key]: val })
    const updateBenefit = (idx, key, val) => {
        const benefits = [...(data.benefits || [])]
        benefits[idx] = { ...benefits[idx], [key]: val }
        update('benefits', benefits)
    }
    const updateFact = (idx, key, val) => {
        const facts = [...(data.facts || [])]
        facts[idx] = { ...facts[idx], [key]: val }
        update('facts', facts)
    }
    const addBenefit = () => update('benefits', [...(data.benefits || []), { icon: 'star', title: '', desc: '' }])
    const removeBenefit = idx => update('benefits', data.benefits.filter((_, i) => i !== idx))
    const addFact = () => update('facts', [...(data.facts || []), { value: '', label: '' }])
    const removeFact = idx => update('facts', data.facts.filter((_, i) => i !== idx))

    return (
        <>
            <div className="grid grid-cols-2 gap-3">
                <Field label="Heading" value={data.heading} onChange={v => update('heading', v)} />
                <Field label="Highlight" value={data.headingHighlight} onChange={v => update('headingHighlight', v)} />
            </div>
            <TextArea label="Description" value={data.description} onChange={v => update('description', v)} />

            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mt-4">Benefits</label>
            {data.benefits?.map((b, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400">Benefit {i + 1}</span>
                        <button onClick={() => removeBenefit(i)} className="text-red-400 hover:text-red-600 transition-colors">
                            <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Icon" value={b.icon} onChange={v => updateBenefit(i, 'icon', v)} />
                        <Field label="Title" value={b.title} onChange={v => updateBenefit(i, 'title', v)} />
                    </div>
                    <Field label="Description" value={b.desc} onChange={v => updateBenefit(i, 'desc', v)} />
                </div>
            ))}
            <button onClick={addBenefit} className="text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">add</span> Tambah Benefit
            </button>

            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mt-4">Nutrition Facts</label>
            {data.facts?.map((f, i) => (
                <div key={i} className="flex gap-3 items-end">
                    <div className="flex-1"><Field label="Value" value={f.value} onChange={v => updateFact(i, 'value', v)} /></div>
                    <div className="flex-1"><Field label="Label" value={f.label} onChange={v => updateFact(i, 'label', v)} /></div>
                    <button onClick={() => removeFact(i)} className="text-red-400 hover:text-red-600 mb-1">
                        <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                </div>
            ))}
            <button onClick={addFact} className="text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">add</span> Tambah Fakta
            </button>
        </>
    )
}

function ProcessEditor({ data, onChange }) {
    const update = (key, val) => onChange({ ...data, [key]: val })
    const updateStep = (idx, key, val) => {
        const steps = [...(data.steps || [])]
        steps[idx] = { ...steps[idx], [key]: val }
        update('steps', steps)
    }
    const addStep = () => update('steps', [...(data.steps || []), { icon: 'star', title: '', description: '' }])
    const removeStep = idx => update('steps', data.steps.filter((_, i) => i !== idx))

    return (
        <>
            <Field label="Heading" value={data.heading} onChange={v => update('heading', v)} />
            <TextArea label="Description" value={data.description} onChange={v => update('description', v)} />

            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Steps</label>
            {data.steps?.map((step, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400">Step {i + 1}</span>
                        <button onClick={() => removeStep(i)} className="text-red-400 hover:text-red-600 transition-colors">
                            <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Icon" value={step.icon} onChange={v => updateStep(i, 'icon', v)} />
                        <Field label="Title" value={step.title} onChange={v => updateStep(i, 'title', v)} />
                    </div>
                    <TextArea label="Description" value={step.description} onChange={v => updateStep(i, 'description', v)} />
                </div>
            ))}
            <button onClick={addStep} className="text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">add</span> Tambah Step
            </button>
        </>
    )
}

function GalleryEditor({ data, onChange }) {
    const update = (key, val) => onChange({ ...data, [key]: val })
    const updateImage = (idx, val) => {
        const images = [...(data.images || [])]
        images[idx] = val
        update('images', images)
    }
    const addImage = () => update('images', [...(data.images || []), ''])
    const removeImage = idx => update('images', (data.images || []).filter((_, i) => i !== idx))

    return (
        <div className="space-y-6">
            <FileUpload
                label="Background Video"
                value={data.videoUrl}
                onChange={v => update('videoUrl', v)}
                accept="video/*"
                folder="gallery"
            />

            <div className="space-y-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Gallery Images</label>
                {data.images?.map((url, i) => (
                    <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-gray-400">Gambar {i + 1}</span>
                            <button onClick={() => removeImage(i)} className="text-red-400 hover:text-red-600 transition-colors">
                                <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                        </div>
                        <FileUpload
                            label=""
                            value={url}
                            onChange={v => updateImage(i, v)}
                            accept="image/*"
                            folder="gallery"
                        />
                    </div>
                ))}
            </div>
            <button onClick={addImage} className="text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">add</span> Tambah Gambar
            </button>
        </div>
    )
}

function ContactEditor({ data, onChange }) {
    const update = (key, val) => onChange({ ...data, [key]: val })
    const updateSocial = (idx, key, val) => {
        const socials = [...(data.socials || [])]
        socials[idx] = { ...socials[idx], [key]: val }
        update('socials', socials)
    }
    const addSocial = () => update('socials', [...(data.socials || []), { platform: 'instagram', url: '', handle: '' }])
    const removeSocial = idx => update('socials', data.socials.filter((_, i) => i !== idx))

    return (
        <>
            <Field label="Heading" value={data.heading} onChange={v => update('heading', v)} />
            <TextArea label="Description" value={data.description} onChange={v => update('description', v)} />
            <div className="grid grid-cols-2 gap-3">
                <Field label="Email" value={data.email} onChange={v => update('email', v)} type="email" />
                <Field label="Address" value={data.address} onChange={v => update('address', v)} />
            </div>
            <Field label="Social Heading" value={data.socialHeading} onChange={v => update('socialHeading', v)} />
            <TextArea label="Social Description" value={data.socialDescription} onChange={v => update('socialDescription', v)} />

            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Social Links</label>
            {data.socials?.map((s, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400">Social {i + 1}</span>
                        <button onClick={() => removeSocial(i)} className="text-red-400 hover:text-red-600">
                            <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Platform</label>
                            <select
                                value={s.platform}
                                onChange={e => updateSocial(i, 'platform', e.target.value)}
                                className="admin-input"
                            >
                                <option value="instagram">Instagram</option>
                                <option value="tiktok">TikTok</option>
                                <option value="twitter">X (Twitter)</option>
                                <option value="facebook">Facebook</option>
                                <option value="youtube">YouTube</option>
                            </select>
                        </div>
                        <Field label="Handle" value={s.handle} onChange={v => updateSocial(i, 'handle', v)} />
                        <Field label="URL" value={s.url} onChange={v => updateSocial(i, 'url', v)} type="url" />
                    </div>
                </div>
            ))}
            <button onClick={addSocial} className="text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">add</span> Tambah Social
            </button>
        </>
    )
}

function FooterEditor({ data, onChange }) {
    const update = (key, val) => onChange({ ...data, [key]: val })
    const updateLink = (idx, key, val) => {
        const links = [...(data.links || [])]
        links[idx] = { ...links[idx], [key]: val }
        update('links', links)
    }
    const addLink = () => update('links', [...(data.links || []), { label: '', url: '#' }])
    const removeLink = idx => update('links', data.links.filter((_, i) => i !== idx))

    return (
        <>
            <div className="grid grid-cols-2 gap-3">
                <Field label="Brand" value={data.brand} onChange={v => update('brand', v)} />
                <Field label="Tagline" value={data.tagline} onChange={v => update('tagline', v)} />
            </div>
            <Field label="Copyright" value={data.copyright} onChange={v => update('copyright', v)} />

            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Footer Links</label>
            {data.links?.map((link, i) => (
                <div key={i} className="flex gap-3 items-end">
                    <div className="flex-1"><Field label="Label" value={link.label} onChange={v => updateLink(i, 'label', v)} /></div>
                    <div className="flex-1"><Field label="URL" value={link.url} onChange={v => updateLink(i, 'url', v)} /></div>
                    <button onClick={() => removeLink(i)} className="text-red-400 hover:text-red-600 mb-1">
                        <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                </div>
            ))}
            <button onClick={addLink} className="text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">add</span> Tambah Link
            </button>
        </>
    )
}

function NavbarEditor({ data, onChange }) {
    const update = (key, val) => onChange({ ...data, [key]: val })
    const updateLink = (idx, key, val) => {
        const links = [...(data.links || [])]
        links[idx] = { ...links[idx], [key]: val }
        update('links', links)
    }
    const addLink = () => update('links', [...(data.links || []), { label: '', href: '#' }])
    const removeLink = idx => update('links', data.links.filter((_, i) => i !== idx))

    return (
        <>
            <div className="grid grid-cols-2 gap-3">
                <Field label="Brand Name" value={data.brand} onChange={v => update('brand', v)} />
                <Field label="CTA Text" value={data.ctaText} onChange={v => update('ctaText', v)} />
            </div>
            <Field label="WhatsApp URL" value={data.whatsappUrl} onChange={v => update('whatsappUrl', v)} type="url" />

            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Navigation Links</label>
            {data.links?.map((link, i) => (
                <div key={i} className="flex gap-3 items-end">
                    <div className="flex-1"><Field label="Label" value={link.label} onChange={v => updateLink(i, 'label', v)} /></div>
                    <div className="flex-1"><Field label="Href" value={link.href} onChange={v => updateLink(i, 'href', v)} /></div>
                    <button onClick={() => removeLink(i)} className="text-red-400 hover:text-red-600 mb-1">
                        <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                </div>
            ))}
            <button onClick={addLink} className="text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">add</span> Tambah Link
            </button>
        </>
    )
}

function ThemeEditor({ data, onChange }) {
    const update = (key, val) => onChange({ ...data, [key]: val })
    const colors = [
        { key: 'primary', label: 'Warna Utama (Primary)', desc: 'Digunakan untuk tombol dan aksen.' },
        { key: 'backgroundLight', label: 'Background Terang', desc: 'Background utama halaman.' },
        { key: 'backgroundDark', label: 'Background Gelap', desc: 'Background section Nutrisi.' },
        { key: 'accentDark', label: 'Aksen Gelap / Teks', desc: 'Warna teks utama dan elemen gelap.' },
    ]

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {colors.map((c) => (
                    <div key={c.key} className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-4">
                        <div className="relative shrink-0">
                            <input
                                type="color"
                                value={data[c.key] || '#000000'}
                                onChange={(e) => update(c.key, e.target.value)}
                                className="size-12 rounded-lg cursor-pointer border-0 p-0 overflow-hidden bg-transparent"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-700 mb-1">{c.label}</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={data[c.key] || ''}
                                    onChange={(e) => update(c.key, e.target.value)}
                                    placeholder="#000000"
                                    className="admin-input py-1 text-xs font-mono w-28 uppercase"
                                />
                                <span className="text-[10px] text-gray-400 font-medium">HEX</span>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1">{c.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                <p className="text-xs font-medium text-[var(--color-accent-dark)]/70 italic text-center">
                    Klik kotak warna di atas untuk memilih warna baru. Perubahan akan langsung terlihat saat disimpan.
                </p>
            </div>
        </div>
    )
}

// --- Main Admin Page ---
export default function AdminPage() {
    const { content, loading, updateContent } = useSiteContent()
    const { signOut } = useAuth()
    const [local, setLocal] = useState({})
    const [saving, setSaving] = useState(null)
    const [toast, setToast] = useState(null)

    useEffect(() => {
        if (content && !loading) {
            setLocal(JSON.parse(JSON.stringify(content)))
        }
    }, [content, loading])

    if (loading) return <LoadingSpinner />

    const handleSave = async (section) => {
        setSaving(section)
        const result = await updateContent(section, local[section])
        setSaving(null)
        if (result.success) {
            setToast({ message: `${section} berhasil disimpan!`, type: 'success' })
        } else {
            setToast({ message: `Gagal menyimpan: ${result.error}`, type: 'error' })
        }
    }

    const updateLocal = (section, data) => {
        setLocal(prev => ({ ...prev, [section]: data }))
    }

    const sections = [
        { key: 'theme', title: 'Tema & Warna', icon: 'palette', Editor: ThemeEditor },
        { key: 'navbar', title: 'Navigation Bar', icon: 'menu', Editor: NavbarEditor },
        { key: 'hero', title: 'Hero Section', icon: 'home', Editor: HeroEditor },
        { key: 'valueProps', title: 'Kenapa EdamameQu', icon: 'verified', Editor: ValuePropsEditor },
        { key: 'story', title: 'Cerita Kami', icon: 'auto_stories', Editor: StoryEditor, link: '#story' },
        { key: 'products', title: 'Produk & Harga', icon: 'shopping_bag', Editor: ProductsEditor, link: '#products' },
        { key: 'nutrition', title: 'Nutrisi', icon: 'restaurant', Editor: NutritionEditor, link: '#nutrition' },
        { key: 'process', title: 'Proses', icon: 'timeline', Editor: ProcessEditor, link: '#process' },
        { key: 'gallery', title: 'Galeri', icon: 'photo_library', Editor: GalleryEditor },
        { key: 'contact', title: 'Kontak & Sosial', icon: 'contacts', Editor: ContactEditor },
        { key: 'footer', title: 'Footer', icon: 'bottom_navigation', Editor: FooterEditor },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {toast && <Toast {...toast} onClose={() => setToast(null)} />}

            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Logo className="size-8" />
                        <div>
                            <h1 className="text-lg font-extrabold tracking-tight">Admin Panel</h1>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">EdamameQu Content Manager</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[var(--color-primary)] transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">visibility</span>
                            Lihat Situs
                        </Link>
                        <button
                            onClick={signOut}
                            className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-red-500 transition-colors ml-2"
                        >
                            <span className="material-symbols-outlined text-lg">logout</span>
                            Keluar
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-6 py-8 space-y-4">
                <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-xl p-4 flex items-start gap-3 mb-6">
                    <span className="material-symbols-outlined text-[var(--color-primary)] mt-0.5">info</span>
                    <p className="text-sm text-[var(--color-accent-dark)]/70">
                        Edit konten landing page Anda di sini. Klik pada setiap bagian untuk membuka editor, lalu klik <strong>"Simpan Perubahan"</strong> untuk menyimpan ke database. Nama bagian akan otomatis mengikuti <strong>Heading</strong> yang Anda isi.
                    </p>
                </div>

                {sections.map(({ key, title, icon, Editor, link }) => {
                    // Find matching label from navbar links
                    const navbarLinks = local.navbar?.links || []
                    const matchingLink = navbarLinks.find(l => l.href === link)
                    const dynamicTitle = matchingLink?.label || title

                    return (
                        <SectionEditor
                            key={key}
                            title={dynamicTitle}
                            icon={icon}
                            saving={saving === key}
                            onSave={() => handleSave(key)}
                        >
                            {local[key] && (
                                <Editor data={local[key]} onChange={data => updateLocal(key, data)} />
                            )}
                        </SectionEditor>
                    )
                })}
            </main>
        </div>
    )
}
