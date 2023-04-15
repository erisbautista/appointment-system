import axios from "axios";
const app_url = import.meta.env.VITE_APP_URL;
const root_url = `${app_url}/api`;

axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
}

export function useApi() {
    return {
        get: (url: string, data?) => {
            data = new URLSearchParams(data).toString();
            return new Promise((resolve, reject) => {
                axios
                    .get(`${root_url}${url}?${data}`)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        post: (url: string, data) => {
            return new Promise((resolve, reject) => {
                axios
                    .post(`${root_url}${url}`, data)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        put: (url: string, data) => {
            return new Promise((resolve, reject) => {
                axios
                    .put(`${root_url}${url}`, data)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        del: (url: string) => {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`${root_url}${url}`)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
    };
}
