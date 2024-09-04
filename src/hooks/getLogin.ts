import cookie from 'js-cookie';

export function getLogin() {
    return cookie.get("username");
}