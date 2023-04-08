import { request } from '@/request/request'
import { PaginateAble } from '@/shared/types'
import { PostHoleValidator } from '@/shared/validators/hole'
import { HoleDetailCommentMode, HoleListMode } from '@/shared/enums'
import { HoleDetailPostComment } from '@/shared/validators/hole.detail'
import { HoleSearchValidator } from '@/shared/validators/hole/search'
import { ImagePickerResult } from 'expo-image-picker'
import axios, { AxiosError } from 'axios'
import { Config } from '@/shared/config'

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
  return request<ISearchHoleResponse>({
    method: 'GET',
    url: '/hole/search',
    params,
  })
}

export function UploadHoleImgRequest(imgs: ImagePickerResult['assets']) {
  const data = new FormData()
  for (const img of imgs) {
    // TODO solve any type
    data.append('upload[]', {
      uri: img.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    } as any)
  }

  return request<string[]>({
    baseURL: Config.request.imgBaseURL,
    method: 'POST',
    url: '/upload',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
}
