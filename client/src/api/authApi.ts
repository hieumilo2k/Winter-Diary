import { Register } from './../models';
import axios from 'axios';
import { Login } from '../models';
import Cookies from 'js-cookie';
const authApi = {
  signUp: async (register: Register) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/nth/api/v1/auth/signup`,
      register
    );
  },
  signIn: async (login: Login) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/nth/api/v1/auth/signin`,
      login,
      { withCredentials: true }
    );
    Cookies.set('refreshToken', data.refreshToken);
    return { msg: 'Login Success !' };
  },
  activationEmail: async (activationToken: string) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/nth/api/v1/auth/activation`,
      { activationToken }
    );
    // do đường dẫn cũ từ email + '/' ra khác đường dẫn api
  },
  forgotPassword: async (email: string) => {
    return await axios.post('nth/api/v1/auth/forgot', { email });
  },
  resetPassword: async (token: string, password: string) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/nth/api/v1/auth/resetPassword`,
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  logout: async () => {
    await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/nth/api/v1/auth/logout`
    );
    localStorage.removeItem('firstLogin');
    sessionStorage.removeItem('firstLogin');
    window.location.href = '/';
  },
};

export default authApi;
