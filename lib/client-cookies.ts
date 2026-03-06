import Cookies from "js-cookie";

export const storeCookie = (key: string, plainText: string, expired: number) => {
   Cookies.set(key, plainText, { expires: expired });
}

export const getCookie = (key: string, value: string) => {
   Cookies.set(key, value, { expires: 1 });
}

export const removeCookie = (key: string) => {
   Cookies.remove(key);
}