import axios from "axios";
import authHeader from "./auth-header";
export const API_BASE_URL = "http://localhost:3300/";
const API_URL = "https://college-management-system1.herokuapp.com/api/";

export const Get = (url: any) => {
    return axios.get(API_URL + url, { headers: authHeader() });
};
export const Post = (url:any,data: any) => {
    return axios
        .post(API_URL + url, data ,{ headers: authHeader() });
}
export const Put = (url: any,data: any) => {
    return axios
        .put(API_URL + url, data,  { headers: authHeader() });
}
export const Delete = (url: any) => {
    return axios
        .delete(API_URL + url,  { headers: authHeader() });
}