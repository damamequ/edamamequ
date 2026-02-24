import { useState, useRef } from 'react'
import { uploadFile } from '../lib/storage'

/**
 * Reusable file upload component with preview.
 * @param {Object} props
 * @param {string} props.label - Field label
 * @param {string} props.value - Current file URL
 * @param {function} props.onChange - Callback with new URL after upload
 * @param {string} props.accept - Accepted file types (e.g. 'image/*', 'video/*')
 * @param {string} props.folder - Storage folder name
 */
export default function FileUpload({ label, value, onChange, accept = 'image/*', folder = 'uploads' }) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(null)
    const inputRef = useRef(null)

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        setError(null)

        const result = await uploadFile(file, folder)

        if (result.error) {
            setError(result.error)
        } else {
            onChange(result.url)
        }

        setUploading(false)
        // Reset input so same file can be re-selected
        if (inputRef.current) inputRef.current.value = ''
    }

    const isImage = accept.includes('image') || (value && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(value))
    const isVideo = accept.includes('video') || (value && /\.(mp4|webm|mov)$/i.test(value))

    return (
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>

            <div className="flex gap-3 items-start">
                {/* Preview */}
                {value && (
                    <div className="shrink-0">
                        {isVideo ? (
                            <video
                                src={value}
                                className="h-20 w-32 object-cover rounded-lg border border-gray-200"
                                muted
                            />
                        ) : isImage ? (
                            <div
                                className="h-16 w-16 rounded-lg bg-cover bg-center border border-gray-200"
                                style={{ backgroundImage: `url('${value}')` }}
                            />
                        ) : null}
                    </div>
                )}

                <div className="flex-1 space-y-2">
                    {/* Current URL (read-only) */}
                    {value && (
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="admin-input text-xs"
                            placeholder="Atau tempel URL di sini..."
                        />
                    )}

                    {/* Upload button */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            disabled={uploading}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-lg">
                                {uploading ? 'hourglass_empty' : 'cloud_upload'}
                            </span>
                            {uploading ? 'Mengupload...' : value ? 'Ganti File' : 'Upload File'}
                        </button>

                        {value && (
                            <button
                                type="button"
                                onClick={() => onChange('')}
                                className="text-xs text-red-400 hover:text-red-600 transition-colors flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                                Hapus
                            </button>
                        )}
                    </div>

                    {error && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {error}
                        </p>
                    )}
                </div>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleFileSelect}
                className="hidden"
            />
        </div>
    )
}
