// using axios library to make async calls to API
import axios from "axios";
// using header from auth-header file
import authHeader from "./auth-header";
// making a global variable for API base url
export const API_BASE_URL = "https://college-management-system1.herokuapp.com/";
const API_URL = "https://college-management-system1.herokuapp.com/api/";
// this method will be used by entire app to make GET requests
export const Get = (url: any) => {
    // adding headers from authHeader file
    return axios.get(API_URL + url, { headers: authHeader() });
};
// this method will be used by entire app to make post requests
export const Post = (url:any,data: any) => {
    return axios
        .post(API_URL + url, data ,{ headers: authHeader() });
}
// this method will be used by entire app to make put requests
export const Put = (url: any,data: any) => {
    return axios
        .put(API_URL + url, data,  { headers: authHeader() });
}
// this method will be used by entire app to make delete requests
export const Delete = (url: any) => {
    return axios
        .delete(API_URL + url,  { headers: authHeader() });
}