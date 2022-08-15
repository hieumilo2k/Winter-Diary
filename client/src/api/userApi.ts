import axios from 'axios';

const userApi = {
  getCurrentUser: async (token: string) => {
    try {
      const res = await axios.get('/user/profile');
      console.log(res);
    } catch (error) {}
  },
};
