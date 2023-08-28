import { request } from '@/request/spaceRequest'

export function getUserInfoRequest() {
  return request<IUserInfoResponse>({
    url: 'user/info',
  })
}

export function getUserCardBaseInfo() {
  return request<ICardBaseInfoResponse>({
    url: 'user/card/base',
  })
}
