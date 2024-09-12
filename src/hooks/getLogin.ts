import cookie from 'js-cookie';

export function usegetLogin() {
    return cookie.get("username");
}