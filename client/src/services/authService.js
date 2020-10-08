import http from "./httpService";
import { apiEndpoint } from "../config.json";

const tokenKey = "adminAuthToken"

validateToken()

async function login(email, password) {
    const { data, status } = await http.post(apiEndpoint + '/admin/login', {
        email,
        password
    })
    const { token } = data

    if (token)
        localStorage.setItem(tokenKey, token)

    return status
}

async function validateToken() {
    setHTTPJwt()
    if (isAuthenticated()) {
        try {
            await http.get(apiEndpoint + '/admin/validate_token')
        } catch (e) {
            if (e.response && e.response.status === 401)
                localStorage.removeItem(tokenKey)
        }
    }
}

async function logout() {
    await http.get(apiEndpoint + '/admin/logout')

    localStorage.removeItem(tokenKey)

    window.location = '/'
}

async function logoutAllDevices() {
    await http.get(apiEndpoint + '/admin/logout_all_devices')

    localStorage.removeItem(tokenKey)

    window.location = '/'
}

function setHTTPJwt() {
    http.setJwt(getJwt())
}

function getJwt() {
    return localStorage.getItem(tokenKey)
}

function isAuthenticated() {
    return getJwt() || false
}

export default {
    login,
    logout,
    logoutAllDevices,
    setHTTPJwt,
    getJwt,
    isAuthenticated
}