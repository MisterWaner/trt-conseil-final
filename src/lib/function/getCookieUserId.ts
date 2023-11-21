import Cookies from "js-cookie";

export function getCookieUserId() {
    const cookie = Cookies.get("id");
    if (!cookie) {
        return undefined;
    } 
    return cookie;
}