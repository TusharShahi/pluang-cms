import axios, { AxiosRequestConfig , AxiosError} from 'axios';
import { getAccessToken, logout } from './authService';

//import { alert } from '../utils';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/posts';

type AxiosRequestConfigTypes = AxiosRequestConfig;

axios.interceptors.request.use((config: AxiosRequestConfigTypes): AxiosRequestConfigTypes => {
  if(config && config.headers){
    config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error && error.response && error.response.status === 401) ||
      error.response.status === 403
    ) {
      console.log("unauthorized");
   //   alert.error({ title: 'Unauthorized' });
      logout();
      window.location.reload();
    }
    return error;
  },
);

/*async function makeRequest(config: AxiosRequestConfigTypes) {
  await axios({
    method: config.method || 'get',
    url: config.url,
    data: config.data,
    headers: config.headers ? config.headers : {},
    params: config.params,
    timeout: config.timeout ? config.timeout : 100000,
    cancelToken: config.cancelToken,
  })
    .then((result) => {
      console.log('result1' , result);
      console.log(result.data);
      if (result && result.status >= 200 && result.status < 300) {
        return result.data;
      }
    })
    .catch((error : Error | AxiosError) => {
      if(axios.isAxiosError(error))
      throw error.response;
      else throw error;
    });
}*/


//** Makes an API Request and returns result.data **//
async function makeRequest(config: AxiosRequestConfigTypes) {
  try
  {
    let result = await axios({
    method: config.method || 'get',
    url: config.url,
    data: config.data,
    headers: config.headers ? config.headers : {},
    params: config.params,
    timeout: config.timeout ? config.timeout : 100000,
    cancelToken: config.cancelToken,
  });
  console.log('result1' , result);
  console.log(result.data);
  if (result && result.status >= 200 && result.status < 300) {
    return result.data;
  }
  }
  //Cannot have typed catch errors, need to use unknown
  catch(error : unknown | AxiosError) {
    if(axios.isAxiosError(error))
    throw error.response;
    else throw error;
  }
}


export default makeRequest;
