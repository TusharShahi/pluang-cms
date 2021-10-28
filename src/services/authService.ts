//exported accessTokenKey
import makeRequest from './apiService';
import {ROUTES } from '../constants/routes';

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
export function getAccessToken(): string | null {
  let ACCESS_TOKEN = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!ACCESS_TOKEN) {
    ACCESS_TOKEN = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return ACCESS_TOKEN;
}

export function checkIfLoggedIn(): boolean {
  return getAccessToken() ? true : false;
}

export function logout(): void {
  return window.localStorage.setItem(ACCESS_TOKEN_KEY, '');
}


export const me = () : Promise<any> => {
  return new Promise((resolve, reject) => {
      makeRequest({
          url: ROUTES.ME
      }).then(result => {
        console.log("me",result);
          if (!result.success || !result.data) {
              console.log("logout is called");
              logout();
              reject();
          } else {
              console.log(result.data);
              resolve(result.data);
          }
      }).catch(error => { 
          logout();
          reject(error);
      });
  });
};


const authServices = {
  getAccessToken,
  checkIfLoggedIn,
  logout,
  ACCESS_TOKEN_KEY,
  me
};

export default authServices;