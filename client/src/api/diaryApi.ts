import axiosJWT from '../interceptors/axios';

const diaryApi = {
  getDocument: async (docId: string) => {
    return await axiosJWT.get(`/diary/document/${docId}`);
  },

  deleteDocument: async (docId: string) => {
    await axiosJWT.delete(`/diary/document/${docId}`);
  },
};

export default diaryApi;
