import axios from 'axios'

/**
 * api request
 *
 * @param {*} url - request url
 * @param {import('axios').AxiosRequestConfig} options - request options
 * @param {String} options.token - request auth token
 *
 * @return api response
 */
const request = (url, { method = 'GET', headers, token, ...options } = {}) =>
    axios({
        url,
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers
        },
        ...options
    }).catch(error => {
        error.data = error.response.data
        throw error
    })

export default request
