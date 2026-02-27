const baseURL = "https://docs.google.com/forms/d/e/1FAIpQLSe5gBO5MgkwxUSrKPUH6hFFgOHTlhid-tITahIlzk9oPfvaXQ/viev";
const match = baseURL.match(/(https:\/\/docs\.google\.com\/forms\/d\/e\/[a-zA-Z0-9_-]+)/);
if (!match) {
    console.log("No match");
} else {
    console.log("Match:", match[1]);
    console.log("Target:", `${match[1]}/formResponse`);
}
