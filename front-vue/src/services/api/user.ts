import { AxiosResponse } from 'axios';
// eslint-disable-next-line import/named
import { API_URLS, UserData } from '@/config/index';
import { api, getConfig } from '@/plugins/api';

const postRegister = (data: UserData): Promise<AxiosResponse> => api.post(API_URLS.USER.POST_REGISTER, {
  email: data.email,
  password: data.password,
});

const postLogin = (data: UserData): Promise<AxiosResponse> => api.post(API_URLS.USER.POST_LOGIN, {
  email: data.email,
  password: data.password,
});

const postRoute = (json: any, token?: string): Promise<AxiosResponse> => api.post(API_URLS.USER.POST_ROUTE, { json }, getConfig(token));

const getRoute = (sessionId: string): Promise<AxiosResponse> => api.post(API_URLS.USER.GET_ROUTE, { sessionId });

const getAllRoute = (token?: string): Promise<AxiosResponse> => api.get(API_URLS.USER.GET_ALL_ROUTES, getConfig(token));

export {
  postLogin,
  postRegister,
  postRoute,
  getRoute,
  getAllRoute,
};
