import { LoginFormValidator } from '@/shared/validators/space/auth'
import { request } from '@/request/spaceRequest'

export function LoginRequest(data: LoginFormValidator) {
  return request<ISpaceAuthResponse>({
    url: 'v2/login',
    method: 'post',
    data,
  })
}
