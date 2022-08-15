import axios, { AxiosRequestConfig } from 'axios';

const axiosJWT = axios.create({
  baseURL: 'http://localhost:5000/nth/api/v1',
  withCredentials: true,
});

axiosJWT.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    console.log('interceptors');
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      const res = await axios.post(
        'nth/api/v1/auth/refreshToken',
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        config.headers!.Authorization = `Bearer ${res.data.accessToken}`;
      }
    }
    return config;
  },
  (err) => Promise.reject(err)
);
