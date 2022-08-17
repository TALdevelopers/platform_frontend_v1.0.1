// import axios from 'axios';
// // const https =  require.resolve("https-browserify");

// export default axios.create({
//     baseURL: 'http://localhost:8080/',
// });

import axios from "axios";
import LocalStorageService from "./localstorage";
// const https = require("https");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export const baseURL = 'http://localhost:8081';
// export const baseURL = window.baseURL;

const loginURL = "/api/oauth/token";
const logoutURL = "/api/oauth/revoke";

const client_id = "application";
const client_secret = "secret";

const caxios = axios.create({
  baseURL: baseURL,
  
  headers: {'Access-Control-Allow-Origin': '*'},
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false,
//   }),
  transformRequest: [
    (data, headers) => {
       //headers['Access-Control-Allow-Origin']='*'; 
      return data;
    },
    ...axios.defaults.transformRequest,
  ],
  transformResponse: [
    (data, header) => {
      let resp;
      try {
        resp = data;
        //console.log("header", header);
        resp = JSON.parse(resp);
        
      } catch (error) {
        //resp = JSON.parse(data);
        console.log("Non decrypted log", resp);
      }
      return resp;
    },
  ],
});

// LocalstorageService
const localStorageService = LocalStorageService.getService();

// Add a request interceptor
caxios.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();
    if (token && config.url !== loginURL) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

caxios.interceptors.response.use(
  (response) => {
    //   console.log("In response interceptor", response.config.url, response);
    if (response.status === 200 && response.config.url === loginURL) {
      localStorageService.setToken(response.data);
      return response;
    }
    if (response.status === 400 && response.config.url === loginURL) {
      return response;
    }
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (!error.response) {
      console.log("!error.response", error);
      let customError = new Error("Network unreachable");
      customError.status = 202;
      return Promise.reject(customError);
    }

    if (error.response.status === 400 && originalRequest.url === loginURL) {
      console.log("error 400", error);
      return Promise.reject(error.response);
    }

    if (error.response.status === 401 && originalRequest.url === loginURL) {
      //router.push('/login');
      console.log("error 401", error);
      window.location = `${process.env.PUBLIC_URL}/login`;
      return Promise.reject(error);
    }

    if (error.response.status === 405 && originalRequest.url === loginURL) {
      //router.push('/login');
      console.log("error 405", error.response);
      return Promise.reject(error.response);
    }

    if (error.response.status === 401 && originalRequest.url === logoutURL) {
      localStorageService.clearToken();
      localStorage.setItem("loggedIn", false);
      window.location = `${process.env.PUBLIC_URL}/login`;
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      let token = getBasicToken();
      const rtoken = localStorageService.getRefreshToken();
      const userId = localStorage.getItem("username");
      let reqData = `grant_type=refresh_token&refresh_token=${rtoken}&client_id=${client_id}&username=${userId}`;
      let config = {
        headers: {
          Authorization: `Basic ${token}`,
         },
      };
      return axios
        .post(baseURL + loginURL, reqData, config)
        .then((res) => {
          if (res.status === 200) {
            localStorageService.setToken(res.data);
            return caxios(originalRequest);
          } else {
            localStorageService.clearToken();
            window.location = `${process.env.PUBLIC_URL}/login`;
          }
        })
        .catch(function (err) {
          localStorageService.clearToken();
          localStorage.setItem("loggedIn", false);
          window.location = `${process.env.PUBLIC_URL}/login`;
          return Promise.reject(err);
        });
    }
    console.log("error out side", error);
    return Promise.reject(error);
  }
);

function getBasicToken() {
  let temp = client_id + ":" + client_secret;
  let token = btoa(temp);

  return token;
}

export function login(userId, password, callback) {
  let reqData = `grant_type=password&username=${userId}&password=${password}&client_id=${client_id}`;
  let token = getBasicToken();
  let config = {
    headers: {
      Authorization: `Basic ${token}`,     
    },
  };
  caxios
    .post("/api/oauth/token", reqData, config)
    .then((res) => callback(res))
    .catch((err) => callback(err));
}

//export default caxios, login;
export default caxios;

//sample
//import -
//import api, {login} from './service/ApiService';
//login -
//login(cuser,cpass, (response) => {
//  console.log(response);
//})
//get -
// api.get(<url>)
// .then(res => {
//   console.log(res);
// })
//post -
//api.post(<url>, data, config)
//  .then(res => {
//     console.log(res);
//   })