import { request } from '@/request/request'
import { IPagination } from '@/shared/types'
import { PostHoleValidator } from '@/shared/validators/hole'

export function GetHoleListRequest(params: IPagination) {
  return request<IHoleListResponse>({
    method: 'GET',
    url: '/hole/list',
    params,
  })
}

export function PostHoleRequest(data: PostHoleValidator) {
  return request<IMutationResponse>({
    method: 'POST',
    url: '/hole/create',
    data,
  })
}
