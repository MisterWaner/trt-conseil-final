export function getCookieUserId() {
    const cookie = document.cookie;
    const cookiePairs = cookie.split(";");

    for (const pair of cookiePairs) {
        const [key, value] = pair.split("=");
        if (key.trim() === "id") {
            return value.trim();
        }
    }

    return undefined;

}