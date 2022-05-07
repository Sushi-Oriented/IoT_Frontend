import { Auth, CONSTANTS } from '../api';

class IRequest {
    static Post(url, data) {
        return this.PostQuery(url, data)
    }
    static PostQuery(url, data, query, encodeUri = true) {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getAuthUserAccessToken() },
        };
        if (typeof data !== 'undefined') {
            requestOptions.body = JSON.stringify(data)
        }
        // http://localhost:3006/api/Devices/update?where=%7B%22id%22%3A%224%22%7D
        // http://localhost:3006/api/AppUsers/login?include=user

        // query = {include:[]},{where:{}}
        // login?include=user
        // update?where=%7B%22id%22%3A%225%22%7D
        let querys = ''
        if (typeof query !== 'undefined') {
            let keys = Object.keys(query);
            if (encodeUri) {
                if (keys.length > 0) {
                    querys = `?${keys[0]}=${encodeURIComponent(JSON.stringify(query[keys[0]]))}`
                }
            } else {
                let _str = '?'
                for (const key in query) {
                    _str += key + '=' + query[key] + '&'
                }
                querys = _str.substr(0, _str.length - 1)
            }
        }

        return this.fetchData(`${url}${querys}`, requestOptions)
    }

    static Get(url) {
        return this.GetQuery(url)
    }
    static GetQuery(url, query) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getAuthUserAccessToken() },
        };

        let querys = ''
        if (typeof query !== 'undefined') {
            let _str = '?'
            for (const key in query) {
                _str += key + '=' + query[key] + '&'
            }
            querys = _str.substr(0, _str.length - 1)
        }

        return this.fetchData(`${url}${querys}`, requestOptions)
    }
    static GetWithFilter(url, query) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getAuthUserAccessToken() },
        };

        if (typeof query === 'undefined') {
            query = ''
        }
        else {
            //?filter=%7B%22and%22%3A%5B%7B%22timestamp%22%3A%7B%22gt%22%3A%222019-02-12T12%3A00%3A00Z%22%7D%7D%2C%7B%22status%22%3A%22pick%22%7D%5D%7D
            query = `?filter=${encodeURIComponent(JSON.stringify(query))}`
        }

        return this.fetchData(`${url}${query}`, requestOptions)
    }

    static Patch(url, data) {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getAuthUserAccessToken() },
            body: JSON.stringify(data)
        };

        return this.fetchData(`${url}`, requestOptions)
    }

    static Delete(url) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getAuthUserAccessToken() }
        };

        return this.fetchData(`${url}`, requestOptions)
    }
    static DeleteQuery(url, query) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getAuthUserAccessToken() }
        };

        let querys = ''
        if (typeof query !== 'undefined') {
            let _str = '?'
            for (const key in query) {
                _str += key + '=' + query[key] + '&'
            }
            querys = _str.substr(0, _str.length - 1)
        }

        return this.fetchData(`${url}${querys}`, requestOptions)
    }
    static DeleteWithFilter(url, query) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getAuthUserAccessToken() }
        };

        if (typeof query === 'undefined') {
            query = ''
        }
        else {
            query = `?filter=${encodeURIComponent(JSON.stringify(query))}`
        }

        return this.fetchData(`${url}${query}`, requestOptions)
    }

    static PutQuery(url, data, query) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getAuthUserAccessToken() },
            body: JSON.stringify(data)
        };

        let querys = ''
        if (typeof query !== 'undefined') {
            let _str = '?'
            for (const key in query) {
                _str += key + '=' + query[key] + '&'
            }
            querys = _str.substr(0, _str.length - 1)
        }

        return this.fetchData(`${url}${querys}`, requestOptions)
    }
    static PutWithFilter(url, data, query) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getAuthUserAccessToken() },
            body: JSON.stringify(data)
        };

        if (typeof query === 'undefined') {
            query = ''
        }
        else {
            query = `?filter=${encodeURIComponent(JSON.stringify(query))}`
        }

        return this.fetchData(`${url}${query}`, requestOptions)
    }

    static UploadFile(url, data) {
        let requestOptions = {
            method: 'POST',
            headers: { 'Authorization': Auth.getAuthUserAccessToken() },
        };
        if (typeof data !== 'undefined') {
            requestOptions.body = data
        }

        return this.fetchData(url, requestOptions)
    }

    static async fetchData(url, options) {
        try {
            let response = await fetch(`${url}`, options)
            // console.log(response)
            if (response.status === 204) {
                // No content deliver
                return Promise.resolve()
            }

            let text = await response.text()
            // console.log(text)
            const data = text && JSON.parse(text);

            if (response.status === 200) {
                return Promise.resolve(data)
            } else if (response.status === 401) {
                // console.log(data)

                let __code = data.error.code || null
                if (__code === 'LOGIN_FAILED') {
                    return Promise.reject(data.error.message)
                } else {
                    // Unauthorized API access
                    // Remove current user and move to login page
                    // console.log(data.error.message)
                    Auth.logout()
                    Auth.removeAuthUser()
                    window.location.assign(CONSTANTS.PATH.LOGIN)
                    return Promise.reject()
                }                
            } else {
                return Promise.reject(data.error.message)
            }
        } catch (error) {
            // console.log('====', error)
            return Promise.reject(error)
        }
    }
}
export default IRequest;
