import { request } from '@/request/spaceRequest'

export function getUserInfoRequest() {
  return request<IUserInfoResponse>({
    url: 'user/info',
  })
}
