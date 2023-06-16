import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator'

export class LoginFormValidator {
  @MinLength(10, { message: '学号格式错误' })
  @IsNumberString(
    {},
    {
      message: '学号必须是数字哦',
    }
  )
  @IsNotEmpty({ message: '学号不能为空' })
  studentId: number

  @Length(6, 30, { message: '密码格式错误，至少是六位' })
  @IsString()
  @IsNotEmpty({ message: '信息门户密码不能为空' })
  password: string

  // 请求失败时的错误
  @IsOptional()
  reqFailedError?: string
}
