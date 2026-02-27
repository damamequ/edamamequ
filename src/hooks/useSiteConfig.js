import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useSiteConfig() {
    const [config, setConfig] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchConfig = useCallback(async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('site_config')
                .select('*')
                .limit(1)

            if (error) {
                // Ignore if table doesn't exist yet, we can use fallback
                if (error.code !== '42P01') {
                    throw error
                }
            }

            if (data && data.length > 0) {
                setConfig(data[0])
            } else {
                // Fallback config if no data exists or table doesn't exist
                setConfig({
                    cta_type: "gform_prefill",
                    gform_prefill_base_url: "https://docs.google.com/forms/d/e/1FAIpQLScX_EXAMPLE/viewform?usp=pp_url",
                    gform_entry_name: "entry.111111",
                    gform_entry_phone: "entry.222222"
                })
            }
        } catch (err) {
            console.error('Error fetching site config:', err)
            // Default fallback
            setConfig({
                cta_type: "gform_prefill",
                gform_prefill_base_url: "https://docs.google.com/forms/d/e/1FAIpQLScX_EXAMPLE/viewform?usp=pp_url",
                gform_entry_name: "entry.111111",
                gform_entry_phone: "entry.222222"
            })
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchConfig()
    }, [fetchConfig])

    return { config, loading, refetch: fetchConfig }
}
