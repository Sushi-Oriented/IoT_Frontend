import { IRequest, SERVER } from '../api';
import Dates from '../__ifunc/dates'
const Package = require('../../package.json')
const APPS_AUTH_USER = '__apps__' + Package.name;
const STORAGE = 'session'; // local|session

// Auth path
const USE_AUTH = true

class Auth {
    static getAuthEnabled() {
        return USE_AUTH
    }
    static async loginByUsername(username, password) {
        return this.login({ username: username, password: password })
    }
    static async loginByEmail(email, password) {
        return this.login({ email: email, password: password })
    }
    static async login(credentials) {
        try {
            let result = await IRequest.Post(SERVER.API.Login, credentials)
            let AuthData = {
                token: (result.token) ? result.token : (result.id) ? result.id : '',
                name: (result.name) ? result.name : '',
                uid: (result.uid) ? result.uid : '',
                role: (result.role) ? result.role : '',
                contact: (result.contact) ? result.contact : '',
                created: (result.created) ? Dates.format(result.created, Dates.FORMAT.DATE_TIME1) : ''
            }
            this.saveAuthUser(AuthData)
            return Promise.resolve(AuthData)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    static async logout() {
        try {
            await IRequest.Post(SERVER.API.Logout)
            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    }
    static getAuthUser() {
        let user = (STORAGE === 'session') ? JSON.parse(sessionStorage.getItem(APPS_AUTH_USER)) : JSON.parse(localStorage.getItem(APPS_AUTH_USER));

        if (user) {
            return user;
        } else {
            return null;
        }
    }
    static getAuthUserAccessToken() {
        let user = (STORAGE === 'session') ? JSON.parse(sessionStorage.getItem(APPS_AUTH_USER)) : JSON.parse(localStorage.getItem(APPS_AUTH_USER));
        if (user && user.token) {
            return user.token
        } else {
            return null
        }
    }
    static saveAuthUser(user) {
        if (STORAGE === 'session') {
            sessionStorage.setItem(APPS_AUTH_USER, JSON.stringify(user));
        } else {
            localStorage.setItem(APPS_AUTH_USER, JSON.stringify(user));
        }
    }
    static removeAuthUser() {
        if (STORAGE === 'session') {
            sessionStorage.removeItem(APPS_AUTH_USER)
        } else {
            localStorage.removeItem(APPS_AUTH_USER)
        }
    }
}
export default Auth;