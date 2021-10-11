import { deleteUserFromCookie, saveUserOnCookie } from "../cookies/cookies";
import { serverUrl } from "../data";
const axios = require('axios');





export const login = async (userData) => {
    try {
        const result = await axios.post(serverUrl + '/admin/login', userData, {
            withCredentials: true,
          });
        console.log(result.data);
        saveUserOnCookie(result.data);
        return result.data.name;
    } catch (err) {
        console.log("ff", err.message);
    }
}


export const logOut = async () => {
    try {
        const result = await axios.post(serverUrl + '/admin/logout', null, {
            withCredentials: true,
        });
        deleteUserFromCookie();
        console.log(result);
        window.location.reload();
    } catch (err) {
        console.log("ff", err);
    }
}

