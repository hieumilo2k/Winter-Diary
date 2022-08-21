import axiosJWT from '../interceptors/axios';
import { UpdateUser } from '../models';

const userApi = {
  getCurrentUser: async () => {
    return await axiosJWT.get('/user/profile');
  },
  updatePassword: async (password: string) => {
    return await axiosJWT.post('/auth/resetPassword', { password });
  },
  updateUser: async (update: UpdateUser) => {
    return await axiosJWT.patch('/user/update', update);
  },
  uploadAvatar: async (formData: FormData) => {
    return await axiosJWT.post('/user/uploadAvatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default userApi;
