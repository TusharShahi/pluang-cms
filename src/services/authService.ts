//exported accessTokenKey
import { makeRequest ,makeRequestServer} from './apiService';
import {ROUTES } from '../constants/routes';

//export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
export const COOKIE_KEY='tokenKey';

export function getAccessToken(): string | null {
  return getCookie(COOKIE_KEY,document.cookie);
}

export function getCookie(name : string, cookieValue : string) : string | null {
  const value : string  = `; ${cookieValue}`;
  const parts : string[]= value.split(`; ${name}=`);

  if (parts.length === 2) {
      return parts[1];
  }
  return null;
}

export function checkIfLoggedIn(): boolean {
  return getAccessToken() ? true : false;
}

export function logout(): void {
  document.cookie = COOKIE_KEY +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

}


export const me = () : Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log("making ME request");
    makeRequest({
          url: ROUTES.ME
      }).then(result => {
        console.log("me",result);
          if (!result.success || !result.data) {
              console.log("logout is called");
              //logout();
              reject();
          } else {
              console.log(result.data);
              resolve(result.data);
          }
      }).catch(error => { 
        console.log(error);
         // logout();
          reject(error);
      });
  });
};

export const meServer = (bearerToken : string) : Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log("making ME Server request");
    makeRequestServer({
          url: ROUTES.ME,
          headers : { 'Authorization'  : `Bearer ${bearerToken}` }
      }).then(result => {
        console.log("me",result);
          if (!result.success || !result.data) {
              console.log("logout is called");
              //logout();
              reject();
          } else {
              console.log(result.data);
              resolve(result.data);
          }
      }).catch(error => { 
        console.log(error);
         // logout();
          reject(error);
      });
  });
};



const authServices = {
  getAccessToken,
  checkIfLoggedIn,
  logout,
  me,
  meServer,
  getCookie,
  COOKIE_KEY
};

export default authServices;