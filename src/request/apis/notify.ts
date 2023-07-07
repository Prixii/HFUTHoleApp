import { request } from '@/request/request'

export function getBaseNotificationsRequest() {
  return request<IGetBaseNotificationsResponse>({
    url: '/notify/base',
    method: 'GET',
  })
}
