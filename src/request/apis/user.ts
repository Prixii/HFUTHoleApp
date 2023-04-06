import { request } from '@/request/request'

export function GetUserProfileRequest() {
  return request<IUserProfile>({
    method: 'GET',
    url: '/user/profile',
  })
}
