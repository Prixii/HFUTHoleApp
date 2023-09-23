import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator'

export class CustomScheduleFormValidator {
  @IsNotEmpty({
    message: '标题不能为空',
  })
  title: string

  @IsOptional()
  @MaxLength(10, {
    message: '地点不能超过10个字符',
  })
  location: string

  @IsOptional()
  mark: string

  // 请求失败时的错误
  @IsOptional()
  reqFailedError?: string
}
