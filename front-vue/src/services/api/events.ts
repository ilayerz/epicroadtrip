import { AxiosResponse } from 'axios';
// eslint-disable-next-line import/named
import { API_URLS, GetTypeEvent } from '@/config/index';
import { api } from '@/plugins/api';

export default function getEvents(data: GetTypeEvent): Promise<AxiosResponse> {
  return api.get(API_URLS.EVENTS.GET_EVENTS, {
    params: {
      radius: data.radius,
      lat: data.lat,
      long: data.long,
      start: data.start,
      end: data.end,
    },
  });
}
