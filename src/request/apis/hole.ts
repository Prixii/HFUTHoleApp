import { request } from '@/request/request'
import { IPagination } from '@/shared/types'

export function GetHoleListRequest(params: IPagination) {
  return request<IHoleListResponse>({
    method: 'GET',
    url: '/hole/list',
    params,
  })
}
