import axios from 'axios';

const refreshToken = async () => {
    try {
        const res = await axios.post('/auth/refresh', {
            withCredentials: true,
            credentials: 'same-origin',
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createAxios = (user, dispatch, state) => {
    const token = localStorage.getItem('token');
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async function (config) {
            console.log('config: ', config)
            config.headers['Authorization'] = 'Bearer ' + token;
            return config;
        },
        function (err) {
            return Promise.reject(err);
        },
    );

    newInstance.interceptors.response.use(
        async function (response) {
            return response;
        },
        async function (err) {

            let originRequest = err.config;
            if (err.response.status === 401) {
                // The token is invalid, so call refreshToken
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                };
                dispatch(state(refreshUser));
                localStorage.setItem('token', data.accessToken);
                originRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
            }
            return Promise.reject(err.response || err.message);
        },
    );

    return newInstance;
};
