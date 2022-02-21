
const baseUrl = 'http://localhost:4000/api';

export const fetchWidthoutToken = async(endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;

    console.log(url);

    if (method === 'GET') {
        return fetch(url);
    }else {
        return fetch(url, {
            method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

export const fetchWidthToken = async(endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;

    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });
    }else {
        return fetch(url, {
            method,
            headers: {
                'content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        });
    }
}