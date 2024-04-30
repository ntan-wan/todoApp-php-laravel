import axios from "axios";

axios.interceptors.response.use(
    (res) => res,
    (err) => {
        console.log(err.toJSON());
    }
);

export const callApi = async (method, url, data) => {
    const baseURL = "http://127.0.0.1:8000/api/v1";

    const config = {
        method,
        url,
        baseURL,
    };

    if (data) {
        config.data = data;
    }

    return axios(config);
};
