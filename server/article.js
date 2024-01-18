import exp from 'constants'
import { getAxios, postAxios } from './request'

export const getArticle = (params) => {
  return postAxios({url: '/api/newList', data: params})
}

export const getArticleDetail = (params, headers) => {
  return postAxios({url: '/api/newDetail', data: params, headers: headers})
}

export const getArticleTag = (params) => {
  return postAxios({url: '/api/getTag', data: params})
}

export const createArticle = (params, headers) => {
  return postAxios({url: '/api/createNew', data: params, headers: headers})
}

export const getComment = (params, headers) => {
  return postAxios({url: '/api/newComment', data: params, headers: headers})
}

export const thumbsUp = (params, headers) => {
  return postAxios({url: '/api/thumbsUp', data: params, headers: headers})
}

export const thumbArticle = (params, headers) => {
  return postAxios({url: '/api/thumbArticle', data: params, headers: headers})
}