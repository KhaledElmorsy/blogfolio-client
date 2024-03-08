import { EndpointSchema, InferEndpoint } from '@blogfolio/types/Endpoint';
import axios, { type AxiosResponse } from 'axios';

axios.defaults.validateStatus = function () {
  return true;
};

export default async function axiosWithEndpoint<T extends EndpointSchema>(
  method: 'put' | 'get' | 'post' | 'delete',
  url: string,
  body: InferEndpoint<T>['request']['body'] = {}
) {
  type Response = InferEndpoint<T>['response'];

  const response = await axios[method]<Response['body']>(url, body);
  const { status, data } = response;

  return { status, body: data, axios: response } as Response & {
    axios: AxiosResponse;
  };
}
