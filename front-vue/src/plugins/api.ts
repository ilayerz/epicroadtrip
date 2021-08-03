import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

type config = { headers?: { Authorization: string } }

const getConfig = (token: null|string = null): config => {
  if (token !== null) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return {};
};

export {
  api,
  getConfig,
};
