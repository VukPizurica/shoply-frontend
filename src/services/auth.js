import ShoplyAxios from "../apis/ShoplyAxios";
import jwt_decode from "jwt-decode"

export function logout() {
    const jwt = window.localStorage.getItem('jwt')
    if (jwt) {
        window.localStorage.removeItem('jwt')
        window.location.reload();
        window.localStorage.removeItem('role')
    }
}



export async function login(username, password) {
    const cred = {
        username: username,
        password: password
    }
    try {
        const ret = await ShoplyAxios.post('users/auth', cred);
        const jwt_decoded = jwt_decode(ret.data);
        window.localStorage.setItem('jwt', ret.data);
        window.localStorage.setItem('role', jwt_decoded.role.authority);
        return ret.status;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
