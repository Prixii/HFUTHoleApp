import { request } from '@/request/spaceRequest'

export function getUserInfo() {
  return request<IUserInfoResponse>({
    url: 'user/info',
  })
}
