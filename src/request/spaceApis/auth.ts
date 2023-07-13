import { LoginFormValidator } from '@/shared/validators/space/auth'
import { loginInstance } from '@/request/spaceRequest'

export function LoginRequest(data: LoginFormValidator) {
  return loginInstance<ISpaceResponse<ISpaceAuthResponse>>({
    url: 'v2/login',
    method: 'post',
    data,
  })
}
