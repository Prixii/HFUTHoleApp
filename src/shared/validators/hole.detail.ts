import { IsNumberString, IsString, Length } from 'class-validator'
import { Limit } from '@/shared/config'

export class HoleDetailPostComment {
  @IsNumberString()
  id: number

  @Length(Limit.holeCommentBodyMinLength, Limit.holeCommentBodyMaxLength, {
    message: `评论字数限制在${Limit.holeCommentBodyMinLength}-${Limit.holeCommentBodyMaxLength}字`,
  })
  @IsString()
  body: string
}
