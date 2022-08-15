import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

let refresh = false;

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    console.log('interceptors');
    const firstLogin = localStorage.getItem('firstLogin');
    if (error.response.status === 401 && !refresh && firstLogin) {
      refresh = true;

      const response = await axios.post(
        '/auth/refreshToken',
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.accessToken}`;

        console.log(response.data);

        return axios(error.config);
      }
    }
    refresh = true;
    return error;
  }
);
