import { IsString, Length } from 'class-validator'

export class HoleSearchValidator {
  @Length(1, 100, { message: '搜索的正文内容字数限制为1-100哦s' })
  @IsString()
  keywords: string
}
