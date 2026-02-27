export async function submitGoogleForm(baseURL, entryName, entryPhone, nameValue, phoneValue) {
    if (!baseURL || !entryName || !entryPhone) return { success: false, error: 'Konfigurasi tidak lengkap' };

    try {
        // Extract the core Google Forms URL format up to the Form ID
        // Even if the user put /viev or /viewform at the end, this catches the ID
        const match = baseURL.match(/(https:\/\/docs\.google\.com\/forms\/d\/e\/[a-zA-Z0-9_-]+)/);

        if (!match) {
            return { success: false, error: 'Format URL Google Form tidak valid. Pastikan itu link docs.google.com/forms/...' };
        }

        const targetUrl = `${match[1]}/formResponse`;

        // Google Forms accepts x-www-form-urlencoded
        const formData = new URLSearchParams();
        formData.append(entryName.trim(), nameValue);
        formData.append(entryPhone.trim(), phoneValue);
        // We must append this so it processes as a submitted form
        formData.append('submit', 'Submit');

        // We use no-cors because Google Forms does not send CORS headers back
        // This means we won't get a proper 200/JSON response, but the data will be sent.
        await fetch(targetUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });

        // Because we are using no-cors, we can't reliably read the response status, 
        // so we assume success if fetch didn't throw a network error.
        return { success: true };
    } catch (e) {
        console.error("Gagal mengirim ke Google Form", e);
        return { success: false, error: 'Terjadi kesalahan jaringan' };
    }
}
