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
  if(config.url !== undefined){
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
}

async function makeRequestServer(config: AxiosRequestConfigTypes) {
  if(config.url !== undefined){
  try
  {

    let headerVal = config?.headers?.Authorization || '';
    console.log(headerVal);
    const myInit = {
      method: 'get',
      headers: {
        'Authorization': headerVal ,
      }
    };
  
    let result : Response = await fetch(config.url,myInit);
   // console.log("------");
   // console.log('status',result.status);
  
    if (result && result.status >= 200 && result.status < 300) {
      let parsedResult = await result.json();
    //  console.log('parsedResult',parsedResult);
      return parsedResult;
    }
    //What about else conditions

    }
    //Cannot have typed catch errors, need to use unknown
    catch(error : unknown | AxiosError) {
      console.log(error);
      console.log(axios.isAxiosError(error));
      if(axios.isAxiosError(error))
      throw error.response;
      else throw error;
    }
  }
}



export  { makeRequest , makeRequestServer };
