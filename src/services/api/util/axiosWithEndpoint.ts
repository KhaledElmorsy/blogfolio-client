import { EndpointSchema, InferEndpoint } from '@blogfolio/types/Endpoint';
import axios, { AxiosRequestConfig, type AxiosResponse } from 'axios';

axios.defaults.validateStatus = function () {
  return true;
};

export default async function axiosWithEndpoint<T extends EndpointSchema>(
  method: 'put' | 'get' | 'post' | 'delete',
  url: string,
  body: InferEndpoint<T>['request']['body'] = {},
  config: AxiosRequestConfig & {
    params?: InferEndpoint<T>['request']['query'];
  } = {}
) {
  type Response = InferEndpoint<T>['response'];

  const response = await (['put', 'post'].includes(method)
    ? axios[method]<Response['body']>(url, body, config)
    : axios[method]<Response['body']>(url, config));

  const { status, data } = response;

  return { status, body: data, axios: response } as Response & {
    axios: AxiosResponse;
  };
}
