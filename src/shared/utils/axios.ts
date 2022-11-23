import axios from 'axios';
import { getToken } from '@baloise/vue-keycloak';
import { API_URL } from '~/shared/constants/url';

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(async (request) => {
  const token = await getToken();
  request.headers = {
    ...request.headers,
    Authorization: `Bearer ${token}`,
  };
  return request;
});
