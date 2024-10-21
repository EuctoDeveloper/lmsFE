import axios from "axios";
import { LOGIN_URL } from "../../constants/helper";
import { NO_TOKEN_URL } from "../../constants/helper";

// const axios_config = axios.create({
//     baseURL: `${window.location.protocol}//${window.location.hostname}`
// })


const axios_config = axios.create({
    baseURL: `https://visionfund.dev`
})


const redirect_to_login = () => {
    window.location.href = LOGIN_URL;
}

axios_config.interceptors.request.use(function(config) {
    if(NO_TOKEN_URL.includes(config.url.split("/")[config.url.split("/").length - 1])) {
        return config;
    }
    const token = localStorage.getItem("accessToken");
    if(!token) {
        redirect_to_login();
    }
    config.headers.Authorization = `${token}`;
    return config;
})

axios_config.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    if (error.response && error.response.status === 403) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            return axios.get('/auth/refresh', {
                headers: {
                    'refresh-token': refreshToken
                }
            })
            .then(async(res) => {
                if (res.status === 200) {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem("refreshToken", res.data.refreshToken);
                    error.config.headers['Authorization'] = res.data.accessToken;
                    return (await axios(error.config));
                } else {
                    localStorage.clear();
                    redirect_to_login();
                }
            })
            .catch(() => {
                localStorage.clear();
                redirect_to_login();
            });
        } else {
            localStorage.clear();
            redirect_to_login();
        }
    }
    return Promise.reject(error);
})

export default axios_config;