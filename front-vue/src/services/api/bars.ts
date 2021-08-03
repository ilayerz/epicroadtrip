import { AxiosResponse } from 'axios';
import { API_URLS, GetType } from '@/config/index';
import { api } from '@/plugins/api';

export default function getBars(data: GetType): Promise<AxiosResponse> {
  return api.get(API_URLS.BARS.GET_BARS, {
    params: {
      radius: data.radius,
      lat: data.lat,
      long: data.long,
    },
  });
}
