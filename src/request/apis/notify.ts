import { request } from '@/request/request'
import { PaginateAble } from '@/shared/types'

export type ReadNotificationType = 'interaction' | 'system'

export function getBaseNotificationsRequest() {
  return request<IGetBaseNotificationsResponse>({
    url: '/notify/base',
    method: 'GET',
  })
}

export function getInteractionNotificationsRequest(params: PaginateAble) {
  return request<INotifyInteractionListResponse>({
    url: '/notify/interaction',
    method: 'GET',
    params,
  })
}

export function getSystemNotificationsRequest(params: PaginateAble) {
  return request<INotifySystemListResponse>({
    url: '/notify/system',
    method: 'GET',
    params,
  })
}

export function readNotificationRequest(type: ReadNotificationType) {
  return request<IMutationResponse>({
    url: `/notify/read/${type}`,
    method: 'POST',
  })
}

export function readAllNotificationRequest(type: ReadNotificationType) {
  return request<IMutationResponse>({
    url: `/notify/read/${type}/all`,
    method: 'POST',
  })
}
