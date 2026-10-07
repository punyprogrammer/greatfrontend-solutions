export default function createAPI(baseURL) {
  return {
    url(path) {
      const url = new URL(path, baseURL);
      const headers = {};

      return {
        setHeaders(newHeaders) {
          Object.assign(headers, newHeaders);
          return this;
        },

        get() {
          return fetch(url.toString(), {
            method: 'GET',
            headers,
          });
        },

        post(body) {
          return fetch(url.toString(), {
            method: 'POST',
            headers,
            body,
          });
        },
      };
    },
  };
}
