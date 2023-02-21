import { IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator'
import { NumberLength } from '@/shared/validators/utils'

export class LoginFormValidator {
  @Length(10, 10, { message: '学号格式错误' })
  @IsNumberString()
  @IsNotEmpty({ message: '学号不能为空' })
  studentId: number

  @Length(6, 20, {
    message: '密码只能为6-20位长度',
  })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string
}
