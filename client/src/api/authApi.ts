import { Register } from './../models';
import axios from 'axios';
import { Login } from '../models';

const authApi = {
  signUp: async (register: Register) => {
    return await axios.post('nth/api/v1/auth/signup', register);
  },
  signIn: async (login: Login) => await axios.post('api/auth/signin', login),
  activationEmail: async (activationToken: string) => {
    return await axios.post(
      `${process.env.REACT_APP_CLIENT_URL}/nth/api/v1/auth/activation`,
      { activationToken }
    );
    // do đường dẫn cũ từ email + '/' ra khác đường dẫn api
  },
};

export default authApi;
