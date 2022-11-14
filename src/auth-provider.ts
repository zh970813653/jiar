// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

import { AxiosResponse } from "axios";
import { User } from "screen/project-list/search-panel";
import {Login,Register} from './request/auth/index' 
const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";
const userInfoStorageKey = "__jira_users__";

export const getToken = () => window.localStorage.getItem(localStorageKey);
export const getUserInfo = () =>  {
  return JSON.parse(window.localStorage.getItem(userInfoStorageKey) as string)
  
};
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = async (data: { username: string; password: string }) => {
  try {
    const response = await Login(data)
    if (response.status === 200) {
      return handleUserResponse(response.data);
    } else {
      return Promise.reject(data);
    }
  } catch (error:any) {
    return Promise.reject(error.data)
    
  }
};

export const register = async (data: { username: string; password: string }) => {
  const result  = await Register(data)
    if (result.status === 200) {
      return handleUserResponse(await result.data);
    } else {
      return Promise.reject(data);
    }
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
