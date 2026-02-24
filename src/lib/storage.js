import { supabase } from './supabase'

const BUCKET = 'site-assets'

/**
 * Upload a file to Supabase Storage.
 * @param {File} file - The file object from an <input type="file">
 * @param {string} folder - Folder name inside the bucket (e.g. 'gallery', 'hero')
 * @returns {{ url: string } | { error: string }}
 */
export async function uploadFile(file, folder = 'uploads') {
    const ext = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const { error } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        })

    if (error) {
        console.error('Upload error:', error)
        return { error: error.message }
    }

    const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(fileName)

    return { url: urlData.publicUrl }
}

/**
 * Delete a file from Supabase Storage by its public URL.
 * @param {string} publicUrl - The full public URL of the file
 */
export async function deleteFile(publicUrl) {
    try {
        const url = new URL(publicUrl)
        // Extract path after /storage/v1/object/public/site-assets/
        const match = url.pathname.match(/\/storage\/v1\/object\/public\/site-assets\/(.+)/)
        if (match) {
            await supabase.storage.from(BUCKET).remove([match[1]])
        }
    } catch (e) {
        console.warn('Could not delete file:', e)
    }
}
