import { request } from '@/request/request'
import { ReportValidator } from '@/shared/validators/report'

export function ReportRequest(data: ReportValidator) {
  return request({
    url: '/report/post',
    method: 'post',
    data,
  })
}
