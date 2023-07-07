import { request } from '@/request/spaceRequest'

export function getUserInfo() {
  return request<IUserInfo>({
    url: 'user/info',
  })
}
