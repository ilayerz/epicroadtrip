import { AxiosResponse } from 'axios';
import { api } from '@/plugins/api';

export default function getAddress(lat: number, long: number): Promise<AxiosResponse> {
  return api.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=6a2360e760c94f13b52d02acb95ad1bc&no_annotations=1&language=fr`);
}
