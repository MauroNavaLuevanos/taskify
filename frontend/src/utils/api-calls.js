import Axios from 'axios';

const debug = true;
const endpointHost = debug ? 'http://localhost:8000/' : '';

/**
 * Send a request to the API based in the provided path
 *
 * @param {string} path Endpoint path
 * @param {string} accessToken Access Token provided after user login
 * @param {Object} body Body as object
 * @param {string} method GET | POST | PUT | DELETE | PATCH
 * @param {boolean} useToken Enable token authorization
 *
 * @returns {Promise<Object>} Request response
 */
export function SendAPIRequest(path = '', accessToken = '', payload = {}, method = 'GET', useToken = true) {
  return new Promise((resolve, reject) => {
    const endpoint = endpointHost + path;

    const requestConf = {
      method: method.toLocaleLowerCase(),
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
      },
      data: payload,
    };

    if (useToken) {
      requestConf.headers.Authorization = `Token ${accessToken}`;
    }

    Axios(requestConf)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
