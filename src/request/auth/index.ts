import { AxiosResponse } from 'axios';
import { Project } from 'type/project';
import $http from '../http'

// import { User } from "screen/project-list/search-panel";
const apiUrl = process.env.REACT_APP_API_URL;

// 登录
export const Login = (data: { username: string; password: string }): Promise<AxiosResponse> => {
  return $http({
    url: `${apiUrl}/login`,
    method: "POST",
    data
  })
}
// 注册
export const Register = (data: { username: string; password: string }) => {
  return $http({
    url: `${apiUrl}/register`,
    method: "POST",
    data
  })
} 
export const getProjects = (params:any) => {
  return $http({
    url: `${apiUrl}/projects`,
    method: "GET",
    params
  })
} 

export const getUser = () => {
  return $http({
    url: `${apiUrl}/users`,
    method: "GET"
  })
}

// 收藏
export const collect = (params:Partial<Project>) => {
  return $http({
    url: `${apiUrl}/projects/${params.id}`,
    method: "PATCH",
    data: params
  })
}

export const addCollect = (params:Partial<Project>) => {
  return $http({
    url: `${apiUrl}/projects/${params.id}`,
    method: "POST",
    data: params
  })
}
// export const getMeInfo = () => {
//   return $http({
//     url: `${apiUrl}/me?token=MzkyMzc2Mjk3OQ==`,
//     method: "GET",
//   })
// }
// projects
// 退出登录