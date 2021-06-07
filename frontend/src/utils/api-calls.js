const debug = true;
const endpointHost = debug ? 'http://localhost:8000/' : '';

/**
 * Send a request to the API based in the provided path
 *
 * @param {string} path Endpoint path
 * @param {string} accessToken Access Token provided after user login
 * @param {Object} body Body as object
 * @param {string} method GET | POST | PUT | DELETE | PATCH
 * @returns {Promise<Object>} Request response data
 */
export function SendAPIRequest(path = '', accessToken = '', body = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    const endpoint = endpointHost + path;
    const requestConfiguration = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${accessToken}`,
      },
    };

    // Request with GET/HEAD method cannot have body.
    if (method !== 'GET') {
      requestConfiguration.body = JSON.stringify(body);
    }

    fetch(endpoint, requestConfiguration)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
