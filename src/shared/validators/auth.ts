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

  @Length(6, 20, {
    message: '密码只能为6-20位长度',
  })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string

  // 请求失败时的错误
  @IsOptional()
  reqFailedError?: string
}

export class RegisterFormValidator extends LoginFormValidator {
  @Length(1, 10, { message: '用户名长度为1-10个字符哦' })
  @IsString()
  @IsNotEmpty()
  username: string

  @Length(6, 30, { message: '密码格式错误，至少是六位' })
  @IsString()
  @IsNotEmpty()
  hfutPassword: string
}

export class ForgetFormValidator extends LoginFormValidator {
  @Length(6, 30, { message: '密码格式错误，至少是六位' })
  @IsString()
  @IsNotEmpty()
  hfutPassword: string
}
