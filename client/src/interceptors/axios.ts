import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const axiosJWT = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/nth/api/v1`,
  withCredentials: true,
});

axiosJWT.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const firstLogin =
      localStorage.getItem('firstLogin') ||
      sessionStorage.getItem('firstLogin');
    const refreshToken = Cookies.get('refreshToken');
    if (firstLogin && refreshToken) {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/nth/api/v1/auth/refreshToken`,
        { refreshToken },
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

export default axiosJWT;
