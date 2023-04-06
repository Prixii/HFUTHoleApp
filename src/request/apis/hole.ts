import { request } from '@/request/request'
import { PaginateAble } from '@/shared/types'
import { PostHoleValidator } from '@/shared/validators/hole'
import { HoleDetailCommentMode, HoleListMode } from '@/shared/enums'
import { HoleDetailPostComment } from '@/shared/validators/hole.detail'
import { HoleSearchValidator } from '@/shared/validators/hole/search'

interface Id {
  id: number
}

export function GetHoleListRequest(
  params: PaginateAble<{ mode: HoleListMode }>
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
  params: PaginateAble<{ mode: HoleDetailCommentMode } & Id>
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

export function SearchHoleRequest(params: PaginateAble<HoleSearchValidator>) {
  return request({
    method: 'GET',
    url: '/hole/search',
    params,
  })
}
