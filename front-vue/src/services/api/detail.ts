import { AxiosResponse } from 'axios';
import { API_URLS } from '@/config';
import { api } from '@/plugins/api';

export default function getDetails(xID: string): Promise<AxiosResponse> {
  return api.get(API_URLS.DETAIL.GET_DETAIL, {
    params: {
      xid: xID,
    },
  });
}
