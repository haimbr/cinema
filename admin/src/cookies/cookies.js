import Cookies from 'js-cookie';

const USER_DATA = "user-data";

export const saveUserOnCookie = (userData) => {
    Cookies.set(USER_DATA, JSON.stringify(userData), { expires: (1 / 24), secure: true });
};

export const deleteUserFromCookie = () => {
    Cookies.remove(USER_DATA, { secure: true, sameSite: "strict" });
};

export const getUserFromCookie = () => {
    const jsonUserData = Cookies.get(USER_DATA);
    if (jsonUserData === undefined) return null;

    return JSON.parse(jsonUserData);
};