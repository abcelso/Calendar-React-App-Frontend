
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