import { getAxios, postAxios } from './request'

export const login = (params) => {
  return postAxios({url: '/api/login', data: params})
}