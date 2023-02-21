import { request } from '@/request/request'
import { LoginFormValidator } from '@/pages/auth/validator'

export function LoginRequest(data: LoginFormValidator) {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}
