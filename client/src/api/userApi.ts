import axiosJWT from '../interceptors/axios';

const userApi = {
  getCurrentUser: async () => {
    return await axiosJWT.get('/user/profile');
  },
};

export default userApi;
