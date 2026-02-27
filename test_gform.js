const formId = '1FAIpQLSe5gBO5MgkwxUSrKPUH6hFFgOHTlhid-tITahIlzk9oPfvaXQ';
const entryName = 'entry.981620893';
const entryPhone = 'entry.651244061';

const postData = new URLSearchParams();
postData.append(entryName, 'Test Dari AI');
postData.append(entryPhone, '08123456789');
postData.append('submit', 'Submit');

const targetUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

console.log(`Sending to ${targetUrl}`);

try {
    const res = await fetch(targetUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: postData.toString()
    });
    console.log(`Status: ${res.status}`);
    const text = await res.text();
    console.log(`Response title: ${text.match(/<title>(.*?)<\/title>/)?.[1]}`);
} catch (e) {
    console.error(e);
}
