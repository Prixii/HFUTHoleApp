import { request } from '@/request/request'
import { IPagination } from '@/shared/types'
import { PostHoleValidator } from '@/shared/validators/hole'
import { HoleDetailCommentMode, HoleListMode } from '@/shared/enums'
import { HoleDetailPostComment } from '@/shared/validators/hole.detail'

interface Id {
  id: number
}

export function GetHoleListRequest(
  params: IPagination & { mode: HoleListMode }
) {
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

export function GetHoleDetailRequest(params: Id) {
  return request<IHoleDetailResponse>({
    method: 'GET',
    url: '/hole/detail',
    params,
  })
}

export function GetHoleDetailCommentsRequest(
  params: Id & IPagination & { mode: HoleDetailCommentMode }
) {
  return request<IHoleCommentListResponse>({
    method: 'GET',
    url: '/hole/comment',
    params,
  })
}

export function PostHoleDetailCommentRequest(data: HoleDetailPostComment) {
  return request<IMutationResponse>({
    method: 'POST',
    url: '/hole/comment',
    data,
  })
}

export function PostLikeHoleRequest(data: Id) {
  return request<IMutationResponse>({
    method: 'POST',
    url: '/hole/like',
    data,
  })
}

export function DeleteLikeHoleRequest(data: Id) {
  return request<IMutationResponse>({
    method: 'DELETE',
    url: '/hole/like',
    data,
  })
}
