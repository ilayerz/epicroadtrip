import { AxiosResponse } from 'axios';
import { API_URLS, GetType } from '@/config/index';
import { api } from '@/plugins/api';

export default function getRestaurants(data: GetType): Promise<AxiosResponse> {
  return api.get(API_URLS.RESTAURANTS.GET_RESTAURANTS, {
    params: {
      radius: data.radius,
      lat: data.lat,
      long: data.long,
    },
  });
}
