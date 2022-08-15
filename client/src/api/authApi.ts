import { Register } from './../models';
import axios from 'axios';
import { Login } from '../models';

const authApi = {
  signUp: async (register: Register) => {
    return await axios.post('/auth/signup', register);
  },
  signIn: async (login: Login) => await axios.post('/auth/signin', login),
};

export default authApi;
