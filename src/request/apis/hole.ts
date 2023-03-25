import { request } from '@/request/request'

export function GetHoleListRequest() {
  return request<IHoleListResponse>({
    method: 'GET',
    url: '/hole/list',
  })
}
